# 1757. Recyclable and Low Fat Products

## Problem

Table: `Products`

| Column Name | Type |
|-------------|------|
| product_id  | int  |
| low_fats    | enum ('Y', 'N') |
| recyclable  | enum ('Y', 'N') |

`product_id` is the primary key.

Find the ids of products that are **both** low fat and recyclable.

Return the result table in **any order**.

**Example 1:**

```
Input:
Products table:
+-------------+----------+------------+
| product_id  | low_fats | recyclable |
+-------------+----------+------------+
| 0           | Y        | N          |
| 1           | Y        | Y          |
| 2           | N        | Y          |
| 3           | Y        | Y          |
| 4           | N        | N          |
+-------------+----------+------------+

Output:
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation: Only products 1 and 3 are both low fat and recyclable.
```

## Approach

Simple `SELECT` with `WHERE` + `AND` — the canonical first SQL filter pattern.

1. Select `product_id` from `Products`.
2. Filter rows where `low_fats = 'Y' AND recyclable = 'Y'`.

No `JOIN`, aggregation, or sorting needed.

## Complexity

- Time: O(n) — single table scan with constant-time filter per row.
- Space: O(k) — where k = number of matching rows returned.

## Files

- `solution.sql` — Contains the solution query.
- `schema.sql` — Table definition + sample data to run locally.
