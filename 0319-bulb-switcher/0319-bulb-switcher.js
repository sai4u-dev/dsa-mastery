/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function(n) {
    if(n === 0 || n===1) return n
    return Math.floor(Math.sqrt(n))
};