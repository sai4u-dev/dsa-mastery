class Solution {
    int n;
    int[][] memo;

    private int findMethod(int[] nums, int start, int target) {
        int lo = start, hi = n;

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }

        if (lo < n && nums[lo] == target) {
            return lo;
        }

        return -1;
    }

    private int solve(int i, int inc, int[] nums) {
        if (memo[i][inc] != -1) {
            return memo[i][inc];
        }

        int currVal = nums[i] + inc;
        int len = 1;

        // Choice 1: Find currVal + 1
        int j = findMethod(nums, i + 1, currVal + 1);

        if (j != -1) {
            len = Math.max(len, 1 + solve(j, 0, nums));
        }

        // Choice 2: Find currVal and increase it by 1
        j = findMethod(nums, i + 1, currVal);

        if (j != -1) {
            len = Math.max(len, 1 + solve(j, 1, nums));
        }

        return memo[i][inc] = len;
    }

    public int maxSelectedElements(int[] nums) {
        n = nums.length;

        Arrays.sort(nums);

        memo = new int[n][2];

        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }

        int result = 0;

        for (int i = 0; i < n; i++) {
            result = Math.max(result, solve(i, 0, nums));
            result = Math.max(result, solve(i, 1, nums));
        }

        return result;
    }
}