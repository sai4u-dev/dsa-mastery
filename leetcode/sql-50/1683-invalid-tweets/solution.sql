-- 1683. Invalid Tweets
-- Tweets with content length strictly greater than 15.
-- LENGTH works in MySQL/SQLite; use LEN(content) on SQL Server,
-- CHAR_LENGTH(content) if multi-byte chars matter.
SELECT tweet_id
FROM Tweets
WHERE LENGTH(content) > 15;
