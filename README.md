# Taskify 
A secure and scalable task management application built as part of a Backend Developer Internship assignment.

# How to Run the Project
# 1️ Backend Setup
- cd server
- npm install
- npm run dev
- Server runs at:http://localhost:4000

# 2️ Frontend Setup
- cd client
- npm install
- npm run dev
- Frontend runs at:http://localhost:5173

# Environment Variables
# Backend .env
- PORT=4000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret

# Frontend .env
- VITE_API_URL=http://localhost:4000

---

##  Project Overview

**Taskify** is a full-stack task management system that demonstrates:
- Secure authentication using JWT
- Role & ownership-based access control
- RESTful API design
- Scalable backend structure
- Simple and functional frontend for API interaction

The project focuses primarily on **backend engineering**, with a clean React frontend to test and demonstrate APIs.

---

##  Features

###  Authentication & Authorization
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Session handling

###  Role & Ownership Control
- Users can **update only their own tasks**
- Admin-level permissions handled on backend
- Secure authorization enforced server-side

###  Task Management (CRUD)
- Create tasks
- View all tasks
- Update tasks (creator only)
- Delete tasks (backend controlled)
- Task status tracking (completed / pending)

###  Backend Highlights
- REST API design
- API versioning
- Error handling & validation
- MongoDB with Mongoose
- Reference population (`createdBy → username`)
- Modular folder structure

###  Frontend Highlights
- React + Vite
- Tailwind CSS
- JWT handling via localStorage
- Protected routes
- Update modal UI
- Toast notifications
- Hero landing page

---

##  Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Toastify

