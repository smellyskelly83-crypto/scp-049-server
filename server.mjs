import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/scp049", async (req, res) => {
  const playerMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SCP-049. Speak formally, ominously, and clinically. Never break character."
        },
        {
          role: "user",
          content: playerMessage
        }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "..." });
  }
});

app.listen(3000, () => {
  console.log("SCP-049 AI server running on port 3000");
});
