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
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, CalendarDays, Clock } from "lucide-react"

interface ScheduleCallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
]

export function ScheduleCallModal({ open, onOpenChange }: ScheduleCallModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      setIsConfirming(false)
      setIsConfirmed(true)
      setTimeout(() => {
        onOpenChange(false)
        setIsConfirmed(false)
        setDate(undefined)
        setTime("")
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Schedule a Call
          </DialogTitle>
          <DialogDescription>Book a consultation with your accounting team.</DialogDescription>
        </DialogHeader>

        {isConfirmed ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mt-4 text-lg font-medium">Appointment Confirmed!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {time}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">A calendar invite has been sent to your email.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Calendar */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Date</Label>
                <div className="rounded-lg border">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Time & Notes */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {slot}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Notes (Optional)</Label>
                  <Textarea placeholder="What would you like to discuss?" className="min-h-[100px] resize-none" />
                </div>

                {date && time && (
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-sm font-medium">Your Appointment</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">{time} (30 min)</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={!date || !time || isConfirming} className="gap-2">
                {isConfirming ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Confirming...
                  </>
                ) : (
                  "Confirm Appointment"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
