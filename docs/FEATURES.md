# Feature Documentation

This document provides detailed information about each feature in the SGAF Client Portal.

---

## 1. Dashboard

**Route**: `/`

The main dashboard provides a high-level overview of the client's financial health and recent activity.

### KPI Cards

Three key performance indicators are displayed at the top:

| Metric | Description |
|--------|-------------|
| Monthly Profit | Current month's profit with percentage change |
| Total Revenue | Revenue total with growth indicator |
| Cash Position | Current cash balance with last update time |

**Component**: `components/dashboard/kpi-card.tsx`

### Revenue Chart

A line chart displaying revenue trends over the past 6 months using Recharts.

**Features**:
- Responsive design
- Hover tooltips with exact values
- Grid lines for easier reading

**Component**: `components/dashboard/revenue-chart.tsx`

### Alerts List

Displays important notifications and action items requiring attention.

**Alert Types**:
- Missing documents
- Pending approvals
- Deadline reminders
- System notifications

**Component**: `components/dashboard/alerts-list.tsx`

### Quick Actions

Common actions accessible from the dashboard:

- View Reports
- Upload Documents
- Contact Accountant
- Schedule Meeting

**Component**: `components/dashboard/quick-actions.tsx`

---

## 2. Monthly Close Tracker

**Route**: `/monthly-close`

Tracks the progress of monthly financial close procedures.

### Month Selector

Dropdown to select which month to view, displaying historical data.

### Status Badge

Visual indicator showing overall close status:
- `Completed` - All tasks finished
- `In Progress` - Some tasks remaining
- `Pending` - Not yet started

### Close Checklist

Interactive checklist of required closing tasks:

| Task | Description |
|------|-------------|
| Bank Reconciliation | Match bank statements to records |
| AR Review | Accounts Receivable verification |
| AP Review | Accounts Payable verification |
| Payroll Verification | Confirm payroll accuracy |
| Journal Entries | Record adjusting entries |
| Final Review | Management sign-off |

**Task Status**:
- `completed` - Checkmark icon (green)
- `in-progress` - Clock icon (amber)
- `pending` - Circle icon (gray)

### Status Overview

Visual progress tracking:
- Progress bar showing completion percentage
- Count of completed, in-progress, and pending items

### Monthly Notes

Text area for accountants to add observations and notes for the month.

---

## 3. Documents & Requests

**Route**: `/documents`

Central hub for document management and fulfilling requests.

### Items We Need From You

List of documents requested by the accounting team:

**Features**:
- Status indicator (pending/completed)
- Individual upload buttons for each item
- Pending count badge

**Example Requests**:
- Bank statements
- Payroll summaries
- W-9 forms
- Insurance certificates
- Vendor invoices

### Upload Documents

Drag-and-drop file upload area:

**Supported Formats**:
- PDF documents
- Word documents (DOC, DOCX)
- Excel spreadsheets (XLS, XLSX)
- Maximum file size: 10MB

### Document Folders

Organized folder system for storing and retrieving documents:

| Folder | Contents |
|--------|----------|
| Financial Statements | P&L, Balance Sheets, Cash Flow |
| Tax Returns | Annual and quarterly returns |
| Payroll Files | Pay stubs, W-2s, tax filings |
| Bank Statements | Monthly bank records |
| Legal Documents | Contracts, agreements, compliance |

---

## 4. Admin View

**Route**: `/admin`

Internal view for accounting firm staff to manage all clients.

### Client Status Board

Table displaying all client accounts with key information:

| Column | Description |
|--------|-------------|
| Client | Company name and email |
| Assigned Staff | Team member responsible |
| Industry | Business sector |
| Monthly Close | Current status |
| Missing Docs | Count of outstanding documents |
| Actions | View client details |

### Search & Filters

**Search**: Text search across client names and emails

**Filters**:
- Status (All, Pending, In Progress, Completed)
- Assigned Staff (dropdown of team members)

### Missing Documents Indicator

Visual warning when clients have outstanding document requests:
- Amber warning icon with count
- Quick identification of action items

---

## Navigation

### Sidebar

Collapsible navigation with four main sections:

1. **Dashboard** - Main overview
2. **Monthly Close** - Close tracking
3. **Documents** - File management
4. **Admin** - Internal view (staff only)

**User Profile**:
- Avatar display
- User name and company
- Settings access via dropdown

### Header

Top navigation bar with:
- Search functionality (keyboard shortcut: Cmd/Ctrl + K)
- Notification bell with badge
- Theme toggle (light/dark mode)
- Settings gear icon
- User avatar with menu
