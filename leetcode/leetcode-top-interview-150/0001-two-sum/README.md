# 1. Two Sum

## Problem

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists.

**Follow-up:** Can you come up with an algorithm that is less than O(n^2) time complexity?

## Approach

Use a **Hash Map** to store previously visited numbers and their indices.

For each element:
1. Calculate the complement: `target - currentNumber`
2. Check if the **complement** already exists in the map.
3. If found, return both indices.
4. Otherwise, store the current number and index.

## Complexity

- Time: O(n) — single pass through the array, O(1) average map lookup.
- Space: O(n) — map stores up to n elements in the worst case.

## Files

- `solution.js` — Contains the solution implementation.
- `test.js` — Executes the test cases and validates the results.
- `testCases.json` — Contains all test cases.
