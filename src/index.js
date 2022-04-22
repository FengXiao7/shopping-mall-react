import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN'
import { BrowserRouter } from 'react-router-dom'
import '@/mock/mockServe'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>

);
