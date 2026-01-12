# 🍔 GoFood — Full-Stack Food Delivery Platform

GoFood is a modern full-stack food ordering web application built using the **MERN stack**.  
It allows users to browse food items, add them to a cart, place orders, and manage their accounts with secure authentication.

The application is fully deployed on the cloud with a **production-grade architecture** using **Vercel, Render, and MongoDB Atlas**.

---

## 🌐 Live Demo

Frontend (Vercel):  
👉 https://foodiewe.vercel.app  

Backend API (Render):  
👉 https://foodewe-1.onrender.com  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap / Custom CSS
- Context API (for Cart & State Management)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- REST API Architecture

### Cloud & Deployment
- Frontend hosted on **Vercel**
- Backend hosted on **Render**
- Database hosted on **MongoDB Atlas**

---

## ✨ Features

- User authentication (Signup / Login with JWT)
- Browse food items and categories
- Add items to cart
- Place and view orders
- Real-time order total calculation
- Secure backend APIs
- Fully deployed cloud-based system

---

## 🧩 Project Architecture

```
User Browser
      ↓
Vercel (React Frontend)
      ↓
Render (Node + Express Backend)
      ↓
MongoDB Atlas (Cloud Database)
```

---

## 📂 Folder Structure

### Frontend
```
frontend/
  ├── src/
  │   ├── components/
  │   ├── screens/
  │   ├── App.js
  │   └── index.js
  ├── public/
  └── package.json
```

### Backend
```
backend/
  ├── models/
  ├── routes/
  ├── db.js
  ├── index.js
  └── package.json
```

---

## ⚙️ Installation & Setup (Local)

### 1️⃣ Clone the repositories
```bash
git clone https://github.com/yourusername/gofood-frontend
git clone https://github.com/yourusername/gofood-backend
```

---

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

Start backend:
```bash
node index.js
```

---

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Backend uses:
- `MONGO_URI` – MongoDB Atlas connection string
- `JWT_SECRET` – JWT token secret

---

## 📌 Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Database hosted on **MongoDB Atlas**

The frontend communicates securely with the backend using CORS-enabled REST APIs.

---

## 🚀 Future Improvements

- Online payment integration (Razorpay / Stripe)
- Admin dashboard for managing orders and food items
- Order tracking system
- User profile management
- Mobile app version

---

## 👨‍💻 Author

**Anuj Raj**  
Full-Stack Developer  
GitHub: https://github.com/anujrajincludemyself  

---

## ⭐ If you like this project

Please give this repository a ⭐ — it helps a lot!
