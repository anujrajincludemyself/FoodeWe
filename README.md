🍔 GoFood — Full-Stack Food Ordering Platform

GoFood is a modern full-stack food delivery web application built using the MERN stack.
It allows users to browse food items, add them to a cart, place orders, and track their previous orders with secure authentication.

This project was designed to simulate a real-world food delivery system similar to Swiggy or Zomato, focusing on scalability, performance, and user experience.

=>  Live Features

User authentication using JWT

Secure login & signup

Dynamic food menu from MongoDB

Category-based food listing

Smart Add to Cart

Order history

Responsive modern UI

Real-time cart updates

Backend REST APIs

🛠️ Tech Stack
Frontend

-> React.js

-> React Router

-> Context API (Cart State Management)

-> Bootstrap 5 (Dark Theme UI)

-> JavaScript (ES6)

-> Backend

-> Node.js

-> Express.js

-> MongoDB

-> Mongoose

-> JWT Authentication

-> Bcrypt.js (Password hashing)

-> REST API

-> Database

-> MongoDB Atlas


🔐 Authentication Flow

User signs up → Password is hashed using bcrypt

JWT token is generated

Token is stored in localStorage

Protected routes use JWT for authorization

This ensures secure access to cart, orders, and user data.

📦 Main Modules
Module	Description
Signup/Login	Secure user authentication
Home	Food browsing with search
Cart	Add, update, remove items
Orders	View previous orders
Backend APIs	Authentication, Food Data, Orders
🗂️ Project Structure
GoFood
├── backend
│   ├── models
│   ├── routes
│   ├── db.js
│   └── index.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── screens
│   │   ├── ContextReducer.js
│   │   └── App.js

⚙️ How It Works

Frontend requests food data from backend

Backend fetches from MongoDB

Food items are displayed with category filtering

User adds items to cart

Orders are stored in MongoDB

User can see past orders anytime

🧠 What I Am Currently Improving

This project is actively being enhanced with:

🔹 UI redesign (modern card layout, cleaner navbar)

🔹 Image carousel & homepage design

🔹 Better responsive layout

🔹 Cart UI & checkout flow

🔹 Performance optimization

🔹 Payment gateway integration (coming soon)

🔹 Admin panel (planned)

📌 Why This Project Stands Out

Uses real-world architecture

Clean separation between frontend & backend

Secure authentication

Database-driven dynamic UI

Scalable API structure

Recruiter-ready project
