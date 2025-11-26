"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Building2, DollarSign, User, FileWarning, ExternalLink, TrendingUp } from "lucide-react"

interface ClientDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: {
    name: string
    email: string
    industry: string
    staff: string
    staffAvatar: string
    status: string
    missingDocs: number
    revenue?: string
    closeProgress?: number
  } | null
}

export function ClientDetailsModal({ open, onOpenChange, client }: ClientDetailsModalProps) {
  if (!client) return null

  const missingDocuments = [
    "Q3 Bank Statements",
    "October Payroll Summary",
    "Vendor Invoices (Nov)",
    "Updated Insurance Certificate",
    "W-9 Form for New Vendor",
  ].slice(0, client.missingDocs)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
          <DialogDescription>Overview of {client.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{client.name}</h3>
              <p className="text-sm text-muted-foreground">{client.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">{client.industry}</Badge>
                <Badge
                  variant="secondary"
                  className={`${
                    client.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : client.status === "in-progress"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-secondary"
                  }`}
                >
                  {client.status.replace("-", " ")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">Monthly Revenue</span>
              </div>
              <p className="mt-1 text-lg font-semibold">{client.revenue || "$45,000"}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-xs">Assigned Staff</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{client.staffAvatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{client.staff}</span>
              </div>
            </div>
          </div>

          {/* Monthly Close Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monthly Close Progress</span>
              <span className="text-sm text-muted-foreground">{client.closeProgress || 67}%</span>
            </div>
            <Progress value={client.closeProgress || 67} className="h-2" />
          </div>

          {/* Missing Documents */}
          {client.missingDocs > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileWarning className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Missing Documents ({client.missingDocs})</span>
              </div>
              <div className="space-y-1">
                {missingDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              View Dashboard
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <TrendingUp className="h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
