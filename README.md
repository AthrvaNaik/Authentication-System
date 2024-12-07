# Authentication App

This is a full-stack authentication application designed to provide functionalities like user signup, email verification, login, password reset, and route protection. The app is structured into two parts: a backend server built with Express and a frontend built with React.

## Features
- **Signup Page UI**: Allows users to create a new account.
- **Login Page UI**: Allows users to login to their account.
- **Email Verification Page UI**: Handles email verification after user registration.
- **Forgot Password Endpoint**: Allows users to reset their password if forgotten.
- **Reset Password Endpoint**: Allows users to reset their password after receiving a reset email.
- **Protecting Routes**: Secures routes to ensure only authenticated users can access certain pages.
- **Dashboard Page**: A landing page accessible only to authenticated users.
- **Super Detailed Deployment**: Instructions for deploying the app to production.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Email**: Mailtrap for email verification
- **Environment Variables**: dotenv

## Project Structure
```
authentication-app/
│
├── backend/
│   ├── controllers/      # Route controllers for handling logic
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Helper services like email sending
│   ├── utils/            # Utility functions
│   └── index.js          # Main entry point of the backend
│
├── frontend/             # React frontend
│   ├── public/           # Public assets
│   └── src/              # React components and pages
│
└── .env                  # Environment variables for sensitive data
```

## Getting Started

### Prerequisites
- **Node.js** (>= v14.0.0)
- **npm** (>= 6.0.0)
- **MongoDB** (local setup or use MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/authentication-app.git
   ```

2. Install backend dependencies:
   ```bash
   cd authentication-app/backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the `backend/` directory and add your environment-specific variables, such as MongoDB URI, JWT secret, and email configuration.

### Running the Application

To run the app in development mode:

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

### Production Mode

To run the app in production mode:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the backend server:
   ```bash
   npm run start
   ```

### API Endpoints

- `POST /api/auth/signup`: User registration with email verification
- `POST /api/auth/login`: User login with JWT token
- `POST /api/auth/forgot-password`: Send email with reset password link
- `POST /api/auth/reset-password`: Reset password using token
- `GET /api/auth/check-auth`: Check authentication status

## Acknowledgements
- **bcryptjs**: For secure password hashing
- **jsonwebtoken**: For generating and verifying JWT tokens
- **Mailtrap**: For testing email sending in development
- **Mongoose**: For interacting with MongoDB
