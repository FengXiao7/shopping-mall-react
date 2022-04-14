const {override,addDecoratorsLegacy,addWebpackAlias,disableEsLint} = require('customize-cra');
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
   disableEsLint()
 )
