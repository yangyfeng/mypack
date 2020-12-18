#! /usr/bin/env node

// 读取config
const path = require('path')
const fs = require('fs')
// 默认配置
const defaultConfig = {
  entry: './src/index.js',
  output: {
    filename: 'build.js'
  }
}
// 最终的配置
const config = {
  ...defaultConfig,
  ...require(path.resolve('./mywebpack.config.js'))
}

class MyWebPack {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    // 根目录
    this.root = process.cwd()
    // 存储所有代码
    this.modules = {}
  }
  start() {
    console.log('解析依赖')
    const entryPath = path.resolve(this.root, this.entry)
    this.createModule(entryPath, this.entry)
    // 生成新文件
    this.generaleFile()
  }
  // 代码字符串
  generaleModuleString() {
    let fnTmp = ''
    for (const name in this.modules) {
      fnTmp += `"${name}":${this.modules[name].replace(/\r|\n/g, "")},`
    }
    fnTmp = fnTmp.substring(0, fnTmp.length - 1)
    return `{${fnTmp}}`
  }
  // 生成新文件
  generaleFile() {
    let template = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf-8')
    this.template = template.replace('__entry__', this.entry).replace('__modules_content__', this.generaleModuleString())
    fs.mkdirSync("./mydist");
    fs.writeFileSync('./mydist/' + this.config.output.filename, this.template)
    console.log('写入文件完毕');
  }
  // 创建依赖
  createModule(modulePath, name) {
    // 出现了循环依赖
    // if (this.modules[modulePath]) return
    const fileContent = fs.readFileSync(modulePath, 'utf-8')
    // 替换后的代码和依赖数组
    const { code, deps } = this.parse(fileContent, path.dirname(name))
    this.modules[name] = `function (module, module.exports, __mywebpack_require__) {
      eval(\`${code}\`)
    }`
    // 循环获取所有依赖数组的内容
    deps.forEach(dep => {
      this.createModule(path.join(this.root, dep), './' + dep)
    })

    console.log(this.modules)
  }
  // 文件解析
  parse(code, parent) {
    let deps = []
    let r = /require\('(.*)'\)/g
    // require('xxx') 将require替换__mywebpack_require__
    code = code.replace(r, function (match, arg) {
      const retPath = path.join(parent, arg.replace(/'|"/g, ''))
      deps.push(retPath)
      return `__mywebpack_require__("./${retPath}")`
    })
    return { code, deps }
  }
}

const mywebpack = new MyWebPack(config)

mywebpack.start()