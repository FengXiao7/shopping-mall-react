import {send_BigImg_Index} from '@redux/constant'

export function sendBigImgIndexAction(index){
    return{
        type:send_BigImg_Index,
        payLoad:index
    }
}