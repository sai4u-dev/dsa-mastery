# 3737. Count Subarrays With Majority Element I

## Problem Statement

You are given an integer array `nums` and an integer `target`.

Return the number of subarrays of `nums` in which `target` is the **majority element**.

A **majority element** of a subarray is an element that appears **strictly more than half** of the total number of elements in that subarray.

---

## Examples

### Example 1

**Input**

```text
nums = [1,2,2,3], target = 2
```

**Output**

```text
5
```

**Explanation**

The valid subarrays are:

- `[2]`
- `[2]`
- `[2,2]`
- `[1,2,2]`
- `[2,2,3]`

So the answer is **5**.

---

### Example 2

**Input**

```text
nums = [1,1,1,1], target = 1
```

**Output**

```text
10
```

**Explanation**

Every subarray contains `1` as the majority element.

---

### Example 3

**Input**

```text
nums = [1,2,3], target = 4
```

**Output**

```text
0
```

**Explanation**

Since `target` does not appear in the array, no subarray can have it as the majority element.

---

## Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^9`
- `1 <= target <= 10^9`

---

# Approach

For every possible subarray:

1. Traverse all starting indices.
2. Extend the subarray one element at a time.
3. Count how many times `target` appears.
4. Let:
   - `length = j - i + 1`
   - `targetCount = occurrences of target`

5. If

```text
targetCount > length / 2
```

then `target` is the majority element, so increment the answer.

Since `n ≤ 1000`, an **O(n²)** solution is efficient enough.

---

# Algorithm

1. Initialize `answer = 0`.
2. For each starting index:
   - Reset `targetCount = 0`.

3. Extend the ending index:
   - If `nums[j] == target`, increment `targetCount`.
   - Compute subarray length.
   - If `targetCount > length / 2`, increment `answer`.

4. Return `answer`.

---

# Complexity Analysis

- **Time Complexity:** `O(n²)`
- **Space Complexity:** `O(1)`

---

# JavaScript Solution

```JavaScript
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

```
