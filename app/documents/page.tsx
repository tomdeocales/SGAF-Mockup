"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UploadDocumentModal } from "@/components/modals/upload-document-modal"
import { ReplaceFileModal } from "@/components/modals/replace-file-modal"
import { DocumentDetailsModal } from "@/components/modals/document-details-modal"
import {
  CheckCircle2,
  Circle,
  Upload,
  FileText,
  Receipt,
  Building,
  Landmark,
  FileCheck,
  AlertCircle,
  Clock,
  Eye,
  MoreVertical,
  FolderOpen,
  Calendar,
  X,
  Check,
} from "lucide-react"

const itemsNeeded = [
  {
    id: 1,
    name: "Q3 Bank Statements",
    status: "missing",
    dueDate: "Due in 3 days",
    type: "Bank Statement",
    priority: "high",
  },
  {
    id: 2,
    name: "October Payroll Summary",
    status: "missing",
    dueDate: "Due in 1 week",
    type: "Payroll",
    priority: "medium",
  },
  { id: 3, name: "Updated W-9 Form", status: "uploaded", dueDate: "Completed", type: "Tax Document", priority: "low" },
  {
    id: 4,
    name: "Insurance Certificate",
    status: "in-review",
    dueDate: "Under review",
    type: "Legal",
    priority: "low",
  },
  {
    id: 5,
    name: "Vendor Invoices (Nov)",
    status: "missing",
    dueDate: "Due in 2 weeks",
    type: "Invoice",
    priority: "medium",
  },
]

const recentUploads = [
  { id: 1, name: "W9_Form_2025.pdf", type: "PDF", size: "145 KB", uploadedAt: "Nov 15, 2025", uploadedBy: "You" },
  { id: 2, name: "Insurance_Cert.pdf", type: "PDF", size: "892 KB", uploadedAt: "Nov 14, 2025", uploadedBy: "You" },
  { id: 3, name: "Oct_Expenses.xlsx", type: "XLS", size: "234 KB", uploadedAt: "Nov 12, 2025", uploadedBy: "You" },
]

const folders = [
  { name: "Financial Statements", icon: FileText, count: 12, lastUpdated: "Nov 10, 2025" },
  { name: "Tax Returns", icon: Receipt, count: 8, lastUpdated: "Oct 15, 2025" },
  { name: "Payroll Files", icon: Building, count: 24, lastUpdated: "Nov 1, 2025" },
  { name: "Bank Statements", icon: Landmark, count: 36, lastUpdated: "Nov 5, 2025" },
  { name: "Legal Documents", icon: FileCheck, count: 5, lastUpdated: "Sep 20, 2025" },
]

type ViewState = "normal" | "empty" | "upload-error" | "upload-success"

export default function DocumentsPage() {
  const [viewState, setViewState] = useState<ViewState>("normal")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [replaceModalOpen, setReplaceModalOpen] = useState(false)
  const [detailsModal, setDetailsModal] = useState<((typeof recentUploads)[0] & { status: string }) | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showUploadSuccess, setShowUploadSuccess] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setUploadModalOpen(true)
  }, [])

  const simulateUpload = () => {
    setShowUploadSuccess(true)
    setTimeout(() => setShowUploadSuccess(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Documents & Requests</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your documents and fulfill requests from your accounting team
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                value={viewState}
                onChange={(e) => setViewState(e.target.value as ViewState)}
              >
                <option value="normal">Normal View</option>
                <option value="empty">Empty State</option>
                <option value="upload-error">Upload Error</option>
                <option value="upload-success">Upload Success</option>
              </select>
            </div>
          </div>

          {(showUploadSuccess || viewState === "upload-success") && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-800">Upload Successful!</p>
                <p className="text-xs text-emerald-700">Your document has been uploaded and is being processed.</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setViewState("normal")}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {viewState === "upload-error" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Upload Failed</p>
                <p className="text-xs text-red-700">
                  The file format is not supported. Please upload PDF, DOC, or XLS files.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-100 bg-transparent"
              >
                Try Again
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setViewState("normal")}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {viewState === "empty" ? (
            /* Empty State */
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <FolderOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">No Documents Requested Yet</h3>
                <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
                  {
                    "Your accounting team hasn't requested any documents yet. Check back later or upload documents proactively."
                  }
                </p>
                <Button className="mt-6 gap-2" onClick={() => setUploadModalOpen(true)}>
                  <Upload className="h-4 w-4" />
                  Upload a Document
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Panel: Items Needed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Items We Need From You</span>
                      <Badge variant="secondary">
                        {itemsNeeded.filter((i) => i.status === "missing").length} pending
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {itemsNeeded.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                      >
                        {item.status === "uploaded" && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
                        {item.status === "in-review" && <Clock className="h-5 w-5 shrink-0 text-blue-500" />}
                        {item.status === "missing" && <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />}

                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            <span
                              className={`text-xs ${
                                item.priority === "high"
                                  ? "text-red-600"
                                  : item.priority === "medium"
                                    ? "text-amber-600"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {item.dueDate}
                            </span>
                          </div>
                        </div>

                        <Badge
                          variant="secondary"
                          className={`shrink-0 text-xs ${
                            item.status === "uploaded"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "in-review"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-secondary"
                          }`}
                        >
                          {item.status === "uploaded" && "Uploaded"}
                          {item.status === "in-review" && "In Review"}
                          {item.status === "missing" && "Missing"}
                        </Badge>

                        {item.status === "missing" && (
                          <Button size="sm" variant="outline" onClick={() => setUploadModalOpen(true)}>
                            Upload
                          </Button>
                        )}
                        {item.status === "uploaded" && (
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Right Panel: Your Documents & Upload */}
                <div className="space-y-6">
                  {/* Upload Area */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault()
                          setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => setUploadModalOpen(true)}
                        className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <p className="mt-4 text-sm font-medium">Drop files here or click to upload</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Supported: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max 10MB)
                        </p>
                        <Button className="mt-4" size="sm">
                          Select Files
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Recent Uploads</span>
                        <Button variant="link" className="h-auto p-0 text-sm">
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {recentUploads.map((doc) => (
                        <div
                          key={doc.id}
                          className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.size} • {doc.uploadedAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => setDetailsModal({ ...doc, status: "Uploaded" })}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Document Folders */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Document Folders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {folders.map((folder) => (
                      <button
                        key={folder.name}
                        className="flex flex-col items-center gap-3 rounded-lg border border-border p-6 transition-all hover:bg-secondary hover:shadow-sm"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                          <folder.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{folder.name}</p>
                          <p className="text-xs text-muted-foreground">{folder.count} files</p>
                          <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {folder.lastUpdated}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <UploadDocumentModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
      <ReplaceFileModal
        open={replaceModalOpen}
        onOpenChange={setReplaceModalOpen}
        fileName="W9_Form_2024.pdf"
        previousUpload="Oct 15, 2025 at 2:30 PM"
        onConfirm={() => {
          setReplaceModalOpen(false)
          simulateUpload()
        }}
      />
      <DocumentDetailsModal
        open={!!detailsModal}
        onOpenChange={() => setDetailsModal(null)}
        document={detailsModal}
        onReplace={() => {
          setDetailsModal(null)
          setReplaceModalOpen(true)
        }}
      />
    </div>
  )
}
