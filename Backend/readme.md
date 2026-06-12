# Campus Ride Management Platform - Backend

## Overview

The Campus Ride Management Platform is a real-time transportation management system designed for campus environments such as universities, educational institutions, and large organizational campuses.

The backend powers ride creation, ride assignment, real-time communication, driver management, analytics, ratings, payment tracking, and demand insights.

The system is built using Node.js, Express.js, MongoDB, and Socket.IO, providing low-latency ride coordination between passengers and drivers.

---

## Key Features

### Authentication & Authorization

* JWT-based authentication
* Separate User and Driver accounts
* Secure login and registration
* Protected APIs using middleware
* Token blacklisting for logout

### Driver Management

* Driver registration
* Vehicle information management
* Driver verification workflow
* Online / Offline availability toggle
* Driver profile management

### Ride Management

* Ride request creation
* Ride assignment workflow
* OTP-based ride verification
* Complete ride lifecycle management:

  * Pending
  * Accepted
  * Ongoing
  * Completed
  * Cancelled

### Real-Time Communication

* Socket.IO integration
* Live ride notifications
* Driver assignment updates
* Ride status synchronization
* Active session restoration

### Ratings & Feedback

* Passenger ride ratings
* Written feedback support
* Average driver rating calculation
* Driver performance tracking

### Analytics & Insights

* Campus-wide ride analytics
* Revenue tracking
* Peak demand hour detection
* Popular route analysis
* Demand prediction engine
* Driver performance dashboard

### Payments

* Simulated UPI payments
* Cash payment support
* Payment status tracking
* Payment history support

---

## Tech Stack

### Backend Framework

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### Real-Time Communication

* Socket.IO

### Maps & Geolocation

* OpenStreetMap
* Nominatim APIs
* Leaflet-compatible services

---

## Database Models

### User

Stores passenger information.

Fields:

* Full Name
* Email
* Password
* Socket ID

### Captain

Stores driver information.

Fields:

* Personal Information
* Vehicle Details
* Verification Status
* Availability Status
* Current Location
* Socket ID

### Ride

Stores ride lifecycle data.

Fields:

* Passenger
* Driver
* Pickup
* Destination
* Fare
* Distance
* Duration
* Passenger Count
* Ride Status
* OTP
* Payment Details
* Rating Status

### Rating

Stores passenger feedback.

Fields:

* Ride
* Passenger
* Driver
* Rating
* Feedback

---

## Real-Time Ride Workflow

Passenger Creates Ride
↓
Ride Stored in Database
↓
Nearby Drivers Identified
↓
Socket.IO Notification Sent
↓
Driver Accepts Ride
↓
Passenger Receives Confirmation
↓
OTP Verification
↓
Ride Starts
↓
Ride Ends
↓
Payment
↓
Rating & Feedback

---

## Analytics Engine

The backend generates:

### Campus Insights

* Total rides
* Revenue generated
* Average rating
* Popular route
* Peak demand hour

### Driver Insights

* Completed rides
* Active rides
* Earnings
* Driver ratings
* Performance statistics

### Demand Prediction

Historical ride data is analyzed to estimate periods of increased demand and identify transportation hotspots across campus.

---

## API Modules

### User APIs

* Registration
* Login
* Logout
* Profile Management

### Driver APIs

* Registration
* Login
* Availability Management
* Verification Workflow
* Dashboard Statistics

### Ride APIs

* Create Ride
* Fare Estimation
* Accept Ride
* Start Ride
* End Ride
* Ride History

### Rating APIs

* Submit Rating
* Driver Rating Analytics

### Analytics APIs

* Campus Insights
* Driver Analytics
* Demand Statistics

---

## Environment Variables

Create a `.env` file:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## Future Enhancements

* Ride Scheduling
* Dynamic Pricing
* ML-Based Demand Forecasting
* Real-Time Driver Tracking
* Campus Shuttle Integration
* Production Payment Gateway Integration

---

## Competition Alignment

This project satisfies the major requirements of the Real-Time Campus Mobility and Ride Management Platform challenge:

* Authentication System
* Driver Onboarding
* Ride Request Workflow
* Real-Time Updates
* Ride Lifecycle Management
* Driver Dashboard
* Ratings & Feedback
* Live Map Integration
* Demand Analytics
* Demand Prediction
* Digital Payment Simulation

The platform is designed to demonstrate scalable real-time transportation management within a campus ecosystem.
