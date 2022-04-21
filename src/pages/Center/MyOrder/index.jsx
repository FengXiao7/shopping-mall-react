import classnames from 'classnames'
import React, { useEffect, useState } from 'react';
import style from '../index.module.css'
import { reqMyOrderList } from '@/api'

const MyOrder = () => {
    const [myOrderList, SetMyOrderList] = useState({})
    useEffect(() => {
        const doAsync = async () => {
            let result = await reqMyOrderList(1, 3)
            // console.log(result)
            if (result.code === 200) {
                SetMyOrderList(result.data)
            }
        }
        doAsync().catch(error => alert(error))
    }, [])
    console.log(myOrderList)
    return (
        // <!-- 右侧内容 -->
        <div className={style['order-right']}>
            {/* <!--订单内容--> */}
            <div className={style['order-content']}>
                <div className={style.title}>
                    <h3>我的订单</h3>
                </div>
                <div className={style.chosetype}>
                    <table>
                        <thead>
                            <tr>
                                <th width="29%">商品</th>
                                <th width="31%">订单详情</th>
                                <th width="13%">收货人</th>
                                <th>金额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className={style.orders}>
                    {
                        myOrderList.records !== undefined &&
                        myOrderList.records.map(myOrder => {
                            return (
                                <table className={style['order-item']} key={myOrder.id}>
                                    <thead>
                                        <tr>
                                            <th colSpan="5">
                                                <span className={style.ordertitle}>2017-02-11 11:59　订单编号：7867473872181848 <span
                                                    className={classnames(style['pull-right'], style.delete)}>
                                                    <img src={require("../images/delete.png")} /></span></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="60%">
                                                <div className={style.typographic}>
                                                    <img src={require("../images/goods.png")} />
                                                    <a href="#" className={style['block-text']}>包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款</a>
                                                    <span>x1</span>
                                                    <a href="#" className={style.service}>售后申请</a>
                                                </div>
                                            </td>
                                            <td rowSpan="2" width="8%" className={style.center}>小丽</td>
                                            <td rowSpan="2" width="13%" className={style.center}>
                                                <ul className={style.unstyled}>
                                                    <li>总金额¥138.00</li>
                                                    <li>在线支付</li>

                                                </ul>
                                            </td>
                                            <td rowSpan="2" width="8%" className={style.center}>
                                                <a href="#" className={style.btn}>已完成 </a>
                                            </td>
                                            <td rowSpan="2" width="13%" className={style.center}>
                                                <ul className={style.unstyled}>
                                                    <li>
                                                        <a href="mycomment.html" target="_blank">评价|晒单</a>
                                                    </li>

                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="50%">
                                                <div className={style.typographic}>
                                                    <img src={require("../images/goods.png")} />
                                                    <a href="#" className={style['block-text']}>包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款</a>
                                                    <span>x1</span>
                                                    <a href="#" className={style.service}>售后申请</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })

                    }

                </div>

            </div>
            {/* <!--猜你喜欢--> */}
            <div className={style.like}>
                <h4 className={style.kt}>猜你喜欢</h4>
                <ul className={style['like-list']}>
                    <li className={style.likeItem}>
                        <div className={style['p-img']}>
                            <img src={require("../images/itemlike01.png")} />
                        </div>
                        <div className={style.attr}>
                            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                        </div>
                        <div className={style.price}>
                            <em>¥</em>
                            <i>3699.00</i>
                        </div>
                        <div className={style.commit}>已有6人评价
                        </div>
                    </li>
                    <li className={style.likeItem}>
                        <div className={style['p-img']}>
                            <img src={require("../images/itemlike02.png")} />
                        </div>
                        <div className={style.attr}>
                            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                        </div>
                        <div className={style.price}>
                            <em>¥</em>
                            <i>4388.00</i>
                        </div>
                        <div className={style.commit}>已有700人评价
                        </div>
                    </li>
                    <li className={style.likeItem}>
                        <div className={style['p-img']}>
                            <img src={require("../images/itemlike03.png")} />
                        </div>
                        <div className={style.attr}>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                        </div>
                        <div className={style.price}>
                            <em>¥</em>
                            <i>4088.00</i>
                        </div>
                        <div className={style.commit}>已有700人评价
                        </div>
                    </li>
                    <li className={style.likeItem}>
                        <div className={style['p-img']}>
                            <img src={require("../images/itemlike04.png")} />
                        </div>
                        <div className={style.attr}>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                        </div>
                        <div className={style.price}>
                            <em>¥</em>
                            <i>4088.00</i>
                        </div>
                        <div className={style.commit}>已有700人评价
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MyOrder;
