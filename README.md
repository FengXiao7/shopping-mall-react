# 说明：



这个项目是用react全家桶重构之前用vue2写的购物网站

项目地址：https://gitee.com/feng-chengxiang/shopping-mall-vue.git

我在这里不会记录一些重复的笔记，因为之前的项目已经写的十分详尽了。





## 1.useEffect发送请求

组件挂载时会发送请求，怎么做到只发送一次请求，切换路由组件又回来后，不再发送请求？是只能用状态管理工具了吧

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

## 2.React.memo,useCallBack,useMemo

之前学的都好好的，到实战还真不知道具体的使用场景，还需要多练练啊。我打算把所有业务逻辑写完后，再来系统地看看那些地方可以优化。

## 3.路由

ReactRouter6，相比较5，多了很多钩子

## 4.状态管理

我这个项目需要共享的状态不多也不少，可以使用状态管理工具。我选择的是React-Redux，采用connect方案。

也就是容器组件连接UI组件和redux的方案。最新的话redux提供了两个新钩子useSelector和useDispatch，不用connect也

可以实现，有机会会实验一下。

最后的成品没有用到状态管理工具。

## 5.组件通信

父子用props，兄弟我用的是PubSub消息订阅。

然后用这个PubSub，我感觉使用体验上和Vue的自定义事件差不多，写的时候很爽，但是比较混乱。

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

### 1号解决方案：

reset.css里面就只有清除浮动这一个是自定义的属性，直接写在style里面就行。但我觉得一定有更好的解决方案，不然一旦需要清除浮动就需要手动添加clearFix到对应的xxx.module.css里面，那这样在public里面全局引入的reset.css还有什么意义呢？

### 2号解决方案：

不用1号方案那样写。

直接这样写：

```jsx
className={[style.tab,'clearFix'].join(' ')}
```



## 3.标签

### img：

img必须闭合引入src有要求

