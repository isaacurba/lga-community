# LGA Management System

A comprehensive full-stack application designed to digitize and streamline Local Government Area (LGA) operations. This system facilitates staff management, citizen registration, identity verification, and certificate issuance through a secure and modern web interface.

## 🚀 Project Overview

The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and is divided into two main components:

*   **Frontend**: A responsive, interactive dashboard for staff and citizens.
*   **Backend**: A robust REST API handling business logic, database operations, and authentication.

## ✨ Key Features

### 🔐 Security & Authentication
*   **Staff Onboarding**: Secure registration flow with email OTP verification.
*   **Authentication**: JWT-based session management.
*   **RBAC**: Role-Based Access Control to separate Staff and Citizen privileges.

### 🏛️ Administrative Dashboard
*   **Analytics**: Real-time overview of registered citizens, issued certificates, and active staff.
*   **Staff Management**: Tools for administrators to oversee workforce.

### 👥 Citizen Services
*   **Digital Registry**: Centralized database for citizen records.
*   **NIN Integration**: Search and verification using National Identity Numbers.
*   **Certificate Issuance**: Automated generation of LGA certificates.

## 🛠️ Tech Stack

### Backend (`/backend`)
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB
*   **ODM**: Mongoose

### Frontend (`/frontend`)
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS
*   **UI Library**: Shadcn UI
*   **State Management**: Context API
*   **HTTP Client**: Axios

## 📂 Repository Structure

```text
LGA/
├── backend/            # Server-side logic and API endpoints
├── frontend/           # Client-side React application
└── README.md           # Project documentation
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn
*   MongoDB (Local instance or Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd LGA
    ```

### 1. Backend Setup

Navigate to the backend directory to set up the server first.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lga_management
JWT_SECRET=your_secure_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

### 2. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and install dependencies.

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the React development server:

```bash
npm run dev
```

The application should now be accessible at `http://localhost:5173`.

## 🔗 API Integration

The application communicates with a backend server via `axios`. The base URL is managed via the `AppContext`.

*   **Auth Endpoints**: `/api/staff/auth/register`, `/api/staff/auth/login`, `/api/staff/auth/verify-account`
*   **Citizen Endpoints**: `/api/staff/auth/register-citizen`

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.