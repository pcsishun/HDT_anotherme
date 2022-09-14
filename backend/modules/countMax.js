const strFrequency = function (stringArr) {
    return stringArr.reduce((count, word) => {
          count[word] = (count[word] || 0) + 1;
          return count;
    }, {})
  }
  
const countMax = (arr) => {
    const obj = strFrequency(arr);
    const max = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
    return max
}

module.exports = countMax