[(26条消息) react中如何引入图片 - CSDN](https://www.csdn.net/tags/MtjaMgysMTYxOC1ibG9n.html)

### checked：

这个属性写成defaultChecked，代表非受控组价

## value:

写成defaultValue代表非受控，和上边的defaultChecked一个道理

[react里面的value和defaultValue_唐霜的博客 (tangshuang.net)](https://www.tangshuang.net/4036.html)

### 多个单词的属性：

必须写成驼峰

## 4.JSX

用JSX map的时候，必须保证返回一个节点，v-for没这限制



# 第一天：

## 1.配置文件修改

这个地方有两种方案：

方案1.npm run eject

单向操作不可逆，npm run eject命令暴露项目的配置，这样用户就可以完全取得 webpack 文件的控制权我不是很推荐这种做法

方案2.react-app-rewired或者carco

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

B站的小伙伴大多也遇见了这种情况呢。可能因为我测试的时候还有很多人也在一起用吧。

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

# 第五天

前一天已经把Search组件基本开发完成。今天开始开发detail组件。

## 1.Detail组件路由

声明的时候要用{}包一下，老是要搞忘。

```jsx
<Link to={`/detail/${goods.id}`}>
	<img src={goods.defaultImg} />
</Link>
```

## 2.后台数据

只要涉及到后台，就会有一些奇怪的数据喔。有时候你点图片可以发请求，发请求也成功了，数据也得到了，但是数据键都有，就是没值，全为null或者0.就很坑。还有些情况是有商品数据，没有图片数据，也要注意这个坑。所以在你看见购物车详情组件显示有误时，就是我没考虑到后台数据的不完整性。后台不要添加些奇怪的数据啊!

## 3.点击商品属性，不改变样式的问题

这个是因为虽然改变了isChecked，但是没有重新渲染。这个很容易理解，我们只需要重新set一下，改变状态就行。

而且必须是传入一个新的对象，也就是深拷贝。直接spread展开就行，但是我觉得创建这个新对象代价是不是太大了？



既然必须重新渲染，我想了个邪门的方法，维护一个没用的且简单的state，改变isChecked的时候，更新这个无用的state就行了。不知道真实开发中应该怎么做，有没啥更好的方法呢？



## 4.放大器

有坑，因为获得的鼠标移动事件不是原生的事件，是React的合成事件。SyntheticBaseEvent。然后他上面没有offsetX。

我们用event.nativeEvent获取原生的事件。

传送门：[React的mouseEvent没有offsetX/offsetY - VoidCC](http://cn.voidcc.com/question/p-bhvwmgsx-dq.html)

然后就是放大器Zoom组件和下方缩略图ImageList组件是兄弟组件，需要把ImageList的图片索引传给Zoom。涉及到兄弟组件通信，我用的是PubSub来通信。

## 5.路由跳转至页面顶部

在useEffect添一句window.scrollTo(0,0)就行。在vue2项目里面我们使用的是滚动事件解决。

# 第六天

今天开始开发购物车组件了。

## 1.游客UUID

配合后台在header里面添加一个自定义请求头userTempld，往里面放一个uuid就行。然后我们的uuid是放在localStorage里面做持久化存储。

## 2.商品数目

我们使用input框改变商品数目时，发现无法输入。

[react里面的value和defaultValue_唐霜的博客 (tangshuang.net)](https://www.tangshuang.net/4036.html)

我发现这个输入框有重大bug。

我想使用onBlur失去焦点后再发请求，但是直接报错。因为value必须要和onChange搭配，不然无法输入。

暂时没找到啥好的解决方案。而且由于添加了500ms的节流，用户输入会有延迟。



**改变商品数目真的需要发请求吗？**

我感觉可以最后点结算再发请求，但这样就需要使用非受控组件。但这样与数量有关的数据显示，就不能实时更新了。

只能说更加细化地限制用户输入input动作了。

## 3.删除商品

我发现如果有多个商品，可以正常删除。但是如果只有一个商品，删除后，需要用户手动更新一下才能正确显示购物车为空的提示信息，这是为啥？我觉得删除完后，再次发送获取购物车的请求，会改变状态，应该重新渲染才对，应该可以正确显示，但事实并非如此。目前还没找到错。

## 4.删除所选商品

这个涉及到在循环内使用async await。我们和第三点一样，还是有类似的问题，如果把所有的都删除，需要用户手动更新一下才能正确显示购物车为空的提示信息。

[五种在循环中使用 async/await 的方法 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/359341530)

## 5.全选

我这个是真的不知道为啥，已经checked，但是页面还是没有渲染已勾选状态。有点懵

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/126.gif" style="zoom: 100%"></img>

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/127.gif" style="zoom: 100%"></img>

# 第七天

今天主要开发登录和注册组件

## 1.注册组件

vue2项目用的是vee-validate插件进行验证。我在这里用的是formik进行表单验证。把官方例子抄过来，改改就行了。我感觉这个formik做表单验证很方便，以后react项目里面就用它了。

## 2.验证码

这个验证码，根本不用用户输入，直接点击按钮就行。而且是个假的验证码，不能通过手机号发送，因为通过手机接收要钱，可以理解。那我感觉把验证码框直接disabled得了。

这里又是受控组件input的value的坑，不再赘述。

## 3.登录组件

这个后台接口不是很完善，输入错误手机号，输入正确手机号但密码错误都没有相应接口。

经我测试以上错误情况统一返回是这个：

![image-20220420165935935](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220420165935935.png)

## 4.Trade组件

这个地方需要是否已经登录，登录后才能从结算按钮跳转过来。原vue2项目写的是路由守卫，我在这里只是根据token简单判断了下。然后后台有一个获取收件人信息的接口，只有用老师的账号和密码才能获取收件人信息数据

账号:13700000000 密码：111111

# 第八天

今天主要是Pay组件和Center组件开发

## 1.Trade组件到Pay组件

发请求注意参数可能不存在的情况：

用可选链的形式

```jsx
      let data={
            consignee:address?.consignee,//收件人
            consigneeTel: address?.phoneNum,//电话
            deliveryAddress: address?.fullAddress,//地址
            paymentWay: "ONLINE", //支付方式
            orderComment: msgRef.current.value, //买家的留言信息
            orderDetailList: detailArrayList, //商品清单
        }
```

## 2.Pay组件

这里面有个点击按钮弹出消息对话框的UI，vue2项目用的是Element-UI，这里当然是用antD啦。顺便也可以按需引入。

感觉会配置很久……

我使用的是react-app-rewired，不是carco配置。捣鼓了半天按需引入成功，自定义主题失败……

## 3.微信支付

微信支付这里如何判断用户是否真的支付成功？我用的是一个定时器不断地向后台发请求，直至成功或者关闭对话框。

真实开发中真的是这样做的吗？

然后点击对话框x或者取消按钮触发的是同一个回调函数，怎么区分开来？我直接把x按钮取消掉了

# 第九天

## 1.antd 覆盖了我的全局样式

怎么说，antD设计之初就是为了开发一整套应用，没找到啥好的解决办法。我看网上很多人，都直接eject来配置的，我就算了。按官网文档操作不起作用。

自定义主题也失败了……

![image-20220424022402386](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220424022402386.png)

## 2.图片懒加载

安装npm install --save react-lazyload失败。

![image-20220422144321092](https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/image-20220422144321092.png)

根据提示加参数npm install --save react-lazyload --legacy-peer-deps

传送门：[(26条消息) npm的“--force“和“--legacy-peer-deps“参数_奔跑吧邓邓子的博客-CSDN博客_--force npm](https://blog.csdn.net/u012069313/article/details/122771890)

使用：[(26条消息) 《图片懒加载之react-lazyload》_杨晓风-linda的博客-CSDN博客_react懒加载图片](https://blog.csdn.net/yxf15732625262/article/details/123830856)

## 3.路由懒加载

这个怎么说，我的路由使用的是useRoutes引入路由表的方式，还真不知道这种方式怎么用lazy+Suspense的方式实现路由懒加载。容我先研究研究。

可以这样写

```js
// 懒加载
const lazyLoad = (path) => {
    const Comp = lazy(() => import(`@pag/${path}`))
    return (
        <Suspense fallback={
            <>
                <img src={"images/加载.gif"}
                    style={{ display: 'block', width: '500px', height: '500px', margin: '0 auto' }}
                    alt="懒加载的图都找不到吗？" />
            </>}>
            <Comp />
        </Suspense>
    )
}

const routes = [
    //一级路由
    {
        path: '/home',
        element: lazyLoad('Home')
    },
	…………………………………………………………………………………………
    //嵌套路由
    {
        path: '/center',
        element: lazyLoad('Center'),
        children: [
            {
                path: 'myOrder',
                element: lazyLoad('Center/MyOrder')
            },
            {
                path: 'groupOrder',
                element: lazyLoad('Center/GroupOrder')
            },
            {
                path: '',
                element: <Navigate to="/center/myOrder" />
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to="/home" />
    },

]
```

## 4.路由守卫

这个东西，react好像还真没有类似vue中beforeEach的函数。不过我们可以在跳转里面自己写跳转逻辑，就是这样写比较分散，而且会写很多遍，肯定不能这么写。

我看网上大多数都是封装下Route,因为我用的是useRoutes引入路由表的方式，所以不太可能用这种方法。所以到底该咋办呀？

# 补充：

## 1.换了下接口地址，以前的不能用了。

## 2.高光立体壁画式卡片悬停特效

可以调节闪光颜色和角度。我觉得很好看！

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/142.gif" style="zoom: 100%"></img>

## 3.路由拦截

这个可以做到，只是控制颗粒度我感觉没有以前的vue项目细。

三个简单方案：

### 方案1：

我可以在路由表里面实现:

就像这样：

```js
    {
        path: '/login',
        // 已经登录还想登录(通过地址栏输入可以做到)，跳到首页
        element: getToken()?<Navigate to="/home"/>:lazyLoad('Login')
    },
```

我如果想在里面再加一些逻辑呢？比如有个提示框啥的，这个到底该咋写呀？

还有一些权限控制是特定页面向特定页面跳转才会有限制，我通过什么方法可以拿到from和to呢？

只能说用的版本太新了，网上也没找到啥好办法。

我看到有用useHistory的，但是这个方法6版本里面没了……

### 方案2：

如果想实现更多逻辑，应该是只能在对应组件里面写逻辑了，没办法在配置路由表里写了。这样写极其分散，很难一眼看出来那些地方做了路由拦截。

就像这样：

```jsx
    //首次挂载发请求
    useEffect(() => {
        if(!getToken()){
            message.warning('请登录!')
            navigate('/login')  
        }
    }, [])
```

而且因为写在useEffect,且依赖项为空数组的情况下。不就需要先render一次，再跳转吗？这还算路由拦截吗？虽然也能实现功能

### 方案3：

我真傻，真的。直接封装组件就行了嘛。

**注意不能封装成函数，因为这样就只有第一次会生效了。**

就像这样：

路由表使用

```js
{
        path: '/login',
        element: <RouterGuard path="login">{lazyLoad('Login')}</RouterGuard>
    },
```

封装成组件

```js
function RouterGuard({path,children}){
    // 登录的情况下又登录
    if(path==='login'){
        if(getToken()){
            alert('你已经登录!')
            // 用antD组件会报错！
            // message.warning('你已经登录!')
            return <Navigate to="/home" />
        }
        return children
    }
}
```

用antD组件message会报错！纯函数的原因，alert就没问题

![image-20220507022638551](C:\Users\FengXiao7\AppData\Roaming\Typora\typora-user-images\image-20220507022638551.png)
