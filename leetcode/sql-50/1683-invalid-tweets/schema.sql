-- Schema for 1683. Invalid Tweets
-- SQLite / MySQL compatible
DROP TABLE IF EXISTS Tweets;

CREATE TABLE Tweets (
    tweet_id INTEGER PRIMARY KEY,
    content VARCHAR(500) NOT NULL
);

INSERT INTO Tweets (tweet_id, content) VALUES
    (1, 'Let us Code'),
    (2, 'More than fifteen chars are here!');

-- Expected output for solution.sql:
-- tweet_id
-- 2
