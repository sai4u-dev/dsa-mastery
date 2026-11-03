class Solution {
    public int minMoves(int[] nums) {
        int maxNum = Integer.MIN_VALUE;
        for (int n : nums) {
            maxNum = Math.max(maxNum, n);
        }
        int minMoves = 0;
        for (int n : nums) {
            minMoves += maxNum - n;
        }

        return minMoves;
    }
}