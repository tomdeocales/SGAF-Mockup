"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Mail, MessageSquare, FileText, CalendarCheck } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface NotificationSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface NotificationSetting {
  id: string
  label: string
  description: string
  icon: React.ElementType
  email: boolean
  push: boolean
}

export function NotificationSettingsModal({ open, onOpenChange }: NotificationSettingsModalProps) {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "documents",
      label: "Document Requests",
      description: "When new documents are requested or uploaded",
      icon: FileText,
      email: true,
      push: true,
    },
    {
      id: "monthly-close",
      label: "Monthly Close Updates",
      description: "Status changes and completion notifications",
      icon: CalendarCheck,
      email: true,
      push: false,
    },
    {
      id: "messages",
      label: "Messages",
      description: "When you receive a new message from your accountant",
      icon: MessageSquare,
      email: true,
      push: true,
    },
    {
      id: "reports",
      label: "Financial Reports",
      description: "When new reports are available for download",
      icon: Bell,
      email: true,
      push: false,
    },
  ])

  const toggleSetting = (id: string, type: "email" | "push") => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, [type]: !s[type] } : s)))
  }

  const handleSave = () => {
    onOpenChange(false)
    // In real app, save to backend
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>Choose how you want to be notified about updates</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header row */}
          <div className="flex items-center justify-end gap-8 px-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              Email
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Bell className="h-3.5 w-3.5" />
              Push
            </div>
          </div>

          <Separator />

          {/* Notification settings */}
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                    <setting.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">{setting.label}</Label>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <Switch checked={setting.email} onCheckedChange={() => toggleSetting(setting.id, "email")} />
                  <Switch checked={setting.push} onCheckedChange={() => toggleSetting(setting.id, "push")} />
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Quick actions */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Email Digest</p>
              <p className="text-xs text-muted-foreground">Receive a weekly summary instead of individual emails</p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
