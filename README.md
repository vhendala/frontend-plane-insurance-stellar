# Stellar Flight Insurance Frontend

A modern React application for flight insurance powered by the Stellar network, built with the Stellar Wallets Kit for seamless wallet integration.

## Features

- 🔗 **Wallet Integration**: Connect with Freighter, Albedo, and other Stellar wallets
- 💰 **Balance Management**: View and manage XLM balances
- 🛡️ **Flight Insurance**: Purchase insurance policies for flights
- 📊 **Dashboard**: Track policies and claims
- 🎨 **Modern UI**: Custom components styled with Tailwind CSS
- ✈️ **Airlines list**: Integrated with a local OpenFlights API for airline data
- ⚡ **Fast & Secure**: Powered by Stellar blockchain technology

## Tech Stack

- **React 19** with TypeScript
- **Stellar Wallets Kit** for wallet integration
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for build tooling

### Optional local API (OpenFlights)
- **Express** server that exposes airline data from OpenFlights CSV
- **csv-parser**, **node-cache**, native **https**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Stellar wallet (Freighter recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-plane-insurance-stellar
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp env.example .env
```

4. Configure your environment:
   - Edit `.env` to set your preferred Stellar network
   - Default is LOCAL for development

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### (Optional) Start the OpenFlights API server
If you want to populate the Airline select with real data, start the local API:

```bash
cd openflights-api/openflights-api
npm install
npm start
```

API endpoints:
- Health check: `http://localhost:3001/api/health`
- Airlines: `http://localhost:3001/api/airlines`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Stellar Network Configuration

The application supports multiple Stellar networks:

- **LOCAL**: For local development with Stellar Core
- **TESTNET**: Stellar testnet for testing
- **FUTURENET**: Stellar futurenet for testing
- **PUBLIC**: Stellar mainnet for production

Configure the network in your `.env` file.

## Wallet Integration

This application uses the Stellar Wallets Kit to support multiple wallet providers:

- Freighter
- Albedo
- Rabet
- And more...

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ConnectAccount.tsx
│   ├── FundAccountButton.tsx
│   ├── NetworkPill.tsx
│   └── WalletButton.tsx
├── hooks/              # Custom React hooks
│   ├── useNotification.ts
│   ├── useWallet.ts
│   └── useWalletBalance.ts
├── pages/              # Application pages
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   └── BuyInsurance.tsx
├── providers/          # React context providers
│   ├── NotificationProvider.tsx
│   └── WalletProvider.tsx
├── util/               # Utility functions
│   ├── friendbot.ts
│   ├── storage.ts
│   └── wallet.ts
└── contracts/          # Stellar contract utilities
    └── util.ts

openflights-api/
└── openflights-api/     # Local Express API for airline data
    ├── index.js         # API server (ports 3001 by default)
    └── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.