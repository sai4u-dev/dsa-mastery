# 1683. Invalid Tweets

## Problem

Table: `Tweets`

| Column Name | Type    |
|-------------|---------|
| tweet_id    | int     |
| content     | varchar |

`tweet_id` is the primary key. `content` consists of alphanumeric characters, `'!'`, `' '` (space), no special unicode.

A tweet is **invalid** if the number of characters in `content` is **strictly greater than 15**.

Find the IDs of invalid tweets. Return in **any order**.

**Example 1:**

```
Input:
Tweets table:
+----------+-----------------------------------+
| tweet_id | content                           |
+----------+-----------------------------------+
| 1        | Let us Code                       |
| 2        | More than fifteen chars are here! |
+----------+-----------------------------------+

Output:
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Explanation:
Tweet 1 length = 11, valid.
Tweet 2 length = 33, invalid.
```

## Approach

String-length filter:

```sql
SELECT tweet_id FROM Tweets WHERE LENGTH(content) > 15;
```

Dialect notes:
- MySQL / SQLite: `LENGTH(content)` (bytes) or `CHAR_LENGTH(content)` (chars) — identical here since content is ASCII.
- SQL Server: `LEN(content)`.
- LeetCode expects `LENGTH(content) > 15`.

## Complexity

- Time: O(n * L) — L = average content length for length computation.
- Space: O(k) — k invalid tweet ids.

## Files

- `solution.sql` — Contains the solution query.
- `schema.sql` — Table definition + sample data to run locally.
