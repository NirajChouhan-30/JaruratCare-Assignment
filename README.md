# Jarurat Care – AI-Powered Healthcare Support Platform

## Overview

Jarurat Care is a full-stack healthcare support platform designed to help NGOs connect patients in need with volunteers who can provide assistance.

The platform streamlines support requests, volunteer registration, and case management through an AI-powered analysis system that helps prioritize and categorize patient needs.

---

## Problem Statement

Many patients, especially elderly individuals and those in underserved communities, struggle to access healthcare support services such as:

- Medical assistance
- Medicine delivery
- Transportation to hospitals
- Elderly care support
- Mental health assistance
- Financial assistance

NGOs often receive large numbers of requests and need an efficient way to identify urgent cases and assign volunteers quickly.

---

## Solution

Jarurat Care provides:

### Patient Support Portal

Patients or family members can submit healthcare support requests through an easy-to-use form.

### Volunteer Registration Portal

Volunteers can register their skills, location, and availability to help NGOs coordinate assistance.

### AI-Powered Request Analysis

Google Gemini AI automatically analyzes support requests and generates:

- Request Summary
- Priority Level (Low / Medium / High)
- Category Classification
- Recommended Volunteer Action

### Admin Dashboard

Authorized administrators can:

- View support requests
- Review AI-generated insights
- View volunteer registrations
- Assign volunteers to patient requests
- Track request status

---

## Features

### Public Features

- Responsive Home Page
- Patient Support Request Form
- Volunteer Registration Form
- Mobile-Friendly Design

### AI Features

- Google Gemini Integration
- Automatic Request Summarization
- Priority Detection
- Support Category Classification
- Recommended Action Generation

### Admin Features

- Secure Admin Login
- JWT Authentication
- Protected Dashboard
- Volunteer Management
- Support Request Management
- Volunteer Assignment System
- Logout Functionality

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### AI

- Google Gemini 2.5 Flash API

### Authentication

- JWT (JSON Web Token)
- bcryptjs

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## AI Workflow

1. User submits a support request.
2. Backend sends the request description to Gemini AI.
3. Gemini analyzes the request.
4. AI returns:
   - Summary
   - Priority
   - Category
   - Recommended Action

5. Results are stored in MongoDB.
6. Admin reviews the request in the dashboard.

---

## Request Assignment Workflow

Patient Request

↓

AI Analysis

↓

Admin Review

↓

Volunteer Assignment

↓

Status Updated

↓

Support Delivered

---

## Admin Credentials

Create an admin using:

```bash
node scripts/createAdmin.js
```

Then login using the generated admin account.

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd jaruratcare
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## Future Improvements

- Email Notifications
- Volunteer Login Portal
- Request Status Updates
- Real-Time Dashboard Updates
- SMS Alerts
- Analytics & Reporting
- Multi-Admin Support

---

## Impact

Jarurat Care demonstrates how AI can assist NGOs in managing healthcare support requests more efficiently by reducing manual effort, prioritizing urgent cases, and connecting patients with volunteers faster.

This project was developed as part of a Full Stack Developer Internship Assignment.
