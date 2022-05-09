import React from 'react';
import style from './index.module.css'
import {Link} from 'react-router-dom'

const PaySuccess = () => {

    return (
        <div className={style.paysuccess}>

            <div className={style.success}>
                <h3>
                    <img src={require('./images/right.png')} width="48" height="48"/>
                        恭喜您，支付成功啦！
                </h3>
                <div className={style.paydetail}>
                    <p className={style.button}>
                        <Link  className={style['btn-look']} to="/center">查看订单</Link>
                        <Link  className={style['btn-goshop']} to="/">继续购物</Link>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default PaySuccess;
