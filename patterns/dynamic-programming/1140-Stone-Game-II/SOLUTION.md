## Solution: Solve Stone Game II Using Dynamic Programming

### Approach

Use **Dynamic Programming (DP)** with **Suffix Sum**.

- `dp[i][M]` represents the maximum stones the current player can collect starting from index `i` with the current `M`.
- `suf[i]` stores the total stones from index `i` to the end.
- Try every possible `X` from `1` to `2 * M`.
- After taking `X` piles, the next state is `(i + X, max(M, X))`.
- Since the opponent plays optimally, the current player gets:

```text
suf[i] - dp[i + X][max(M, X)]
```

Take the maximum over all valid `X`.

### Complexity

- **Time:** `O(n³)`
- **Space:** `O(n²)`

### JavaScript

```javascript
var stoneGameII = function (piles) {
  const n = piles.length;
  const suf = Array(n + 1).fill(0);
  const dp = Array.from({ length: n }, () => Array(n + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + piles[i];

  for (let i = n - 1; i >= 0; i--) {
    for (let m = 1; m <= n; m++) {
      if (2 * m >= n - i) {
        dp[i][m] = suf[i];
        continue;
      }

      for (let x = 1; x <= 2 * m; x++) {
        dp[i][m] = Math.max(dp[i][m], suf[i] - dp[i + x][Math.max(m, x)]);
      }
    }
  }

  return dp[0][1];
};
```
