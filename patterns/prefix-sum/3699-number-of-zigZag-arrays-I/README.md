# Number of ZigZag Arrays I

Solutions for **LeetCode 3699 - Number of ZigZag Arrays I** in JavaScript and Java.

## Approach

Use dynamic programming with prefix and suffix sums.

For every possible ending value:

- `endingWithUp[value]` stores the number of valid arrays whose last comparison is increasing.
- `endingWithDown[value]` stores the number of valid arrays whose last comparison is decreasing.

The transitions are:

```text
nextUp[value] = sum of endingWithDown[x] for all x < value
nextDown[value] = sum of endingWithUp[x] for all x > value
```

A left-to-right prefix sum calculates `nextUp`, while a right-to-left suffix sum calculates `nextDown`.

This ensures that comparisons alternate between increasing and decreasing.

## Complexity

Let:

```text
m = r - l + 1
```

- Time: `O(n * m)`
- Space: `O(m)`

## Edge Cases

- When `n == 1`, every value in `[l, r]` is valid.
- When only one value is available and `n > 1`, no valid zigzag array exists.
- All results are returned modulo `1,000,000,007`.
