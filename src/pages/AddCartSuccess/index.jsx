// 请确认安装了classnames
import classnames from 'classnames'
import React, { useEffect, useState } from 'react';
import { useSearchParams,Link } from 'react-router-dom'
import style from './index.module.css'

const AddCartSuccess = () => {
    const [skuInfo, SetSkuInfo] = useState({})
    const [searchParams] = useSearchParams()
    useEffect(() => {
        SetSkuInfo(JSON.parse(sessionStorage.getItem('SKUINFO')))
    }, [])

    return (
        // <!-- 商品完成添加到购物车 -->
        <div className={style['cart-complete-wrap']}>
            {
                JSON.stringify(skuInfo) === '{}' ? null :
                    <div className={style['cart-complete']}>
                        <h3>
                            <i className={classnames(style['sui-icon'], style['icon-pc-right'])}></i>商品已成功加入购物车！
                        </h3>
                        <div className={style.goods}>
                            <div className={style['left-good']}>
                                <div className={style['left-pic']}><img src={skuInfo.skuDefaultImg} /></div>
                                <div className={style['right-info']}>
                                    <p className={style.title}>{ skuInfo.skuName }</p>
                                    <p className={style.attr}>{ skuInfo.skuDesc } 数量：{ searchParams.get('skuNum')}</p>
                                </div>
                            </div>
                            <div className={style['right-gocart']}>
                                <Link to={`/detail/${skuInfo.id}`} className={classnames(style['sui-btn'], style['btn-xlarge'])}>查看商品详情</Link>
                               
                                <Link className={classnames(style['sui-btn'], style['btn-xlarge'], style['btn-danger'])} to="/shopCart">去购物车结算 &gt; </Link>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default AddCartSuccess;
