import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import {getToken} from '../utils/token'
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
    {
        path: '/home',
        element: lazyLoad('Home')
    },
    {
        path: '/login',
        // 已经登录还想登录(通过地址栏输入可以做到)，跳到首页
        element: getToken()?<Navigate to="/home"/>:lazyLoad('Login')
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
        element: lazyLoad('Trade')
    },
    {
        path: '/pay',
        element: lazyLoad('Pay')
    },
    {
        path: '/paySuccess',
        element: lazyLoad('PaySuccess')
    },
    {
        path: '/center',
        element: getToken()?lazyLoad('Center'):lazyLoad('Login'),
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
export default routes
