import classnames from 'classnames'
import React, { useEffect, useState } from 'react';
import style from '../index.module.css'
import { reqMyOrderList } from '@/api'
import { Pagination } from 'antd'
import LazyLoad from 'react-lazyload'

const MyOrder = () => {
    //我的订单信息
    const [myOrderList, SetMyOrderList] = useState({})
    //发请求获得我的订单信息
    const getMyOrderList =async  (page = 1, limit = 3) => {
            try {
                let result = await reqMyOrderList(page, limit)
                if (result.code === 200) {
                    SetMyOrderList(result.data)
                }
            } catch (error) {
                alert(error)
            }
    }
    //首次加载发一次请求
    useEffect(() => {
        getMyOrderList()
    }, [])
    
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
                                                <span className={style.ordertitle}>支付时间:{myOrder.createTime} 11:59　订单编号:{myOrder.outTradeNo} <span
                                                    className={classnames(style['pull-right'], style.delete)}>
                                                    <img src={require("../images/delete.png")} /></span></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myOrder.orderDetailList.map((cart, index) => {
                                                return (
                                                    <tr key={cart.id}>
                                                        <td width="60%">
                                                            <div className={style.typographic}>
                                                            <LazyLoad placeholder={<img width="100%" height="100%" src={"images/加载.gif"} alt="logo"/>}>
                                                                <img src={cart.imgUrl} style={{ width: '100px', height: "100px" }} />
                                                                </LazyLoad> 
                                                                <a href="#" className={style['block-text']}>{cart.skuName}</a>
                                                                <span>x{cart.skuNum}</span>
                                                                <a href="#" className={style.service}>售后申请</a>
                                                            </div>
                                                        </td>
                                                        {
                                                            index === 0 &&
                                                            <>
                                                                <td rowSpan={myOrder.orderDetailList.length} width="8%" className={style.center}>{myOrder.consignee}</td>
                                                                <td rowSpan={myOrder.orderDetailList.length} width="13%" className={style.center}>
                                                                    <ul className={style.unstyled}>
                                                                        <li>总金额￥{myOrder.totalAmount}</li>
                                                                        <li>在线支付</li>
                                                                    </ul>
                                                                </td>
                                                                <td rowSpan={myOrder.orderDetailList.length} width="8%" className={style.center}>
                                                                    <a href="#" className={style.btn}>{myOrder.orderStatusName}</a>
                                                                </td>
                                                                <td rowSpan={myOrder.orderDetailList.length} width="13%" className={style.center}>
                                                                    <ul className={style.unstyled}>
                                                                        <li>
                                                                            <a href="#">评价|晒单</a>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </>
                                                        }

                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            )
                        })

                    }

                </div>

            </div>
            {/* 分页器 */}
            <Pagination
            style={{textAlign:'center'}}
                total={myOrderList.total}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共${total}条订单`}
                pageSizeOptions={[3, 5, 7]}
                defaultPageSize={3}
                onChange={getMyOrderList}
            />
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
