storeSnippet({"id":72,"name":"is() - Test for Equality","description":"Tests to see if two or more values are exactly the same.  This is similar to using \"===\" except it can be used to differentiate between 0 and -0 and it will correctly indicate that NaN is NaN.","js":"function is(x, y) {\r\n  x = x === y\r\n    ? x !== 0 || 1 \/ x == 1 \/ y \/\/ -0 vs 0\r\n    : (x != x && y != y); \/\/ NaN\r\n  y = arguments;\r\n  return x && y.length > 2\r\n    ? is.apply(0, slice(y, 1))\r\n    : x;\r\n}","post":"<h2><code>is(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <h3>Description<\/h3>\r\n  <div>\r\n    Tests to see if two or more values are exactly the same.  This is similar to <code>===<\/code> with two differences:\r\n    <ol>\r\n      <li>\r\n        <code>-0 === 0<\/code> evaluates to <code>true<\/code><br \/>\r\n        <i>but<\/i>\r\n        <code>YourJS.is(-0, 0)<\/code> evaluates to <code>false<\/code>\r\n      <\/li>\r\n      <li>\r\n        <code>NaN === NaN<\/code> evaluates to <code>false<\/code><br \/>\r\n        <i>but<\/i>\r\n        <code>YourJS.is(NaN, NaN)<\/code> evaluates to <code>true<\/code>\r\n      <\/li>\r\n    <\/ol>\r\n  <\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>x<\/code> {*}:<\/b><br \/>\r\n      The value to be compared to for equality.\r\n    <\/li>\r\n    <li>\r\n      <b><code>y<\/code> {*}:<\/b><br \/>\r\n      The value to compare to <code>x<\/code> for equality.\r\n    <\/li>\r\n    <li>\r\n      <b><code>...opt_otherValues<\/code> {...*}:<\/b><br \/>\r\n      Optional.  If additional values are given they will all be compared to <code>x<\/code> for equality.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns <code>true<\/code> if all of the parameters passed in are the same, otherwise <code>false<\/code> is returned.<\/div>\r\n<\/div>","required_ids":{},"tags":["Boolean"],"variables":["is"]});