"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, FileWarning, Lightbulb, Upload, ExternalLink, ChevronRight } from "lucide-react"

const alertGroups = [
  {
    category: "Documents Needed",
    icon: FileWarning,
    iconColor: "text-amber-500",
    alerts: [
      { id: 1, title: "Missing Q3 Bank Statements", date: "Due in 3 days", priority: "high", action: "Upload now" },
      { id: 2, title: "W-9 Form Required", date: "Due in 2 weeks", priority: "low", action: "Upload now" },
    ],
  },
  {
    category: "Deadlines",
    icon: Clock,
    iconColor: "text-red-500",
    alerts: [{ id: 3, title: "Tax Filing Deadline", date: "Oct 15, 2025", priority: "high", action: "View details" }],
  },
  {
    category: "Recommendations",
    icon: Lightbulb,
    iconColor: "text-blue-500",
    alerts: [
      {
        id: 4,
        title: "Consider quarterly tax payments",
        date: "Based on your income",
        priority: "medium",
        action: "Learn more",
      },
    ],
  },
]

interface AlertsListProps {
  onUploadClick?: () => void
}

export function AlertsList({ onUploadClick }: AlertsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Attention Needed
          <Badge variant="secondary" className="ml-auto">
            4 items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {alertGroups.map((group) => (
          <div key={group.category}>
            {/* Category Header */}
            <div className="mb-2 flex items-center gap-2">
              <group.icon className={`h-4 w-4 ${group.iconColor}`} />
              <span className="text-sm font-medium text-muted-foreground">{group.category}</span>
            </div>
            {/* Alerts */}
            <div className="space-y-2">
              {group.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.date}</p>
                  </div>
                  <Badge
                    variant={
                      alert.priority === "high" ? "destructive" : alert.priority === "medium" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {alert.priority}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={alert.action === "Upload now" ? onUploadClick : undefined}
                  >
                    {alert.action === "Upload now" && <Upload className="h-3 w-3" />}
                    {alert.action === "View details" && <ExternalLink className="h-3 w-3" />}
                    {alert.action === "Learn more" && <ChevronRight className="h-3 w-3" />}
                    <span className="text-xs">{alert.action}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function AlertsListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded bg-muted" />
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-5 w-16 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
