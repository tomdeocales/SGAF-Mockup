# API Reference

This document describes the data structures and potential API integrations for the SGAF Client Portal.

---

## Data Models

### Client

Represents a client organization in the system.

\`\`\`typescript
interface Client {
  id: number
  name: string
  email: string
  staff: string          // Assigned staff member name
  staffAvatar: string    // Initials for avatar
  status: "pending" | "in-progress" | "completed"
  missingDocs: number
  industry: string
}
\`\`\`

### Checklist Item

Represents a task in the monthly close checklist.

\`\`\`typescript
interface ChecklistItem {
  id: number
  name: string
  status: "pending" | "in-progress" | "completed"
}
\`\`\`

### Document Request

Represents a document requested from a client.

\`\`\`typescript
interface DocumentRequest {
  id: number
  name: string
  status: "pending" | "completed"
  requestedDate?: string
  completedDate?: string
}
\`\`\`

### Document Folder

Represents a folder in the document management system.

\`\`\`typescript
interface DocumentFolder {
  name: string
  icon: LucideIcon
  count: number
}
\`\`\`

### Alert

Represents a notification or action item.

\`\`\`typescript
interface Alert {
  id: number
  title: string
  description: string
  type: "warning" | "info" | "success"
  time: string
  read: boolean
}
\`\`\`

### KPI Data

Represents a key performance indicator.

\`\`\`typescript
interface KPI {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
}
\`\`\`

### Revenue Data Point

Used for chart data.

\`\`\`typescript
interface RevenueDataPoint {
  month: string
  revenue: number
}
\`\`\`

---

## Potential API Endpoints

These endpoints would be implemented when connecting to a backend:

### Dashboard

\`\`\`
GET /api/dashboard/kpis
GET /api/dashboard/revenue-chart
GET /api/dashboard/alerts
\`\`\`

### Monthly Close

\`\`\`
GET /api/monthly-close?month={YYYY-MM}
PUT /api/monthly-close/item/{id}/status
POST /api/monthly-close/notes
\`\`\`

### Documents

\`\`\`
GET /api/documents/requests
POST /api/documents/upload
GET /api/documents/folders
GET /api/documents/folders/{folderId}/files
\`\`\`

### Admin

\`\`\`
GET /api/clients
GET /api/clients/{id}
PUT /api/clients/{id}/assign
GET /api/staff
\`\`\`

---

## Authentication (Future)

Recommended authentication flow:

1. **Login**: Email/password or SSO
2. **Session**: JWT stored in HTTP-only cookies
3. **Roles**: 
   - `client` - Access to own data only
   - `staff` - Access to assigned clients
   - `admin` - Full access

\`\`\`typescript
interface User {
  id: string
  email: string
  name: string
  role: "client" | "staff" | "admin"
  companyId?: string  // For client users
}
\`\`\`

---

## Database Schema (Suggested)

### Tables

\`\`\`sql
-- Clients
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  industry VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Staff
CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'staff'
);

-- Client Assignments
CREATE TABLE client_assignments (
  client_id INTEGER REFERENCES clients(id),
  staff_id INTEGER REFERENCES staff(id),
  PRIMARY KEY (client_id, staff_id)
);

-- Monthly Close
CREATE TABLE monthly_close (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  month DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT
);

-- Close Checklist Items
CREATE TABLE close_checklist_items (
  id SERIAL PRIMARY KEY,
  monthly_close_id INTEGER REFERENCES monthly_close(id),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending'
);

-- Document Requests
CREATE TABLE document_requests (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Documents
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  folder VARCHAR(100) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

---

## Environment Variables

Required environment variables for production:

\`\`\`env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Authentication (if using Auth.js)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# File Storage (if using Vercel Blob)
BLOB_READ_WRITE_TOKEN=your-token

# Optional Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
\`\`\`

---

## Integration Options

### Database
- **Supabase** - PostgreSQL with built-in auth
- **Neon** - Serverless PostgreSQL
- **PlanetScale** - MySQL-compatible

### File Storage
- **Vercel Blob** - Simple file storage
- **AWS S3** - Scalable object storage
- **Supabase Storage** - Integrated with auth

### Authentication
- **Supabase Auth** - Email, OAuth, SSO
- **Auth.js** - Flexible auth library
- **Clerk** - Drop-in auth solution
