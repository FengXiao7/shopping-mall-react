import Home from '@pag/Home'
import Login from '@pag/Login'
import Register from '@pag/Register'
import Search from '@pag/Search'
import Detail from '@pag/Detail'
import AddCartSuccess from '@pag/AddCartSuccess'
import ShopCart from '@pag/ShopCart'
import Trade from '@pag/Trade'
import Pay from '@pag/Pay'
import PaySuccess from '@pag/PaySuccess'
import Center from '@pag/Center'
import MyOrder from '@pag/Center/MyOrder'
import GroupOrder from '@pag/Center/GroupOrder'
import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/search/:keyword',
        element: <Search />
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '/detail/:skuid',
        element: <Detail />
    },
    {
        path: '/addCartSuccess',
        element: <AddCartSuccess />
    },
    {
        path: '/shopCart',
        element: <ShopCart />
    },
    {
        path: '/trade',
        element: <Trade />
    },
    {
        path: '/pay',
        element: <Pay />
    },
    {
        path: '/paySuccess',
        element: <PaySuccess />
    },
    {
        path: '/center',
        element: <Center />,
        children: [
            {
                path: 'myOrder',
                element: <MyOrder />
            },
            {
                path: 'groupOrder',
                element: <GroupOrder />
            },
            {
                path: '',
                element: <Navigate to="/center/myOrder"/>
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to="/home" />
    },

]
export default routes
