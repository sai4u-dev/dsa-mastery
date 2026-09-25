import myAtoi from "./solution.js";
import testCases from "./testCases.json" with { type: "json" };

testCases.forEach((test, index) => {
  const result = myAtoi(test.s);

  const passed = result === test.expected;

  console.log(`Test ${index + 1}: ${passed ? "PASSED" : "FAILED"}`);

  if (!passed) {
    console.log("Input:", JSON.stringify(test.s));
    console.log("Expected:", test.expected);
    console.log("Received:", result);
  }
});