import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import {getToken} from '../utils/token'
import {message} from 'antd'
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
// 路由守卫
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
    // 必须登录后才能进入的组件
    if(path==='center'||path.includes('pay')||path==='trade'){
        if(getToken()){
            return children
        }else{
            // alert('请登录!')
            message.warning('请登录!')
            return lazyLoad('Login')
        }
    }
}



// 路由表
const routes = [
    {
        path: '/home',
        element: lazyLoad('Home')
    },
    {
        path: '/login',
        element: <RouterGuard path="login">{lazyLoad('Login')}</RouterGuard>
    },
    {
        path: '/register',
        element: lazyLoad('Register')
    },
    {
        path: '/search/:keyword',
        element: lazyLoad('Search')
    },
    {
        path: '/search',
        element: lazyLoad('Search')
    },
    {
        path: '/detail/:skuid',
        element: lazyLoad('Detail')
    },
    {
        path: '/addCartSuccess',
        element: lazyLoad('AddCartSuccess')
    },
    {
        path: '/shopCart',
        element: lazyLoad('ShopCart')
    },
    {
        path: '/trade',
        element: <RouterGuard path="trade">{lazyLoad('Trade')}</RouterGuard>
    },
    {
        path: '/pay',
        element: <RouterGuard path="pay">{lazyLoad('Pay')}</RouterGuard>,
    },
    {
        path: '/paySuccess',
        element: <RouterGuard path="paySuccess">{lazyLoad('PaySuccess')}</RouterGuard>,
    },
    {
        // 组件
        path: '/center',
        element: <RouterGuard path="center">{lazyLoad('Center')}</RouterGuard>,
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
    {
        path: '*',
        element: <Navigate to="/home" />
    },

]

export default routes
