-- Schema for 1148. Article Views I
-- SQLite / MySQL compatible (no PK by design)
DROP TABLE IF EXISTS Views;

CREATE TABLE Views (
    article_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    viewer_id INTEGER NOT NULL,
    view_date DATE NOT NULL
);

INSERT INTO Views (article_id, author_id, viewer_id, view_date) VALUES
    (1, 3, 5, '2019-08-01'),
    (1, 3, 6, '2019-08-02'),
    (2, 7, 7, '2019-08-01'),
    (2, 7, 6, '2019-08-02'),
    (4, 7, 1, '2019-07-22'),
    (3, 4, 4, '2019-07-21'),
    (3, 4, 4, '2019-07-21');

-- Expected output for solution.sql (ordered):
-- id
-- 4
-- 7
