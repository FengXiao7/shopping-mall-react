import Home from '@pag/Home'
import Login from '@pag/Login'
import Register from '@pag/Register'
import Search from '@pag/Search'
import {Navigate} from 'react-router-dom'

const routes = [
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/search/:keyword',
        element:<Search/>
    },
    {
        path:'/search',
        element:<Search/>
    },
    {
		path:'/',
		element:<Navigate to="/home"/>
	}
]
export default routes
