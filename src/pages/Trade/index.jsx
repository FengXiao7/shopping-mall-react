// 请确认安装了classnames
import classnames from 'classnames'
import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import style from './index.module.css'
import { reqOrderInfo, reqAddressList, reqSubmitOrder } from '@/api'

const Trade = () => {
    //买家信息,非受控
    const msgRef = useRef()
    const navigate= useNavigate()
    //商品交易信息
    const [OrederInfo, SetOrderInfo] = useState({})
    //收件人信息
    const [addressList, SetAddressList] = useState([])
    const { detailArrayList, totalNum, totalAmount, tradeNo } = OrederInfo
    //点击改变默认地址
    const changeDefault = (address) => {
        return () => {
            addressList.forEach(a => {
                a.isDefault = "0"
            })
            address.isDefault = "1"
            SetAddressList([...addressList])
        }
    }
    //发送订单请求,成功后收到订单号跳转至Pay组件
    const submitOrder = async () => {
        let address = addressList.find(a => {
            return a.isDefault === "1"
        })
        let data = {
            consignee: address?.consignee,//收件人
            consigneeTel: address?.phoneNum,//电话
            deliveryAddress: address?.fullAddress,//地址
            paymentWay: "ONLINE", //支付方式
            orderComment: msgRef.current.value, //买家的留言信息
            orderDetailList: detailArrayList, //商品清单
        }

        try {
            let result = await reqSubmitOrder(tradeNo, data)
            if (result.code === 200) {
                // console.log(result.data)
                navigate(`/pay?orderId=${result.data}`)
            } else if (result.code === 201) {
                alert(result.message)
            }
        } catch (error) {
            alert(error)
        }

    }

    //首次挂载发请求
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
                                <span className={[style.username, address.isDefault === "1" ? style.selected : null].join(" ")}>{address.consignee}</span>
                                {/* 点击改变默认地址 */}
                                <p onClick={changeDefault(address)}>
                                    <span className={style.s1}>{address.fullAddress}</span>
                                    <span className={style.s2}>{address.phoneNum}</span>
                                    {
                                        address.isDefault === "1" &&
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
                    <textarea placeholder="建议留言前先与商家沟通确认" className={style['remarks-cont']} ref={msgRef}></textarea>

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
                <a href="##" className={style.subBtn} onClick={submitOrder}>提交订单</a>
            </div>
        </div>
    );
}

export default Trade;
