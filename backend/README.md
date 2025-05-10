# Car Management System Backend

A Node.js backend API for managing car assets with user authentication.

## Features

- User authentication (signup/login) with JWT
- Car asset management (create, list)
- User profile management
- SQLite database with Prisma ORM
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

3. Create a `.env` file with the following variables:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-key-change-this-in-production"
```

## Development

Run the development server:
```bash
npm run dev
```

## Build

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/signup - Register a new user
- POST /api/login - Login user

### Assets (Cars)
- GET /api/assets - Get all cars for logged-in user
- POST /api/assets - Create a new car

### Profile
- PUT /api/profile - Update user profile

## Security

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Input validation and sanitization
- CORS enabled 