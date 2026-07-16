import merge from "./solution.js";
import testCases from "./testCases.json" with { type: "json" };

testCases.forEach((test, index) => {
  merge(test.nums1, test.m, test.nums2, test.n);

  const passed = JSON.stringify(test.nums1) === JSON.stringify(test.expected);

  console.log(`Test ${index + 1}: ${passed ? "Passed" : "Failed"}`);

  if (!passed) {
    console.log("Expected:", test.expected);
    console.log("Received:", result);
  }
});
