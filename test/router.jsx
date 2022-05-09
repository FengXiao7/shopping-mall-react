import React, { useEffect, useState } from 'react';
import style from './index.module.css'
import { reqGetCartList, reqAddOrUpdateShopCart, reqDeleteCart, reqUpdateChartChecked } from '@/api'
import throttle from "lodash/throttle";
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/utils/token'
import {message} from 'antd'
const ShopCart = () => {
    const [CartList, SetCartList] = useState([])
  
    const navigate = useNavigate()
    //获取购物车列表
    const getCartList = async () => {
        let result = await reqGetCartList()
        if (result.code === 200 && result.data.length > 0) {
            // console.log('请求')
            SetCartList(result.data[0].cartInfoList)
        }
    }
    //购物车商品总价
    const totalPrice = () => {
        let total = 0;
        // CartList.reduce((total,cartInfo)=>{total+cartInfo.skuNum * cartInfo.skuPrice},0)
        CartList.forEach(cartInfo => {
            total += cartInfo.skuNum * cartInfo.skuPrice
        })
        return total
    }
    //全选按钮是否勾选
    const isAllChecked = () => {
        if (CartList.length === 0) {
            return false;
        }
        return CartList.every(cartInfo => cartInfo.isChecked == 1)
    }
    //改变产品数量
    //type有三种，对应+,-和直接输入; cartInfo商品信息，disNum相对改变数目
    const hander = throttle(async function (type, cartInfo, disNum) {
        console.log(disNum)
        //该标志位为false时，不必发送请求
        let flag = true;
        // console.log(cartInfo.skuNum)
        switch (type) {
            //直接加最简单
            case "plus":
                break;
            case "minus":
                if (cartInfo.skuNum <= 1) {
                    
                    flag = false;
                }
                break;
            case "change":
                if (isNaN(disNum) || disNum <= 0) {
                    //负数和非数字不发请求
                    message.warning('请输入正确格式！')
                    flag = false;
                }else if(disNum>100){
                    message.warning('最大支持100部商品')
                    flag=false
                }else {
                    //要考虑小数
                    disNum = parseInt(disNum) - cartInfo.skuNum;
                }
                break;
        }
        try {
            if (flag) {
                //修改成功后，要再次获取购物车数据
                // console.log(cartInfo.skuid, disNum)
                let result = await reqAddOrUpdateShopCart(cartInfo.skuId, disNum)

                if (result.code !== 200) {
                    return Promise.reject(new Error('faile'))
                }
            
                getCartList()
            }
        } catch (error) {
            alert(error.message);
        }
    }, 500)

    //删除购物车商品
    const deleteCart = (skuId) => {
        return async () => {
            try {
                await reqDeleteCart(skuId)
                getCartList()
            } catch (error) {
                alert(error.message)
            }
        }
    }
    //删除所选商品
    const deleteAllselected = async () => {
        for (let cartInfo of CartList) {
            if (cartInfo.isChecked) {
                try {
                    await reqDeleteCart(cartInfo.skuId)
                } catch (error) {
                    alert(error.message)
                }
            }
        }
        getCartList()
    }
    //改变商品勾选情况
    const updateChecked = async (skuId, event) => {
        let checked = event.target.checked ? "1" : "0"
        let result = await reqUpdateChartChecked(skuId, checked)
        if (result.code == 200) {
            getCartList()
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
    //全选
    const updateAllCartIsChecked = async (enevt) => {
        let flag = enevt.target.checked ? "1" : "0"
        for (let cartInfo of CartList) {
            if (cartInfo.isChecked !== +flag) {
                try {
                    await reqUpdateChartChecked(cartInfo.skuId, flag)
                } catch (error) {
                    alert(error.message)
                }
            }
        }
        getCartList()

    }

    useEffect(() => {
        getCartList()
    }, [])
    return (
        // < !--购物车列表 -- >
        <div className={style.cart}>
            <h4>全部商品</h4>
            <div className={style['cart-main']}>
                <div className={style['cart-th']}>
                    <div className={style['cart-th1']}>全部</div>
                    <div className={style['cart-th2']}>商品</div>
                    <div className={style['cart-th3']}>单价（元）</div>
                    <div className={style['cart-th4']}>数量</div>
                    <div className={style['cart-th5']}>小计（元）</div>
                    <div className={style['cart-th6']}>操作</div>
                </div>
                <div className={style['cart-body']}>

                    {
                        CartList.length <= 0 ? <h1 style={{ textAlign: 'center', color: '#eb0d36' }}>您的购物车为空，快去买买买吧！</h1> :
                            CartList.map(cartInfo => {
                                return (
                                    <ul className={style['cart-list']} key={cartInfo.skuId}>
                                        <li className={style['cart-list-con1']}>
                                            <input type="checkbox" name="chk_list" defaultChecked={cartInfo.isChecked === 1}
                                                onClick={event => updateChecked(cartInfo.skuId, event)}
                                            />
                                        </li>
                                        <li className={style['cart-list-con2']}>
                                            <img src={cartInfo.imgUrl} />
                                            <div className={style['item-msg']}>{cartInfo.skuName}</div>
                                        </li>
                                        <li className={style['cart-list-con4']}>
                                            <span className={style.price}>{cartInfo.skuPrice}</span>
                                        </li>
                                        <li className={style['cart-list-con5']}>
                                            <a href="#" className={style.mins} onClick={() => hander('minus', cartInfo, -1)}>-</a>
                                            <input autoComplete="off" type="text" minnum="1" className={style.itxt} value={cartInfo.skuNum}
                                                onChange={event=>hander('change', cartInfo, event.target.value)}
                                                // onBlur={event=>hander('change', cartInfo, event.target.value)}
                                            />
                                            <a href="#" className={style.plus} onClick={() => hander('plus', cartInfo, 1)}>+</a>
                                        </li>
                                        <li className={style['cart-list-con6']}>
                                            <span className={style.sum}>{cartInfo.skuNum * cartInfo.skuPrice}</span>
                                        </li>
                                        <li className={style['cart-list-con7']}>
                                            <a href="#none" className={style.sindelet} onClick={deleteCart(cartInfo.skuId)}>删除</a>
                                        </li>
                                    </ul>
                                )

                            })
                    }

                </div>
            </div>
            <div className={style['cart-tool']}>
                <div className={style['select-all']}>
                    <input className={style.chooseAll} type="checkbox" onClick={updateAllCartIsChecked} defaultChecked={isAllChecked()} />
                    <span>全选</span>
                </div>
                <div className={style.option}>
                    <a href="#none" onClick={deleteAllselected}>删除选中的商品</a>
                    <a href="#none">移到我的关注</a>
                    <a href="#none">清除下柜商品</a>
                </div>
                <div className={style['money-box']}>
                    <div className={style.chosed}>已选择
                        <span>0</span>件商品</div>
                    <div className={style.sumprice}>
                        <em>总价（不含运费） ：</em>
                        <i className={style.summoney}>{totalPrice()}</i>
                    </div>
                    <div className={style.sumbtn}>
                        <a className={style['sum-btn']} onClick={()=>navigate('/trade')}>结算</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCart;
