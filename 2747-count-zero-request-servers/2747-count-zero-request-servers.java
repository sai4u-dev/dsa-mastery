class Solution {
    public int[] countServers(int n, int[][] logs, int x, int[] queries) {
        Arrays.sort(logs, (a, b) -> a[1] - b[1]);

        int[][] q = new int[queries.length][2];

        for (int i = 0; i < queries.length; i++) {
            q[i] = new int[] { queries[i], i };
        }

        Arrays.sort(q, (a, b) -> a[0] - b[0]);

        int[] ans = new int[queries.length];
        int[] count = new int[n + 1];

        int left = 0, right = 0, active = 0;

        for (int[] query : q) {
            int time = query[0];

            while (right < logs.length && logs[right][1] <= time) {
                int id = logs[right++][0];
                if (count[id]++ == 0)
                    active++;
            }

            while (left < right && logs[left][1] < time - x) {
                int id = logs[left++][0];
                if (--count[id] == 0)
                    active--;
            }

            ans[query[1]] = n - active;
        }

        return ans;
    }
}