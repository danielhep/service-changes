# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 transit service comparison web application that analyzes changes in transit service schedules between different dates and feeds, primarily focusing on Seattle area transit (King County ietro, Sound Transit, Community Transit) and Caltrain.

## Development Commands

**Package Manager**: This project strictly uses pnpm 9.9.0. Do not use npm or yarn.

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Run production server
pnpm lint       # Run ESLint with TypeScript rules
```

**Environment Setup**: Use `nix-shell` for reproducible development environment if available.

## Architecture

### Tech Stack
- **Next.js 15** with App Router and React Server Components
- **TypeScript** in strict mode with path aliases (`~/` → `./src/`)
- **DuckDB** (`duckdb-async`) for in-memory GTFS data processing
- **Tailwind CSS** with shadcn/ui components (New York variant)
- **T3 Stack** pattern with environment validation

### Key Directories
- `src/app/` - Next.js App Router with dynamic routes `[feedIdentifier]/compareTo/[feedIdentifier2]`
- `src/components/` - React components including `ui/` for shadcn/ui
- `src/data/` - Core business logic for GTFS data processing and feed definitions
- `gtfs/` - Static GTFS data files organized by feed groups and dates

### Core Concepts

**Feed System**: Uses `FeedAndDate` class with identifier format `feedGroupId:feedId:dateId`
- Feed Groups: Transit agencies (KCM, Sound Transit, etc.)
- Feeds: Specific service change periods within agencies
- Date Mappings: Before/after service change dates for weekdays/weekends/holidays

**Data Processing**: 
1. DuckDB queries against GTFS CSV files in `/gtfs/` directories
2. Complex SQL joins across routes, trips, calendar, and stop_times
3. Service day calculation with timezone handling (America/Los_Angeles)
4. Route-level aggregation of trip frequency and duration metrics

**URL Structure**: Feed identifiers are URL-encoded in dynamic routes for comparison pages with SEO metadata generation.

## Configuration Notes

- **TypeScript**: Strict mode with `noUncheckedIndexedAccess`, uses ESM modules targeting ES2022
- **Next.js**: Standalone output for Docker, DuckDB excluded from client bundle via webpack externals
- **Styling**: CSS variables for design tokens, class-based dark mode, Geist font family
- **Docker**: Multi-stage build with distroless runtime image

## Development Patterns

- **Server Components**: Default RSC pattern, selective use of 'use client'
- **Data Fetching**: Server-side DuckDB processing, no client-side database access
- **Component Architecture**: Compound components with Card-based layouts
- **Error Handling**: Zod validation for runtime type safety
- **Environment**: T3 env validation with build-time checking (skip with SKIP_ENV_VALIDATION=1)

When working with GTFS data processing, use the existing SQL template tag pattern and ensure timezone handling is consistent with America/Los_Angeles.