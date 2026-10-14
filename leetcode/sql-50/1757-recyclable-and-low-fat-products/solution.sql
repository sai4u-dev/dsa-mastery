-- 1757. Recyclable and Low Fat Products
-- Find product_ids that are both low fat and recyclable.
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
