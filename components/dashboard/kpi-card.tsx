"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  status?: "on-track" | "needs-attention" | "at-risk"
  tooltip?: string
}

export function KpiCard({ title, value, change, changeType = "neutral", icon, status, tooltip }: KpiCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-md hover:border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {tooltip && (
            <div className="group/tooltip relative">
              <Info className="h-3.5 w-3.5 text-muted-foreground/50 cursor-help" />
              <div className="absolute left-0 top-6 z-50 hidden w-48 rounded-lg bg-foreground p-2 text-xs text-background shadow-lg group-hover/tooltip:block">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status && (
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                status === "on-track" && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
                status === "needs-attention" && "bg-amber-100 text-amber-700 hover:bg-amber-100",
                status === "at-risk" && "bg-red-100 text-red-700 hover:bg-red-100",
              )}
            >
              {status === "on-track" && "On Track"}
              {status === "needs-attention" && "Needs Attention"}
              {status === "at-risk" && "At Risk"}
            </Badge>
          )}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {change && (
          <div className="mt-2 flex items-center gap-1.5">
            {changeType === "positive" && <TrendingUp className="h-4 w-4 text-emerald-600" />}
            {changeType === "negative" && <TrendingDown className="h-4 w-4 text-red-600" />}
            {changeType === "neutral" && <Minus className="h-4 w-4 text-muted-foreground" />}
            <p
              className={cn(
                "text-sm",
                changeType === "positive" && "text-emerald-600",
                changeType === "negative" && "text-red-600",
                changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {change}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function KpiCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  )
}
