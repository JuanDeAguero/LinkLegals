import "./app.css"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { SyncLoader } from "react-spinners"

const serverUrl = "https://linklegals.net/"
//const serverUrl = "http://localhost:3000/"

const Home = () => <div className="landing-page">
  <div className="landing-page-content">
    <div className="title">Innovation to Empower</div>
    <div className="subtitle">Harnessing AI to create Practical Solutions for Everyday Challanges</div>
    <Link to="/about" className="learn-more">Learn More</Link>
    <img className="iphone" src="iphone.png" />
  </div>
</div>

const About = ({ isMobile, showMenu, scrollY }) => {
  const ourStoryRef = useRef(null)
  const innovateRef = useRef(null)
  const identifyingProblemRef = useRef(null)
  const missionVisionRef = useRef(null)
  const initialStepsRef = useRef(null)
  const innovationCollabRef = useRef(null)
  const futureGoalsRef = useRef(null)
  const callToActionRef = useRef(null)
  const researchRef = useRef(null)
  const collaborationsRef = useRef(null)
  const [section, setSection] = useState("Our Story")

  const scrollToElementWithOffset = (elementRef, offset = 0) => {
    if (elementRef && elementRef.current) {
      const elementPosition = elementRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY + offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    console.log(scrollY)
  }, [scrollY])

  const sectionNumberToName = (number) => {
    if (number === 0) return "Our Story"
    else if (number === 1) return "Innovate, Connect, Empower"
    else if (number === 2) return "Identifying the Problem"
    else if (number === 3) return "Mission and Vision"
    else if (number === 4) return "Initial Steps and Development"
    else if (number === 5) return "Innovation and Collaboration"
    else if (number === 6) return "Future Goals"
    else if (number === 7) return "Call to Action"
    else if (number === 8) return "Research"
    else if (number === 9) return "Collaborations"
  }

  useEffect(() => {
    const updateSection = () => {
      const currentSection = sections.findIndex(
        (limit, index) => scrollY > sections[index] && scrollY <= sections[index + 1]
      )
      setSection(sectionNumberToName(currentSection))
    }
    updateSection()
  }, [scrollY])

  const determineGuideStyleHelper = (scrollY, prev, max) => {
    if (scrollY > prev && scrollY <= max) {
      return "about-guide-curr"
    } else if (scrollY > prev) {
      return "about-guide-prev"
    }
  }

  const sections = [-1, 130, 840, 1640, 1810, 2060, 2250, 2410, 2600, 3610, 10000]

  const determineGuideStyle = (number, scrollY) => {
    if (number === 0) return determineGuideStyleHelper(scrollY, sections[0], sections[1])
    else if (number === 1) return determineGuideStyleHelper(scrollY, sections[1], sections[2])
    else if (number === 2) return determineGuideStyleHelper(scrollY, sections[2], sections[3])
    else if (number === 3) return determineGuideStyleHelper(scrollY, sections[3], sections[4])
    else if (number === 4) return determineGuideStyleHelper(scrollY, sections[4], sections[5])
    else if (number === 5) return determineGuideStyleHelper(scrollY, sections[5], sections[6])
    else if (number === 6) return determineGuideStyleHelper(scrollY, sections[6], sections[7])
    else if (number === 7) return determineGuideStyleHelper(scrollY, sections[7], sections[8])
    else if (number === 8) return determineGuideStyleHelper(scrollY, sections[8], sections[9])
    else if (number === 9) return determineGuideStyleHelper(scrollY, sections[9], sections[10])
  }

  const determineMobile = (ref, refNext) => {
    if (!refNext) {
      if (!ref.current) return ""
      let refPos = ref.current.getBoundingClientRect().top + window.scrollY - 50
      return determineGuideStyleHelper(scrollY, refPos, 10000)
    }
    if (!ref.current || !refNext.current) return ""
    let refPos = ref.current.getBoundingClientRect().top + window.scrollY - 50
    if (ref === ourStoryRef) refPos = -1
    let refNextPos = refNext.current.getBoundingClientRect().top + window.scrollY - 50
    return determineGuideStyleHelper(scrollY, refPos, refNextPos)
  }

  return (
  <div className="page" style={{ overflow: showMenu && isMobile ? "hidden" : "auto", height: showMenu && isMobile ? "calc(100vh - 60px)" : "auto" }}>
    <div className="about-guide">
      <button className={"about-guide-button " + determineGuideStyle(0, scrollY)} onClick={() => scrollToElementWithOffset(ourStoryRef, -40)}>Our Story</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(1, scrollY)} onClick={() => scrollToElementWithOffset(innovateRef, -40)}>Innovate, Connect, Empower</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(2, scrollY)} onClick={() => scrollToElementWithOffset(identifyingProblemRef, -40)}>Identifying the Problem</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(3, scrollY)} onClick={() => scrollToElementWithOffset(missionVisionRef, -40)}>Mission and Vision</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(4, scrollY)} onClick={() => scrollToElementWithOffset(initialStepsRef, -40)}>Initial Steps and Development</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(5, scrollY)} onClick={() => scrollToElementWithOffset(innovationCollabRef, -40)}>Innovation and Collaboration</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(6, scrollY)} onClick={() => scrollToElementWithOffset(futureGoalsRef, -40)}>Future Goals</button>
      <button className={"about-guide-button about-guide-subtitle " + determineGuideStyle(7, scrollY)} onClick={() => scrollToElementWithOffset(callToActionRef, -40)}>Call to Action</button>
      <button className={"about-guide-button " + determineGuideStyle(8, scrollY)} onClick={() => scrollToElementWithOffset(researchRef, -40)}>Research</button>
      <button className={"about-guide-button " + determineGuideStyle(9, scrollY)} onClick={() => scrollToElementWithOffset(collaborationsRef, -40)}>Collaborations</button>
    </div>
    <div className="about-guide-mobile" style={{ visibility: scrollY < 65 && !isMobile ? "collapse" : "visible", position: scrollY < 65 ? "absolute" : "fixed", top: scrollY < 65 ? "5px" : "0", justifyContent: !isMobile && "center", paddingLeft: !isMobile && "0" }}>
      {scrollY >= 65 && !isMobile && <div className="about-guide-mobile-title">► {section}</div>}
      {isMobile && <button className={"about-guide-mobile-button " + determineMobile(ourStoryRef, researchRef)} onClick={() => scrollToElementWithOffset(ourStoryRef, -40)}>1. Our Story</button>}
      {isMobile && <button className={"about-guide-mobile-button " + determineMobile(researchRef, collaborationsRef)} onClick={() => scrollToElementWithOffset(researchRef, -40)}>2. Research</button>}
      {isMobile && <button className={"about-guide-mobile-button " + determineMobile(collaborationsRef, null)} onClick={() => scrollToElementWithOffset(collaborationsRef, -40)}>3. Collaborations</button>}
    </div>
    <div className="about-title about-first" ref={ourStoryRef}>Our Story</div>
    <div className="about-subtitle" ref={innovateRef}>Innovate, Connect, Empower</div>
    <div className="about-text about-quote">“The future of human work is in specific domain expertise. Understanding the challenges and then using autonomously intelligent technology to help us provide solutions.”</div>
    <div className="about-text about-jensen">- Jensen Huang</div>
    <div className="about-text">Our journey starts with recognizing the vital role of domain experts in guiding AI to solve real-world problems. In many sectors, experts see the potential of existing technologies if adapted correctly. Instead of waiting for these changes to happen, we took action to create practical AI-driven tools. We saw an opportunity to make AI beneficial for those with fewer resources by helping them share their stories more effectively.</div>
    <img className="about-img" src="img1.jpg" />
    <div className="about-subtitle" ref={identifyingProblemRef}>Identifying the Problem</div>
    <div className="about-text">Many AI innovations are not addressing the needs of underrepresented communities. Specifically, we identified a few key problems to address:</div>
    <div className="about-text"><span className="about-text-underline">Repetitive Storytelling:</span> Clients expend valuable time and energy recounting their experiences to multiple individuals involved in their case, resulting in fatigue and the omission of important details.</div>
    <div className="about-text"><span className="about-text-underline">Limited Options:</span> Time constraints force clients to accept less optimal choices.</div>
    <div className="about-text"><span className="about-text-underline">Document Complexity:</span> The complex nature of many documents renders them difficult for clients to comprehend.</div>
    <div className="about-text"><span className="about-text-underline">Language Barriers:</span> These barriers pose substantial challenges to accessing legal services.</div>
    <img className="about-img" src="img2.jpg" />
    <div className="about-subtitle" ref={missionVisionRef}>Mission and Vision</div>
    <div className="about-text">Our mission is to innovate, connect, and empower by creating AI solutions that are advanced, accessible, and socially responsible. We envision a platform that prioritizes user safety and confidentiality.</div>
    <div className="about-subtitle" ref={initialStepsRef}>Initial Steps and Development</div>
    <div className="about-text">We began with research to understand our audience"s needs. This led to the development of our mobile app, which in its first phase, offers essential services that will be expanded over time. Currently, the app is in the MVP stage with plans to add more features to make a beta version available to our collaborators for testing. This approach combines AI technology with human expertise to ensure accuracy and reliability.</div>
    <div className="about-subtitle" ref={innovationCollabRef}>Innovation and Collaboration</div>
    <div className="about-text">We believe in the power of collaboration. By working with partners, we ensure our solutions are grounded in real-world needs. User privacy and safety are central to our development process, and we are committed to maintaining the highest ethical standards.</div>
    <div className="about-subtitle" ref={futureGoalsRef}>Future Goals</div>
    <div className="about-text">Looking ahead, we plan to scale our services and introduce new features that will further empower our users. Our goal is to continuously innovate and improve, making our platform a trusted resource for communities around the world.</div>
    <div className="about-subtitle" ref={callToActionRef}>Call to Action</div>
    <div className="about-text">Join us on this journey. Whether you’re a potential user, a collaborator, or simply someone who believes in our mission, we welcome you. Together, we can innovate, connect, and empower.</div>
    <div className="about-title" ref={researchRef}>Research</div>  
    <div className="about-text">We are committed to research and innovation to better serve our community and service providers. We're developing a mobile app that uses AI to create practical solutions, prioritizing user safety, confidentiality, and ethical use of emerging technologies.</div>
    <div className="about-text">Our key initiatives include:</div>
    <div className="about-text"><span className="about-text-underline">User-Centric Design:</span> Ensuring our app is intuitive and accessible to all users, regardless of their tech proficiency.</div>
    <div className="about-text"><span className="about-text-underline">Continuous Improvement:</span> Regularly updating our technology and practices based on user feedback and advancements in the field.</div>
    <div className="about-text"><span className="about-text-underline">Community Engagement:</span> Actively involving our community in the development process to ensure the app meets real-world needs.</div>
    <div className="about-text"><span className="about-text-underline">Educational Resources:</span> Providing users with resources and support to help them make the most of our technology.</div>
    <div className="about-text">We believe that by integrating these elements, we can create a more inclusive, effective, and secure platform for all.  More detailed information about the application will be available soon.</div>
    <img className="about-img" src="img3.jpg" />
    <div className="about-title" ref={collaborationsRef}>Collaborations</div>
    <div className="about-text">We proudly collaborate with American University, which supports our research efforts and contributes to the development of our mobile app by providing access to their extensive resources, including faculty expertise, and technical support. Additionally, we are working with non-profits and private attorneys who offer expert legal guidance, help expand our translation and interpretation services, and provide valuable app usability feedback, which we use to better understand their communities and address their needs.</div>
    <div className="about-text">In these early stages, we plan to collaborate with more organizations and professionals who share our vision of making services more accessible and understandable for everyone through the use of emerging technology. Understanding the importance of privacy, safety, and user empowerment, we are dedicated to ensuring these core values are at the forefront of our initiatives.</div>
    <div className="about-text">Interested in partnering or collaborating with us? Reach out at <span className="about-text-underline">collaborations@linklegals.com</span>.</div>
    <img className="about-img-au about-last" src="au.png" />
  </div>
  )
}

