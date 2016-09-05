storeSnippet({"id":7,"name":"random()","description":"Either generate a random number or retrieve a random item from an array.","js":"function random(opt_ArrOrMinOrMax, opt_max, opt_round) {\r\n  var argCount = arguments.length,\r\n    arg0Type = typeOf(opt_ArrOrMinOrMax);\r\n  if (arg0Type == 'Array') {\r\n    return opt_ArrOrMinOrMax[random(opt_ArrOrMinOrMax.length - 1, true)];\r\n  }\r\n  if (arg0Type == 'Boolean') {\r\n    opt_round = opt_ArrOrMinOrMax;\r\n  }\r\n  else if (typeOf(opt_max, 'Boolean')) {\r\n    opt_round = opt_max;\r\n    argCount = 1;\r\n  }\r\n  if (argCount < 2) {\r\n    opt_max = argCount == 1 ? opt_ArrOrMinOrMax : 1;\r\n    opt_ArrOrMinOrMax = 0;\r\n  }\r\n  var ret = Math.random() * (opt_max - opt_ArrOrMinOrMax) + opt_ArrOrMinOrMax;\r\n  return ret = opt_round ? Math.round(ret) : ret;\r\n}","post":"<h2><code>random(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Either generate a random number or retrieve a random item from an array.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>opt_ArrOrMinOrMax<\/code> {Array|number}:<\/b><br \/>\r\n      Optional.  If this is the only value given and is a number this value will be assigned to <code>opt_max<\/code> and the minimum value will become 0.  If this is an array a random value from this array will be returned.  If this is not the only value passed it will be used as the minimum random value.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_max<\/code> {number}:<\/b><br \/>\r\n      Optional.  If only one parameter was passed this will become that parameter.  If no parameter were passed this will become <code>1<\/code>.  This is upper bound of the value that would be returned.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_round<\/code> {boolean}:<\/b><br \/>\r\n      Optional.  Defaults to <code class=\"language-javascript\">false<\/code>.  If <code class=\"language-javascript\">true<\/code> and <code>opt_ArrOrMinOrMax<\/code> is a number the returned number will be a integer between <code>opt_ArrOrMinOrMax<\/code> and <code>opt_max<\/code> with both bounds being inclusive.  If <code class=\"language-javascript\">false<\/code> and <code>opt_ArrOrMinOrMax<\/code> is a number the returned number will be a number between <code>opt_ArrOrMinOrMax<\/code> (inclusive) and <code>opt_max<\/code> (non-inclusive).\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>If <code>opt_arrOrMinOrMax<\/code> is an array a random value from the array will be returned, otherwise a random number within the given bounds will be returned.<\/div>\r\n<\/div>\r\n\r\n<h2>More Information<\/h2>\r\nYou may be wondering if it is really helpful to have a `random()` function available to YourJS but I assure you the answer is yes!  This is what you can do with YourJS's `random()`:\r\n```javascript\r\nvar min = -10, max = 10, arr = [2,4,6,8,10,100];\r\n\r\nvar num1 = YourJS.random();  \/\/ Random number between [0, 1)\r\nvar num2 = YourJS.random(arr);  \/\/ Random item from array\r\nvar num3 = YourJS.random(max);  \/\/ Random number between [0, 10)\r\nvar num4 = YourJS.random(max, true);  \/\/ Random integer between [0, 10]\r\nvar num5 = YourJS.random(min, max);  \/\/ Random number between [-10, 10)\r\nvar num6 = YourJS.random(min, max, true);  \/\/ Random integer between [-10, 10]\r\n```\r\n\r\nThe equivalent of this using `Math.random()` would be:\r\n```javascript\r\nvar min = -10, max = 10, arr = [2,4,6,8,10,100];\r\n\r\nvar num1 = Math.random();  \/\/ Random number between [0, 1)\r\nvar num2 = arr[Math.floor(Math.random() * arr.length)];  \/\/ Random item from array\r\nvar num3 = Math.random() * max;  \/\/ Random number between [0, 10)\r\nvar num4 = Math.round(Math.random() * max);  \/\/ Random integer between [0, 10]\r\nvar num5 = Math.random() * (max - min) + min;  \/\/ Random number between [-10, 10)\r\nvar num6 = Math.round(Math.random() * (max - min) + min);  \/\/ Random integer between [-10, 10]\r\n```\r\n\r\nAs you see, using `YourJS.random()` is shorter in all cases except that in which no arguments are specified.  As is normal with YourJS, I will leave it up to you to decide whether or not to include in your snippet build.","required_ids":{},"tags":["Array","Number"],"variables":["random"]});