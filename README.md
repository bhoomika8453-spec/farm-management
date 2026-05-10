Farm Management System

A CRUD-based Farm Management System developed using FastAPI, MySQL, HTML, CSS, and JavaScript.

📌 Project Overview

This project helps manage farmers, crops, cart operations, and order placement through Admin and User dashboards.

The system provides:

Farmer management

Crop management

Crop purchasing system

Cart functionality

Order placement

Attractive frontend dashboard



---

🚀 Features

Admin Module

Add farmers

Delete farmers

Add crops

Manage crop details

View all records


User Module

View available crops

Add items to cart

Select quantity

Place orders

Real-time cart updates



---

🛠 Technologies Used

Frontend

HTML

CSS

JavaScript


Backend

Python

FastAPI


Database

MySQL



---

📂 Project Structure

farm-management/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── admin_dashboard.html
│   ├── user_dashboard.html
│   ├── styles.css
│   ├── admin.js
│   └── user.js
│
├── database/
│   └── setup.sql
│
└── README.md


---

🧩 CRUD Operations

The project performs complete CRUD operations:

Create → Add farmers and crops

Read → Display crop and farmer data

Update → Modify crop information

Delete → Remove farmers/crops



---

🗄 Database Tables

Farmers Table

Farmer ID

Farmer Name


Crops Table

Crop ID

Crop Name

Price

Quantity

Farmer ID


Orders Table

Order ID

User Name

Crop Name

Quantity

Total Price



---

🔗 Frontend & Backend Connection

The frontend communicates with the backend using:

JavaScript Fetch API

FastAPI REST APIs

JSON data exchange



---

🎨 UI Features

Glassmorphism design

Responsive layout

Slideshow login page

Attractive dashboard

Interactive cart system



---

▶️ How to Run the Project

Step 1: Install Requirements

pip install fastapi uvicorn mysql-connector-python

Step 2: Run Backend

uvicorn main:app --reload

Step 3: Open Frontend

Open:

login.html

admin_dashboard.html

user_dashboard.html



---

📸 Screenshots

Login Page

Admin Dashboard

User Dashboard

Cart System


(Add screenshots here)


---

📚 DBMS Concepts Used

ER Diagram

Relational Schema

SQL Queries

Primary & Foreign Keys

Normalization

CRUD Operations



---

📈 Future Scope

Online payment integration

AI-based crop recommendation

Weather prediction

Mobile application support

Multi-user authentication




---

📖 References

Python Documentation

FastAPI Documentation

MySQL Documentation

MDN Web Docs

W3Schools
