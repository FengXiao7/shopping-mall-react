import {get_Category_List} from '@redux/constant'
export function getCategoryListReducer(preState=[],action){
    let {type,payLoad}=action
    switch(type){
        // 直接用请求回来的值替换掉state
        case get_Category_List:
            return payLoad
        default:
            return preState
    }
}