# 001. Two Sum

## Problem

Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to the target.

## Approach

Use a **Hash Map** to store previously visited numbers and their indices.

For each element:

Calculate the complement: **target - currentNumber**
Check if the **complement** already exists in the map.
If found, return both indices.
Otherwise, store the current number and index.

## Complexity

Time: O(n)
Space: O(n)

## Files

- solution.js - Contains the solution implementation.
- test.js - Executes the test cases and validates the results.
- testCases.js - Contains all test cases.
