"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Phone, FileText, Download, HelpCircle, MessageSquare } from "lucide-react"

interface QuickActionsProps {
  onUploadClick?: () => void
  onScheduleClick?: () => void
  onDownloadClick?: () => void
}

const actions = [
  {
    id: "upload",
    icon: Upload,
    title: "Upload Document",
    description: "Share files with your team",
    action: "onUploadClick",
  },
  {
    id: "schedule",
    icon: Phone,
    title: "Schedule Call",
    description: "Book a consultation",
    action: "onScheduleClick",
  },
  {
    id: "download",
    icon: Download,
    title: "Download Report",
    description: "Get your financial summary",
    action: "onDownloadClick",
  },
  {
    id: "monthly-close",
    icon: FileText,
    title: "View Monthly Close",
    description: "Track closing progress",
    href: "/monthly-close",
  },
  {
    id: "help",
    icon: HelpCircle,
    title: "Help Center",
    description: "FAQs and guides",
    href: "#",
  },
  {
    id: "message",
    icon: MessageSquare,
    title: "Send Message",
    description: "Contact your accountant",
    href: "#",
  },
]

export function QuickActions({ onUploadClick, onScheduleClick, onDownloadClick }: QuickActionsProps) {
  const handleClick = (action?: string) => {
    if (action === "onUploadClick") onUploadClick?.()
    if (action === "onScheduleClick") onScheduleClick?.()
    if (action === "onDownloadClick") onDownloadClick?.()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Common tasks at your fingertips</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="group flex h-auto flex-col items-center gap-2 bg-transparent p-4 transition-all hover:bg-secondary hover:shadow-sm"
              onClick={() => handleClick(action.action)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/10">
                <action.icon className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-center">
                <span className="block text-xs font-medium">{action.title}</span>
                <span className="block text-[10px] text-muted-foreground">{action.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
