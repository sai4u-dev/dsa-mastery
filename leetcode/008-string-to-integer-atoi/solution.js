/**
 * @param {string} s
 * @return {number}
 */
const myAtoi = (s) => {
  if (typeof s !== "string") {
    throw new TypeError("Input must be a string");
  }

  let index = 0;
  const n = s.length;

  while (index < n && s[index] === " ") {
    index++;
  }

  if (index === n) {
    return 0;
  }

  let sign = 1;
  if (s[index] === "+" || s[index] === "-") {
    sign = s[index] === "-" ? -1 : 1;
    index++;
  }

  let result = 0;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  while (index < n && s[index] >= "0" && s[index] <= "9") {
    const digit = s[index].charCodeAt(0) - "0".charCodeAt(0);

    if (result > Math.floor(INT_MAX / 10) || (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    index++;
  }

  return sign * result;
};

export default myAtoi;