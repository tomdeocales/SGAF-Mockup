"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ReviewApproveModal } from "@/components/modals/review-approve-modal"
import { StepDetailsModal } from "@/components/modals/step-details-modal"
import { CheckCircle2, Circle, Clock, Info, Eye, ChevronRight, Lock } from "lucide-react"

const checklist = [
  {
    id: 1,
    name: "Bank Reconciliation",
    status: "completed",
    assignedTo: "Sarah Johnson",
    assignedInitials: "SJ",
    lastUpdated: "Nov 12, 2025 at 3:45 PM",
    description:
      "Matching bank statements with the company's cash records to ensure all transactions are accurately recorded.",
    notes: ["All accounts reconciled. No discrepancies found."],
  },
  {
    id: 2,
    name: "AR Review",
    status: "completed",
    assignedTo: "Sarah Johnson",
    assignedInitials: "SJ",
    lastUpdated: "Nov 13, 2025 at 11:20 AM",
    description: "Reviewing accounts receivable to verify outstanding invoices and customer payments.",
    notes: ["2 invoices from Q2 still outstanding - follow-up emails sent."],
  },
  {
    id: 3,
    name: "AP Review",
    status: "in-progress",
    assignedTo: "Mike Chen",
    assignedInitials: "MC",
    lastUpdated: "Nov 14, 2025 at 2:15 PM",
    description: "Reviewing accounts payable to ensure all vendor bills are recorded and payments are scheduled.",
    notes: [],
  },
  {
    id: 4,
    name: "Payroll Verification",
    status: "in-progress",
    assignedTo: "Mike Chen",
    assignedInitials: "MC",
    lastUpdated: "Nov 14, 2025 at 4:30 PM",
    description: "Verifying all payroll entries including wages, taxes, and benefits are correctly recorded.",
    notes: [],
  },
  {
    id: 5,
    name: "Journal Entries",
    status: "pending",
    assignedTo: "Sarah Johnson",
    assignedInitials: "SJ",
    lastUpdated: "—",
    description: "Recording adjusting entries for accruals, deferrals, and other month-end adjustments.",
    notes: [],
  },
  {
    id: 6,
    name: "Final Review",
    status: "pending",
    assignedTo: "David Wilson",
    assignedInitials: "DW",
    lastUpdated: "—",
    description: "Senior accountant review of all entries and financial statements before client approval.",
    notes: [],
  },
]

type ViewState = "in-progress" | "awaiting-review" | "completed"

