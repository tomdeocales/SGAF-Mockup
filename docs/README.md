# SGAF Client Portal

A modern, responsive client portal built with Next.js 16, designed to streamline communication between accounting firms and their clients. The portal provides a centralized hub for financial metrics, document management, and monthly close tracking.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)

## Overview

The SGAF Client Portal is a mockup application designed to demonstrate a comprehensive accounting client management system. It features a clean, professional UI inspired by shadcn dashboard templates with a focus on usability and clarity.

## Features

- **Dashboard** - Real-time KPI metrics, revenue charts, alerts, and quick actions
- **Monthly Close Tracker** - Track progress of monthly closing procedures with checklists
- **Documents Center** - Document requests, file uploads, and organized folder system
- **Admin View** - Internal client status board with filtering and assignment tracking

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

\`\`\`bash
# Clone and install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

Visit `http://localhost:3000` to view the application.

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Dashboard
│   ├── monthly-close/        # Monthly Close Tracker
│   ├── documents/            # Documents & Requests
│   ├── admin/                # Admin View (Internal)
│   └── layout.tsx            # Root layout
├── components/
│   ├── dashboard/            # Dashboard-specific components
│   ├── sidebar.tsx           # Navigation sidebar
│   ├── header.tsx            # Top header bar
│   └── ui/                   # shadcn/ui components
├── docs/                     # Documentation
└── lib/                      # Utilities
\`\`\`

## Documentation

- [Features Guide](./FEATURES.md) - Detailed feature documentation
- [Components Guide](./COMPONENTS.md) - Component API and usage
- [API Reference](./API.md) - Data structures and integrations
