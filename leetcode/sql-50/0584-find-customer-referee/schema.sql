-- Schema for 584. Find Customer Referee
-- SQLite / MySQL compatible
DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    referee_id INTEGER NULL
);

INSERT INTO Customer (id, name, referee_id) VALUES
    (1, 'Will', NULL),
    (2, 'Jane', NULL),
    (3, 'Alex', 2),
    (4, 'Bill', NULL),
    (5, 'Zack', 1),
    (6, 'Mark', 2);

-- Expected output for solution.sql:
-- name
-- Will
-- Jane
-- Bill
-- Zack
