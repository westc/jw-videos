storeSnippet({"id":124,"name":"isSpace() & isWhitespace()","description":"Test for whitespace strings and space strings like you can in Java.","js":"var isSpace = isRegExpMatch(\/[ \\xA0\\u1680\\u180E\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000]\/),\r\n    isWhitespace = isRegExpMatch(\/[\\t-\\r\\x1C- \\u1680\\u180E\\u2000-\\u200A\\u2028\\u2029\\u205F\\u3000]\/);","post":"<h2><code>isSpace(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px;\">\r\n  <h3>Description<\/h3>\r\n  <div>Test for space characters starting at the beginning of a string.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li><b><code>str<\/code> {string}:<\/b><br \/>The string to be tested.<\/li>\r\n    <li><b><code>opt_onlyCheckStart<\/code> {boolean}:<\/b><br \/>Optional.  Defaults to <code class=\"language-javascript\">false<\/code>.  If <code class=\"language-javascript\">true<\/code>, only the beginning of the string is checked to see if it starts with a space character.  If <code class=\"language-javascript\">false<\/code>, all of the string is checked to see if it only contains space characters.<\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns <code class=\"language-javascript\">true<\/code> if <code>opt_onlyCheckStart<\/code> is <code class=\"language-javascript\">true<\/code>-ish and <code>str<\/code> starts with a space character or if <code>opt_onlyCheckStart<\/code> is <code class=\"language-javascript\">false<\/code>-ish and <code>str<\/code> only contains space characters.  Otherwise <code class=\"language-javascript\">false<\/code> is returned.<\/div>\r\n  \r\n  <h3>Examples<\/h3>\r\n  <pre class=\"language-javascript\"><code>console.log(YourJS.isSpace(''));                   \/\/ -> false\r\nconsole.log(YourJS.isSpace(' '));                  \/\/ -> true\r\nconsole.log(YourJS.isSpace('\\xA0'));               \/\/ -> true\r\nconsole.log(YourJS.isSpace(' \\xA0'));              \/\/ -> true\r\nconsole.log(YourJS.isSpace(' Cool'));              \/\/ -> false\r\nconsole.log(YourJS.isSpace(' Cool', true));        \/\/ -> true\r\nconsole.log(YourJS.isSpace('Hello world!'));       \/\/ -> false\r\nconsole.log(YourJS.isSpace('Hello world!', true)); \/\/ -> false<\/code><\/pre>\r\n<\/div>\r\n\r\n<h2><code>isWhitespace(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px;\">\r\n  <h3>Description<\/h3>\r\n  <div>Test for whitespace characters starting at the beginning of a string.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li><b><code>str<\/code> {string}:<\/b><br \/>The string to be tested.<\/li>\r\n    <li><b><code>opt_onlyCheckStart<\/code> {boolean}:<\/b><br \/>Optional.  Defaults to <code class=\"language-javascript\">false<\/code>.  If <code class=\"language-javascript\">true<\/code>, only the beginning of the string is checked to see if it starts with a whitespace character.  If <code class=\"language-javascript\">false<\/code>, all of the string is checked to see if it only contains whitespace characters.<\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns <code class=\"language-javascript\">true<\/code> if <code>opt_onlyCheckStart<\/code> is <code class=\"language-javascript\">true<\/code>-ish and <code>str<\/code> starts with a whitespace character or if <code>opt_onlyCheckStart<\/code> is <code class=\"language-javascript\">false<\/code>-ish and <code>str<\/code> only contains whitespace characters.  Otherwise <code class=\"language-javascript\">false<\/code> is returned.<\/div>\r\n  \r\n  <h3>Examples<\/h3>\r\n  <pre class=\"language-javascript\"><code>console.log(YourJS.isWhitespace(''));                   \/\/ -> false\r\nconsole.log(YourJS.isWhitespace(' '));                  \/\/ -> true\r\nconsole.log(YourJS.isWhitespace('\\xA0'));               \/\/ -> false\r\nconsole.log(YourJS.isWhitespace(' \\t'));                \/\/ -> true\r\nconsole.log(YourJS.isWhitespace('\\tCool'));             \/\/ -> false\r\nconsole.log(YourJS.isWhitespace('\\tCool', true));       \/\/ -> true\r\nconsole.log(YourJS.isWhitespace('Hello world!'));       \/\/ -> false\r\nconsole.log(YourJS.isWhitespace('Hello world!', true)); \/\/ -> false<\/code><\/pre>\r\n<\/div>","required_ids":{"123":"isRegExpMatch() - Match RegExp Against Start of String or Entire String"},"tags":["RegExp","String"],"variables":["isSpace","isWhitespace"]});