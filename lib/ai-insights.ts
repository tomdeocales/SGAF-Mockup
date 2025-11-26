export type AiInsightMetric = {
  key: string
  name: string
  value: number
  currency?: string
  changePct?: number
  status?: "on-track" | "needs-attention" | "at-risk" | "neutral"
  note?: string
}

export type AiInsightsPayload = {
  periodLabel: string
  kpis: AiInsightMetric[]
  alerts?: string[]
  keyChanges?: string[]
  recommendations?: string[]
}

export type AiInsightsResponse = {
  summary: string
  keyChanges: string[]
  alerts: string[]
  recommendations: string[]
}
