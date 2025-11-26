"use client"

import { useState } from "react"
import { User, Mail, Phone, Building2, Lock, Camera } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface AccountSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountSettingsModal({ open, onOpenChange }: AccountSettingsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    company: "Acme Corporation",
  })

  const handleSave = () => {
    setIsEditing(false)
    // In real app, save to backend
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>Manage your account information and preferences</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Photo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/professional-man.jpg" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full">
                <Camera className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div>
              <p className="font-medium">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-sm text-muted-foreground">Client Account</p>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Personal Information</h4>
              <Button variant="ghost" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="company" value={formData.company} disabled className="pl-9 bg-muted" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Security */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Security</h4>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
