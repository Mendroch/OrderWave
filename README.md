# OrderWave

![OrderWave logo](https://github.com/Mendroch/OrderWave/blob/main/src/app/assets/icons/logo.png)

A full-stack web application for restaurant ordering and management. Customers browse the menu, build a cart, and place orders without waiting in queues. Restaurant owners manage dishes, menu sections, orders, and restaurant info from a dedicated panel.

## Features

### Client

- Browse the restaurant menu organized by sections
- View dish details (variants, ingredients, prices)
- Add dishes to a shopping cart with quantity controls
- Choose a delivery method — pick-up, table service, or take-away
- Checkout with order summary and confirmation number

### Owner

- Full CRUD for dishes (create, edit, delete) with image upload
- Organize the menu into sections
- Manage incoming orders and confirm completion
- Edit restaurant info (name, address, hours, currency)
- SMS notifications to customers via Infobip

### General

- Multi-language support (English & Polish) via i18next
- Responsive, mobile-friendly UI
- Animated transitions with Framer Motion
- Form validation with React Hook Form

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite 6 |
| Routing | React Router v7 |
| State | Redux Toolkit + RTK Query |
| Styling | Styled Components, Framer Motion |
| Backend | Node.js, Express 5, ts-node (ESM) |
| Database | MongoDB, Mongoose 9 |
| Testing | Jest 30, Testing Library, ts-jest |
| File Upload | FilePond |
| i18n | i18next, react-i18next |
| SMS | Infobip API |

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/Mendroch/OrderWave.git
cd OrderWave
npm install
```

Create a `.env` file in the project root with:

```
MONGO_URI=<your-mongodb-connection-string>
INFOBIP_API_KEY=<your-infobip-api-key>
INFOBIP_BASE_URL=<your-infobip-base-url>
INFOBIP_SENDER=<sender-phone-number>
```

### Running

```bash
# Start both frontend and backend concurrently
npm run devStart

# Or separately:
npm run dev      # Vite dev server
npm run server   # Express backend
```

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

The test suite includes ~190 tests across frontend and backend, split into two Jest projects (`jsdom` for React components, `node` for server logic).

## API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/dishes` | GET, POST, PUT/:id, DELETE/:id | Dish management |
| `/orders` | GET, POST, DELETE/:id | Order management |
| `/sections` | GET, POST, PUT/:id, DELETE/:id | Menu sections |
| `/restaurant` | GET, PUT/:id | Restaurant info |
| `/currency` | GET | Currency setting |

## Project Structure

```
src/
├── app/                  # Frontend (React)
│   ├── assets/           # Icons, fonts, global styles
│   ├── components/       # Atomic Design (atoms → molecules → organisms → templates)
│   ├── constants/        # App-wide constants
│   ├── enums/            # Database field enums
│   ├── features/         # Redux slices & RTK Query APIs
│   ├── helpers/          # Pure utility functions
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Redux store configuration
│   ├── types/            # TypeScript interfaces
│   └── views/            # Page-level components (routes)
├── server/               # Backend (Express)
│   ├── models/           # Mongoose schemas
│   ├── controllers.ts    # Route handlers
│   ├── routers.ts        # Express routers
│   └── server.ts         # Entry point
└── public/
    └── i18n/             # Translation files (en, pl)
```

## License

[Apache-2.0](LICENSE)
