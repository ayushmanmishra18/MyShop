<h1 align="center">🛍️ MyShop</h1>
<p align="center">A modern full-stack eCommerce platform built with the MERN stack</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-informational?style=flat-square&logo=mongodb&logoColor=white&color=4AB197"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
  <img src="https://img.shields.io/badge/Status-Production-blue?style=flat-square"/>
</p>

---

## 📦 About the Project

**MyShop** is a sleek and scalable full-stack eCommerce application with essential features for both customers and administrators. Built using the powerful **MERN** stack, it includes:

- 🔐 OTP-based secure user authentication  
- 🛍️ Real-time product browsing and cart  
- 💳 Stripe-powered payment system  
- 🧑‍💼 Admin dashboard for product and order control  
- 📊 Order tracking & user profiles  

---

## ✨ Features Overview

### 👤 User Module
- ✅ Register and login via email OTP verification
- 🛒 Add/remove products from the cart
- 💳 Secure Stripe checkout flow
- 📜 View past orders and profile

### 🛠️ Admin Module
- 🔐 Role-based access for Admin
- 📦 Add, edit, or remove products
- 📋 View and update order statuses
- 🧾 Dashboard analytics (basic)

---

## 🧠 Tech Stack

| Category    | Technology                                        |
|-------------|---------------------------------------------------|
| 🖥 Frontend  | React.js, React Router, Axios, Context API        |
| 🧠 Backend   | Node.js, Express.js, Mongoose, Nodemailer, JWT    |
| 💾 Database  | MongoDB (Cloud/Local)                             |
| 🔒 Security  | OTP, JWT, Role-based Access                       |
| 💳 Payments  | Stripe Integration                                |

---

## 📁 Project Structure

modern-ecommerce/
├── client/ # React frontend
│ ├── src/pages/ # User pages
│ └── src/pages/admin/ # Admin dashboard
├── server/ # Express backend
│ ├── routes/ # API endpoints
│ ├── models/ # MongoDB schemas
│ └── config.env # Environment variables


---

## ⚙️ Getting Started

### 📋 Prerequisites
- Node.js (v14 or above)
- MongoDB (local or Atlas)
- Stripe test account

---

### 🛠 Installation


# Clone the repository
git clone https://github.com/ayushmanmishra18/MyShop.git
cd MyShop

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start

Frontend ➝ http://localhost:3000
Backend ➝ http://localhost:5000

🔐 Environment Variables
Create a .env file inside /server with the following values:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | `/api/auth/register`   | Register & send OTP |
| POST   | `/api/auth/verify-otp` | Verify OTP          |
| POST   | `/api/auth/login`      | User login          |
| GET    | `/api/products`        | List products       |
| POST   | `/api/cart`            | Manage cart         |
| POST   | `/api/orders`          | Place order         |


📄 License
Distributed under the MIT License.
Feel free to use, modify, and share 🚀

🙋‍♂️ Author
Ayushman Mishra
📧 ayushmanmishraji@gmail.com
🔗 GitHub

⭐️ Support
