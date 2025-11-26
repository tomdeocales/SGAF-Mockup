"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Users } from "lucide-react"

interface ReassignStaffModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientName: string
  currentStaff: string
}

const staffMembers = [
  { id: "sarah", name: "Sarah Johnson", initials: "SJ", clients: 12 },
  { id: "mike", name: "Mike Chen", initials: "MC", clients: 8 },
  { id: "david", name: "David Wilson", initials: "DW", clients: 15 },
  { id: "emily", name: "Emily Davis", initials: "ED", clients: 10 },
]

export function ReassignStaffModal({ open, onOpenChange, clientName, currentStaff }: ReassignStaffModalProps) {
  const [selectedStaff, setSelectedStaff] = useState("")
  const [isReassigning, setIsReassigning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleReassign = () => {
    setIsReassigning(true)
    setTimeout(() => {
      setIsReassigning(false)
      setIsComplete(true)
      setTimeout(() => {
        onOpenChange(false)
        setIsComplete(false)
        setSelectedStaff("")
      }, 1500)
    }, 1000)
  }

  const selectedStaffMember = staffMembers.find((s) => s.id === selectedStaff)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Reassign Staff
          </DialogTitle>
          <DialogDescription>Change the assigned accountant for {clientName}</DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mt-4 text-lg font-medium">Staff Reassigned!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {clientName} is now assigned to {selectedStaffMember?.name}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {/* Current Assignment */}
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground">Currently Assigned</p>
                <p className="mt-1 text-sm font-medium">{currentStaff}</p>
              </div>

              {/* New Staff Selection */}
              <div className="space-y-2">
                <Label>Assign to</Label>
                <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{staff.initials}</AvatarFallback>
                          </Avatar>
                          <span>{staff.name}</span>
                          <span className="text-xs text-muted-foreground">({staff.clients} clients)</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Confirmation Message */}
              {selectedStaff && (
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <p className="text-sm">
                    <span className="font-medium">{selectedStaffMember?.name}</span> will be notified and receive access
                    to all client documents and reports.
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleReassign} disabled={!selectedStaff || isReassigning} className="gap-2">
                {isReassigning ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Reassigning...
                  </>
                ) : (
                  "Confirm Reassignment"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