const Services = ({ isMobile, showMenu }) => {
  return(
  <div className="page" style={{ overflow: showMenu && isMobile ? "hidden" : "auto", height: showMenu && isMobile ? "calc(100vh - 60px)" : "auto" }}>
    <div className="about-title about-first">Services</div>
    <div className="about-text">As we develop our mobile application, our project begins with two services, translations for USCIS-related documents and interpretation services for USCIS interviews in select field offices. Explore our services below to learn more about how we can assist you.</div>
    <div className="about-subtitle">Translations</div>
    <div className="about-subtitle-2">Accurate and Timely Document Translation Services</div>
    <img className="about-img" src="img4.jpg" />
    <div className="about-text">Translations to help you navigate your document needs. Our expert translators ensure precision and cultural sensitivity. Our services include:</div>
    <div className="about-text"><span className="about-text-underline">Certified Translations:</span> All documents are translated and certified by professionals.</div>
    <div className="about-text"><span className="about-text-underline">Quick Turnaround:</span> We prioritize timely delivery without compromising quality.</div>
    <div className="about-text"><span className="about-text-underline">Multilingual Support:</span> Translations available in multiple languages, tailored to your specific needs.</div>
    <div className="about-text">For a quote, click here or email us at <span className="about-text-underline">translations@LinkLegals.com</span>. We're ready to assist you with all your translation needs!</div>
    <div className="about-subtitle">Interpretations</div>
    <div className="about-subtitle-2">Interpretation Services for USCIS interviews</div>
    <img className="about-img" src="img5.jpg" />
    <div className="about-text">At LinkLegals, we understand how important clear communication is during your USCIS interviews. Currently, we offer interpretation services for USCIS interviews in the Baltimore and Fairfax Field Offices, with plans to expand our reach. To help you feel confident and prepared, our services include:</div>
    <div className="about-text"><span className="about-text-underline">Pre-Interview Practice:</span> Sessions to cover what to expect, personal questions, and civic exam practice, ensuring readiness for every aspect of the interview process.</div>
    <div className="about-text services-last">For more information, email us at <span className="about-text-underline">interpretation@LinkLegals.com</span>. We're here to support you every step of the way!</div>
  </div>
  )
}

