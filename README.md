# 说明：

这个项目是用react全家桶重构之前用vue2写的购物网站

项目地址：https://gitee.com/feng-chengxiang/shopping-mall-vue.git

# Vue2和React二者区别：

## 1.配置文件

[(26条消息) React 代理 setupProxy 无法启动项目_YoungJayDo257248的博客-CSDN博客](https://blog.csdn.net/qq_44134222/article/details/122814143)

https://blog.csdn.net/weixin_42681295/article/details/108670040

## 2.引入样式

为防止css作用域污染，React要麻烦一些。我使用的方案是index.module.css的方式引入。使用classNames和一个插件快速替换

传送门：

[如何在React中优雅的写CSS - 掘金 (juejin.cn)](https://juejin.cn/post/6844904021304541198)

[(26条消息) className多种样式的三种写法_重阳微噪的博客-CSDN博客_classname 写多个](https://blog.csdn.net/weixin_44160385/article/details/106231519)

[在react中使用css module - 秦伟杰 - 博客园 (cnblogs.com)](https://www.cnblogs.com/qinweijie/p/15012354.html)

有一个问题：

![image-20220413225721597](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220413225721597.png)

## 3.标签

### img：

img必须闭合引入src有要求

[(26条消息) react中如何引入图片 - CSDN](https://www.csdn.net/tags/MtjaMgysMTYxOC1ibG9n.html)

### input：

闭合

### checked：

这个属性要写成defaultChecked

## 4.路由

我使用的是Router6，确实比较新。

# 第一天：

## 1.配置文件修改

这个地方有两种方案：

方案1.npm run eject

单向操作不可逆，npm run eject命令暴露项目的配置，这样用户就可以完全取得 webpack 文件的控制权我不是很推荐这种做法

方案2.react-app-rewired

通过创建一个 `config-overrides.js` 文件来对 webpack 配置进行扩展。推荐。

### 路径取别名

我用的高版本的中间件要换种写法

https://blog.csdn.net/weixin_42681295/article/details/108670040

### 配置代理

[(26条消息) React 代理 setupProxy 无法启动项目_YoungJayDo257248的博客-CSDN博客](https://blog.csdn.net/qq_44134222/article/details/122814143)
