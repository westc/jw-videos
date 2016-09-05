storeSnippet({"id":26,"name":"Encoding & Decoding URI Parameters","description":"","js":"\/\/ The same as PHP's (from php.js) urlencode().\r\nfunction escape(str) {\r\n  return encodeURIComponent(str)\r\n    .replace(\/!\/g, '%21')\r\n    .replace(\/'\/g, '%27')\r\n    .replace(\/\\(\/g, '%28')\r\n    .replace(\/\\)\/g, '%29')\r\n    .replace(\/\\*\/g, '%2A')\r\n    .replace(\/%20\/g, '+');\r\n}\r\n\r\n\/\/ The same as PHP's (from php.js) urldecode().\r\nfunction unescape(str) {\r\n  return decodeURIComponent(str.replace(\/%(?![\\dA-F]{2})\/gi, '%25').replace(\/\\+\/g, '%20'));\r\n}","post":" ","required_ids":{},"tags":[],"variables":["escape","unescape"]});