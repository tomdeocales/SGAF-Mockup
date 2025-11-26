"use client"

import { useState } from "react"
import { Bell, Search, FileText, CalendarCheck, MessageSquare, CheckCircle2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { AccountSettingsModal } from "@/components/modals/account-settings-modal"
import { NotificationSettingsModal } from "@/components/modals/notification-settings-modal"
import { useAuth } from "@/lib/auth-context"

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "document",
    title: "Document Requested",
    message: "Q4 Bank Statement is needed for monthly close",
    time: "5 min ago",
    read: false,
    icon: FileText,
  },
  {
    id: 2,
    type: "monthly-close",
    title: "Monthly Close Update",
    message: "October 2024 close is now awaiting your review",
    time: "1 hour ago",
    read: false,
    icon: CalendarCheck,
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    message: "Sarah from SGAF sent you a message",
    time: "2 hours ago",
    read: true,
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "complete",
    title: "Report Ready",
    message: "Your Q3 Financial Report is ready to download",
    time: "Yesterday",
    read: true,
    icon: CheckCircle2,
  },
]

interface HeaderProps {
  onToggleSidebar?: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const { user, logout } = useAuth()

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
        {/* Left side - Toggle & Search */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onToggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="w-64 pl-9 bg-secondary/50 border-0" />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-2">
                <DropdownMenuLabel className="p-0 text-sm font-semibold">Notifications</DropdownMenuLabel>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-start gap-3 p-3 cursor-pointer"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        notification.read ? "bg-secondary" : "bg-primary/10"
                      }`}
                    >
                      <notification.icon
                        className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-primary"}`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${notification.read ? "font-normal" : "font-medium"}`}>
                          {notification.title}
                        </p>
                        {!notification.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/professional-man.jpg"} />
                  <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "JD"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAccountModalOpen(true)}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setNotificationModalOpen(true)}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Modals */}
      <AccountSettingsModal open={accountModalOpen} onOpenChange={setAccountModalOpen} />
      <NotificationSettingsModal open={notificationModalOpen} onOpenChange={setNotificationModalOpen} />
    </>
  )
}
