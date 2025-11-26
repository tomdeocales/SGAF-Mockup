"use client"

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Loader2,
  RotateCcw,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react"
import type { AiInsightsPayload, AiInsightsResponse } from "@/lib/ai-insights"

function SectionCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3 shadow-sm">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h4>
      <div className="mt-2 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="space-y-2 rounded-lg border border-border/70 p-3 shadow-sm">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
        </div>
      ))}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Generating insights...
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-center">
      <Sparkles className="mb-3 h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">No insights available yet.</p>
      <p className="text-xs text-muted-foreground">Generate a fresh summary to see AI-driven explanations.</p>
    </div>
  )
}

function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  return (
    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 text-destructive" />
        <div className="space-y-1">
          <p className="font-medium text-destructive">AI service unavailable</p>
          <p className="text-muted-foreground">
            {message || "We couldn&apos;t generate insights right now. Please retry in a moment."}
          </p>
          <div className="flex gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={onRetry}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            <Button variant="ghost" size="sm">
              View system status
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AiInsightsPanel({
  open,
  onOpenChange,
  metrics,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  metrics: AiInsightsPayload
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "empty" | "error">("idle")
  const [insights, setInsights] = useState<AiInsightsResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle")

  const statusLabel = useMemo(() => {
    if (status === "loading") return "Generating..."
    if (status === "error") return "Temporarily unavailable"
    if (status === "empty") return "No insights yet"
    return "Updated just now • Groq Llama 3"
  }, [status])

  const keyChanges = insights?.keyChanges?.length ? insights.keyChanges : metrics.keyChanges ?? []
  const recommendations = insights?.recommendations?.length
    ? insights.recommendations
    : metrics.recommendations ?? []
  const alerts = insights?.alerts?.length ? insights.alerts : metrics.alerts ?? []

  const fetchInsights = useCallback(async () => {
    setStatus("loading")
    setErrorMessage(null)
    try {
      const response = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metrics),
      })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        const message = body?.error ?? "Failed to generate insights"
        throw new Error(message)
      }
      const json = (await response.json()) as { data?: AiInsightsResponse }
      if (!json.data) {
        setStatus("empty")
        setInsights(null)
        return
      }
      setInsights(json.data)
      const hasContent =
        json.data.summary ||
        json.data.keyChanges?.length ||
        json.data.alerts?.length ||
        json.data.recommendations?.length
      setStatus(hasContent ? "ready" : "empty")
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unable to generate insights")
    }
  }, [metrics])

  useEffect(() => {
    if (open) {
      setCopyState("idle")
      if (status === "idle") {
        void fetchInsights()
      }
    } else {
      setStatus("idle")
      setInsights(null)
      setErrorMessage(null)
      setCopyState("idle")
    }
  }, [open, status, fetchInsights])

  const handleCopy = async () => {
    if (!insights) return
    const text = [
      "AI Financial Insights",
      `Summary: ${insights.summary}`,
      `Key Changes: ${insights.keyChanges?.join("; ")}`,
      `Alerts: ${insights.alerts?.join("; ")}`,
      `Recommendations: ${insights.recommendations?.join("; ")}`,
    ]
      .filter(Boolean)
      .join("\n")
    try {
      await navigator.clipboard.writeText(text)
      setCopyState("copied")
      setTimeout(() => setCopyState("idle"), 2000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to copy insights")
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right" dismissible>
      <DrawerContent className="sm:max-w-xl border-l shadow-2xl">
        <div className="flex h-full flex-col">
          <DrawerHeader className="flex flex-row items-start justify-between gap-3 border-b pb-4">
            <div>
              <DrawerTitle className="text-xl font-semibold">AI Financial Insights</DrawerTitle>
              <DrawerDescription>
                Generated by AI to help you understand your monthly financial performance.
              </DrawerDescription>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {statusLabel}
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
            {status === "loading" && <LoadingState />}
            {status === "empty" && <EmptyState />}
            {status === "error" && (
              <ErrorState onRetry={() => void fetchInsights()} message={errorMessage ?? undefined} />
            )}

            {status === "ready" && (
              <div className="space-y-4">
                <SectionCard title="Summary">
                  <p className="text-foreground">
                    {insights?.summary ||
                      "Your revenue increased by 11% this month, driven by higher service volume. Expenses remained steady, improving net profit by ₱82,400."}
                  </p>
                </SectionCard>

                {!!keyChanges.length && (
                  <SectionCard title="Key Changes">
                    <div className="grid gap-2">
                      {keyChanges.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/70 p-3 shadow-sm"
                        >
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                            {item.toLowerCase().includes("increase") || item.includes("%") ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                          </div>
                          <p className="text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}

                {!!alerts.length && (
                  <SectionCard title="Alerts & Warnings">
                    <div className="space-y-2">
                      {alerts.map((alert) => (
                        <div key={alert} className="flex items-start gap-2">
                          <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                            <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                            Alert
                          </Badge>
                          <p className="text-foreground">{alert}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}

                {!!recommendations.length && (
                  <SectionCard title="AI Recommendations">
                    <div className="space-y-2">
                      {recommendations.map((rec) => (
                        <div key={rec} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                          <p className="text-foreground">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}
              </div>
            )}
          </div>

          <DrawerFooter className="border-t bg-background">
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => void fetchInsights()}
                disabled={status === "loading"}
                size="sm"
              >
                <RotateCcw className="h-4 w-4" />
                {status === "loading" ? "Refreshing..." : "Refresh AI Summary"}
              </Button>
              <Button
                variant="secondary"
                className="w-full gap-2"
                disabled={!insights || status !== "ready"}
                onClick={() => void handleCopy()}
                size="sm"
              >
                <Copy className="h-4 w-4" />
                {copyState === "copied" ? "Copied!" : "Copy Insights"}
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full gap-2" size="sm">
                  Close Panel
                </Button>
              </DrawerClose>
            </div>
            <Separator className="sm:hidden" />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
