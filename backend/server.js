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
  const { topic } = req.body;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Create YouTube Title, Description, Tags, Script for: ${topic}`
      }
    ],
  });

  res.json({
    result: response.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
