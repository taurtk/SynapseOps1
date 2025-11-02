# Chatbot

A modern, intelligent chatbot application built with React, TypeScript, and Node.js. Features a sleek web interface with animated backgrounds and seamless integration with AWS Lex backend.

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

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: Drizzle ORM
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS, PostCSS
- **Deployment**: Replit

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in your AWS Lex credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Start chatting with the bot
3. The bot will respond using AWS Lex integration

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── hooks/       # Custom React hooks
├── server/          # Backend Node.js server
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage logic
└── shared/          # Shared types and schemas
    └── schema.ts    # Database schema
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.