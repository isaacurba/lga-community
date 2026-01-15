LGA Management System (MVP)

A Minimum Viable Product (MVP) built to digitize citizen registration and record management at the Local Government Area (LGA) level.

The core goal of this project is simple:

Enable staff to register citizens and store their records securely, while allowing citizens to view and verify their information.

This project intentionally supports Create & Read (CR) operations only.

🚀 Project Overview

The LGA Management System is a full-stack web application built with the MERN stack.
It demonstrates real-world concepts such as authentication, role-based access, protected routes, and centralized data storage.

The system supports two user roles:

Staff – registers citizens and manages records

Citizen – views personal records and verifies account

✅ MVP Scope (What This Project Does)
🏛️ Staff Portal

Staff authentication (login + email verification)

Register new citizens (CREATE)

View registered citizens (READ)

Search citizens by NIN or name

View citizen verification status

👥 Citizen Portal

Citizen authentication (login)

View personal registration details (READ)

Email verification via OTP

View account verification status

❗ This MVP does not include Update or Delete operations.

🔐 Authentication & Security

JWT-based authentication

HTTP-only cookies

Role-Based Access Control (RBAC)

OTP email verification for accounts

🛠️ Tech Stack
Backend (/backend)

Node.js

Express.js

MongoDB

Mongoose

JWT

Nodemailer

Frontend (/frontend)

React (Vite)

Tailwind CSS

Shadcn UI

Context API

Axios

React Router

📂 Project Structure
LGA/
├── backend/            # API, database models, authentication logic
├── frontend/           # React dashboards (staff & citizen)
└── README.md

⚡ Getting Started
Prerequisites

Node.js (v16+)

npm

MongoDB (Local or Atlas)

🔧 Backend Setup
cd backend
npm install


Create a .env file inside /backend:

PORT=5000
MONGO_URI=mongodb://localhost:27017/lga_management
JWT_SECRET=your_jwt_secret


Start the backend server:

npm start

🎨 Frontend Setup
cd frontend
npm install


Create a .env file inside /frontend:

VITE_BACKEND_URL=http://localhost:5000


Start the frontend:

npm run dev


Access the app at:

http://localhost:5173

🔗 API Endpoints (MVP)
Staff

POST /api/staff/auth/register

POST /api/staff/auth/login

POST /api/staff/auth/send-verify-otp

POST /api/staff/register-citizen

GET /api/staff/citizens

Citizen

POST /api/citizen/auth/login

POST /api/citizen/auth/send-verify-otp

GET /api/citizen/profile

📌 Project Constraints

No Update/Delete operations

No certificate issuance in MVP

Focus on data registration and visibility

Realistic government system first phase

🚧 Future Enhancements (Out of Scope)

Certificate requests and issuance

Admin role

Full CRUD operations

Audit logs

Payments

🧠 Summary

This project demonstrates:

Secure authentication

Role separation

Centralized citizen registry

Clean and usable dashboards

Real-world government use case

It is intentionally minimal, complete, and defensible as an MVP.