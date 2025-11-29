import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey)
      return NextResponse.json(
        { error: "Server Configuration Error" },
        { status: 500 }
      );

    const groq = new Groq({ apiKey });
    const { imageBase64 } = await req.json();

    // 1. Validate Image
    if (!imageBase64)
      return NextResponse.json({ error: "No image provided" }, { status: 400 });

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    // 2. Call Groq (UPDATED MODEL)
    const completion = await groq.chat.completions.create({
      model: "llama-3.2-90b-vision-preview", // Fixed decommissioned model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image for a facility report. Return a raw JSON object (no markdown) with keys: 'title' (short string), 'description' (string), 'category' (one of: Furniture, Electrical, Plumbing, Cleaning, Network, Other). If unsure, guess the best category.",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Data}` },
            },
          ],
        },
      ],
      temperature: 0.1,
      max_completion_tokens: 1024,
      response_format: { type: "json_object" },
    });

    // 3. Parse Response safely
    const content = completion.choices[0].message.content;
    const result = JSON.parse(content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Vision Error:", error);
    return NextResponse.json(
      { error: "AI Service Unavailable" },
      { status: 500 }
    );
  }
}
