/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function (n, l, r) {
  const MODULO = 1_000_000_007;
  const valueCount = r - l + 1;

  if (n <= 0 || valueCount <= 0) {
    return 0;
  }

  if (n === 1) {
    return valueCount % MODULO;
  }

  if (valueCount === 1) {
    return 0;
  }

  let arraysEndingWithUp = new Int32Array(valueCount);
  let arraysEndingWithDown = new Int32Array(valueCount);

  for (let valueIndex = 0; valueIndex < valueCount; valueIndex++) {
    arraysEndingWithUp[valueIndex] = valueIndex;
    arraysEndingWithDown[valueIndex] = valueCount - valueIndex - 1;
  }

  for (let currentLength = 3; currentLength <= n; currentLength++) {
    const nextArraysEndingWithUp = new Int32Array(valueCount);
    const nextArraysEndingWithDown = new Int32Array(valueCount);

    let downwardPrefixSum = 0;

    for (let valueIndex = 0; valueIndex < valueCount; valueIndex++) {
      nextArraysEndingWithUp[valueIndex] = downwardPrefixSum;

      downwardPrefixSum += arraysEndingWithDown[valueIndex];

      if (downwardPrefixSum >= MODULO) {
        downwardPrefixSum -= MODULO;
      }
    }

    let upwardSuffixSum = 0;

    for (let valueIndex = valueCount - 1; valueIndex >= 0; valueIndex--) {
      nextArraysEndingWithDown[valueIndex] = upwardSuffixSum;

      upwardSuffixSum += arraysEndingWithUp[valueIndex];

      if (upwardSuffixSum >= MODULO) {
        upwardSuffixSum -= MODULO;
      }
    }

    arraysEndingWithUp = nextArraysEndingWithUp;
    arraysEndingWithDown = nextArraysEndingWithDown;
  }

  let validArrayCount = 0;

  for (let valueIndex = 0; valueIndex < valueCount; valueIndex++) {
    validArrayCount += arraysEndingWithUp[valueIndex];

    if (validArrayCount >= MODULO) {
      validArrayCount -= MODULO;
    }

    validArrayCount += arraysEndingWithDown[valueIndex];

    if (validArrayCount >= MODULO) {
      validArrayCount -= MODULO;
    }
  }

  return validArrayCount;
};
