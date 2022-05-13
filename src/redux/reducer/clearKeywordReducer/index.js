import {clear_Keyword} from '@redux/constant'
// Header检测到preState改变就会清空搜索栏,所以这里的state没什么用
export function clearKeywordReducer(preState=false,action){
    switch(action.type){
        case clear_Keyword:
            return !preState
        default:
            return preState
    }
}