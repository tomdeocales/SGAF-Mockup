"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, FileText, Upload } from "lucide-react"

interface ReplaceFileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
  previousUpload: string
  onConfirm: () => void
}

export function ReplaceFileModal({ open, onOpenChange, fileName, previousUpload, onConfirm }: ReplaceFileModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Replace Existing File?
          </DialogTitle>
          <DialogDescription>This action will overwrite the previously uploaded file.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Previous File Info */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-xs font-medium text-muted-foreground">Previous Upload</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground">Uploaded {previousUpload}</p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              The previous version will be permanently deleted. This action cannot be undone.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="gap-2">
            <Upload className="h-4 w-4" />
            Replace File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
