!function (modules) {
  // 缓存
  const installModules = {}
  // 替换后的require
  function __mywebpack_require__(moduleId) {
    // 是否缓存
    if (installModules[moduleId]) {
      return installModules[moduleId].exports
    }
    let modules = installModules[moduleId] = {
      exports: {}
    }
    modules[moduleId].call(modules.exports, module, exports, __mywebpack_require__)

    return module.exports
  }
  // 入口
  return __mywebpack_require__("__entry__")
}(__modules_content__)