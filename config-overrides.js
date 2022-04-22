const { override, addDecoratorsLegacy, addWebpackAlias, disableEsLint, fixBabelImports} = require('customize-cra');
const path = require('path')
module.exports = override(
  addDecoratorsLegacy(), // 装饰器支持

  // 添加路径别名
  // 注意：join和resolve的区别：
  // 1、join是把路径拼接
  // 2、resolve是 统一，转换平台 比如window和Linux系统服务器的路径不同问题
  addWebpackAlias({
    "@": path.join(__dirname, 'src'),
    "@com": path.join(__dirname, 'src/components'),
    "@pag": path.join(__dirname, 'src/pages'),
  }),
  //把esLint关了
  disableEsLint(),
  //按需引入组件库
  // ui框架按需加载
  fixBabelImports('import', {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": "css" // style: true  会加载 less 文件
  }),
)
