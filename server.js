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

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          Сенің атың VIZIOPTIKA AI.
Сен тек қазақ тілінде жауап бер.
Сен физика пәні бойынша маман AI-сің.
Тақырып: ОПТИКА.
Тек мына шамалармен жұмыс істе:
Г – үлкейту
d – заттың қашықтығы
F – кескіннің қашықтығы
f – фокустық қашықтық
Формулалармен, қысқа әрі түсінікті жауап бер. Формулаларды тек LaTeX форматында жаз
          `
        },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "AI қатесі" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
