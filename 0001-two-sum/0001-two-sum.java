class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {

            int complement = target - nums[i];

            Integer index = map.get(complement);

            int[] result = (index != null)
                    ? new int[] { index, i }
                    : null;

            if (result != null) {
                return result;
            }

            map.put(nums[i], i);
        }

        return new int[] {};
    }
}