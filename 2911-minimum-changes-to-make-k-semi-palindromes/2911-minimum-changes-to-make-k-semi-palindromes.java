class Solution {
    public int minimumChanges(String s, int k) {
        int n = s.length();
        int INF = 1000000;

        int[][] cost = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = i; j < n; j++)
                cost[i][j] = getCost(s, i, j, INF);

        int[][] dp = new int[n + 1][k + 1];
        for (int[] row : dp) java.util.Arrays.fill(row, INF);
        dp[0][0] = 0;

        for (int i = 1; i <= n; i++)
            for (int p = 1; p <= k; p++)
                for (int j = 0; j < i; j++)
                    if (dp[j][p - 1] < INF && cost[j][i - 1] < INF)
                        dp[i][p] = Math.min(dp[i][p], dp[j][p - 1] + cost[j][i - 1]);
        return dp[n][k];
    }

    private int getCost(String s, int l, int r, int INF) {
        int len = r - l + 1;
        if (len == 1) return INF;
        int best = INF;
        for (int d = 1; d < len; d++) {
            if (len % d != 0) continue;
            int changes = 0, size = len / d;
            for (int g = 0; g < d; g++) {
                int lo = l + g, hi = l + g + (size - 1) * d;
                while (lo < hi) {
                    if (s.charAt(lo) != s.charAt(hi)) changes++;
                    lo += d;
                    hi -= d;
                }
            }
            best = Math.min(best, changes);
        }
        return best;
    }
}