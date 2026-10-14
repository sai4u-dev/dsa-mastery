-- Schema for 1757. Recyclable and Low Fat Products
-- SQLite / MySQL compatible
DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
    product_id INTEGER PRIMARY KEY,
    low_fats CHAR(1) NOT NULL CHECK (low_fats IN ('Y', 'N')),
    recyclable CHAR(1) NOT NULL CHECK (recyclable IN ('Y', 'N'))
);

INSERT INTO Products (product_id, low_fats, recyclable) VALUES
    (0, 'Y', 'N'),
    (1, 'Y', 'Y'),
    (2, 'N', 'Y'),
    (3, 'Y', 'Y'),
    (4, 'N', 'N');

-- Expected output for solution.sql:
-- product_id
-- 1
-- 3
