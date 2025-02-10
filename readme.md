🛒 E-commerce API (Node.js) A robust E-commerce API designed to manage user roles (Admin, Staff, Vendor, Buyer) with secure authentication, role-based permissions, and complete CRUD operations. Built using Node.js and a relational database (MySQL/MongoDB), it ensures smooth product and user management.

🚀 Features ✅ User Authentication & Role-Based Access ✅ CRUD Operations for Users, Products, and Orders ✅ Super-Admin with Full Access ✅ Role-Specific Functionalities (Admin, Staff, Vendor, Buyer) ✅ Secure Password Hashing ✅ Unique Product URLs & Scheduled Availability ✅ Search & Pagination for Products ✅ Discount Calculation (Without DB Storage)

🏗️ Tech Stack Backend:
Node.js (Express.js)
Database: MySQL / MongoDB
Authentication: JWT, bcrypt Storage: Cloudinary / AWS S3 (for product images) 

📌 API Endpoints 🔐 Authentication Method Endpoint Description Access POST /signup User/Vendor Sign-up Public POST /login User Login Public POST /logout Logout & Token Revoke Authenticated 🛍️ Product Management Method Endpoint Description Access GET /products Get all products (w/ Pagination) Public POST /products Create new product Admin, Vendor PUT /products/:id Update product details Admin, Vendor DELETE /products/:id Remove product Admin 👥 User & Vendor Management Method Endpoint Description Access GET /users Get all users Admin GET /vendors Get all vendors Admin POST /staff Create a staff member Admin 🔧 Setup & Installation 1️⃣ Clone the Repository sh Copy Edit git clone this cd ecommerce-api 2️⃣ Install Dependencies sh Copy Edit npm install 3️⃣ Configure Environment Variables Create a .env file in the root directory and add:

env Copy Edit PORT=5000 DB_URL=mysql://username:password@host:port/database JWT_SECRET=your_secret_key 4️⃣ Run the Server
