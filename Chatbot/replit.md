# Overview

SynapseOps is a futuristic AI assistant chat interface featuring a two-stage user experience. The application begins with an animated welcome screen showcasing the SynapseOps branding, then transitions to an intelligent chat interface where users can interact with an AI assistant. The design emphasizes a sci-fi aesthetic with glassmorphism effects, animated backgrounds, and a carefully crafted color palette inspired by modern tech interfaces.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom design system based on SynapseOps brand colors
- **Component Library**: Radix UI primitives with shadcn/ui component system for consistent, accessible UI components

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API with JSON communication
- **Session Management**: Simple session-based chat organization using session IDs
- **Storage Strategy**: In-memory storage for development with interface for database integration
- **AI Response System**: Rule-based response generation with keyword matching for prototype functionality

## Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Design**: Simple messages table with user/bot identification and session grouping
- **Migration Support**: Drizzle Kit for database schema migrations
- **Database Provider**: Configured for PostgreSQL with Neon Database integration

## Design System
- **Color Palette**: Deep slate blue backgrounds (#1A202C) with calm cerulean blue accents (#4D9DE0)
- **Typography**: Inter font family for modern, readable text
- **Visual Effects**: Glassmorphism containers, animated network backgrounds, and pulsing glow effects
- **Responsive Design**: Mobile-first approach with seamless scaling across devices

## Development Workflow
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled
- **Code Organization**: Modular component structure with clear separation of concerns
- **Asset Management**: Centralized asset handling through Vite's asset system
- **Development Server**: Hot module replacement for rapid development iteration

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database for production deployment
- **Connection Management**: Environment-based database URL configuration

## UI Framework Dependencies
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for cross-browser compatibility
- **React Hook Form**: Form handling with validation support via Zod schemas

## Animation and Visual Effects
- **Canvas API**: Custom animated background with network visualization
- **CSS Animations**: Glassmorphism effects and smooth transitions
- **Dynamic Styling**: Runtime style calculations for pulsing and glow effects

## Hosting and Deployment
- **Replit Integration**: Development environment with live reload capabilities
- **Static Asset Serving**: Express.js static file serving for production deployment
- **Environment Configuration**: Environment variable management for different deployment stages