export default function MonthlyClosePage() {
  const [selectedMonth, setSelectedMonth] = useState("oct-2025")
  const [viewState, setViewState] = useState<ViewState>("in-progress")
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [stepDetailsModal, setStepDetailsModal] = useState<(typeof checklist)[0] | null>(null)

  // Calculate progress
  const completed = checklist.filter((i) => i.status === "completed").length
  const inProgress = checklist.filter((i) => i.status === "in-progress").length
  const pending = checklist.filter((i) => i.status === "pending").length
  const progress = Math.round((completed / checklist.length) * 100)

  const getMonthLabel = () => {
    const months: Record<string, string> = {
      "oct-2025": "October 2025",
      "sep-2025": "September 2025",
      "aug-2025": "August 2025",
    }
    return months[selectedMonth] || "October 2025"
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Monthly Close Status</h1>
                <p className="mt-1 text-sm text-muted-foreground">Track the progress of your monthly financial close</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={viewState} onValueChange={(v) => setViewState(v as ViewState)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="awaiting-review">Awaiting Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oct-2025">October 2025</SelectItem>
                    <SelectItem value="sep-2025">September 2025</SelectItem>
                    <SelectItem value="aug-2025">August 2025</SelectItem>
                  </SelectContent>
                </Select>
                <Badge
                  variant="secondary"
                  className={`gap-1.5 px-3 py-1.5 ${
                    viewState === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : viewState === "awaiting-review"
                        ? "bg-blue-100 text-blue-700"
                        : ""
                  }`}
                >
                  {viewState === "completed" && <Lock className="h-3.5 w-3.5" />}
                  {viewState === "awaiting-review" && <Eye className="h-3.5 w-3.5" />}
                  {viewState === "in-progress" && <Clock className="h-3.5 w-3.5" />}
                  {viewState === "completed" && "Approved & Locked"}
                  {viewState === "awaiting-review" && "Awaiting Client Review"}
                  {viewState === "in-progress" && "In Progress"}
                </Badge>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
                <ChevronRight className="mr-1 h-4 w-4" />
                Compare to Last Month
              </Button>
              <Badge variant="outline" className="gap-1.5">
                <Eye className="h-3 w-3" />
                Viewing as: Client
              </Badge>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Close Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {checklist.map((item) => {
                    const displayStatus =
                      viewState === "completed" || viewState === "awaiting-review" ? "completed" : item.status

                    return (
                      <div
                        key={item.id}
                        className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                      >
                        {displayStatus === "completed" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        {displayStatus === "in-progress" && <Clock className="h-5 w-5 text-amber-500" />}
                        {displayStatus === "pending" && <Circle className="h-5 w-5 text-muted-foreground" />}

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.name}</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground/50" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>{item.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {displayStatus === "completed" ? `Completed ${item.lastUpdated}` : item.lastUpdated}
                          </p>
                        </div>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">{item.assignedInitials}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>{item.assignedTo}</TooltipContent>
                        </Tooltip>

                        <Badge
                          variant={
                            displayStatus === "completed"
                              ? "default"
                              : displayStatus === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="capitalize"
                        >
                          {displayStatus.replace("-", " ")}
                        </Badge>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => setStepDetailsModal(item)}
                        >
                          View
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Notes & Status */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">
                          {viewState === "completed" || viewState === "awaiting-review" ? "100" : progress}% Complete
                        </span>
                      </div>
                      <div className="flex h-2 gap-0.5 overflow-hidden rounded-full">
                        {checklist.map((item, i) => {
                          const displayStatus =
                            viewState === "completed" || viewState === "awaiting-review" ? "completed" : item.status
                          return (
                            <div
                              key={i}
                              className={`flex-1 first:rounded-l-full last:rounded-r-full ${
                                displayStatus === "completed"
                                  ? "bg-emerald-500"
                                  : displayStatus === "in-progress"
                                    ? "bg-amber-500"
                                    : "bg-secondary"
                              }`}
                            />
                          )
                        })}
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-500">
                            {viewState === "completed" || viewState === "awaiting-review" ? 6 : completed}
                          </p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-amber-500">
                            {viewState === "completed" || viewState === "awaiting-review" ? 0 : inProgress}
                          </p>
                          <p className="text-xs text-muted-foreground">In Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-muted-foreground">
                            {viewState === "completed" || viewState === "awaiting-review" ? 0 : pending}
                          </p>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </div>
                      </div>

                      {viewState === "awaiting-review" && (
                        <Button className="mt-4 w-full gap-2" onClick={() => setReviewModalOpen(true)}>
                          <CheckCircle2 className="h-4 w-4" />
                          Review & Approve
                        </Button>
                      )}

                      {viewState === "completed" && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-emerald-700">
                          <Lock className="h-4 w-4" />
                          <span className="text-sm">This month has been approved and locked.</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Add observations for this month..."
                      className="min-h-[120px] resize-none"
                      defaultValue="Cash flow improved this quarter. Noted a few outstanding invoices from Q2 that need follow-up."
                      disabled={viewState === "completed"}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last updated: Nov 15, 2025 at 2:34 PM</span>
                      <Button size="sm" disabled={viewState === "completed"}>
                        Save Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>

        {/* Modals */}
        <ReviewApproveModal open={reviewModalOpen} onOpenChange={setReviewModalOpen} month={getMonthLabel()} />
        <StepDetailsModal
          open={!!stepDetailsModal}
          onOpenChange={() => setStepDetailsModal(null)}
          step={stepDetailsModal}
        />
      </div>
    </TooltipProvider>
  )
}
