实现步骤：

0、读取webpack.config.js

1、解析文件依赖

2、替换require为__webpack_require__

3、本地使用{}存储所有的文件，然后通过使用为__webpack_require__获取文件内容，执行函数方式为evel的包裹代码字符串

