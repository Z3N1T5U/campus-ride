# Real-Time Campus Mobility and Ride Management Platform

## Live Deployment

### Frontend

**Live URL:** `ADD_FRONTEND_DEPLOYMENT_LINK_HERE`

### Backend API

**API URL:** `ADD_BACKEND_DEPLOYMENT_LINK_HERE`

---

## Project Overview

The Real-Time Campus Mobility and Ride Management Platform is a full-stack transportation management system designed for campus environments such as universities, educational institutions, and large organizational campuses.

The platform enables passengers and drivers to seamlessly connect through a centralized ride-booking system while supporting real-time ride updates, driver availability management, analytics, ratings, payments, and demand insights.

Built using the MERN Stack with Socket.IO and Leaflet integration, the platform focuses on efficient ride coordination, scalability, and user experience.

---

## Website Preview

### Ride Booking

(Add Screenshot)

### Driver Ride Request

(Add Screenshot)

### OTP Verification

(Add Screenshot)

### Ride Tracking

(Add Screenshot)

### Driver Dashboard

(Add Screenshot)

### Campus Insights Dashboard

(Add Screenshot)

---

## Key Features

### Authentication & User Management

#### Passenger Features

* User Registration
* User Login
* Secure JWT Authentication
* Profile Management

#### Driver Features

* Driver Registration
* Driver Login
* Vehicle Information Management
* Driver Verification Workflow
* Online / Offline Status Management

---

### Ride Management

#### Passenger

* Create Ride Requests
* Select Pickup Location
* Select Destination
* Passenger Count Support
* Fare Estimation
* Ride Status Tracking

#### Driver

* Receive Nearby Ride Requests
* Accept Ride Requests
* Reject Ride Requests
* Manage Ride Lifecycle

---

### Real-Time Communication

Powered by Socket.IO:

* Live Ride Notifications
* Driver Availability Updates
* Ride Assignment Updates
* Real-Time Status Synchronization
* Session Recovery After Refresh
* Live Ride Completion Events

---

### Ride Lifecycle

Complete ride workflow:

```text
Ride Requested
      ↓
Ride Accepted
      ↓
OTP Verification
      ↓
Ride Started
      ↓
Ride Completed
      ↓
Payment
      ↓
Rating & Feedback
```

---

### Maps & Navigation

* OpenStreetMap Integration
* Leaflet Maps
* Live Driver Tracking
* Pickup Visualization
* Destination Visualization
* Distance & Duration Calculation

---

### Ratings & Feedback

Passengers can:

* Rate Completed Rides
* Provide Written Feedback
* Submit Driver Reviews

The platform maintains:

* Average Driver Ratings
* Driver Feedback Records
* Driver Performance Metrics

---

### Driver Dashboard

Each driver receives:

* Completed Ride Statistics
* Active Ride Count
* Total Earnings
* Average Rating
* Driver Status Monitoring
* Analytics Dashboard

---

### Campus Insights & Analytics

The platform generates:

* Total Rides Completed
* Revenue Generated
* Average Platform Rating
* Most Popular Routes
* Peak Demand Hours
* Demand Prediction Insights

---

### Digital Payments

Supported payment options:

* UPI Payment (Simulated)
* Cash Payment
* Payment Confirmation Workflow
* Payment History Tracking

---

## Technology Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Leaflet
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO

### Authentication

* JWT Authentication
* Password Hashing (bcrypt)

### Database

* MongoDB Atlas

---

## System Architecture

```text
Passenger App                Driver App
       │                           │
       └────────────┬──────────────┘
                    │
               React Frontend
                    │
         Socket.IO + REST APIs
                    │
              Express Backend
                    │
               MongoDB Atlas
                    │
    Analytics + Ratings + Payments
```

---

## Project Structure

```text
campus-ride/
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── utils/
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── middlewares/
│   └── socket.js
│
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone YOUR_REPOSITORY_LINK
```

### Backend Setup

```bash
cd Backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:4000
```

---

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Competition Requirements Covered

### Mandatory Features

* User Authentication
* Driver Onboarding
* Driver Availability Management
* Ride Request Workflow
* Real-Time Ride Updates
* Ride Lifecycle Management
* Driver Dashboard
* Ratings & Feedback

### Additional Features

* Live Map Integration
* Digital Payments
* Ride History
* Campus Analytics Dashboard
* Demand Prediction
* Driver Performance Analytics

---

## Future Enhancements

* Ride Scheduling
* Dynamic Pricing
* Advanced Demand Forecasting
* Campus Shuttle Integration
* Production Payment Gateway
* AI-Based Ride Demand Prediction

---
