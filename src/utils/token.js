//设置token
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}
//获取token
export const getToken=()=>{
    return localStorage.getItem('TOKEN')
}
//清除token
export const clearToken=()=>{
    localStorage.removeItem('TOKEN')
    // console.log(localStorage.getItem('TOKEN'));
}