const Contact = ({ isMobile, showMenu }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid."
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required."
    if (!formData.message.trim()) newErrors.message = "Message is required."
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data Submitted:", formData)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    } else {
      setErrors(validationErrors)
    }
  }

  return (
  <div className="page" style={{ overflow: showMenu && isMobile ? "hidden" : "auto", height: showMenu && isMobile ? "calc(100vh - 60px)" : "auto" }}>
    <div className="about-title about-first">Contact</div>
    <div className="about-text">We are here to help and look forward to connecting with you! Please find the appropriate contact information below for your specific needs.</div>
    <div className="about-text"><span className="about-text-bold">General Inquiries:</span> For general questions or information about our services, please email us at: <span className="about-text-underline">info@LinkLegals.com</span></div>
    <div className="about-text"><span className="about-text-bold">Customer Support:</span> If you need assistance with our services, contact us at: <span className="about-text-underline">support@linklegals.com</span></div>
    <div className="about-text"><span className="about-text-bold">Partnership and Collaboration:</span> Interested in partnering or collaborating with us? Reach out to our collaboration team at: <span className="about-text-underline">collaborations@linklegals.com</span></div>
    <div className="about-text"><span className="about-text-bold">Media and Press Inquiries:</span> For media and press inquiries, please contact our media relations team: <span className="about-text-underline">press@linklegals.com</span></div>
    <div className="about-text">You can also use our contact form on this page. We look forward to connecting with you!</div>
    <form className="contact-form services-last" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "input-error" : ""} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? "input-error" : ""} />
          {errors.subject && <span className="error">{errors.subject}</span>}
      </div>
      <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "input-error" : ""}>
          </textarea>
          {errors.message && <span className="error">{errors.message}</span>}
      </div>
      <button type="submit" className="submit-button">Submit</button>
      {isSubmitted && (
        <div className="success-message">
          <h2>Thank you for contacting us!</h2>
          <p>We have received your message and will get back to you shortly.</p>
        </div>
      )}
    </form>
  </div>
  )
}

