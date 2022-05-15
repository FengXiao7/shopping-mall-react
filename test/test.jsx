import { get_Category_List } from '@redux/constant'
import {useRequest} from 'ahooks'
import { reqCategoryList } from '@/api'
export function getCategoryListAction() {
    return async (dispatch) => {
        try {
            let result = await reqCategoryList()
            if (result.code === 200) {
                console.log('三级联动1')
                dispatch({ type: get_Category_List, payLoad: result.data })
            } else {
                alert('请求失败！')
            }
        } catch (error) {
            alert(error)
        }
    }
}