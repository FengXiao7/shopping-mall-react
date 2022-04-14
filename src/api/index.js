import requests from './request'
import mockRequests from './mockAxios'
//三级联动接口
///api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () =>  requests({ url: 'product/getBaseCategoryList', method: 'get' })

//获取Banner，首页轮播图
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })

//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')
//获取搜索模块数据
//这个请求要传参数,默认参数至少是一空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data:params })

//获取产品详细信息接口，需要一个参数产品id
export const reqGetGoodsInfo=(skuid)=>requests({url:`/item/${skuid}`,method:'get'})

//将产品添加到购物车中，需要两个参数，产品ID和个数
export const reqAddOrUpdateShopCart=(skuId,skuNum)=> requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
//获取购物车列表s

export const reqGetCartList=()=> requests({url:'/cart/cartList',method:'get'})

//删除购物车商品
export const reqDeleteCart=(skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改购物车产品状态
export const reqUpdateChartChecked=(skuId,isChecked)=>requests({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//根据手机号获取验证码
//这里后台不是真正的发送验证码到手机
///api/user/passport/sendCode/{phone}
export const reqVerificationCode=(phone)=>requests({url:`user/passport/sendCode/${phone}`,method:'get'})

//注册接口
///api/user/passport/register
export const reqUserRegister=(data)=> requests({url:'user/passport/register',data,method:'post'})

//登录
///api/user/passport/login
export const reqUserLogin=(data)=>requests({url:'user/passport/login',data,method:'post'})

//获取用户登录信息
//注意需要带上用户token，我们在请求拦截器里做
//api/user/passport/auth/getUserInfo
export const reqUserInfo=()=> requests({url:'user/passport/auth/getUserInfo',method:'get'})
//退出登录
///api/user/passport/logout 这个主要用于后端清除数据
export const reqLogout=()=>requests({url:'user/passport/logout',method:'get'})
//获取用户登录信息
///api/user/userAddress/auth/findUserAddressList
export const reqAddressList=()=>requests({url:'user/userAddress/auth/findUserAddressList',method:'GET'})
//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});
//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=> requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});