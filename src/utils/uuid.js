import { v4 as uuidv4 } from 'uuid';
//该函数生成唯一uuid，用于表示游客身份且每次执行都不会发生变化，且持久化存储
export const getUUID=()=>{
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}