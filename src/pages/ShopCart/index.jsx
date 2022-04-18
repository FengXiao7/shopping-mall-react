import React from 'react';
import style from './index.module.css'

const ShopCart = () => {
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


                    <ul className={style['cart-list']}>
                        <li className={style['cart-list-con1']}>
                            <input type="checkbox" name="chk_list"/>
                        </li>
                        <li className={style['cart-list-con2']}>
                            <img src="./images/goods1.png"/>
                                <div className={style['item-msg']}>米家（MIJIA） 小米小白智能摄像机增强版 1080p高清360度全景拍摄AI增强</div>
                        </li>
                        <li className={style['cart-list-con3']}>
                            <div className={style['item-txt']}>语音升级款</div>
                        </li>
                        <li className={style['cart-list-con4']}>
                            <span className={style.price}>399.00</span>
                        </li>
                        <li className={style['cart-list-con5']}>
                            <a href="javascript:void(0)" className={style.mins}>-</a>
                            <input autocomplete="off" type="text" value="1" minnum="1" className={style.itxt}/>
                                <a href="javascript:void(0)" className={style.plus}>+</a>
                        </li>
                        <li className={style['cart-list-con6']}>
                            <span className={style.sum}>399</span>
                        </li>
                        <li className={style['cart-list-con7']}>
                            <a href="#none" className={style.sindelet}>删除</a>
                            <br/>
                                <a href="#none">移到收藏</a>
                        </li>
                    </ul>

                    <ul className={style['cart-list']}>
                        <li className={style['cart-list-con1']}>
                            <input type="checkbox" name="chk_list" id="" value=""/>
                        </li>
                        <li className={style['cart-list-con2']}>
                            <img src="./images/goods2.png"/>
                                <div className={style['item-msg']}>华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
                        </li>
                        <li className={style['cart-list-con3']}>
                            <div className={style['item-txt']}>黑色版本</div>
                        </li>
                        <li className={style['cart-list-con4']}>
                            <span className={style.price}>5622.00</span>
                        </li>
                        <li className={style['cart-list-con5']}>
                            <a href="javascript:void(0)" className={style.mins}>-</a>
                            <input autocomplete="off" type="text" value="1" minnum="1" className={style.itxt}/>
                                <a href="javascript:void(0)" className={style.plus}>+</a>
                        </li>
                        <li className={style['cart-list-con6']}>
                            <span className={style.sum}>5622</span>
                        </li>
                        <li className={style['cart-list-con7']}>
                            <a href="#none" className={style.sindelet}>删除</a>
                            <br/>
                                <a href="#none">移到收藏</a>
                        </li>
                    </ul>

                    <ul className={style['cart-list']}>
                        <li className={style['cart-list-con1']}>
                            <input type="checkbox" name="chk_list" id="" value=""/>
                        </li>
                        <li className={style['cart-list-con2']}>
                            <img src="./images/goods3.png"/>
                                <div className={style['item-msg']}>iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
                        </li>
                        <li className={style['cart-list-con3']}>
                            <div className={style['item-txt']}>墨绿色</div>
                        </li>
                        <li className={style['cart-list-con4']}>
                            <span className={style.price}>11399.00</span>
                        </li>
                        <li className={style['cart-list-con5']}>
                            <a href="javascript:void(0)" className={style.mins}>-</a>
                            <input autocomplete="off" type="text" value="1" minnum="1" className={style.itxt}/>
                                <a href="javascript:void(0)" className={style.plus}>+</a>
                        </li>
                        <li className={style['cart-list-con6']}>
                            <span className={style.sum}>11399</span>
                        </li>
                        <li className={style['cart-list-con7']}>
                            <a href="#none" className={style.sindelet}>删除</a>
                            <br/>
                                <a href="#none">移到收藏</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style['cart-tool']}>
                <div className={style['select-all']}>
                    <input className={style.chooseAll} type="checkbox" />
                    <span>全选</span>
                </div>
                <div className={style.option}>
                    <a href="#none">删除选中的商品</a>
                    <a href="#none">移到我的关注</a>
                    <a href="#none">清除下柜商品</a>
                </div>
                <div className={style['money-box']}>
                    <div className={style.chosed}>已选择
                        <span>0</span>件商品</div>
                    <div className={style.sumprice}>
                        <em>总价（不含运费） ：</em>
                        <i className={style.summoney}>0</i>
                    </div>
                    <div className={style.sumbtn}>
                        <a className={style['sum-btn']} href="###" target="_blank">结算</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCart;
