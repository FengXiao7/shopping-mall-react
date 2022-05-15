import classnames from 'classnames'
import React, { useState } from 'react';
import { message } from 'antd'
import style from './index.module.css'
import Carousel from '@com/Carousel'
import { reqGetBannerList } from '@/api'
import { useRequest } from 'ahooks'

const ListContainer = () => {
    const [BannerList, SetBannerList] = useState([])


    // useEffect(() => {
    //     const doAsync = async () => {
    //         let result = await reqGetBannerList()
    //         if (result.code === 200) {
    //             console.log('请求Banner')
    //             SetBannerList(result.data)
    //         }
    //     }
    //     doAsync().catch((error) => console.log(error.msg))
    // }, [])
    useRequest(reqGetBannerList, {
        onSuccess: (result) => {
            console.log('请求成了！')
            SetBannerList(result.data)
        },
        onError: (error) => {
            message.error(error.message)
        }
    })

    return (
        BannerList?.length > 0 &&
        <div className={style['list-container']}>
            <div className={classnames(style.sortList, style.clearfix)}>
                <div className={style.center}>
                    {/* banner轮播 */}
                    <Carousel imgList={BannerList} />
                </div>
                <div className={style.right}>
                    <div className={style.news}>
                        <h4>
                            <em className={style.fl}>尚品汇快报</em>
                            <span className={classnames(style.fr, style.tip)}>更多 &gt;</span>
                        </h4>
                        <div className={style.clearix}></div>
                        <ul className={classnames(style['news-list'], style.unstyled)}>
                            <li>
                                <span className={style.bold}>[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span className={style.bold}>[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span className={style.bold}>[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span className={style.bold}>[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span className={style.bold}>[特惠]</span>备战开学季 全民半价购数码
                            </li>
                        </ul>
                    </div>
                    <ul className={style.lifeservices}>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>话费</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>机票</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>电影票</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>游戏</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>彩票</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>加油站</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>酒店</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>火车票</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>众筹</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>理财</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>礼品卡</span>
                        </li>
                        <li className={style['life-item']}>
                            <i className={style['list-item']}></i>
                            <span className={style['service-intro']}>白条</span>
                        </li>
                    </ul>
                    <div className={style.ads}>
                        <img src={require('./images/ad1.png')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListContainer;
