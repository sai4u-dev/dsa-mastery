class Solution {
    public int maxLength(int[] nums) {
        int ans = 0;

        for (int i = 0; i < nums.length; i++) {
            int p = 1, g = 0, l = 1;
            for (int j = i; j < nums.length; j++) {
                int x = nums[j];
                p *= x;
                g = gcd(g, x);
                l = l * x / gcd(l, x);
                ans = (p == g * l) ? Math.max(ans, j - i + 1) : ans;
            }
        }

        return ans;
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
