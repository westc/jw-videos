storeSnippet({"id":1,"name":"isClass()","description":"Determines whether or not a function is a prototypal class-like function.","js":"function isClass(o) {\r\n  if (typeOf(o, 'Function') && (o = o.prototype)) {\r\n    for (var i in o) {\r\n      if (has(o, i)) {\r\n        return true;\r\n      }\r\n    }\r\n    return has(o, 'toString');\r\n  }\r\n  return false;\r\n}","post":"Firstly, even though I use the word class, I am actually talking about prototypes. Secondly, this solution is actually incomplete because it is very difficult to determine whether or not a function is class constructor. This solution simply tests to see if the passed in variable is a class that has custom prototypal members or if it has a custom prototypal member called `toString`.\r\n\r\nOne example case in which this function fails is when calling it for a constructor such as `ArrayBuffer`. Due to the fact that `ArrayBuffer` uses the same `toString()` method as Array, calling `isClass(ArrayBuffer)` returns `false`.\r\n\r\nAnother rare case in which this function will incorrectly return false is in the case that the class constructor passed has no custom prototypal members defined.\r\n\r\nIn the end, due to the fact that all JavaScript classes are actually functions it is not possible to write a function which truly determines in all cases if something is a class or not. On the other hand, this simple solution should work for almost any case that you would need to use it. Let me know if you think there is a way to improve it.","required_ids":{},"tags":["Boolean","Class","Function","Prototype","Type Checking"],"variables":["isClass"]});