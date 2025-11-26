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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, FileSpreadsheet, Download, CheckCircle2 } from "lucide-react"

interface DownloadReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const reportContents = [
  { id: "financial-summary", label: "Financial Summary", checked: true },
  { id: "income-statement", label: "Income Statement", checked: true },
  { id: "balance-sheet", label: "Balance Sheet", checked: true },
  { id: "cash-flow", label: "Cash Flow Statement", checked: false },
  { id: "expense-breakdown", label: "Expense Breakdown", checked: true },
]

export function DownloadReportModal({ open, onOpenChange }: DownloadReportModalProps) {
  const [format, setFormat] = useState("pdf")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      setIsComplete(true)
      setTimeout(() => {
        onOpenChange(false)
        setIsComplete(false)
      }, 1500)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Report</DialogTitle>
          <DialogDescription>Select your preferred format and what to include in the report package.</DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mt-4 text-lg font-medium">Download Complete!</p>
            <p className="text-sm text-muted-foreground">Your report has been downloaded.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {/* Format Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">File Format</Label>
                <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-2 gap-3">
                  <Label
                    htmlFor="pdf"
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      format === "pdf" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <RadioGroupItem value="pdf" id="pdf" />
                    <FileText className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium">PDF</span>
                  </Label>
                  <Label
                    htmlFor="excel"
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      format === "excel" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <RadioGroupItem value="excel" id="excel" />
                    <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-medium">Excel</span>
                  </Label>
                </RadioGroup>
              </div>

              {/* Report Contents */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Include in Report</Label>
                <div className="space-y-2">
                  {reportContents.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      <Checkbox id={item.id} defaultChecked={item.checked} />
                      <Label htmlFor={item.id} className="flex-1 cursor-pointer text-sm">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleDownload} disabled={isDownloading} className="gap-2">
                {isDownloading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Report
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
