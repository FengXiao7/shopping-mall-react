import { get_Category_List } from '@redux/constant'
import {message} from 'antd'
import { reqCategoryList } from '@/api'
export function getCategoryListAction() {
    return async (dispatch) => {
        try {
            let result = await reqCategoryList()
            if (result.code === 200) {
                dispatch({ type: get_Category_List, payLoad: result.data })
            } else {
                message.error('无法获取三级联动数据！')
            }
        } catch (error) {
            message.error(error.message)
        }
    }
}