const BuildYourCase = ({ isMobile, showMenu }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isLoadingReply, setIsLoadingReply] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showStartText, setShowStartText] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const sentMessageRef = useRef(null)

  const onChatAccessClicked = async () => {
    setLoggedIn(true)
    setShowStartText(true)
  }

  const latexPrompt = `Convert the previous answer into a complete, standalone LaTeX document. Provide only the LaTeX code without any additional text, explanations, or comments. Ensure the response includes:
    1. A \\documentclass declaration (use article class unless specified otherwise).
    2. All necessary packages (e.g., \\usepackage{geometry}, \\usepackage{amsmath}, etc.).
    3. Proper document structure with \\begin{document} and \\end{document}.
    4. Proper formatting for text, headings, lists, tables, or any other elements present in the answer.
    5. No additional text like "Here is your LaTeX code" or "Copy and paste this into Overleaf"—just the raw LaTeX code.`

  function createMultilineMessages(text) {
    const lines = text.split("\n")
    const nonEmptyLines = lines.filter((line) => line.trim() !== "")
    return nonEmptyLines.map((line) => ({
      text: line,
      side: "left",
      id: Date.now() + Math.random(),
    }))
  }
  
  const renderBoldText = (text) => {
    const parts = text.split(/(\*{1,2}[^*]+?\*{1,2})/g)
    return parts.map((part, index) => {
      const match = part.match(/^(\*{1,2})([^*]+)\1$/)
      if (match) {
        return <strong className="text-bold" key={index}>{match[2]}</strong>
      }
      return <span key={index}>{part}</span>
    })
  }
  
  const renderFormattedText = (text) => {
    if (text.startsWith("####")) {
      return (
        <div className="text-subtitle">
          {renderBoldText(text.slice(4).trim())}
        </div>
      )
    } else if (text.startsWith("###")) {
      return (
        <div className="text-title">
          {renderBoldText(text.slice(3).trim())}
        </div>
      )
    } else if (/^\d+\./.test(text)) {
      return (
        <div className="text-list-item">
          <div>{renderBoldText(text)}</div>
        </div>
      )
    }
    return renderBoldText(text)
  }

  const sendMessage = async (messageText) => {
    if (!loggedIn || !messageText.trim()) return
    setShowStartText(false)
    const newMessage = { text: messageText, side: "right", id: Date.now() }
    const loadingMessage = { text: "", side: "left", id: Date.now() + 1, isLoading: true }
    setMessages((prev) => [...prev, newMessage, loadingMessage])
    setInputValue("")
    setIsLoadingReply(true)
    try {
      const conversationForApi = [
        ...messages
          .filter((m) => !m.isLoading)
          .map((m) => ({
            role: m.side === "right" ? "user" : "assistant",
            content: m.text,
          })),
        { role: "user", content: messageText }
      ]
      const response = await fetch(serverUrl + "message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: conversationForApi })
      })
      const data = await response.json()
      setMessages((prevMessages) => prevMessages.filter((m) => m.id !== loadingMessage.id))
      const serverReplyText = data.reply || ""
      const multilineMessages = createMultilineMessages(serverReplyText)
      setMessages((prevMessages) => [...prevMessages, ...multilineMessages])
    } catch (error) {
      console.error("An error occurred while sending the message:", error)
      setMessages((prevMessages) => prevMessages.filter((m) => m.id !== loadingMessage.id))
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Error sending message. Please try again later.",
          side: "left",
          id: Date.now() + Math.random()
        }
      ])
    } finally {
      setIsLoadingReply(false)
    }
  }

  const handleExportCaseAsPDF = async () => {
    if (!loggedIn || isExporting) return
    setIsExporting(true)
    try {
      const conversationForExport = [
        ...messages
          .filter((m) => !m.isLoading)
          .map((m) => ({
            role: m.side === "right" ? "user" : "assistant",
            content: m.text,
          })),
        { role: "user", content: latexPrompt }
      ]
      const response = await fetch(serverUrl + "message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: conversationForExport })
      })
      const data = await response.json()
      let latexResponse = data.reply || ""
      if (latexResponse.startsWith("```latex")) {
        latexResponse = latexResponse.slice(8)
      }
      if (latexResponse.endsWith("```")) {
        latexResponse = latexResponse.slice(0, -3)
      }
      const pdfResponse = await fetch(serverUrl + "compile-latex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex: latexResponse })
      })
      if (!pdfResponse.ok) throw new Error("Failed to compile LaTeX to PDF")
      const pdfBlob = await pdfResponse.blob()
      const url = window.URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = "document.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setTimeout(() => {
        setIsExporting(false)
      }, 3000)
    }
  }

  useEffect(() => {
    if (sentMessageRef.current) {
      sentMessageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
  <div
    className="page"
    style={{
      overflow: showMenu && isMobile ? "hidden" : "auto",
      height: showMenu && isMobile ? "calc(100vh - 60px)" : "auto"
    }}>
    {!loggedIn && (
      <div className="chat-access-wrapper">
        <div className="chat-access">
          <div className="chat-access-title">Enter access key</div>
          <input className="chat-access-input" placeholder="" />
          <button className="chat-access-button" onClick={onChatAccessClicked}>Start</button>
        </div>
      </div>
    )}
    <div className="chat">
      {messages.map((message, index) => {
        const isLastRightMessage = message.side === "right" && index === messages.length - 2
        return (
          <div
            key={message.id}
            ref={isLastRightMessage ? sentMessageRef : null}
            className={`${message.side === "right" ? "chat-message-right" : "chat-message-left"} ${message.type === "title" ? "chat-message-title" : ""} ${message.type === "bullet" ? "chat-message-bullet" : ""}`}>
            {message.isLoading ? (<div className="loading-spinner"></div>) : (renderFormattedText(message.text))}
          </div>
        )
      })}
    </div>
    <div className="chat-input">
      <input
        className="chat-input-text"
        type="text"
        placeholder="Message Q..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)} />
      <div className="chat-bottom">
        <button
          className="chat-send-button chat-export-button"
          onClick={handleExportCaseAsPDF}
          disabled={isExporting}>
          {isExporting ? (<SyncLoader className="loader" size={8} color="#ffffff" />) : ("Export case as PDF")}
        </button>
        <button className="chat-send-button" onClick={() => sendMessage(inputValue)}>SEND</button>
      </div>
      {showStartText && (<div className="chat-start-text">Let's get started building your case. What do you need help with?</div>)}
    </div>
  </div>
  )
}

const BackgroundGradient = () => {
    const location = useLocation()
    return <>
        <div className="background-gradient" style={{ height: location.pathname === "/" ? "100vh" : "5px", top: location.pathname === "/" ? "0" : "60px", zIndex: location.pathname === "/" ? "-1" : "2" }} />
    </>
}

const App = () => {
  const [showMenu, setShowMenu] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1050)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1050)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }, [isMobile])

  const onLinkClick = () => {
    if (isMobile) {
      setShowMenu(false)
    }
  }

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent) && !isMobile
    setIsSafari(isSafariBrowser)
  }, [isMobile])

  return (
  <>
  {!isSafari || isMobile ? <Router>
    <div className="app">
    <BackgroundGradient />
      <nav>
        <div className="nav-content">
          <img className="logo" src="logo.png" />
          {showMenu ? <div className="nav-right">
            <Link to="/" onClick={onLinkClick} className="nav-button">Home</Link>
            <Link to="/about" onClick={onLinkClick} className="nav-button">About</Link>
            <Link to="/services" onClick={onLinkClick} className="nav-button">Services</Link>
            <Link to="/contact" onClick={onLinkClick} className="nav-button">Contact</Link>
            <Link to="/buid-your-case" onClick={onLinkClick} className="nav-button">Build Your Case</Link>
            <div className="nav-right-background" />
          </div> : null}
          <button className="menu" onClick={() => setShowMenu(!showMenu)}>
            <img className="menu-icon" src="menu.png" />
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About isMobile={isMobile} showMenu={showMenu} scrollY={scrollY} />} />
        <Route path="/services" element={<Services isMobile={isMobile} showMenu={showMenu} />} />
        <Route path="/contact" element={<Contact isMobile={isMobile} showMenu={showMenu} />} />
        <Route path="/buid-your-case" element={<BuildYourCase isMobile={isMobile} showMenu={showMenu} />} />
      </Routes>
    </div>
  </Router> : <div>This website doesn't work on Safari. Try using Google Chrome.</div>}
  </>
  )
}

export default App