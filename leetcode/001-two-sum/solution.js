/**
 *
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
const twoSum = (nums, target) => {
  if (!Array.isArray(nums)) {
    throw new TypeError("nums must be an array");
  }

  if (typeof target !== "number") {
    throw new TypeError("target must be a number");
  }

  const seen = new Map();

  for (let index = 0; index < nums.length; index++) {
    const currentNumber = nums[index];
    const complement = target - currentNumber;

    if (seen.has(complement)) {
      return [seen.get(complement), index];
    }

    seen.set(currentNumber, index);
  }

  return [];
};

export default twoSum;
