import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import store from '@/redux/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import '@/mock/mockServe'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
