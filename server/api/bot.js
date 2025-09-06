const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chatbot endpoint
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Use Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    res.json({
      reply: result.response.text(),
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;