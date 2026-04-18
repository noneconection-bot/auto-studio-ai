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
        content: `
Create structured YouTube content for topic: "${topic}"

Return STRICT JSON ONLY:

{
"title": "...",
"description": "...",
"tags": "...",
"script": "..."
}
`
      }
    ],
  });

  // AI returns JSON text → parse into object
  const jsonText = response.choices[0].message.content;
  const data = JSON.parse(jsonText);

  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
