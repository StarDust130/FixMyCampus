import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server Error: Missing API Key" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });
    const { imageBase64 } = await req.json();

    // Clean base64 string
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const completion = await groq.chat.completions.create({
      // FIXED: Switched to the currently supported 90b model
      model: "llama-3.2-90b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image for a facility maintenance report. JSON response only. Keys: 'title' (short, 3-5 words), 'description' (factual observation), 'category' (Furniture, Electrical, Plumbing, Cleaning, Network, Other). If unclear, return null values.",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Data}` },
            },
          ],
        },
      ],
      temperature: 0.1,
      max_completion_tokens: 512,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    const result = JSON.parse(content || "{}");

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
