/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!Array.isArray(strs) || strs.length === 0) {
    return "";
  }

  return strs.reduce((prefix, str) => {
    while (str.indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
    return prefix;
  }, strs[0]);
};

module.exports = longestCommonPrefix;
