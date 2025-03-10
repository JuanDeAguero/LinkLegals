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

const systemPromptPath = path.join(__dirname, "q.txt")
const SYSTEM_PROMPT = fs.readFileSync(systemPromptPath, "utf8")

const PromptType = {
  LEGAL: "legal",
  N400: "n400",
  KYR: "kyr",
  ASYLUM: "asylum"
}

app.post("/message", async (req, res, next) => {
  try {
    const { message, conversation, systemPromptType, stream = true } = req.body
    let messages = []
    if (conversation && Array.isArray(conversation)) {
      messages = conversation
    } else if (message) {
      messages = [{ role: "user", content: message }]
    } else {
      return res.status(400).json({ error: "No message provided." })
    }
    let promptFile = "q.txt"
    if (systemPromptType) {
      switch(systemPromptType) {
        case PromptType.LEGAL:
          promptFile = "q.txt"
          break
        case PromptType.N400:
          promptFile = "n400.txt"
          break
        case PromptType.KYR:
          promptFile = "kyr.txt"
          break
        case PromptType.ASYLUM:
          promptFile = "asylum.txt"
          break
        default:
          promptFile = "q.txt"
      }
    }
    const systemPromptPath = path.join(__dirname, promptFile)
    try {
      const systemPromptContent = fs.readFileSync(systemPromptPath, "utf8")
      messages.unshift({ role: "system", content: systemPromptContent })
    } catch (error) {
      console.error(`Error reading prompt file ${promptFile}:`, error)
      messages.unshift({ role: "system", content: SYSTEM_PROMPT })
    }
    const completion = await openai.chat.completions.create({
      model,
      messages,
      stream,
    })
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream")
      res.setHeader("Cache-Control", "no-cache")
      res.setHeader("Connection", "keep-alive")
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`)
        }
      }
      res.write('data: [DONE]\n\n')
      res.end()
    } else {
      const reply = completion.choices[0].message.content
      res.json({ reply })
    }
  } catch (error) {
    next(error)
  }
})

app.post("/compile-latex", async (req, res, next) => {
  try {
    let latexCode = req.body.latex
    if (!latexCode) {
      return res.status(400).send("No LaTeX code provided.")
    }
    latexCode = latexCode
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu, '')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/\u2026/g, '...')
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

const mysql = require("mysql2/promise")
const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const initializeDatabase = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )`
    await pool.execute(query)
    console.log("Users table is ready.")
  } catch (error) {
    console.error("Error creating users table:", error)
  }
}
initializeDatabase()

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    await pool.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    )
    res.status(201).json({ message: "User created successfully." })
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username already exists." })
    }
    console.error("Error registering user:", error)
    res.status(500).json({ error: "Database error." })
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." })
  }
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username])
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." })
    }
    const user = rows[0]
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials." })
    }
    res.status(200).json({ message: "Login successful." })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).json({ error: "Database error." })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})