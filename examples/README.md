# Privy Agent NextJS Starter

A modern, full-stack web application starter kit that integrates Privy authentication with Solana Agent Kit for building secure and scalable web3 applications.

## Features

- 🔐 **Privy Authentication**: Server-side authentication using `@privy-io/server-auth`
- ⛓️ **Solana Integration**: Built-in Solana wallet and token management using `solana-agent-kit`
- 🚀 **Next.js 15**: Built on the latest Next.js framework with App Router
- 💾 **Database Integration**: Uses Drizzle ORM with PostgreSQL
- 🎨 **Modern UI**: Styled with Tailwind CSS and Radix UI components
- 📝 **Rich Text Editing**: Includes CodeMirror and ProseMirror integration
- ✅ **Type Safety**: Full TypeScript support
- 🧪 **Testing**: Configured with Playwright for end-to-end testing

## Prerequisites

- Node.js 18+ 
- pnpm 9.12.3+
- PostgreSQL database

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   PRIVY_APP_ID=your_privy_app_id
   PRIVY_APP_SECRET=your_privy_app_secret
   ```

4. Initialize the database:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm format` - Format code
- `pnpm test` - Run Playwright tests

### Database Commands
- `pnpm db:generate` - Generate database schemas
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:push` - Push schema changes
- `pnpm db:check` - Check schema changes

## Project Structure

```
├── app/           # Next.js app directory
├── components/    # React components
├── lib/          # Utility functions and libraries
├── hooks/        # Custom React hooks
├── public/       # Static assets
├── tests/        # Playwright tests
└── artifacts/    # Build artifacts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms of the license included in the [LICENSE](LICENSE) file.
