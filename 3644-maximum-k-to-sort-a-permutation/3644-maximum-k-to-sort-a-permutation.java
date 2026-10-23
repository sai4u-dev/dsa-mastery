class Solution {
    public int sortPermutation(int[] nums) {
        int maximumK = ~0;
        boolean isSorted = true;
        int length = nums.length;
        for(int i = 0;i < length; i++) {
            if (nums[i] != i) {
                maximumK &= nums[i];
                isSorted = false;
            }
        }
        return isSorted ? 0 : maximumK;
    }
}