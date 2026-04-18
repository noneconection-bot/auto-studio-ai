import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
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
You are a professional YouTube content generator.
Create FULL structured output:

Title:
Description:
Tags:
Script:

Topic: ${topic}
          `
        }
      ],
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
