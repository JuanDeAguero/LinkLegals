require("dotenv").config()
const OpenAI = require("openai")
const express = require("express")
const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")
const util = require("util")

const execAsync = util.promisify(exec)
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next()
})
app.use(express.json())

const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY
const baseURL = process.env.DEEPSEEK_API_KEY ? "https://api.deepseek.com" : undefined
const model = process.env.DEEPSEEK_API_KEY ? "deepseek-chat" : "gpt-3.5-turbo"

const openai = new OpenAI({
  apiKey,
  ...(baseURL ? { baseURL } : {}),
})

const systemPromptPath = path.join(__dirname, "system_prompt.txt")
const SYSTEM_PROMPT = fs.readFileSync(systemPromptPath, "utf8")

app.post("/message", async (req, res, next) => {
  try {
    const { message, conversation } = req.body
    let messages = []
    if (conversation && Array.isArray(conversation)) {
      messages = conversation
    } else if (message) {
      messages = [{ role: "user", content: message }]
    } else {
      return res.status(400).json({ error: "No message provided." })
    }
    messages.unshift({ role: "system", content: SYSTEM_PROMPT })
    const completion = await openai.chat.completions.create({
      model,
      messages,
    })
    const reply = completion.choices[0].message.content
    res.json({ reply })
  } catch (error) {
    next(error)
  }
})

app.post("/compile-latex", async (req, res, next) => {
  try {
    const latexCode = req.body.latex
    if (!latexCode) {
      return res.status(400).send("No LaTeX code provided.")
    }
    const fileName = `temp_${Date.now()}`
    const texFilePath = path.join(__dirname, `${fileName}.tex`)
    const pdfFilePath = path.join(__dirname, `${fileName}.pdf`)
    await fs.promises.writeFile(texFilePath, latexCode)
    await execAsync(`pdflatex -interaction=nonstopmode -output-directory ${__dirname} ${texFilePath}`)
    const pdfFile = await fs.promises.readFile(pdfFilePath)
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment filename=${fileName}.pdf`)
    res.send(pdfFile)
    Promise.all([
      fs.promises.unlink(texFilePath),
      fs.promises.unlink(pdfFilePath),
      fs.promises.unlink(path.join(__dirname, `${fileName}.aux`)).catch(() => {}),
      fs.promises.unlink(path.join(__dirname, `${fileName}.log`)).catch(() => {})
    ]).catch((err) => console.error("Cleanup error:", err))
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.error("Uncaught Error:", err.stack)
  if (!res.headersSent) {
    res.status(500).json({ error: "Something went wrong on the server." })
  }
})

app.get("/", (req, res) => {
  res.status(200).send("OK")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})