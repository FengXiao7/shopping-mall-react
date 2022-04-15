# 说明：

这个项目是用react全家桶重构之前用vue2写的购物网站

项目地址：https://gitee.com/feng-chengxiang/shopping-mall-vue.git

# 急需优化的地方：

## 1.useEffect发送请求

组件挂载时会发送请求，怎么做到只发送一次请求，切换路由组件又回来后，不再发送请求？

```jsx
const [CategoryList,SetCategoryList] = useState([])
    useEffect(()=>{
       const doAsync = async()=>{
            let result = await reqCategoryList()
            if(result.code==200){
                // console.log("hahahhaha")
                SetCategoryList(result.data)
            }
       }
       doAsync().catch((error)=>console.log(error.msg))
    },[])
    // console.log(CategoryList,'List')
```



# 方案：

## 1.路由

ReactRouter6，相比较5，多了很多钩子

## 2.状态管理

我这个项目需要共享的状态不多也不少，可以使用状态管理工具。我选择的是React-Redux，但还是采用connect方案。

也就是容器组件连接UI组件和redux的方案。最新的话redux提供了两个新钩子useSelector和useDispatch，不用connect也

可以实现，有机会会实验一下。

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

### 有一个问题：

![image-20220413225721597](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220413225721597.png)

### 解决方案：

reset.css里面就只有清除浮动这一个是自定义的属性，直接写在style里面就行。但我觉得一定有更好的解决方案，不然一旦需要清除浮动就需要手动添加clearFix到对应的xxx.module.css里面，那这样在public里面全局引入的reset.css还有什么意义呢？

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

## 2.关于CSS作用域污染

这一部分我在Vue2区别和React二者区别那里，已经解决了。不过没找到更好的方法。

## 3.路由元信息

原项目中依赖路由元信息，选择是否展示Footer组件。我看了下，只有两个组件：登录组件和注册组件不用展示，

那么直接判断pathname就行了。这显然不是最优解，很想知道react怎么自定义路由配置项。

![image-20220414140824676](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220414140824676.png)

# 第二天

## 1.Swiper:

Swiper在React中的使用，要变下使用方式

官网：[Swiper React Components (swiperjs.com)](https://swiperjs.com/react)

这个怎么说官方也提供了相关钩子，很方便就可以实现轮播图。以后使用的时候去查查参数就行

```jsx

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide><img src={require('./images/banner1.jpg')} alt="" /></SwiperSlide>
      <SwiperSlide><img src={require('./images/banner2.jpg')} alt="" /></SwiperSlide>
      <SwiperSlide><img src={require('./images/banner3.jpg')} alt="" /></SwiperSlide>
      <SwiperSlide><img src={require('./images/banner4.jpg')} alt="" /></SwiperSlide>
      
      ...
    </Swiper>
  );
};
export default Carousel
```

## 2.useEffect

组件挂载时会发送请求，怎么做到只发送一次请求，切换路由组件又回来后，不再发送请求？

```jsx
const [CategoryList,SetCategoryList] = useState([])
    useEffect(()=>{
       const doAsync = async()=>{
            let result = await reqCategoryList()
            if(result.code==200){
                // console.log("hahahhaha")
                SetCategoryList(result.data)
            }
       }
       doAsync().catch((error)=>console.log(error.msg))
    },[])
    // console.log(CategoryList,'List')
```

## 3.dataset

这个是H5让我们获取自定义属性的，我们在三级联动那里需要用到，原笔记说的很清楚。

而且只有我们没有点击空白区域，才能正确获得自定义属性。

```jsx
function goSearch(event) {
        event.preventDefault()
        let element =event.target
        let { categoryname, categoryid_1, categoryid_2, categoryid_3 } =element.dataset;
        console.log(categoryname,categoryid_1,categoryid_2,categoryid_3)
    }
```

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/124.gif" style="zoom: 100%"></img>

# 第三天

## 1.动画

react里面使用animate.css的方案不太一样，有点麻烦。这种锦上添花，影响用户体验的部分，我放到后面来做。

## 2.params参数可传可不传

这个在reactRouter里面该怎么设置呀，以前是在占位后面加一个‘？’。但我试了下，不行呀。

TypeNav的search参数和搜索框里面的params参数需要合并，传递给search路由组件。当然可能出现用户不搜索直接选择

TypeNav的可能，这个时候我们的params参数为空。但路由注册时已经占位，不能为空。

那么，我想到了3种方案：

### 方案一：

判断一下用户是否为直接点击TypeNav过来的，这种情况我们手动添加一个params参数占位就行。可以用分类名占位，语义化一些

### 方案二：

放弃params参数，改用state参数。因为最终我们的目的还是是发送请求，只要能获取到参数就行，useNavigate对

state参数支持还更友好。

### 方案三：

再加一个没有params参数占位的路由，不知道这样标不标准，但确实可以正常运行哈

![image-20220415193813176](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220415193813176.png)

我最后用的是方案三。

## 3.关于Search参数

我发现在react-router里面获取search参数真的很麻烦额，以前要解析字符串。虽然现在多了个useSearchParams钩子，

但是取得时候必须晓得键才可以，因为有3种不同商品ID作为search参数，我需要不断判断一下，很麻烦。

## 4.useState异步更新问题

尚未解决
