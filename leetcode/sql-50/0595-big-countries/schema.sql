-- Schema for 595. Big Countries
-- SQLite / MySQL compatible
DROP TABLE IF EXISTS World;

CREATE TABLE World (
    name VARCHAR(50) PRIMARY KEY,
    continent VARCHAR(50) NOT NULL,
    area INTEGER NOT NULL,
    population INTEGER NOT NULL,
    gdp BIGINT NOT NULL
);

INSERT INTO World (name, continent, area, population, gdp) VALUES
    ('Afghanistan', 'Asia', 652230, 25500100, 20343000000),
    ('Albania', 'Europe', 28748, 2831741, 12960000000),
    ('Algeria', 'Africa', 2381741, 37100000, 188681000000),
    ('Andorra', 'Europe', 468, 78115, 3712000000),
    ('Angola', 'Africa', 1246700, 20609294, 100990000000);

-- Expected output for solution.sql:
-- name        | population | area
-- Afghanistan | 25500100   | 652230
-- Algeria     | 37100000   | 2381741
