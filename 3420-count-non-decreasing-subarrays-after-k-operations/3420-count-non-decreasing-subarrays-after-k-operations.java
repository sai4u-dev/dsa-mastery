class Solution {
    public long countNonDecreasingSubarrays(int[] nums, int k) {
        Deque<long[]> dq = new ArrayDeque<>();
        long ans = 0;
        long cost = 0;
        int L = nums.length-1;

        for(int R = nums.length-1; R >= 0; R--) {
            long count = 1;

            while(!dq.isEmpty() && dq.peekLast()[0] < nums[R]) {
                long[] curr = dq.pollLast();
                cost += (nums[R] - curr[0]) * curr[1];
                count += curr[1];
            }
            dq.offerLast(new long[] {nums[R], count});

            while(cost > k) {
                long[] f = dq.pollFirst();
                long c = f[1], 
                    val = f[0];

                cost -= val - nums[L];
                L--;
                if(c > 1) dq.offerFirst(new long[] {val, c - 1});
            }

            ans += (L - R + 1);
        }
        return ans;
    }
}