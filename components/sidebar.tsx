"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarCheck, FileText, Users, Settings, ChevronDown, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccountSettingsModal } from "@/components/modals/account-settings-modal"
import { NotificationSettingsModal } from "@/components/modals/notification-settings-modal"
import { useAuth } from "@/lib/auth-context"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Monthly Close",
    href: "/monthly-close",
    icon: CalendarCheck,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Admin",
    href: "/admin",
    icon: Users,
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <>
      <div
        className={cn(
          "flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center gap-3 border-b border-border",
            collapsed ? "justify-center px-2" : "px-4",
          )}
        >
          <Image src="/images/sg-logo.png" alt="SGAF Logo" width={36} height={40} className="object-contain" />
          {!collapsed && (
            <>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">SGAF</span>
                <span className="text-xs text-muted-foreground">Client Portal</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {!collapsed && (
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Menu</p>
          )}
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  collapsed && "justify-center px-2",
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && item.name}
              </Link>
            )
          })}

          {!collapsed && (
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Settings className="h-4 w-4" />
                Settings
                <ChevronDown className="ml-auto h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-7 space-y-1 pt-1">
                <button
                  onClick={() => setAccountModalOpen(true)}
                  className="block w-full text-left rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Account
                </button>
                <button
                  onClick={() => setNotificationModalOpen(true)}
                  className="block w-full text-left rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Notifications
                </button>
              </CollapsibleContent>
            </Collapsible>
          )}

          {collapsed && (
            <button
              onClick={() => setAccountModalOpen(true)}
              className="flex w-full items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </nav>

        {/* User */}
        <div className="border-t border-border p-4">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={user?.avatar || "/professional-man.jpg"} />
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "JD"}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{user?.name || "John Doe"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email || "john@acmecorp.com"}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AccountSettingsModal open={accountModalOpen} onOpenChange={setAccountModalOpen} />
      <NotificationSettingsModal open={notificationModalOpen} onOpenChange={setNotificationModalOpen} />
    </>
  )
}
