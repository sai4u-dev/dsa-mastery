# 14 Longest Common Prefix

> Write a function to find the longest common prefix string amongst an array of strings.
> If there is no common prefix, return an empty string "".

Example 1:

- Input: strs = ["flower","flow","flight"]
- Output: "fl"

Example 2:

- Input: strs = ["dog","racecar","car"]
- Output: "" Explanation: There is no common prefix among the input strings.

Constraints:

- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lowercase English letters if it is non-empty.
  edit this readme
  **Explanation**

There is no common prefix among the input strings.

## Constraints

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists only of lowercase English letters if it is non-empty.

## Approach

Use the first string as the initial prefix and compare it with every other string in the array.

- Start with `prefix = strs[0]`.
- For each string:
  - Check whether it starts with the current `prefix`.
  - If not, repeatedly remove the last character from `prefix`.
  - Continue until the string starts with `prefix` or `prefix` becomes empty.

- After processing all strings, the remaining `prefix` is the longest common prefix.

### Complexity Analysis

- **Time Complexity:** `O(N × M)`
  - `N` = number of strings
  - `M` = length of the longest common prefix

- **Space Complexity:** `O(1)`
