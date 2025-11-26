"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Clock, Circle, Calendar, MessageSquare } from "lucide-react"

interface StepDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  step: {
    name: string
    status: string
    assignedTo: string
    assignedInitials: string
    lastUpdated: string
    description: string
    notes?: string[]
  } | null
}

export function StepDetailsModal({ open, onOpenChange, step }: StepDetailsModalProps) {
  if (!step) return null

  const statusConfig = {
    completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100", label: "Completed" },
    "in-progress": { icon: Clock, color: "text-amber-500", bg: "bg-amber-100", label: "In Progress" },
    pending: { icon: Circle, color: "text-muted-foreground", bg: "bg-secondary", label: "Pending" },
  }

  const config = statusConfig[step.status as keyof typeof statusConfig] || statusConfig.pending
  const StatusIcon = config.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${config.bg}`}>
              <StatusIcon className={`h-4 w-4 ${config.color}`} />
            </div>
            {step.name}
          </DialogTitle>
          <DialogDescription>Detailed information about this closing step.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status & Assignment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Status</p>
              <Badge variant="secondary" className={`${config.bg} ${config.color.replace("text-", "text-")}`}>
                {config.label}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Assigned To</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{step.assignedInitials}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{step.assignedTo}</span>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Last Updated</p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {step.lastUpdated}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">What This Step Involves</p>
            <p className="rounded-lg bg-secondary/50 p-3 text-sm leading-relaxed">{step.description}</p>
          </div>

          {/* Staff Notes */}
          {step.notes && step.notes.length > 0 && (
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                Staff Notes
              </p>
              <div className="space-y-2">
                {step.notes.map((note, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <p className="text-sm">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
