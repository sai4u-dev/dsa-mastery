const longestCommonPrefix = require("./solution.js");
const testCases = require("./testCases.json");

testCases.forEach((test, index) => {
  const result = longestCommonPrefix(test.strs);

  const passed = result === test.expected;

  console.log(`Test ${index + 1}: ${passed ? "Passed" : "Failed"}`);

  if (!passed) {
    console.log(
      "Input:",
      test.strs,
      "Expected:",
      test.expected,
      "Received:",
      result,
      "\n",
    );
  }
});
