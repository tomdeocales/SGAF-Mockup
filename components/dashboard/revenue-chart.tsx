"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts"
import { cn } from "@/lib/utils"

const dataThisMonth = [
  { day: "Week 1", revenue: 18000 },
  { day: "Week 2", revenue: 22000 },
  { day: "Week 3", revenue: 19500 },
  { day: "Week 4", revenue: 26000 },
]

const dataLast3Months = [
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 82000 },
  { month: "Nov", revenue: 85500 },
]

const dataYTD = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 69000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 82000 },
  { month: "Nov", revenue: 85500 },
]

type TimeRange = "this-month" | "last-3-months" | "ytd"

export function RevenueChart() {
  const [range, setRange] = useState<TimeRange>("ytd")

  const getData = () => {
    switch (range) {
      case "this-month":
        return { data: dataThisMonth, xKey: "day" }
      case "last-3-months":
        return { data: dataLast3Months, xKey: "month" }
      case "ytd":
      default:
        return { data: dataYTD, xKey: "month" }
    }
  }

  const { data, xKey } = getData()

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Trend</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Track your revenue over time</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
          {[
            { value: "this-month", label: "This Month" },
            { value: "last-3-months", label: "Last 3 Months" },
            { value: "ytd", label: "YTD" },
          ].map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={() => setRange(option.value as TimeRange)}
              className={cn("text-xs px-3 h-7", range === option.value && "bg-background shadow-sm")}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                labelFormatter={(label) => `Period: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#000000" strokeWidth={2} fill="url(#revenueGradient)" />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#000000"
                strokeWidth={2}
                dot={{ fill: "#000000", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#000000" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function RevenueChartSkeleton() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-48 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-8 w-64 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] items-end justify-between gap-2 px-4">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="w-full animate-pulse rounded-t bg-muted"
              style={{ height: `${Math.random() * 60 + 40}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
