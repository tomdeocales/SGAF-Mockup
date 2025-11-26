"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClientDetailsModal } from "@/components/modals/client-details-modal"
import { ReassignStaffModal } from "@/components/modals/reassign-staff-modal"
import { MarkCompleteModal } from "@/components/modals/mark-complete-modal"
import {
  Search,
  FileWarning,
  MoreHorizontal,
  Eye,
  Users,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Building2,
  FolderOpen,
} from "lucide-react"

const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "finance@acmecorp.com",
    staff: "Sarah Johnson",
    staffAvatar: "SJ",
    status: "completed",
    missingDocs: 0,
    industry: "Technology",
    revenue: "$128,000",
    closeProgress: 100,
  },
  {
    id: 2,
    name: "Global Retail Inc",
    email: "accounting@globalretail.com",
    staff: "Mike Chen",
    staffAvatar: "MC",
    status: "in-progress",
    missingDocs: 2,
    industry: "Retail",
    revenue: "$85,000",
    closeProgress: 67,
  },
  {
    id: 3,
    name: "Healthcare Plus",
    email: "admin@healthcareplus.com",
    staff: "Sarah Johnson",
    staffAvatar: "SJ",
    status: "pending",
    missingDocs: 5,
    industry: "Healthcare",
    revenue: "$210,000",
    closeProgress: 15,
  },
  {
    id: 4,
    name: "Construction Co",
    email: "books@constructco.com",
    staff: "David Wilson",
    staffAvatar: "DW",
    status: "in-progress",
    missingDocs: 1,
    industry: "Construction",
    revenue: "$156,000",
    closeProgress: 83,
  },
  {
    id: 5,
    name: "Tech Startup LLC",
    email: "cfo@techstartup.io",
    staff: "Mike Chen",
    staffAvatar: "MC",
    status: "completed",
    missingDocs: 0,
    industry: "Technology",
    revenue: "$42,000",
    closeProgress: 100,
  },
]

type ViewState = "normal" | "loading" | "no-results"

export default function AdminPage() {
  const [viewState, setViewState] = useState<ViewState>("normal")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [staffFilter, setStaffFilter] = useState("all-staff")
  const [searchQuery, setSearchQuery] = useState("")

  const [clientDetailsModal, setClientDetailsModal] = useState<(typeof clients)[0] | null>(null)
  const [reassignModal, setReassignModal] = useState<{ clientName: string; currentStaff: string } | null>(null)
  const [markCompleteModal, setMarkCompleteModal] = useState<{ clientName: string; missingDocs: number } | null>(null)

  // Filter clients
  const filteredClients = clients.filter((client) => {
    if (statusFilter !== "all" && client.status !== statusFilter) return false
    if (industryFilter !== "all" && client.industry.toLowerCase() !== industryFilter) return false
    if (staffFilter !== "all-staff" && !client.staff.toLowerCase().includes(staffFilter)) return false
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: clients.length,
    onTrack: clients.filter((c) => c.status === "completed" || (c.status === "in-progress" && c.missingDocs === 0))
      .length,
    atRisk: clients.filter((c) => c.missingDocs >= 3).length,
    missingDocs: clients.filter((c) => c.missingDocs > 0).length,
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
              <h1 className="text-2xl font-semibold">Client Status Board</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Internal view of all client accounts and their monthly close status
              </p>
            </div>
            <Select value={viewState} onValueChange={(v) => setViewState(v as ViewState)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="no-results">No Results</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Clients</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{stats.onTrack}</p>
                  <p className="text-xs text-muted-foreground">On Track</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.atRisk}</p>
                  <p className="text-xs text-muted-foreground">At Risk</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <FileWarning className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{stats.missingDocs}</p>
                  <p className="text-xs text-muted-foreground">Missing Documents</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>All Clients</CardTitle>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search clients..."
                      className="w-64 pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={staffFilter} onValueChange={setStaffFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-staff">All Staff</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="david">David Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewState === "loading" ? (
                /* Loading skeleton */
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  ))}
                </div>
              ) : viewState === "no-results" || filteredClients.length === 0 ? (
                /* No results state */
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <FolderOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">No Clients Found</h3>
                  <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
                    No clients match your current filters. Try adjusting your search or filter criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("all")
                      setIndustryFilter("all")
                      setStaffFilter("all-staff")
                      setViewState("normal")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Assigned Staff</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Monthly Close</TableHead>
                      <TableHead>Missing Docs</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id} className="group">
                        <TableCell>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">{client.staffAvatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{client.staff}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{client.industry}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`capitalize ${
                              client.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : client.status === "in-progress"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-secondary"
                            }`}
                          >
                            {client.status.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {client.missingDocs > 0 ? (
                            <div
                              className={`flex items-center gap-1.5 ${client.missingDocs >= 3 ? "text-red-600" : "text-amber-600"}`}
                            >
                              <FileWarning className="h-4 w-4" />
                              <span className="text-sm font-medium">{client.missingDocs}</span>
                              {client.missingDocs >= 3 && (
                                <Badge variant="destructive" className="ml-1 text-xs">
                                  At Risk
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setClientDetailsModal(client)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  setReassignModal({ clientName: client.name, currentStaff: client.staff })
                                }
                              >
                                <Users className="mr-2 h-4 w-4" />
                                Reassign Staff
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  setMarkCompleteModal({ clientName: client.name, missingDocs: client.missingDocs })
                                }
                                disabled={client.status === "completed"}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark as Complete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modals */}
      <ClientDetailsModal
        open={!!clientDetailsModal}
        onOpenChange={() => setClientDetailsModal(null)}
        client={clientDetailsModal}
      />
      <ReassignStaffModal
        open={!!reassignModal}
        onOpenChange={() => setReassignModal(null)}
        clientName={reassignModal?.clientName || ""}
        currentStaff={reassignModal?.currentStaff || ""}
      />
      <MarkCompleteModal
        open={!!markCompleteModal}
        onOpenChange={() => setMarkCompleteModal(null)}
        clientName={markCompleteModal?.clientName || ""}
        missingDocs={markCompleteModal?.missingDocs || 0}
      />
    </div>
  )
}
