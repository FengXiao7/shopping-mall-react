import React, { useEffect, useState, useRef } from 'react';
import PubSub from 'pubsub-js'
import style from './index.module.css'

const Zoom = ({ imgList }) => {
    const bigRef = useRef()
    const maskRef = useRef()
    const [index, SetIndex] = useState(0)

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
    // 订阅BigImgIndex消息，接收大图索引。
    useEffect(() => {
        let BigImgIndex = PubSub.subscribe('BigImgIndex', (msg, index) => {
            SetIndex(index)
        })
        return () => {
            PubSub.unsubscribe(BigImgIndex)
        }
    }, [])
    // console.log(imgList,index,'Zoom')
    return (
        imgList.length > 0 &&
        < div className={style['spec-preview']} >
            <img src={imgList[index].imgUrl} alt="找不到图片"/>
            <div className={style.event} onMouseMove={handler}></div>
            <div className={style.big}  >
                <img src={imgList[index].imgUrl} ref={bigRef} />
            </div>
            {/* <!-- 遮罩层 --> */}
            <div className={style.mask} ref={maskRef}></div>
        </div >

    );
}

export default Zoom;
