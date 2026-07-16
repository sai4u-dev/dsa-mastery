import twoSum from "./solution.js";
import testCases from "./testCases.json" with { type: "json" };

testCases.forEach((test, index) => {
  const result = twoSum(test.nums, test.target);

  const passed = JSON.stringify(result) === JSON.stringify(test.expected);

  console.log(`Test ${index + 1}: ${passed ? "PASSED" : "FAILED"}`);

  if (!passed) {
    console.log("Expected:", test.expected);
    console.log("Received:", result);
  }
});
