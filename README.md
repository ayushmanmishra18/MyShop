🌐 Overview

**MyShop** is a dynamic and scalable full-stack 🛒 eCommerce application with features like:

✨ **OTP-based user authentication**  
🧾 **Shopping cart and Stripe checkout**  
📦 **Order tracking and admin management**  
🎛️ **Admin dashboard for full control**  
Built with the powerful **MERN (MongoDB, Express, React, Node.js)** stack.

---

## 🚀 Key Features

### 👥 User Side
- 🔐 Register/Login with OTP via email
- 🛍️ Browse products by category
- 🛒 Add/remove products to cart
- 💳 Secure checkout via Stripe
- 📜 View profile and order history

### 🛠️ Admin Side
- 🧑‍💼 Role-based admin login
- 📦 Manage products (CRUD)
- 📋 View & manage orders
- 📊 Admin dashboard panel

---

## 📁 Project Structure


modern-ecommerce/
├── client/ # React frontend
│ └── src/pages/ # User Pages
│ └── src/pages/admin/ # Admin Pages
├── server/ # Node.js/Express backend
│ ├── routes/ # API Endpoints
│ ├── models/ # Mongoose Models
│ └── config.env # Env Config (not included)



## 🧠 Tech Stack

| Layer       | Technologies Used                                         |
|-------------|-----------------------------------------------------------|
| 💻 Frontend | React.js, Axios, React Router, Context API                |
| 🧠 Backend  | Node.js, Express.js, Mongoose, Nodemailer, JWT            |
| 💾 Database | MongoDB (Cloud or Local)                                  |
| 💰 Payments | Stripe Integration                                        |
| 🔐 Security | OTP, JWT, dotenv, Role-based access                       |

---

## 🔐 Authentication & Payments

- ✅ Email-based OTP verification via **Nodemailer**
- 🔑 JWT-based user sessions with role differentiation
- 💳 Secure payments through **Stripe API**

---

## 📡 Sample API Endpoints

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| POST   | `/api/auth/register`      | Register with email OTP     |
| POST   | `/api/auth/verify-otp`    | Verify OTP                  |
| POST   | `/api/auth/login`         | User login                  |
| GET    | `/api/products`           | Get product list            |
| POST   | `/api/cart`               | Add/update user cart        |
| POST   | `/api/orders`             | Place order (Stripe)        |

---

## ⚙️ Setup & Installation

### 📦 Prerequisites
- Node.js v14+
- MongoDB Atlas or Local DB
- Stripe Developer Account

---

### 🛠️ Steps

1. **Clone the Repository**

git clone https://github.com/ayushmanmishra18/MyShop.git
Install Client Dependencies


cd client
npm install
Install Server Dependencies


cd ../server
npm install
Start Backend


cd server
npm run dev
Start Frontend


cd ../client
npm start
🌍 App runs at:

Client: http://localhost:3000

Server: http://localhost:5000

📄 Environment Variables
Create a .env file inside /server with the following:


PORT=5000
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
📸 Screenshots (optional)
Add a few UI screenshots here – product page, cart, checkout, and admin dashboard for better visual appeal.

📜 License
Licensed under the MIT License.
Free to use, modify, and share 🙌

🙋‍♂️ Author
Ayushman Mishra
📧 ayushmanmishraji@gmail.com
🔗 GitHub Profile

