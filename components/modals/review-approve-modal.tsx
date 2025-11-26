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
import { CheckCircle2, FileText, AlertTriangle, Lock } from "lucide-react"

interface ReviewApproveModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  month: string
}

const completedWork = [
  { id: 1, name: "Bank Reconciliation", date: "Nov 12, 2025" },
  { id: 2, name: "Accounts Receivable Review", date: "Nov 13, 2025" },
  { id: 3, name: "Accounts Payable Review", date: "Nov 14, 2025" },
  { id: 4, name: "Payroll Verification", date: "Nov 14, 2025" },
  { id: 5, name: "Journal Entries Posted", date: "Nov 15, 2025" },
  { id: 6, name: "Final Review Complete", date: "Nov 15, 2025" },
]

const documentsIncluded = [
  "Income Statement",
  "Balance Sheet",
  "Cash Flow Statement",
  "Bank Reconciliation Report",
  "Payroll Summary",
]

export function ReviewApproveModal({ open, onOpenChange, month }: ReviewApproveModalProps) {
  const [confirmed, setConfirmed] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const handleApprove = () => {
    setIsApproving(true)
    setTimeout(() => {
      setIsApproving(false)
      setIsApproved(true)
      setTimeout(() => {
        onOpenChange(false)
        setIsApproved(false)
        setConfirmed(false)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review & Approve Monthly Close</DialogTitle>
          <DialogDescription>Review the completed work for {month} before approving.</DialogDescription>
        </DialogHeader>

        {isApproved ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Lock className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mt-4 text-lg font-medium">Month Approved & Locked</p>
            <p className="mt-1 text-sm text-muted-foreground">{month} has been successfully closed.</p>
          </div>
        ) : (
          <>
            <div className="max-h-[400px] space-y-6 overflow-y-auto">
              {/* Completed Work Summary */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Completed Work</h4>
                <div className="space-y-2">
                  {completedWork.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-2.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="flex-1 text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Included */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Documents Included</h4>
                <div className="flex flex-wrap gap-2">
                  {documentsIncluded.map((doc) => (
                    <Badge key={doc} variant="secondary" className="gap-1.5">
                      <FileText className="h-3 w-3" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">Important Notice</p>
                  <p className="mt-0.5 text-xs text-amber-700">
                    Once approved, this month will be locked and no further changes can be made without contacting your
                    accountant.
                  </p>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked === true)}
                />
                <Label htmlFor="confirm" className="cursor-pointer text-sm leading-relaxed">
                  I have reviewed all the completed work and documents. I understand that approving will lock this
                  month.
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleApprove} disabled={!confirmed || isApproving} className="gap-2">
                {isApproving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Approve & Lock Month
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
