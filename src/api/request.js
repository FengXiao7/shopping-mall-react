//对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress"
import {getUUID} from '@/utils/uuid'
import {getToken} from '@/utils/token'
import "nprogress/nprogress.css";


const requests = axios.create({
    baseURL:"/api",
    timeout:5000,
});

//请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start()//进度条开始
    if(getUUID()){
        config.headers.userTempId=getUUID()
    }
    if(getToken()){
        config.headers.token=getToken()
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()//进度条结束
    return res.data;
},(error)=>{
    return Promise.reject(error);
})

export default requests;