"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, RefreshCw, Trash2, Calendar, User, HardDrive } from "lucide-react"

interface DocumentDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: {
    name: string
    type: string
    size: string
    uploadedBy: string
    uploadedAt: string
    status: string
  } | null
  onReplace: () => void
}

export function DocumentDetailsModal({ open, onOpenChange, document, onReplace }: DocumentDetailsModalProps) {
  if (!document) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Document Details</DialogTitle>
          <DialogDescription>View and manage this document.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Preview */}
          <div className="flex items-center gap-4 rounded-lg border border-border p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{document.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {document.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    document.status === "Uploaded"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : document.status === "In Review"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : ""
                  }`}
                >
                  {document.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">File Size</p>
                <p className="text-sm">{document.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Uploaded By</p>
                <p className="text-sm">{document.uploadedBy}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Upload Date</p>
                <p className="text-sm">{document.uploadedAt}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={onReplace}>
              <RefreshCw className="h-4 w-4" />
              Replace
            </Button>
            <Button variant="outline" className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
