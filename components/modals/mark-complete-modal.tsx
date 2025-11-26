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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, FileWarning } from "lucide-react"

interface MarkCompleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientName: string
  missingDocs: number
}

export function MarkCompleteModal({ open, onOpenChange, clientName, missingDocs }: MarkCompleteModalProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      setIsCompleting(false)
      setIsComplete(true)
      setTimeout(() => {
        onOpenChange(false)
        setIsComplete(false)
        setConfirmed(false)
      }, 1500)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Mark Monthly Close as Complete
          </DialogTitle>
          <DialogDescription>Complete the monthly close for {clientName}</DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mt-4 text-lg font-medium">Monthly Close Completed!</p>
            <p className="mt-1 text-sm text-muted-foreground">{clientName} has been marked as complete.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {/* Warning if pending items */}
              {missingDocs > 0 && (
                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Pending Items Detected</p>
                    <p className="mt-0.5 text-xs text-amber-700">
                      This client has {missingDocs} missing document{missingDocs > 1 ? "s" : ""}. Are you sure you want
                      to mark as complete?
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <FileWarning className="h-4 w-4 text-amber-600" />
                      <Badge variant="outline" className="border-amber-200 text-amber-700">
                        {missingDocs} pending
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmation */}
              <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  id="confirm-complete"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked === true)}
                />
                <Label htmlFor="confirm-complete" className="cursor-pointer text-sm leading-relaxed">
                  I confirm that all required work has been completed and reviewed.
                  {missingDocs > 0 && " I acknowledge there are pending items."}
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleComplete} disabled={!confirmed || isCompleting} className="gap-2">
                {isCompleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Complete
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
