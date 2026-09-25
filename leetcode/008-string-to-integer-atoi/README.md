# 008. String to Integer (atoi)

## Problem

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace.
2. **Signedness**: Check if the next character is `'-'` or `'+'`. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. **Conversion**: Read in the next characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. **Rounding**: Convert these digits into an integer (i.e., `"123" -> 123`, `"0032" -> 32`). If no digits were read, then the integer is `0`. Change the sign as necessary (from step 2).
5. **Clamping**: If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer to remain in the range. Specifically, integers less than `-2^31` should be clamped to `-2^31`, and integers greater than `2^31 - 1` should be clamped to `2^31 - 1`.
6. Return the integer as the final result.

## Approach

Iterate through the string once:

1. **Skip leading whitespaces**
2. **Check for sign** (`+` or `-`)
3. **Parse digits** while checking for overflow:
   - Before adding each digit, check if `result > INT_MAX / 10` or `result === INT_MAX / 10 && digit > INT_MAX % 10`
   - If overflow would occur, return clamped value immediately
4. **Apply sign** and return

## Complexity

Time: O(n) - Single pass through the string
Space: O(1) - Only using a few variables

## Files

- `solution.js` - Contains the solution implementation.
- `test.js` - Executes the test cases and validates the results.
- `testCases.json` - Contains all test cases.