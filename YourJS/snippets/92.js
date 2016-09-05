storeSnippet({"id":92,"name":"frexp() & ldexp()","description":"Working with fractions and exponents of two.","js":"var frexp;\r\n(function(Math, log, LOG2) {\r\n  log = Math.log;\r\n  LOG2 = log(2);\r\n  frexp = function(x) {\r\n    if (isFinite(x = +x) && x !== 0) {\r\n      var sign = x < 0 ? -1 : 1,\r\n          pow2 = Math.floor(1 + log(x *= sign) \/ LOG2);\r\n      return [sign * x \/ Math.pow(2, pow2), pow2];\r\n    }\r\n    return [x, 0];\r\n  };\r\n})(Math);\r\n\r\nfunction ldexp(x, exp) {\r\n  return x * Math.pow(2, exp);\r\n}","post":"<h2><code>frexp(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Decomposes given floating point value arg into a normalized fraction and an integral power of two.  You can also <a href=\"http:\/\/en.cppreference.com\/w\/cpp\/numeric\/math\/frexp\" target=\"_blank\">check out this page<\/a> for more information about the C++ equivalent.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>x<\/code> {number}:<\/b><br \/>\r\n      The number to be decomposed into a normalized fraction and an integral power of two.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>If <code class=\"language-javascript\">-Infinity<\/code>, <code class=\"language-javascript\">-0<\/code>, <code class=\"language-javascript\">0<\/code>, <code class=\"language-javascript\">Infinity<\/code> or <code class=\"language-javascript\">NaN<\/code> are passed in an array will be returned where the first value is the value passed in and <code class=\"language-javascript\">0<\/code> is the second value.  If any other number is passed in it will be decomposed and an array will be returned where the first value will be a floating point number and the second value will be an integer.  Let's say that <code>result<\/code> is the returned array:  <code class=\"language-javascript\">result[0] * Math.pow(2, result[1])<\/code> should result in the original number passed in (<code class=\"language-javascript\">x<\/code>).<\/div>\r\n<\/div>\r\n\r\n<h2><code>ldexp(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Returns the result of multiplying x (the significand) by 2 raised to the power of exp (the exponent).  You can also <a href=\"http:\/\/en.cppreference.com\/w\/cpp\/numeric\/math\/ldexp\" target=\"_blank\">check out this page<\/a> for more information about the C++ equivalent.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>x<\/code> {number}:<\/b><br \/>\r\n      Floating point value representing the significand.\r\n    <\/li>\r\n    <li>\r\n      <b><code>exp<\/code> {number}:<\/b><br \/>\r\n      Value of the exponent.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns the result of multiplying x (the significand) by 2 raised to the power of exp (the exponent).<\/div>\r\n<\/div>","required_ids":{},"tags":["Math","Number"],"variables":["frexp","ldexp"]});