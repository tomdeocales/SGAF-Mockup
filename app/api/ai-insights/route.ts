import { NextResponse } from "next/server"
import type { AiInsightsPayload, AiInsightsResponse } from "@/lib/ai-insights"

type GroqChatResponse = {
  choices?: { message?: { content?: string | null } }[]
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured" },
      { status: 500 },
    )
  }

  let payload: AiInsightsPayload | undefined
  try {
    payload = (await req.json()) as AiInsightsPayload
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body", details: String(error) },
      { status: 400 },
    )
  }

  if (!payload?.kpis?.length) {
    return NextResponse.json(
      { error: "Missing metrics to analyze" },
      { status: 400 },
    )
  }

  const systemPrompt =
    "You are an AI CFO assistant. Turn client finance metrics into a concise, plain-English summary. " +
    "Return short bullets that help a business owner grasp performance quickly. Keep currency symbols from the input."

  const userPrompt = [
    `Period: ${payload.periodLabel}`,
    `KPIs: ${payload.kpis
      .map(
        (kpi) =>
          `${kpi.name}: ${kpi.currency ?? ""}${kpi.value} (change: ${
            kpi.changePct !== undefined ? `${kpi.changePct}%` : "n/a"
          }, status: ${kpi.status ?? "n/a"} ${kpi.note ? `note: ${kpi.note}` : ""})`,
      )
      .join("; ")}`,
    payload.keyChanges?.length
      ? `Key changes hints: ${payload.keyChanges.join(" | ")}`
      : "Key changes hints: none provided.",
    payload.alerts?.length ? `Alerts: ${payload.alerts.join(" | ")}` : "Alerts: none provided.",
    payload.recommendations?.length
      ? `Recommendations hints: ${payload.recommendations.join(" | ")}`
      : "Recommendations hints: none provided.",
    "Please output strict JSON with fields: summary (string), keyChanges (string[]), alerts (string[]), recommendations (string[]).",
  ].join("\n")

  const groqRequest = {
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 400,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(groqRequest),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Groq API error", response.status, errorText)
      return NextResponse.json(
        { error: `Groq request failed (${response.status})`, details: errorText },
        { status: 500 },
      )
    }

    const data = (await response.json()) as GroqChatResponse
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      console.error("Groq API empty content", JSON.stringify(data))
      return NextResponse.json(
        { error: "No content returned from Groq" },
        { status: 500 },
      )
    }

    let parsed: AiInsightsResponse | null = null
    try {
      parsed = JSON.parse(content) as AiInsightsResponse
    } catch (error) {
      console.error("Groq JSON parse error", error, "raw:", content)
      return NextResponse.json(
        { error: "Failed to parse Groq response JSON", details: String(error), raw: content },
        { status: 500 },
      )
    }

    return NextResponse.json({ data: parsed satisfies AiInsightsResponse })
  } catch (error) {
    console.error("Unexpected Groq error", error)
    return NextResponse.json(
      { error: "Unexpected error calling Groq", details: String(error) },
      { status: 500 },
    )
  }
}
