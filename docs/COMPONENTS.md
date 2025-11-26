# Components Guide

This document describes the reusable components used throughout the SGAF Client Portal.

---

## Layout Components

### Sidebar

**File**: `components/sidebar.tsx`

The main navigation sidebar with collapsible menu items.

**Features**:
- Responsive design
- Active state indication
- User profile section at bottom
- Dropdown menu for user actions

**Navigation Items**:
\`\`\`tsx
const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Monthly Close", href: "/monthly-close", icon: CalendarCheck },
  { name: "Documents", href: "/documents", icon: FolderOpen },
  { name: "Admin", href: "/admin", icon: Shield },
]
\`\`\`

### Header

**File**: `components/header.tsx`

Top navigation bar with search and user controls.

**Components**:
- Search input with keyboard shortcut hint
- Notification bell with unread indicator
- Theme toggle button
- Settings button
- User avatar

---

## Dashboard Components

### KpiCard

**File**: `components/dashboard/kpi-card.tsx`

Displays a single key performance indicator.

**Props**:
\`\`\`tsx
interface KpiCardProps {
  title: string        // Metric name
  value: string        // Formatted value (e.g., "$24,850")
  change: string       // Change description
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}
\`\`\`

**Usage**:
\`\`\`tsx
<KpiCard
  title="Monthly Profit"
  value="$24,850"
  change="+18.2% from last month"
  changeType="positive"
  icon={<DollarSign className="h-4 w-4" />}
/>
\`\`\`

### RevenueChart

**File**: `components/dashboard/revenue-chart.tsx`

Line chart displaying revenue trends.

**Dependencies**: Recharts

**Data Structure**:
\`\`\`tsx
const data = [
  { month: "Jun", revenue: 18500 },
  { month: "Jul", revenue: 22300 },
  // ...
]
\`\`\`

### AlertsList

**File**: `components/dashboard/alerts-list.tsx`

List of notifications and action items.

**Alert Structure**:
\`\`\`tsx
interface Alert {
  id: number
  title: string
  description: string
  type: "warning" | "info" | "success"
  time: string
}
\`\`\`

### QuickActions

**File**: `components/dashboard/quick-actions.tsx`

Grid of action buttons for common tasks.

---

## UI Components (shadcn/ui)

The portal uses shadcn/ui components for consistent styling:

### Cards
\`\`\`tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
\`\`\`

### Buttons
\`\`\`tsx
import { Button } from "@/components/ui/button"

// Variants: default, secondary, outline, ghost, destructive
<Button variant="outline" size="sm">Click me</Button>
\`\`\`

### Badges
\`\`\`tsx
import { Badge } from "@/components/ui/badge"

// Variants: default, secondary, outline, destructive
<Badge variant="secondary">In Progress</Badge>
\`\`\`

### Form Elements
\`\`\`tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
\`\`\`

### Table
\`\`\`tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
\`\`\`

### Avatar
\`\`\`tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
\`\`\`

---

## Theming

The portal supports light and dark themes using `next-themes`.

**Theme Provider**: `components/theme-provider.tsx`

**Toggle Implementation**:
\`\`\`tsx
import { useTheme } from "next-themes"

const { theme, setTheme } = useTheme()
setTheme(theme === "dark" ? "light" : "dark")
\`\`\`

---

## Icons

All icons are from Lucide React:

\`\`\`tsx
import { LayoutDashboard, CalendarCheck, FolderOpen, Shield, Bell, Settings, Search } from 'lucide-react'
\`\`\`

**Standard Sizes**:
- Small: `h-4 w-4`
- Medium: `h-5 w-5`
- Large: `h-6 w-6`
