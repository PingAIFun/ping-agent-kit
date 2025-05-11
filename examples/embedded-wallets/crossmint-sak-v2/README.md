<div align="center">

# Crossmint Solana Agent

![Crossmint Solana Agent Banner](https://github.com/samridhi2003/solana-agent-kit-crossmint/raw/main/public/banner.png)

</div>

A modern web application built with TanStack Router, React, and Solana integration, featuring authentication via Crossmint and AI capabilities.

## 🚀 Features

- **Authentication**: Secure wallet authentication powered by Crossmint
- **Solana Integration**: Built with Solana Agent Kit for blockchain interactions
- **AI Capabilities**: OpenAI integration for intelligent features
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: TanStack Router for type-safe routing
- **Development Tools**: Biome for linting and formatting

## 🛠️ Tech Stack

- **Frontend**: React 19, TanStack Router
- **Authentication**: Crossmint
- **Blockchain**: Solana Web3.js, Solana Agent Kit
- **Styling**: Tailwind CSS, Radix UI
- **Database**: PostgreSQL, Drizzle ORM
- **AI**: OpenAI SDK
- **Development**: TypeScript, Biome, Vinxi

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crossmint-solana-agent.git
cd crossmint-solana-agent
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
VITE_CROSSMINT_SECRET=your_crossmint_secret
VITE_RPC_URL=your_solana_rpc_url
```

4. Run database migrations:
```bash
pnpm db:generate
pnpm db:migrate
```

## 🚀 Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 🧹 Linting and Formatting

Run linting:
```bash
pnpm lint
```

Fix linting issues:
```bash
pnpm lint:fix
```

## 📦 Database Management

- Generate migrations: `pnpm db:generate`
- Run migrations: `pnpm db:migrate`
- Open database studio: `pnpm db:studio`
- Push schema changes: `pnpm db:push`
- Pull schema changes: `pnpm db:pull`
- Check schema: `pnpm db:check`
- Update schema: `pnpm db:up`

## 🏗️ Project Structure

```
src/
├── components/     # React components
├── functions/     # Server-side functions
├── hooks/         # Custom React hooks
├── lib/           # Library code and utilities
├── routes/        # Application routes
├── styles/        # Global styles
└── utils/         # Utility functions
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👥 Contributors

- [Samridhi](https://github.com/samridhi2003) 
