# Chatbot

A modern, intelligent chatbot application built with React, TypeScript, and Node.js. Features a sleek web interface with animated backgrounds and seamless integration with AWS Lex backend.

## Features

- Interactive chat interface with real-time messaging
- Animated background for enhanced user experience
- Responsive design with mobile support
- Integration with AWS Lex for natural language processing
- Modern UI components using shadcn/ui
- TypeScript for type safety
- Vite for fast development and building

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