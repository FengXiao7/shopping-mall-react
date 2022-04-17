# 说明：

这个项目是用react全家桶重构之前用vue2写的购物网站

项目地址：https://gitee.com/feng-chengxiang/shopping-mall-vue.git

我在这里不会记录一些重复的笔记，因为之前的项目已经写的十分详尽了。

具体工具：(还不是最终版)

```json
"dependencies": {
    "@babel/plugin-proposal-decorators": "^7.17.9",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.0.1",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.26.1",
    "classnames": "^2.3.1",
    "mockjs": "^1.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^2.4.1",
    "swiper": "^8.1.0"
  },
```



```json
"devDependencies": {
    "animate.css": "^4.1.1",
    "customize-cra": "^1.0.0",
    "nprogress": "^0.2.0",
    "react-app-rewired": "^2.2.1",
    "react-redux": "^7.2.8",
    "react-transition-group": "^4.4.2"
  }
```



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

## 2.React.memo,useCallBack,useMemo，useRef

之前学的都好好的，到实战还真不知道具体的使用场景，还需要多练练啊。我打算把所有业务逻辑写完后，再来系统地看看那些地方可以优化。

## 3.路由

ReactRouter6，相比较5，多了很多钩子

## 4.状态管理

我这个项目需要共享的状态不多也不少，可以使用状态管理工具。我选择的是React-Redux，但还是采用connect方案。

也就是容器组件连接UI组件和redux的方案。最新的话redux提供了两个新钩子useSelector和useDispatch，不用connect也

可以实现，有机会会实验一下。

# vue2和React区别在本项目的体现：

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

## 4.JSX

用JSX map的时候，必须保证返回一个节点，v-for没这限制

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

尚未解决。

# 第四天

## 1.useState异步更新问题

我采用useRef存储最新状态。

传送门：

[react useState 异步 数据获取不到 - 掘金 (juejin.cn)](https://juejin.cn/post/7019482437373657101)

[useState改变值之后立刻获取最新的状态 - 掘金 (juejin.cn)](https://juejin.cn/post/6962856944130326558)

成功解决，下面就是发请求，动态展示数据了。

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/125.gif" style="zoom: 100%"></img>

而且由于是额外添加了一个容器存放参数对象，我感觉useState都可以省了。

## 2.后台出问题了

我同时用vue2项目，apiPost和现在写的这个项目测试接口。因为后台不是我自己写的，频繁发送请求，直接504了……

B站的小伙伴大多也遇见了这种情况呢。可能因为我测试的时候还有很多人也在一起吧。

## 3.map

类似v-for的操作，我们都需要map喔。JSX里面map return的时候必须只能返回一个节点

## 4.面包屑

说实话，原来的vue2项目这部分逻辑就写的不太好，老师也没写好。但主主要的原因还是，后台接口不完善，可用数据不是很多，而且数据比较混乱，很多商品和其销售属性牛头不对马嘴。白嫖的还是可以理解。

然后就是我感觉面包屑也可以拆出去变成一个单独的组件喔，但是这个项目只有search组件这一个地方用了面包屑，不拆也行，就是业务逻辑变多了。

## 5.更新地址栏

删除面包屑，发请求，接着更新地址栏。更新地址栏的方法只有通过路由自己跳自己吗？

## 6.兄弟组件通信

场景是删除关键字面包屑（search组件），搜索栏清空(header组件),这两是兄弟关系。

涉及到兄弟组件通信喔，context，pubsub，redux，props多传几次都行。先暂时放在这里，我看下后面还有没需要兄弟组件通信的地方。

## 7.排序&阿里图标

我都是在public下在线引入css

这里写法又不一样了

react写法

```jsx
<li className={isOne() ? style.active : null} onClick={changeOrder('1')}>
    <a>综合
        {
            isOne() &&
                <span
 className={['iconfont', isDesc() ? 'icon-xiangxiajiantou' : null, isAsc() ? 'icon-xiangshangjiantou' : null].join(' ')}
                ></span>
        }
    </a>
</li>
```

vue写法

```vue
<li :class="{ active: isOne }" @click="changeOrder('1')">
    <a>综合
        <span
              v-if="isOne"
              class="iconfont"
              :class="{
                        'icon-xiangshangjiantou': isAsc,
                        'icon-xiangxiajiantou': isDesc,
                      }"
        ></span
    ></a>
</li>
```

差别还是很大的

## 8.自定义分页器组件

分页器这里，我又添了个改变每页展示数据的功能。原笔记把自定义分页器说得十分详尽，这里不再赘述。

