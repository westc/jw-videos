storeSnippet({"id":109,"name":"getSimpleCallback() - Get Callbacks By Name","description":"Gets and saves YourJS functions by name while allowing for the function signature to be predetermined.","js":"var getSimpleCallback;\r\n(function(__callbacksByName) {\r\n  getSimpleCallback = function (fn) {\r\n    if (typeOf(fn, 'String')) {\r\n      if (has(__callbacksByName, fn)) {\r\n        fn = __callbacksByName[fn];\r\n      }\r\n      else {\r\n        var func, name = fn.split(':'), indices = name[1], callbackName = fn + '';\r\n        if (typeOf(fn = func = YourJS[name = name[0]], 'Function')) {\r\n          if (indices != undefined) {\r\n            indices = indices.split(',');\r\n            fn = __callbacksByName[callbackName] = function() {\r\n              for (var args = [], i = -1, index; index = indices[++i]; ) {\r\n                args[i] = index == 'this' ? this : pull(arguments, index, undefined);\r\n              }\r\n              return func.apply(this, args);\r\n            };\r\n          }\r\n        }\r\n        else {\r\n          throw new Error('There is no \"' + name + '\" function.');\r\n        }\r\n      }\r\n    }\r\n    return fn || identity;\r\n  };\r\n})({});","post":"<h2><code>getSimpleCaller(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Gets and saves YourJS functions by name while allowing for the function signature to be predetermined.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>fn<\/code> {Function|string}:<\/b><br \/>\r\n      <div>If a <code>Function<\/code> is specified it will simply be returned.  If a <code>string<\/code> is specified it will be used to determine the name of the YourJS function to return and it will also be determined to predetermine the signature of the function.  The <code>string<\/code> should be in one of the following formats:<\/div>\r\n      <ul>\r\n        <li>\r\n          <b><code>functionName<\/code>:<\/b><br \/>\r\n          This will simply assure that the YourJS function with the specified function name (<code>functionName<\/code>) is returned.\r\n        <\/li>\r\n        <li>\r\n          <b><code>functionName:<\/code>:<\/b><br \/>\r\n          This will assure that the YourJS function with the specified function name (<code>functionName<\/code>) is returned but it will not be able to receive any arguments.\r\n        <\/li>\r\n        <li>\r\n          <b><code>functionName:path1,path2,...<\/code>:<\/b><br \/>\r\n          This will assure that the YourJS function with the specified function name (<code>functionName<\/code>) is returned and the arguments that are received will be those found at the specified paths (<code>path1,path2,...<\/code>).\r\n        <\/li>\r\n      <\/ul>\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>The function as indicated by the <code>fn<\/code> parameter.<\/div>\r\n<\/div>\r\n\r\n<h2>Example<\/h2>\r\n```javascript\r\nvar slicer = YourJS.getSimpleCallback('slice:0,1.start,1.end');\r\nconsole.log(slicer([3,5,7,9]));  \/\/ -> [3, 5, 7, 9]\r\nconsole.log(slicer([3,5,7,9], {start: 2}));  \/\/ -> [7, 9]\r\nconsole.log(slicer([3,5,7,9], {end: -1}));  \/\/ -> [3, 5, 7]\r\n```","required_ids":{"108":"pull() - Get The Value At a Specific Path"},"tags":["Function","String"],"variables":["getSimpleCallback"]});