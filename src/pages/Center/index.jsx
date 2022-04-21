import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import style from './index.module.css'

const Center = () => {
    return (
        <div className={style['order-main']}>
            <div className={style.container}>
                <div className={style['order-body']}>
                    {/* <!--左侧列表--> */}
                    <div className={style['order-left']}>
                        <dl>
                            <dt><i>·</i> 订单中心</dt>
                            <dd>
                                <Link to="/center/myOrder">我的订单</Link>
                            </dd>
                            <dd>
                                <Link to="/center/groupOrder">团购订单</Link>
                            </dd>
                            <dd>本地生活订单</dd>
                            <dd>我的预售</dd>
                            <dd>评价晒单</dd>
                            <dd>取消订单记录</dd>
                        </dl>
                        <dl>
                            <dt><i>·</i> 关注中心</dt>
                            <dd>关注的商品</dd>
                            <dd>关注的店铺</dd>
                            <dd>关注的专辑</dd>
                            <dd>关注的品牌</dd>
                            <dd>关注的活动</dd>
                            <dd>浏览历史</dd>
                        </dl>
                        <dl>
                            <dt><i>·</i> 特色业务</dt>
                            <dd>我的营业厅</dd>
                            <dd>京东通信</dd>
                            <dd>定期送</dd>
                            <dd>京东代下单</dd>
                            <dd>我的回收单</dd>
                            <dd>节能补贴</dd>
                            <dd>医药服务</dd>
                            <dd>流量加油站</dd>
                            <dd>黄金托管</dd>
                        </dl>
                        <dl>
                            <dt><i>·</i> 客户服务</dt>
                            <dd>返修退换货</dd>
                            <dd>价格保护</dd>
                            <dd>意见建议</dd>
                            <dd>购买咨询</dd>
                            <dd>交易纠纷</dd>
                            <dd>我的发票</dd>
                        </dl>
                        <dl>
                            <dt><i>·</i> 设置</dt>
                            <dd>个人信息</dd>
                            <dd>收货地址</dd>
                        </dl>
                    </div>
                    {/* <!-- 路由出口 --> */}
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Center;
