# 584. Find Customer Referee

## Problem

Table: `Customer`

| Column Name | Type    |
|-------------|---------|
| id          | int     |
| name        | varchar |
| referee_id  | int     |

`id` is the primary key. `referee_id` is a foreign key to `Customer(id)` and can be `NULL` (no referee).

Find the names of customers who are **not** referred by the customer with `id = 2`.

Return the result table in **any order**.

**Example 1:**

```
Input:
Customer table:
+----+------+------------+
| id | name | referee_id |
+----+------+------------+
| 1  | Will | NULL       |
| 2  | Jane | NULL       |
| 3  | Alex | 2          |
| 4  | Bill | NULL       |
| 5  | Zack | 1          |
| 6  | Mark | 2          |
+----+------+------------+

Output:
+------+
| name |
+------+
| Will |
| Jane |
| Bill |
| Zack |
+------+
```

## Approach

Filter with `WHERE` but handle `NULL` explicitly — this is the key lesson.

- `referee_id != 2` alone **excludes NULLs** because `NULL != 2` evaluates to `UNKNOWN`, not `TRUE`.
- So add `OR referee_id IS NULL`.

Alternative equivalent forms:
```sql
-- COALESCE version
WHERE COALESCE(referee_id, 0) <> 2;
-- NOT IN safe version (must exclude NULL semantics carefully)
```

## Complexity

- Time: O(n) — single table scan.
- Space: O(k) — k matching names returned.

## Files

- `solution.sql` — Contains the solution query.
- `schema.sql` — Table definition + sample data to run locally.
