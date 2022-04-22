import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from 'react'
const routes = [
    {
        path: '/',
        auth: false,
        component: lazy(() => import('./../page/login/Login'))
    },
    {
        path: '/Portal',
        auth: true,
        component: lazy(() => import('../page/portal/Portal')),
        children: [
            {
                path: '/Portal/Home',
                auth: true,
                component: lazy(() => import('../page/home/Home'))
            },
            {
                path: '/Portal/Test/:id',
                auth: true,
                component: lazy(() => import('../page/test/Test'))
            },
            {
                path: '/Portal/*',
                auth: false,
                component: lazy(() => import('../page/error/NotFound'))
            }
        ]
    },
    {
        path: '*',
        auth: false,
        component: lazy(() => import('../page/error/NotFound'))
    }
]

//根据路径获取路由
const checkAuth = (routers, path) => {
    for (const data of routers) {
        if (data.path == path) return data
        if (data.children) {
            const res = checkAuth(data.children, path)
            if (res) return res
        }
    }
    return null
}

// 路由处理方式
const generateRouter = (routers) => {
    return routers.map((item => {
        if (item.children) {
            item.children = generateRouter(item.children)
        }
        item.element = <Suspense fallback={
            <div>加载中...</div>
        }>
            {/* 把懒加载的异步路由变成组件装载进去 */}
            <item.component />
        </Suspense>
        return item
    }))
}

const Router = () => useRoutes(generateRouter(routes))
const checkRouterAuth = (path) => {
    let auth = null
    auth = checkAuth(routes, path)
    return auth
}
export { Router, checkRouterAuth }