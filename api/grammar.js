export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Check the grammar of this sentence in detail and provide correction + explanation:\n\n${text}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content || "No response from GPT.";

  res.status(200).json({ result });
}
