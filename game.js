let SensitiveWordFilter = require("./index.js");

let filter = global.filter = new SensitiveWordFilter(require("./sensitive_word.json"));


filter.replaceSensitiveWord("aaa傻逼", SensitiveWordFilter.MAX_MATCH_TYPE);

// ["傻逼"]