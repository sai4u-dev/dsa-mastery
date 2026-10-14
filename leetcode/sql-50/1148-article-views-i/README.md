# 1148. Article Views I

## Problem

Table: `Views`

| Column Name | Type |
|-------------|------|
| article_id  | int  |
| author_id   | int  |
| viewer_id   | int  |
| view_date   | date |

There is no primary key — a row can repeat. Each row indicates an article viewed by a viewer, with author and date.

Find all authors who **viewed their own article**.

Return the result table with a single `id` column, sorted by `id` in ascending order.

**Example 1:**

```
Input:
Views table:
+------------+----------+----------+------------+
| article_id | author_id| viewer_id| view_date  |
+------------+----------+----------+------------+
| 1          | 3        | 5        | 2019-08-01 |
| 1          | 3        | 6        | 2019-08-02 |
| 2          | 7        | 7        | 2019-08-01 |
| 2          | 7        | 6        | 2019-08-02 |
| 4          | 7        | 1        | 2019-07-22 |
| 3          | 4        | 4        | 2019-07-21 |
| 3          | 4        | 4        | 2019-07-21 |
+------------+----------+----------+------------+

Output:
+------+
| id   |
+------+
| 4    |
| 7    |
+------+
```

## Approach

Self-view filter + dedupe + sort:

1. `WHERE author_id = viewer_id` — keep only self-views.
2. `SELECT DISTINCT author_id AS id` — one row per author (row 3/4 duplicate needs `DISTINCT`).
3. `ORDER BY id` — required ascending sort. Alias `id` so output column matches spec.

## Complexity

- Time: O(n log n) — scan + sort/dedupe; O(n) if hash-distinct.
- Space: O(k) — k distinct self-viewing authors.

## Files

- `solution.sql` — Contains the solution query.
- `schema.sql` — Table definition + sample data to run locally.
