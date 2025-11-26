"use client"

import { useState, useEffect, useMemo } from "react"
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
import { AiInsightsPanel } from "@/components/modals/ai-insights-panel"
import { MonthPicker } from "@/components/month-picker"
import { Button } from "@/components/ui/button"
import { Download, DollarSign, TrendingUp, Wallet, Loader2, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { AiInsightsPayload } from "@/lib/ai-insights"

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function DashboardPage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const [dateRange, setDateRange] = useState({
    startMonth: 9, // October (0-indexed)
    startYear: 2025,
    endMonth: 10, // November
    endYear: 2025,
  })

  const kpiData = [
    {
      key: "monthlyProfit",
      title: "Monthly Profit",
      value: 24850,
      displayValue: "$24,850",
      changePct: 18.2,
      changeLabel: "+18.2% from last month",
      changeType: "positive" as const,
      icon: <DollarSign className="h-4 w-4" />,
      status: "on-track" as const,
      tooltip: "Net profit after all expenses and taxes",
    },
    {
      key: "totalRevenue",
      title: "Total Revenue",
      value: 128430,
      displayValue: "$128,430",
      changePct: 12.5,
      changeLabel: "+12.5% from last month",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4" />,
      status: "on-track" as const,
      tooltip: "Gross revenue from all sources",
    },
    {
      key: "cashPosition",
      title: "Cash Position",
      value: 89200,
      displayValue: "$89,200",
      changeLabel: "Updated today",
      changeType: "neutral" as const,
      icon: <Wallet className="h-4 w-4" />,
      status: "needs-attention" as const,
      tooltip: "Current available cash across all accounts",
      note: "Cash flagged for tax payments next month",
    },
  ]

  const aiMetrics: AiInsightsPayload = useMemo(
    () => ({
      periodLabel: `${MONTH_NAMES[dateRange.endMonth]} ${dateRange.endYear}`,
      kpis: kpiData.map((kpi) => ({
        key: kpi.key,
        name: kpi.title,
        value: kpi.value,
        currency: "$",
        changePct: kpi.changePct,
        status: kpi.status,
        note: kpi.note ?? kpi.tooltip,
      })),
      keyChanges: [
        "Payroll increased by 3% due to overtime.",
        "AR collections improved by 5 days.",
        "Marketing expenses decreased by ₱12,000.",
        "Utilities spiked by 18%—recommended to review vendor.",
      ],
      alerts: [
        "2 invoices overdue more than 60 days.",
        "Cash may tighten next month due to upcoming tax payments.",
      ],
      recommendations: [
        "Follow up on overdue invoices to improve cash flow.",
        "Review recurring expenses with rising trends.",
        "Monitor overtime hours to manage payroll cost.",
      ],
    }),
    [dateRange.endMonth, dateRange.endYear, kpiData],
  )

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
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setInsightsOpen(true)
                }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                Explain My Numbers
              </Button>
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
                  {kpiData.map((kpi) => (
                    <KpiCard
                      key={kpi.key}
                      title={kpi.title}
                      value={kpi.displayValue}
                      change={kpi.changeLabel}
                      changeType={kpi.changeType}
                      icon={kpi.icon}
                      status={kpi.status}
                      tooltip={kpi.tooltip}
                    />
                  ))}
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
      <AiInsightsPanel open={insightsOpen} onOpenChange={setInsightsOpen} metrics={aiMetrics} />
    </div>
  )
}
