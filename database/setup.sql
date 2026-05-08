-- =============================
-- CREATE DATABASE
-- =============================

CREATE DATABASE IF NOT EXISTS farm2_db;

USE farm2_db;


-- =============================
-- USERS TABLE
-- =============================

CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM('user', 'admin') DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================
-- FARMERS TABLE
-- =============================

CREATE TABLE IF NOT EXISTS farmers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================
-- CROPS TABLE
-- =============================

CREATE TABLE IF NOT EXISTS crops (

    id INT AUTO_INCREMENT PRIMARY KEY,

    crop_name VARCHAR(255) NOT NULL,

    quantity INT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    farmer_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (farmer_id)
    REFERENCES farmers(id)
    ON DELETE CASCADE
);


-- =============================
-- CART TABLE
-- =============================

CREATE TABLE IF NOT EXISTS cart (

    id INT AUTO_INCREMENT PRIMARY KEY,

    crop_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (crop_id)
    REFERENCES crops(id)
    ON DELETE CASCADE
);


-- =============================
-- ORDERS TABLE
-- =============================

CREATE TABLE IF NOT EXISTS orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    crop_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (crop_id)
    REFERENCES crops(id)
    ON DELETE CASCADE
);

-- =============================
-- DEFAULT ADMIN
-- =============================

INSERT IGNORE INTO users (
    email,
    password,
    role
)

VALUES (
    'admin@farm.com',
    'admin123',
    'admin'
);