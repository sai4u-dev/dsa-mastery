# 595. Big Countries

## Problem

Table: `World`

| Column Name | Type    |
|-------------|---------|
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |

`name` is the primary key.

A country is **big** if it has an area of at least 3 million km² (`area >= 3000000`) **or** a population of at least 25 million (`population >= 25000000`).

Find the `name`, `population`, and `area` of the big countries. Return in **any order**.

**Example 1:**

```
Input:
World table:
+-------------+-----------+---------+------------+--------------+
| name        | continent | area    | population | gdp          |
+-------------+-----------+---------+------------+--------------+
| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
| Albania     | Europe    | 28748   | 2831741    | 12960000000  |
| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
| Andorra     | Europe    | 468     | 78115      | 3712000000   |
| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |
+-------------+-----------+---------+------------+--------------+

Output:
+-------------+------------+---------+
| name        | population | area    |
+-------------+------------+---------+
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
+-------------+------------+---------+
```

## Approach

Simple `SELECT` with `WHERE` + `OR`:

1. Select `name, population, area`.
2. Filter `area >= 3000000 OR population >= 25000000`.

Meets either condition, not necessarily both — classic `OR` pattern.

## Complexity

- Time: O(n) — single scan with arithmetic comparison per row.
- Space: O(k) — k big countries returned.

## Files

- `solution.sql` — Contains the solution query.
- `schema.sql` — Table definition + sample data to run locally.
