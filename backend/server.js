import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a YouTube content creator AI.

Topic: ${topic}

Return STRICT format:

Title: 
Description: 
Tags: 
Script:
          `
        }
      ],
    });

    const text = response.choices[0].message.content;

    res.json({
      result: text
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "AI failed to generate content"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
