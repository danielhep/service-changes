# Service Change Analysis

A transit service comparison web application that analyzes changes in transit service schedules between different dates and feeds. Compare service changes across King County Metro, Sound Transit, Community Transit, and Caltrain to understand how transit schedules evolve over time.

## Features

- **Service Comparison**: Compare transit schedules between different service change periods
- **Multi-Agency Support**: Analyze data from King County Metro, Sound Transit, Community Transit, and Caltrain
- **Route-Level Analysis**: View changes in trip frequency, duration, and service patterns by route
- **Preset Comparisons**: Quick access to common service change comparisons
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Next.js 15** with App Router and React Server Components
- **TypeScript** with strict type checking
- **DuckDB** for high-performance GTFS data processing
- **Tailwind CSS** with shadcn/ui components
- **GTFS Data** - General Transit Feed Specification for schedule analysis

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm 9.9.0 (strictly required - do not use npm or yarn)

### Installation

```bash
git clone <repository-url>
cd service-changes
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Other Commands

```bash
pnpm build      # Build for production
pnpm start      # Run production server
pnpm lint       # Run ESLint
```

## Data Sources

The application uses GTFS (General Transit Feed Specification) data stored in the `/gtfs/` directory. Each feed represents a specific service period for a transit agency, allowing for before/after comparisons of schedule changes.

## Architecture

Built on the [T3 Stack](https://create.t3.gg/) foundation with additional specialized components:

- **DuckDB Integration**: In-memory SQL processing of GTFS CSV files
- **Feed Management System**: Structured handling of transit agency data and service periods  
- **Dynamic Routing**: URL-based feed comparison with SEO metadata generation
- **Server-First Processing**: Heavy data analysis performed server-side for optimal performance

## Deployment

The application includes Docker configuration for containerized deployment. Note that GTFS data files are not included in the Docker image and must be provided via volume mount:

```bash
docker build -t service-changes .
docker run -p 3000:3000 -v /path/to/gtfs:/app/gtfs service-changes
```

Where `/path/to/gtfs` is the local directory containing your GTFS data files organized by feed group and period.
