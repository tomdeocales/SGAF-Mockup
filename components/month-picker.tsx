"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

interface MonthPickerProps {
  value: { startMonth: number; startYear: number; endMonth: number; endYear: number }
  onChange: (value: { startMonth: number; startYear: number; endMonth: number; endYear: number }) => void
}

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [year, setYear] = useState(value.endYear)
  const [selecting, setSelecting] = useState<"start" | "end">("start")
  const [tempStart, setTempStart] = useState<{ month: number; year: number } | null>(null)

  const handleMonthClick = (month: number) => {
    if (selecting === "start") {
      setTempStart({ month, year })
      setSelecting("end")
    } else {
      const start = tempStart || { month: value.startMonth, year: value.startYear }
      const startDate = new Date(start.year, start.month)
      const endDate = new Date(year, month)

      if (endDate >= startDate) {
        onChange({
          startMonth: start.month,
          startYear: start.year,
          endMonth: month,
          endYear: year,
        })
      } else {
        onChange({
          startMonth: month,
          startYear: year,
          endMonth: start.month,
          endYear: start.year,
        })
      }
      setSelecting("start")
      setTempStart(null)
      setIsOpen(false)
    }
  }

  const isInRange = (month: number) => {
    if (!tempStart) return false
    const start = new Date(tempStart.year, tempStart.month)
    const current = new Date(year, month)
    return current >= start
  }

  const isSelected = (month: number) => {
    return (
      (month === value.startMonth && year === value.startYear) || (month === value.endMonth && year === value.endYear)
    )
  }

  const formatDateRange = () => {
    const startMonthName = months[value.startMonth]
    const endMonthName = months[value.endMonth]
    return `${startMonthName} ${value.startYear} - ${endMonthName} ${value.endYear}`
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Calendar className="h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-4">
          {/* Year selector */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setYear(year - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">{year}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setYear(year + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Selection hint */}
          <p className="text-xs text-center text-muted-foreground">
            {selecting === "start" ? "Select start month" : "Select end month"}
          </p>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-2">
            {months.map((monthName, index) => (
              <Button
                key={monthName}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9",
                  isSelected(index) && "bg-foreground text-background hover:bg-foreground hover:text-background",
                  isInRange(index) && !isSelected(index) && "bg-secondary",
                )}
                onClick={() => handleMonthClick(index)}
              >
                {monthName}
              </Button>
            ))}
          </div>

          {/* Quick select options */}
          <div className="flex gap-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => {
                const now = new Date()
                onChange({
                  startMonth: now.getMonth(),
                  startYear: now.getFullYear(),
                  endMonth: now.getMonth(),
                  endYear: now.getFullYear(),
                })
                setIsOpen(false)
              }}
            >
              This Month
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => {
                const now = new Date()
                onChange({
                  startMonth: 0,
                  startYear: now.getFullYear(),
                  endMonth: now.getMonth(),
                  endYear: now.getFullYear(),
                })
                setIsOpen(false)
              }}
            >
              YTD
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => {
                const now = new Date()
                const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2)
                onChange({
                  startMonth: threeMonthsAgo.getMonth(),
                  startYear: threeMonthsAgo.getFullYear(),
                  endMonth: now.getMonth(),
                  endYear: now.getFullYear(),
                })
                setIsOpen(false)
              }}
            >
              Last 3 Mo
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
