class Solution {
    public int smallestUniqueSubarray(int[] nums) {
        int n = nums.length;

        final long BASE = 911382323L; 
        long[] power = new long[n + 1]; 
        long[] pref = new long[n + 1];  
        power[0] = 1;
        for (int i = 0; i < n; i++) {
            power[i + 1] = power[i] * BASE;
            pref[i + 1] = pref[i] * BASE + nums[i] + 1;
        }

        int low = 1, high = n;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            HashMap<Long, Integer> freq = new HashMap<>();
            for (int i = 0; i + mid - 1 < n; i++) {
                int l = i;
                int r = i + mid - 1;
                long hash = pref[r + 1] - pref[l] * power[r - l + 1];
                freq.put(hash, freq.getOrDefault(hash, 0) + 1);
            }

            boolean found = false;
            for (int cnt : freq.values()) {
                if (cnt == 1) {
                    found = true;
                    break;
                }
            }

            if (found) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}