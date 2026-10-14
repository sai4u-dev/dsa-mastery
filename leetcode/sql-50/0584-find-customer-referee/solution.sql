-- 584. Find Customer Referee
-- NULL-safe filter: customers not referred by id = 2.
-- NOTE: `referee_id != 2` alone would drop NULL rows, so IS NULL is required.
SELECT name
FROM Customer
WHERE referee_id != 2 OR referee_id IS NULL;
