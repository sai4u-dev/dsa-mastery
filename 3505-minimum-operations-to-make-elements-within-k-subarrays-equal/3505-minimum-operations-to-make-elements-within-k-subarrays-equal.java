
import java.util.*;

class Solution {
    TreeMap<Integer, Integer> low = new TreeMap<>();
    TreeMap<Integer, Integer> high = new TreeMap<>();

    int lowSize = 0, highSize = 0;
    long lowSum = 0, highSum = 0;

    void add(TreeMap<Integer, Integer> map, int val) {
        map.put(val, map.getOrDefault(val, 0) + 1);
    }

    void remove(TreeMap<Integer, Integer> map, int val) {
        int count = map.get(val);
        if (count == 1) map.remove(val);
        else map.put(val, count - 1);
    }

    void rebalance() {
        while (lowSize > highSize + 1) {
            int val = low.lastKey();
            remove(low, val);
            add(high, val);
            lowSize--;
            highSize++;
            lowSum -= val;
            highSum += val;
        }

        while (lowSize < highSize) {
            int val = high.firstKey();
            remove(high, val);
            add(low, val);
            highSize--;
            lowSize++;
            highSum -= val;
            lowSum += val;
        }
    }

    void insert(int val) {
        if (low.isEmpty() || val <= low.lastKey()) {
            add(low, val);
            lowSize++;
            lowSum += val;
        } else {
            add(high, val);
            highSize++;
            highSum += val;
        }
        rebalance();
    }

    void erase(int val) {
        if (low.containsKey(val)) {
            remove(low, val);
            lowSize--;
            lowSum -= val;
        } else {
            remove(high, val);
            highSize--;
            highSum -= val;
        }
        rebalance();
    }

    long getCost() {
        long median = low.lastKey();
        return median * lowSize - lowSum
             + highSum - median * highSize;
    }

    public long minOperations(int[] nums, int x, int k) {
        int n = nums.length;
        long[] cost = new long[n - x + 1];

        for (int i = 0; i < n; i++) {
            insert(nums[i]);

            if (i >= x) erase(nums[i - x]);

            if (i >= x - 1) {
                cost[i - x + 1] = getCost();
            }
        }

        long INF = Long.MAX_VALUE / 4;
        long[][] dp = new long[n + 1][k + 1];

        for (long[] row : dp)
            Arrays.fill(row, INF);

        dp[0][0] = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i][j] = dp[i - 1][j];

                if (j > 0 && i >= x && dp[i - x][j - 1] != INF) {
                    dp[i][j] = Math.min(
                        dp[i][j],
                        dp[i - x][j - 1] + cost[i - x]
                    );
                }
            }
        }

        return dp[n][k];
    }
}
