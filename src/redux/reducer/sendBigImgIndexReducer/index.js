import {send_BigImg_Index} from '@redux/constant'

export function sendBigImgIndexReducer(preState={imgIndex:0},action){
    let {type,payLoad}=action
    switch (type){
        case send_BigImg_Index:
            return {...preState,imgIndex:payLoad}
        default:
            return preState
    }
}