# 🏛️ LGA Management System (MVP)

A **Minimum Viable Product (MVP)** built to digitize citizen registration and record management at the Local Government Area (LGA) level.

The core goal of this project is simple: **Enable staff to register citizens and store their records securely, while allowing citizens to view and verify their information.**

> **Note:** This project intentionally supports **Create & Read (CR)** operations only for this phase.

---

## 🚀 Project Overview

The **LGA Management System** is a full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js). It demonstrates real-world concepts such as authentication, role-based access control (RBAC), protected routes, and centralized data storage.

### 👥 User Roles
1. **Staff** – Registers citizens and manages records.
2. **Citizen** – Views personal records and verifies their account.

---

## ✅ MVP Scope (Features)

### 🏛️ Staff Portal
- **Authentication:** Secure login with email verification.
- **Citizen Registration:** Create new citizen records (CREATE).
- **Record Management:** View list of registered citizens (READ).
- **Search:** Find citizens by NIN (National Identity Number) or Name.
- **Verification Status:** View which citizens have verified their accounts.

### 👤 Citizen Portal
- **Authentication:** Secure login for citizens.
- **Profile Access:** View personal registration details (READ).
- **Account Verification:** Verify email address via One-Time Password (OTP).
- **Status Tracking:** View current account verification status.

> ❗ **Constraint:** This MVP does not include **Update** or **Delete** operations.

---

## 🔐 Authentication & Security
- **JWT Authentication:** Secure stateless authentication using JSON Web Tokens.
- **HTTP-Only Cookies:** Prevents XSS attacks by storing tokens securely.
- **Role-Based Access Control (RBAC):** Restricts access to routes based on user role (Staff vs. Citizen).
- **OTP Verification:** Email-based OTP system for account verification using Nodemailer.

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Email:** Nodemailer

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **State Management:** Context API
- **HTTP Client:** Axios
- **Routing:** React Router

---

## 📂 Project Structure

```bash
LGA/
├── backend/            # API, database models, authentication logic
├── frontend/           # React dashboards (staff & citizen)
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (Local or Atlas)

### 1️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` and add your variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lga_management
JWT_SECRET=your_super_secret_key
SENDER_EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

Start the server:

```bash
npm start
```

### 2️⃣ Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file inside `/frontend` to connect to the API:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run the development server:

```bash
npm run dev
```

Access the app at: `http://localhost:5173`

---

## 🔗 API Endpoints (MVP)

### Staff Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/staff/auth/register` | Register a new staff account |
| POST | `/api/staff/auth/login` | Login as staff |
| POST | `/api/staff/auth/send-verify-otp` | Send verification OTP to staff email |
| POST | `/api/staff/auth/verify-account` | Verify staff account with OTP |
| POST | `/api/staff/register-citizen` | Register a new citizen (Protected) |
| GET | `/api/staff/citizens` | Fetch list of all citizens (Protected) |

### Citizen Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/citizen/auth/login` | Login as citizen |
| POST | `/api/citizen/auth/send-verify-otp` | Send verification OTP to citizen |
| POST | `/api/citizen/auth/verify-account` | Verify citizen account with OTP |
| GET | `/api/citizen/profile` | Get personal profile details (Protected) |

---

## 📌 Project Constraints & Future Scope

### Current Constraints (MVP)
- No Update/Delete operations
- No certificate issuance functionality
- Focus strictly on data registration and visibility

### 🚧 Future Enhancements
- [ ] Certificate generation and download (PDF)
- [ ] Admin role for managing staff
- [ ] Full CRUD operations (Edit/Delete records)
- [ ] Audit logs for staff actions
- [ ] Payment integration for processing fees

---

## 🧠 Summary

This project demonstrates secure authentication, role separation, and a centralized citizen registry within a clean, usable interface. It is built to simulate a real-world government system phase 1—intentionally minimal, complete, and defensible as an MVP.

For reference, check out this practical guide: [MERN Stack Tutorial for Beginners with Deployment – 2025](https://www.youtube.com/watch?v=F9gB5b4jgOI)