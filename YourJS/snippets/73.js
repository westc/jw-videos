storeSnippet({"id":73,"name":"log() - Finding Any Logarithm","description":"Gets the logarithm of a given number with an optional given base.","js":"function log(x, opt_base) {\r\n  x = Math.log(x);\r\n  return opt_base ? (x \/ Math.log(opt_base)) : x;\r\n}","post":"<h2><code>log(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <h3>Description<\/h3>\r\n  <div>Gets the logarithm of a given number with an optional given base.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>x<\/code> {number}:<\/b><br \/>\r\n      The number whose logarithm should be found.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_base<\/code> {number=}:<\/b><br \/>\r\n      Optional.  Defaults to <code>Math.E<\/code>.  The base of the logarithm to find for <code>x<\/code>.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Basically returns the equivalent of <code>Math.log(x) \/ Math.log(opt_base || Math.E)<\/code>.<\/div>\r\n<\/div>","required_ids":{},"tags":["Math","Number"],"variables":["log"]});