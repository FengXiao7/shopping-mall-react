// 请确认安装了classnames
import classnames from 'classnames'
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { reqGetGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import style from './index.module.css'
import TypeNav from '@com/TypeNav'
import Zoom from './Zoom';
import ImageList from './ImageList'


const Detail = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [goodsInfo, SetgoodsInfo] = useState({})
    //无用state,用于强制更新
    const [conut, SetCount] = useState(0)
    //商品数目
    const [skuNum, SetSkuNum] = useState(1)
    const { categoryView, skuInfo, spuSaleAttrList, price } = goodsInfo
    //点击商品属性，改变样式,然后强制渲染
    const changeActive = (value, valueList) => {
        return () => {
            valueList.forEach(item => {
                item.isChecked = '0'
            })
            value.isChecked = '1'
            SetCount(conut + 1)
        }
    }
    //将产品添加到购物车中,发请求
    const AddOrUpdateShopCart = async () => {

        let result = await reqAddOrUpdateShopCart(params.skuid, skuNum)
        if (result.code === 200) {
            sessionStorage.setItem('SKUINFO',JSON.stringify(skuInfo))
            navigate(`/addCartSuccess?skuNum=${skuNum}`)
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
    //根据商品ID发请求
    useEffect(() => {
        const doAsync = async () => {
            let result = await reqGetGoodsInfo(params.skuid)
            if (result.code === 200) {
                SetgoodsInfo(result.data)
            }
        }
        window.scrollTo(0,0)
        doAsync().catch((error) => console.log(error.msg))
    }, [params.skuid])
    return (
        <div className={style.detail}>
            <TypeNav />
            {/* <!-- 主要内容区域 --> */}
            {
                JSON.stringify(goodsInfo) === '{}' || categoryView === null ? <h1 style={{ textAlign: 'center', color: '#eb0d36' }}>暂无该商品信息！！！请等待！！！</h1> :
                    <section className={style.con}>
                        {/* <!-- 导航路径区域 --> */}
                        <div className={style.conPoin}>
                            {
                                categoryView.category1Id &&
                                <span>{categoryView.category1Name}</span>
                            }
                            {
                                categoryView.category2Id &&
                                <span>{categoryView.category2Name}</span>
                            }
                            {
                                categoryView.category3Id &&
                                <span>{categoryView.category3Name}</span>
                            }
                        </div>
                        {/* <!-- 主要内容区域 --> */}
                        <div className={style.mainCon}>
                            {/* <!-- 左侧放大镜区域 --> */}
                            <div className={style.previewWrap}>
                                {/* <!--放大镜效果--> */}
                                <Zoom imgList={skuInfo.skuImageList} />
                                {/* <!--下方的缩略图--> */}
                                <ImageList imgList={skuInfo.skuImageList} />
                            </div>
                            {/* <!-- 右侧选择区域布局 --> */}
                            <div className={style.InfoWrap}>
                                <div className={style.goodsDetail}>
                                    <h3 className={style.InfoName}>
                                        {skuInfo.skuName}
                                    </h3>
                                    <p className={style.news}>
                                        {skuInfo.skuDesc}
                                    </p>
                                    <div className={style.priceArea}>
                                        <div className={style.priceArea1}>
                                            <div className={style.title}>
                                                价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                                            </div>
                                            <div className={style.price}>
                                                <i>¥{price}</i>
                                                <em></em>
                                                <span>降价通知</span>
                                            </div>
                                            <div className={style.remark}>
                                                <i>累计评价</i>
                                                <em>65545</em>
                                            </div>
                                        </div>
                                        <div className={style.priceArea2}>
                                            <div className={style.title}>
                                                <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                                            </div>
                                            <div className={style.fixWidth}>
                                                <i className={style['red-bg']}>加价购</i>
                                                <em className={style['t-gray']}
                                                >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.support}>
                                        <div className={style.supportArea}>
                                            <div className={style.title}>
                                                支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                                            </div>
                                            <div className={style.fixWidth}>
                                                以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                                            </div>
                                        </div>
                                        <div className={style.supportArea}>
                                            <div className={style.title}>配 送 至</div>
                                            <div className={style.fixWidth}>广东省 深圳市 宝安区</div>
                                        </div>
                                    </div>

                                    <div className={style.choose}>
                                        <div className={style.chooseArea}>
                                            <div className={style.choosed}></div>
                                            {
                                                spuSaleAttrList.map(spuSale => {
                                                    return (
                                                        <dl key={spuSale.baseSaleAttrId}>
                                                            <dt className={style.title}>选择{spuSale.saleAttrName}</dt>
                                                            {
                                                                spuSale.spuSaleAttrValueList.map(value => {
                                                                    return (
                                                                        <dd
                                                                            key={value.id}
                                                                            changepirce="0"
                                                                            className={value.isChecked === '1' ? style.active : null}
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={changeActive(value, spuSale.spuSaleAttrValueList)}
                                                                        >
                                                                            {value.saleAttrValueName}
                                                                        </dd>
                                                                    )
                                                                })
                                                            }
                                                        </dl>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={style.cartWrap}>
                                            <div className={style.controls}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    height: '36px',
                                                    width: '37px',
                                                    backgroundColor: '#e12228',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    lineHeight: '36px'

                                                }}>{skuNum}</span>
                                                <a
                                                    href="#"
                                                    className={style.plus}
                                                    onClick={() => SetSkuNum(skuNum => skuNum + 1)}
                                                >+</a>
                                                <a
                                                    href="#"
                                                    className={style.mins}
                                                    onClick={() => { skuNum === 1 ? SetSkuNum(1) : SetSkuNum(skuNum => skuNum - 1) }}
                                                >-</a>
                                            </div>
                                            <div className={style.add}>
                                                <a
                                                    href="#"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={AddOrUpdateShopCart}
                                                >加入购物车</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }
            {/* <!-- 内容详情页 --> */}
            <section className={style['product-detail']}>
                <aside className={style.aside}>
                    <div className={style.tabWraped}>
                        <h4 className={style.active}>相关分类</h4>
                        <h4>推荐品牌</h4>
                    </div>
                    <div className={style.tabContent}>
                        <div className={classnames(style['tab-pane'], style.active)}>
                            <ul className={style.partList}>
                                <li>手机</li>
                                <li>手机壳</li>
                                <li>内存卡</li>
                                <li>Iphone配件</li>
                                <li>贴膜</li>
                                <li>手机耳机</li>
                                <li>移动电源</li>
                                <li>平板电脑</li>
                            </ul>
                            <ul className={style.goodsList}>
                                <li>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/part01.png")} />
                                        </div>
                                        <div className={style.attr}>Apple苹果iPhone 6s (A1699) </div>
                                        <div className={style.price}>
                                            <em>¥</em>
                                            <i>6088.00</i>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="#">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/part02.png")} />
                                        </div>
                                        <div className={style.attr}>
                                            <em>Apple苹果iPhone 6s (A1699)</em>
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="#">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/part03.png")} />
                                        </div>
                                        <div className={style.attr}>
                                            <em>Apple苹果iPhone 6s (A1699)</em>
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="#">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/part01.png")} />
                                        </div>
                                        <div className={style.attr}>
                                            <em>Apple苹果iPhone 6s (A1699)</em>
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="#">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/part03.png")} />
                                        </div>
                                        <div className={style.attr}>
                                            <em>Apple苹果iPhone 6s (A1699)</em>
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="#">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={style['tab-pane']}>
                            <p>推荐品牌</p>
                        </div>
                    </div>
                </aside>
                <div className={style.detail}>
                    <div className={style.fitting}>
                        <h4 className={style.kt}>选择搭配</h4>
                        <div className={style['good-suits']}>
                            <div className={style.master}>
                                <img src={require("./images/l-m01.png")} />
                                <p>￥5299</p>
                                <i>+</i>
                            </div>
                            <ul className={style.suits}>
                                <li className={style.suitsItem}>
                                    <img src={require("./images/dp01.png")} />
                                    <p>Feless费勒斯VR</p>
                                    <label>
                                        <input type="checkbox" />
                                        <span>39</span>
                                    </label>
                                </li>
                                <li className={style.suitsItem}>
                                    <img src={require("./images/dp02.png")} />
                                    <p>Feless费勒斯VR</p>
                                    <label>
                                        <input type="checkbox" />
                                        <span>50</span>
                                    </label>
                                </li>
                                <li className={style.suitsItem}>
                                    <img src={require("./images/dp03.png")} />
                                    <p>Feless费勒斯VR</p>
                                    <label>
                                        <input type="checkbox" />
                                        <span>59</span>
                                    </label>
                                </li>
                                <li className={style.suitsItem}>
                                    <img src={require("./images/dp04.png")} />
                                    <p>Feless费勒斯VR</p>
                                    <label>
                                        <input type="checkbox" />
                                        <span>99</span>
                                    </label>
                                </li>
                            </ul>
                            <div className={style.result}>
                                <div className={style.num}>已选购0件商品</div>
                                <div className={style['price-tit']}>
                                    套餐价
                                </div>
                                <div className={style.price}>￥5299</div>
                                <button className={style.addshopcar}>加入购物车</button>
                            </div>
                        </div>
                    </div>
                    <div className={style.intro}>
                        <ul className={style['tab-wraped']}>
                            <li className={style.active}>
                                <a href="###">
                                    商品介绍
                                </a>
                            </li>
                            <li>
                                <a href="###">
                                    规格与包装
                                </a>
                            </li>
                            <li>
                                <a href="###">
                                    售后保障
                                </a>
                            </li>
                            <li>
                                <a href="###">
                                    商品评价
                                </a>
                            </li>
                            <li>
                                <a href="###">
                                    手机社区
                                </a>
                            </li>
                        </ul>
                        <div className={style['tab-content']}>
                            <div id="one" className={classnames(style['tab-pane'], style.active)}>
                                <ul className={style['goods-intro']}>
                                    <li>分辨率：1920*1080(FHD)</li>
                                    <li>后置摄像头：1200万像素</li>
                                    <li>前置摄像头：500万像素</li>
                                    <li>核 数：其他</li>
                                    <li>频 率：以官网信息为准</li>
                                    <li>品牌： Apple</li>
                                    <li>商品名称：APPLEiPhone 6s Plus</li>
                                    <li>商品编号：1861098</li>
                                    <li>商品毛重：0.51kg</li>
                                    <li>商品产地：中国大陆</li>
                                    <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                                    <li>系统：苹果（IOS）</li>
                                    <li>像素：1000-1600万</li>
                                    <li>机身内存：64GB</li>
                                </ul>
                                <div className={style['intro-detail']}>
                                    <img src={require("./images/intro01.png")} />
                                    <img src={require("./images/intro02.png")} />
                                    <img src={require("./images/intro03.png")} />
                                </div>
                            </div>
                            <div id="two" className={style['tab-pane']}>
                                <p>规格与包装</p>
                            </div>
                            <div id="three" className={style['tab-pane']}>
                                <p>售后保障</p>
                            </div>
                            <div id="four" className={style['tab-pane']}>
                                <p>商品评价</p>
                            </div>
                            <div id="five" className={style['tab-pane']}>
                                <p>手机社区</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Detail;
