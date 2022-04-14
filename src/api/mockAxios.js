import axios from "axios";
import nprogress from "nprogress"

import "nprogress/nprogress.css";



const mockRequests = axios.create({
    baseURL:"/mock",
    timeout:5000,
});


mockRequests.interceptors.request.use((config)=>{
    nprogress.start()//进度条开始
    return config;
})


mockRequests.interceptors.response.use((res)=>{

    nprogress.done()//进度条结束
    return res.data;
},(error)=>{
    return Promise.reject(new Error("faile"));
})


//对外暴露
export default mockRequests;