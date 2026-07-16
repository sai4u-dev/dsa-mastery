/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function (nums, target) {
  const n = nums.length;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    let count = 0;

    for (let j = i; j < n; j++) {
      if (nums[j] === target) count++;

      const length = j - i + 1;

      if (2 * count > length) ans++;
    }
  }

  return ans;
};
