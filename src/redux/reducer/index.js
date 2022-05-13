import {combineReducers} from 'redux'
import {clearKeywordReducer} from './clearKeywordReducer'
import { sendBigImgIndexReducer } from './sendBigImgIndexReducer'
import { getCategoryListReducer } from './getCategoryListReducer'


// 导出总的reducer
export default combineReducers({
    clearKeyword:clearKeywordReducer,
    sendBigImgIndex:sendBigImgIndexReducer,
    CategoryListState:getCategoryListReducer
})