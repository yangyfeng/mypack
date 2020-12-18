(() => {
  var __webpack_modules__ = ({
    "./src/a.js": ((module) => {
      eval("module.exports = (name) => {\r\n  console.log(name)\r\n}\n\n//# sourceURL=webpack://mypack/./src/a.js?")
    })
  });
  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports
  }

  (() => {
    eval("const say = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\r\nsay('你好')\n\n//# sourceURL=webpack://mypack/./src/index.js?")
  })()
})();