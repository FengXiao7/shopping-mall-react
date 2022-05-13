import React, {  useRef } from 'react';

import style from './index.module.css'
import {connect} from 'react-redux'

const Zoom = ({ imgList,BigImgIndex }) => {
    const bigRef = useRef()
    const maskRef = useRef()

    // 放大镜
    const handler = (event) => {
        let mask = maskRef.current
        let big = bigRef.current
        // console.log(mask.offsetWidth)
        //计算并修改left和top
        let left = event.nativeEvent.offsetX - mask.offsetWidth / 2
        let top = event.nativeEvent.offsetY - mask.offsetHeight / 2
        //约束范围
        if (left <= 0) left = 0;
        if (left >= mask.offsetWidth) left = mask.offsetWidth
        if (top <= 0) top = 0
        if (top >= mask.offsetHeight) top = mask.offsetHeight
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        //放大效果,这里要看样式调整放大倍数
        big.style.left = -2 * left + 'px'
        big.style.top = -2 * top + 'px'
    }


    return (
        imgList.length > 0 &&
        < div className={style['spec-preview']} >
            <img src={imgList[BigImgIndex].imgUrl} alt="找不到图片"/>
            <div className={style.event} onMouseMove={handler}></div>
            <div className={style.big}  >
                <img src={imgList[BigImgIndex].imgUrl} ref={bigRef} />
            </div>
            {/* <!-- 遮罩层 --> */}
            <div className={style.mask} ref={maskRef}></div>
        </div >

    );
}

export default connect(
    ({sendBigImgIndex})=>({
        BigImgIndex:sendBigImgIndex.imgIndex
    })
)(Zoom);
