"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Upload, ArrowRight } from "lucide-react"

interface EmptyStateProps {
  onUploadClick?: () => void
}

export function DashboardEmptyState({ onUploadClick }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <BarChart3 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-6 text-lg font-semibold">Welcome to Your Dashboard</h3>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          {
            "Once your accounting team processes your first month's data, you'll see your financial snapshot, alerts, and insights here."
          }
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={onUploadClick}>
            <Upload className="h-4 w-4" />
            Upload Your First Document
          </Button>
          <Button className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 grid max-w-lg grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-muted-foreground">1</p>
            <p className="text-xs text-muted-foreground">Upload documents</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">2</p>
            <p className="text-xs text-muted-foreground">We process them</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">3</p>
            <p className="text-xs text-muted-foreground">View your insights</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
