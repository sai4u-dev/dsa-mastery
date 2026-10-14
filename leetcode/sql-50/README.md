# LeetCode SQL 50 Roadmap

> Structured solutions for the **LeetCode SQL 50** study plan. Designed for SQL interview prep, pattern recognition, and quick revision.

## Goal

- Complete all **50 SQL questions**
- Master `SELECT`, `WHERE`, `JOIN`, `GROUP BY`, `ORDER BY`, subqueries, window functions
- Build interview-ready SQL fluency
- Create a reusable knowledge base for revision

## Progress — Select (Basic Queries)

| # | Problem | Difficulty | Pattern | Status |
|---|---------|------------|---------|--------|
| 1757 | [Recyclable and Low Fat Products](./1757-recyclable-and-low-fat-products/) | Easy | `WHERE` + `AND` | ✅ |
| 584 | [Find Customer Referee](./0584-find-customer-referee/) | Easy | `WHERE` + `NULL` handling | ✅ |
| 595 | [Big Countries](./0595-big-countries/) | Easy | `WHERE` + `OR` | ✅ |
| 1148 | [Article Views I](./1148-article-views-i/) | Easy | `DISTINCT` + self-filter + `ORDER BY` | ✅ |
| 1683 | [Invalid Tweets](./1683-invalid-tweets/) | Easy | `LENGTH()` filter | ✅ |

## Folder Structure

Each problem folder contains:

- `README.md` — problem statement, example, approach, complexity
- `solution.sql` — accepted LeetCode solution
- `schema.sql` — `CREATE TABLE` + sample `INSERT`s to run locally (SQLite / MySQL compatible)

## How to Run Locally (SQLite)

```bash
sqlite3 :memory: < 1757-recyclable-and-low-fat-products/schema.sql
sqlite3 :memory: < 1757-recyclable-and-low-fat-products/schema.sql "SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';"
```

Or with Python:

```python
import sqlite3
con = sqlite3.connect(":memory:")
con.executescript(open("schema.sql").read())
print(con.execute(open("solution.sql").read()).fetchall())
```
