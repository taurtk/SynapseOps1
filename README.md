# Dashboard

A modern, responsive dashboard application built with React, TypeScript, and Node.js. Features a comprehensive admin interface with data visualization, user management, and real-time analytics.

## Features

- **Interactive Dashboard**: Comprehensive admin interface with real-time data visualization and analytics
- **User Management**: Complete user authentication and authorization system with role-based access control
- **Data Visualization**: Charts and graphs using Recharts for displaying metrics and KPIs
- **Responsive Design**: Mobile-first approach with adaptive layouts using Tailwind CSS
- **Modern UI Components**: Built with shadcn/ui components including tables, forms, and navigation
- **Database Integration**: PostgreSQL database with Drizzle ORM for type-safe queries
- **Session Management**: Secure session handling with express-session and connect-pg-simple
- **API Integration**: RESTful API endpoints with proper error handling and validation
- **Real-time Updates**: Live data updates using WebSockets and React Query
- **Form Handling**: Advanced form management with React Hook Form and Zod validation

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy
- **UI Components**: shadcn/ui, Radix UI
- **Charts**: Recharts
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS, PostCSS
- **Deployment**: Replit

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in your database credentials and other configuration

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Log in with your admin credentials
3. Access various dashboard sections including analytics, user management, and settings

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Dashboard pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions and configurations
├── server/          # Backend Node.js server
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Database operations
└── shared/          # Shared types and schemas
    └── schema.ts    # Database schema definitions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/analytics` - Get dashboard analytics data
- `POST /api/auth/login` - User authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Chatbot
## Features

- Interactive chat interface with real-time messaging
- Animated background for enhanced user experience
- Responsive design with mobile support
- Integration with AWS Lex for natural language processing
- Modern UI components using shadcn/ui
- TypeScript for type safety
- Vite for fast development and building
=======
## Features

- **Interactive Chat Interface**: Real-time messaging with persistent session management and conversation history
- **AWS Lex Integration**: Advanced natural language processing using AWS Lex Runtime V2 with bot ID `VJE6YGSH17` and alias `SULA84Q2H9`
- **Session State Management**: Maintains conversation context across messages with automatic session state handling
- **Animated Background**: Dynamic visual effects using Framer Motion for an engaging user experience
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interactions
- **Modern UI Components**: Built with shadcn/ui components including buttons, inputs, and dialogs
- **TypeScript Integration**: Full type safety with custom interfaces for messages and session management
- **Real-time Updates**: Auto-scrolling message feed with timestamp tracking and smooth animations
- **Error Handling**: Robust error handling for AWS Lex communication failures
- **Cognito Authentication**: Secure AWS credentials using Cognito Identity Pool `us-east-1:31a9bdff-be5a-430d-b330-eb6f965ca120`
>>>>>>> REPLACE
