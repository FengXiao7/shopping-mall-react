import React from 'react';
import Header from '@com/Header';
import Footer from '@com/Footer';
import {useRoutes,Outlet} from 'react-router-dom'
import routes from '@/routes'

const App = () => {
    const elements = useRoutes(routes)
    return (
        <div>
          <Header/>
          {elements}
          <Footer/>
        </div>
    );
}

export default App;
