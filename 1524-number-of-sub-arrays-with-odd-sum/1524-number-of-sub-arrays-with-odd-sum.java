class Solution {
    public int numOfSubarrays(int[] arr) {
        int mod = 1_000_000_007, odd = 0, even = 1, sum = 0, ans = 0;

        for (int n : arr) {
            sum += n;
            if (sum % 2 == 0) {
                ans = (ans + odd) % mod;
                even++;
            } else {
                ans = (ans + even) % mod;
                odd++;
            }
        }
        return ans;
    }
}