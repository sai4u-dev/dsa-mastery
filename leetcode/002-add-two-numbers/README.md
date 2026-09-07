# 2. Add Two Numbers

**Difficulty:** Medium
**Topics:** Linked List, Math, Recursion

## Problem Statement

You are given two non-empty linked lists representing two non-negative integers.

- The digits are stored in **reverse order**.
- Each node contains a single digit.
- Add the two numbers and return the sum as a linked list.

You may assume that the two numbers do not contain any leading zeros, except for the number `0` itself.

---

## Examples

### Example 1

```text
Input:  l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
```

**Explanation:**

```text
342 + 465 = 807
```

Since the digits are stored in reverse order:

```text
342 → [2,4,3]
465 → [5,6,4]
807 → [7,0,8]
```

---

### Example 2

```text
Input:  l1 = [0], l2 = [0]
Output: [0]
```

---

### Example 3

```text
Input:  l1 = [9,9,9,9,9,9,9]
        l2 = [9,9,9,9]

Output: [8,9,9,9,0,0,0,1]
```

---

## Constraints

- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- The linked lists represent numbers without leading zeros, except for the number `0`.

---

## Approach

We traverse both linked lists simultaneously and add the corresponding digits along with a `carry`.

For each position:

1. Get the value from `l1` if available.
2. Get the value from `l2` if available.
3. Add both values along with the previous `carry`.
4. Create a new node with:

```text
sum % 10
```

5. Update the carry:

```text
sum / 10
```

6. Continue until both lists and the carry are exhausted.

---

## Algorithm

```text
Initialize a dummy node
Initialize carry = 0

While l1 exists OR l2 exists OR carry is not 0:

    Get value from l1, otherwise 0
    Get value from l2, otherwise 0

    sum = value1 + value2 + carry

    carry = sum / 10
    digit = sum % 10

    Create a new node with digit
    Move to the next nodes

Return dummy.next
```

---

## Complexity Analysis

### Time Complexity

```text
O(max(m, n))
```

Where:

- `m` = number of nodes in `l1`
- `n` = number of nodes in `l2`

### Space Complexity

```text
O(max(m, n))
```

The space is used to store the resulting linked list.

---

## Example Walkthrough

Given:

```text
l1 = [2,4,3]
l2 = [5,6,4]
```

### Step 1

```text
2 + 5 = 7
Result: [7]
Carry: 0
```

### Step 2

```text
4 + 6 = 10
Result digit: 0
Carry: 1

Result: [7,0]
```

### Step 3

```text
3 + 4 + 1 = 8
Result digit: 8
Carry: 0

Result: [7,0,8]
```

Final result:

```text
[7,0,8]
```

---

## Key Concept

The important idea is to simulate how we perform addition manually:

```text
  342
+ 465
-----
  807
```

Since the linked lists store digits in reverse order, we can start adding directly from the head of each list, making the implementation straightforward.

---

## Tags

`Linked List` · `Math` · `Simulation`
