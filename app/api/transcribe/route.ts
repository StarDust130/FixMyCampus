import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });

    const groq = new Groq({ apiKey });
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json(
        { error: "No audio file found" },
        { status: 400 }
      );

    // Groq requires a file-like object. The 'File' from formData works in Next.js 14+
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3-turbo",
      temperature: 0,
      response_format: "verbose_json",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Transcription Error:", error);
    return NextResponse.json(
      { error: "Transcription failed" },
      { status: 500 }
    );
  }
}
