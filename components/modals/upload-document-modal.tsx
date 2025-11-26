"use client"

import type React from "react"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react"

interface UploadDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UploadedFile {
  name: string
  size: string
  type: string
}

const documentTypes = ["Bank Statement", "Invoice", "Receipt", "Tax Document", "Payroll Report", "Contract", "Other"]

export function UploadDocumentModal({ open, onOpenChange }: UploadDocumentModalProps) {
  const [file, setFile] = useState<UploadedFile | null>(null)
  const [docType, setDocType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const ext = droppedFile.name.split(".").pop()?.toLowerCase()
      if (!["pdf", "doc", "docx", "xls", "xlsx", "jpg", "png"].includes(ext || "")) {
        setError("Unsupported file type. Please upload PDF, DOC, XLS, JPG, or PNG files.")
        return
      }
      setError(null)
      setFile({
        name: droppedFile.name,
        size: `${(droppedFile.size / 1024).toFixed(1)} KB`,
        type: ext?.toUpperCase() || "FILE",
      })
    }
  }, [])

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setIsComplete(true)
      setTimeout(() => {
        onOpenChange(false)
        setIsComplete(false)
        setFile(null)
        setDocType("")
      }, 2000)
    }, 2000)
  }

  const simulateFileSelect = () => {
    setError(null)
    setFile({
      name: "Q3_Bank_Statement.pdf",
      size: "245 KB",
      type: "PDF",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Upload documents to share with your accounting team.</DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mt-4 text-lg font-medium">Upload Successful!</p>
            <p className="text-sm text-muted-foreground">{file?.name} has been uploaded.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={simulateFileSelect}
                className={`flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : error
                      ? "border-red-300 bg-red-50"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${error ? "bg-red-100" : "bg-primary/10"}`}
                >
                  {error ? (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  ) : (
                    <Upload className="h-6 w-6 text-primary" />
                  )}
                </div>
                <p className="mt-3 text-sm font-medium">
                  {error ? "Upload Failed" : "Drop file here or click to browse"}
                </p>
                <p className={`mt-1 text-xs ${error ? "text-red-500" : "text-muted-foreground"}`}>
                  {error || "PDF, DOC, XLS, JPG, PNG up to 10MB"}
                </p>
              </div>

              {/* File Preview */}
              {file && !error && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • {file.type}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Document Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Document Type</Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Notes (Optional)</Label>
                <Textarea
                  placeholder="Add any relevant notes about this document..."
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!file || !docType || isUploading} className="gap-2">
                {isUploading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Document
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
