"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KpiCard, KpiCardSkeleton } from "@/components/dashboard/kpi-card"
import { RevenueChart, RevenueChartSkeleton } from "@/components/dashboard/revenue-chart"
import { AlertsList, AlertsListSkeleton } from "@/components/dashboard/alerts-list"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { DashboardEmptyState } from "@/components/dashboard/empty-state"
import { DownloadReportModal } from "@/components/modals/download-report-modal"
import { ScheduleCallModal } from "@/components/modals/schedule-call-modal"
import { UploadDocumentModal } from "@/components/modals/upload-document-modal"
import { MonthPicker } from "@/components/month-picker"
import { Button } from "@/components/ui/button"
import { Download, DollarSign, TrendingUp, Wallet, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const [dateRange, setDateRange] = useState({
    startMonth: 9, // October (0-indexed)
    startYear: 2025,
    endMonth: 10, // November
    endYear: 2025,
  })

  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Welcome back! Here is your financial overview.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="mr-4 flex items-center gap-2 text-xs">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoading(!isLoading)}
                  className={isLoading ? "bg-secondary" : ""}
                >
                  {isLoading ? "Hide" : "Show"} Loading
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEmpty(!isEmpty)}
                  className={isEmpty ? "bg-secondary" : ""}
                >
                  {isEmpty ? "Hide" : "Show"} Empty
                </Button>
              </div>
              <MonthPicker value={dateRange} onChange={setDateRange} />
              <Button className="gap-2" onClick={() => setDownloadModalOpen(true)}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Empty State */}
          {isEmpty ? (
            <DashboardEmptyState onUploadClick={() => setUploadModalOpen(true)} />
          ) : isLoading ? (
            <>
              {/* Loading State */}
              <div className="mb-6">
                <h2 className="mb-4 text-sm font-medium text-muted-foreground">Financial Snapshot</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <KpiCardSkeleton />
                  <KpiCardSkeleton />
                  <KpiCardSkeleton />
                </div>
              </div>
              <div className="mb-6">
                <h2 className="mb-4 text-sm font-medium text-muted-foreground">{"This Month's Activity"}</h2>
                <div className="grid gap-4 lg:grid-cols-3">
                  <RevenueChartSkeleton />
                  <AlertsListSkeleton />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Financial Snapshot Section */}
              <div className="mb-6">
                <h2 className="mb-4 text-sm font-medium text-muted-foreground">Financial Snapshot</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <KpiCard
                    title="Monthly Profit"
                    value="$24,850"
                    change="+18.2% from last month"
                    changeType="positive"
                    icon={<DollarSign className="h-4 w-4" />}
                    status="on-track"
                    tooltip="Net profit after all expenses and taxes"
                  />
                  <KpiCard
                    title="Total Revenue"
                    value="$128,430"
                    change="+12.5% from last month"
                    changeType="positive"
                    icon={<TrendingUp className="h-4 w-4" />}
                    status="on-track"
                    tooltip="Gross revenue from all sources"
                  />
                  <KpiCard
                    title="Cash Position"
                    value="$89,200"
                    change="Updated today"
                    changeType="neutral"
                    icon={<Wallet className="h-4 w-4" />}
                    status="needs-attention"
                    tooltip="Current available cash across all accounts"
                  />
                </div>
              </div>

              {/* This Month's Activity Section */}
              <div className="mb-6">
                <h2 className="mb-4 text-sm font-medium text-muted-foreground">{"This Month's Activity"}</h2>
                <div className="grid gap-4 lg:grid-cols-3">
                  <RevenueChart />
                  <AlertsList onUploadClick={() => setUploadModalOpen(true)} />
                </div>
              </div>

              {/* Quick Actions */}
              <QuickActions
                onUploadClick={() => setUploadModalOpen(true)}
                onScheduleClick={() => setScheduleModalOpen(true)}
                onDownloadClick={() => setDownloadModalOpen(true)}
              />
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <DownloadReportModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} />
      <ScheduleCallModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
      <UploadDocumentModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  )
}
