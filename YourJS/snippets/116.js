storeSnippet({"id":116,"name":"indexOfDiff() - Start of the Difference","description":"Determine where 2 strings begin to differ from each other.","js":"function indexOfDiff(str1, str2) {\r\n  var splitLen = Math.ceil(Math.min(str1.length, str2.length) \/ 2),\r\n      s1_1 = str1.slice(0, splitLen), s2_1 = str2.slice(0, splitLen);\r\n  return str1 != str2\r\n    ? splitLen\r\n      ? s1_1 != s2_1\r\n        ? splitLen - 1 && indexOfDiff(s1_1, s2_1)\r\n        : (indexOfDiff(str1.slice(splitLen), str2.slice(splitLen)) + splitLen)\r\n      : 0\r\n    : -1;\r\n}","post":"<h2><code>indexOfDiff(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px;\">\r\n  <h3>Description<\/h3>\r\n  <div>Determines where 2 strings begin to differ from each other.  This function has been optimized to work with both small and large strings.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li><code>str1<\/code> {string}:<br \/>A string to be compared to another string.<\/li>\r\n    <li><code>str2<\/code> {*}:<br \/>A string to be compared to <code>str1<\/code>.<\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>If <code>str1<\/code> matches <code>str2<\/code>, <code class=\"language-javascript\">-1<\/code> will be returned.  In all other cases, the first index at which the corresponding character in <code>str1<\/code> is not the same as that found in <code>str2<\/code> will be returned.<\/div>\r\n  \r\n  <h3>Example<\/h3>\r\n  <pre class=\"language-javascript\"><code>console.log(YourJS.indexOfDiff('', ''));  \/\/ -> -1\r\nconsole.log(YourJS.indexOfDiff('Cool', 'Cool'));  \/\/ -> -1\r\nconsole.log(YourJS.indexOfDiff('Cool beans', 'Cool'));  \/\/ -> 4\r\nconsole.log(YourJS.indexOfDiff('Cool beans', 'Cool jeans'));  \/\/ -> 5\r\nconsole.log(YourJS.indexOfDiff(Math.PI + '', '3.14159'));  \/\/ -> 7<\/code><\/pre>\r\n<\/div>","required_ids":{},"tags":["String"],"variables":["indexOfDiff"]});