import React from 'react';
import Header from '@com/Header';
import Footer from '@com/Footer';
import {useRoutes,useLocation} from 'react-router-dom'
import routes from '@/routes'

const App = () => {
    const elements = useRoutes(routes)
    const {pathname} = useLocation()
    return (
        <>
          <Header/>
          {elements}
          {pathname!=='/login'&&pathname!=='/register'&&<Footer/>}
        </>
    );
}

export default App;
