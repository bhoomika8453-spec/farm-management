# Farm Management System

A CRUD-based Farm Management System developed using FastAPI, MySQL, HTML, CSS, and JavaScript.

This project helps manage farmers, crops, cart operations, and order placement through Admin and User dashboards.

---

# Features

## Authentication
- User Registration
- User Login
- Admin Login

---

## Admin Dashboard
- Add Farmers
- View Farmers
- Delete Farmers
- Add Crops
- View Crops
- Delete Crops

---

## User Dashboard
- View Available Crops
- View Farmer Details
- Buy Crops
- Add to Cart
- Place Orders

---

# Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Python
- FastAPI

## Database
- MySQL

## Tools
- VS Code
- Uvicorn

---

# Project Structure

FARM2_MANAGEMENT/

│

├── backend/

│   ├── main.py

│   ├── database.py

│   └── config.py

│

├── database/

│   └── setup.sql

│

├── frontend/

│   ├── admin_dashboard.html

│   ├── user_dashboard.html

│   ├── login.html

│   ├── register.html

│   ├── admin.js

│   ├── user.js

│   ├── login.js

│   └── register.js

│

├── requirements.txt

└── README.md

---

# Database Tables

## users
Stores user login details.

| Column | Type |
|---|---|
| id | INT |
| email | VARCHAR |
| password | VARCHAR |
| role | VARCHAR |

---

## farmers
Stores farmer information.

| Column | Type |
|---|---|
| id | INT |
| name | VARCHAR |

---

## crops
Stores crop details.

| Column | Type |
|---|---|
| id | INT |
| crop_name | VARCHAR |
| quantity | INT |
| price | FLOAT |
| farmer_id | INT |

---

## cart
Stores cart items selected by users.

| Column | Type |
|---|---|
| id | INT |
| crop_name | VARCHAR |
| quantity | INT |
| username | VARCHAR |

---

## orders
Stores placed orders.

| Column | Type |
|---|---|
| id | INT |
| crop_name | VARCHAR |
| quantity | INT |
| username | VARCHAR |

---

# Installation Steps

## 1. Clone the Project

```bash
git clone <repository-link>
