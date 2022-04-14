import Home from '@pages/Home'
import Login from '@pages/Login'
import {Navigate} from 'react-router-dom'

export default [
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
		path:'/',
		element:<Navigate to="/home"/>
	}
]
