/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let longest = [];
  let temp;

  if (s.length === 1) {
    return 1;
  }

  for (let i = 0; i < s.length; i += 1) {
    temp = [];
    temp.push(s[i]);

    for (let j = i + 1; j < s.length; j += 1) {
      if (temp.indexOf(s[j]) === -1) {
        temp.push(s[j]);
      } else {
        break;
      }
    }
    longest = temp.length > longest.length ? temp.join('') : longest;
  }

  return longest.length;
}

console.log(lengthOfLongestSubstring('c'));
