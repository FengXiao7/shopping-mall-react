// 请确认安装了classnames
import classnames from 'classnames'
import React, { useEffect, useState } from 'react';
import style from './index.module.css'
import { reqOrderInfo, reqAddressList } from '@/api'

const Trade = () => {
    const [OrederInfo, SetOrderInfo] = useState({})
    const [addressList, SetAddressList] = useState([])
    const { detailArrayList, totalNum, totalAmount, tradeNo } = OrederInfo
    useEffect(() => {
        const doAsyc = async () => {
            let result1 = await reqAddressList()
            let result2 = await reqOrderInfo()
            if (result1.code === 200) {
                SetAddressList(result1.data)
            }
            if (result2.code === 200) {
                SetOrderInfo(result2.data)
            }

        }
        doAsyc().catch(error => alert(error))
    }, [])
    console.log(addressList)
    return (
        <div className={style['trade-container']}>
            <h3 className={style.title}>填写并核对订单信息</h3>
            <div className={style.content}>
                <h5 className={style.receive}>收件人信息</h5>
                {
                    addressList.length > 0 &&
                    addressList.map(address => {
                        return (
                            <div className={[style.address, "clearFix"].join(' ')} key={address.id}>
                                <span className={classnames(style.username, style.selected)} selected={address.isDefault === "1"}>{address.consignee}</span>
                                <p>
                                    <span className={style.s1}>{ address.fullAddress }</span>
                                    <span className={style.s2}>{ address.phoneNum }</span>
                                    {
                                        address.isDefault === "1"&&
                                    <span className={style.s3}>默认地址</span>
                                    }
                                </p>
                            </div>
                        )
                    })
                }


                <div className={style.line}></div>
                <h5 className={style.pay}>支付方式</h5>
                <div className={[style.address, "clearFix"].join(' ')}>
                    <span className={classnames(style.username, style.selected)}>在线支付</span>
                    <span className={style.username} style={{ marginLeft: '5px' }}>货到付款</span>

                </div>
                <div className={style.line}></div>
                <h5 className={style.pay}>送货清单</h5>
                <div className={style.way}>
                    <h5>配送方式</h5>
                    <div className={[style.info, "clearFix"].join(' ')}>
                        <span className={style.s1}>天天快递</span>
                        <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
                    </div>
                </div>
                <div className={style.detail}>
                    <h5>商品清单</h5>
                    {
                        detailArrayList !== undefined &&
                        detailArrayList.map(detail => {
                            return (
                                <ul className={[style.list, "clearFix"].join(' ')} key={detail.skuId}>
                                    <li>
                                        <img src={detail.imgUrl} alt="" style={{ width: '100px', height: '100px' }} />
                                    </li>
                                    <li>
                                        <p>{detail.skuName}</p>
                                        <h4>7天无理由退货</h4>
                                    </li>
                                    <li>
                                        <h3>￥{detail.orderPrice}</h3>
                                    </li>
                                    <li>X{detail.skuNum}</li>
                                    <li>有货</li>
                                </ul>
                            )
                        })

                    }

                </div>
                <div className={style.bbs}>
                    <h5>买家留言：</h5>
                    <textarea placeholder="建议留言前先与商家沟通确认" className={style['remarks-cont']}></textarea>

                </div>
                <div className={style.line}></div>
                <div className={style.bill}>
                    <h5>发票信息：</h5>
                    <div>普通发票（电子） 个人 明细</div>
                    <h5>使用优惠/抵用</h5>
                </div>
            </div>
            <div className={[style.money, "clearFix"].join(' ')}>
                <ul>
                    <li>
                        <b><i>{totalNum}</i>件商品，总商品金额</b>
                        <span>¥{totalAmount}</span>
                    </li>
                    <li>
                        <b>返现：</b>
                        <span>0.00</span>
                    </li>
                    <li>
                        <b>运费：</b>
                        <span>0.00</span>
                    </li>
                </ul>
            </div>
            <div className={style.trade}>
                <div className={style.price}>应付金额:　<span>¥{totalAmount}</span></div>
                <div className={style.receiveInfo}>
                    寄送至:
                    <span>北京市昌平区宏福科技园综合楼6层</span>
                    收货人：<span >张三</span>
                    <span>15010658793</span>
                </div>
            </div>
            <div className={[style.sub, "clearFix"].join(' ')}>
                <a href="##" className={style.subBtn}>提交订单</a>
            </div>
        </div>
    );
}

export default Trade;
