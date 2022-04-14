// 请确认安装了classnames
import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'
const Like = () => {
    return (
        <div className={style.like}>
            <div className={style['py-container']}>
                <div className={style.title}>
                    <h3 className={style.fl}>猜你喜欢</h3>
                    <a href="#" className={classnames(style.fr, style.tip, style.changeBnt)}>换一换</a>
                </div>
                <div className={style.bd}>
                    <ul className={style.favourate}>
                        <li>
                            <img src={require('./images/like_02.png')} alt="" />
                            <div className={style['like-text']}>
                                <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                                <h3>¥116.00</h3>
                            </div>
                        </li>
                        <li>
                            <img src={require('./images/like_03.png')} alt="" />
                            <div className={style['like-text']}>
                                <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                                <h3>¥116.00</h3>
                            </div>
                        </li>
                        <li>
                            <img src={require('./images/like_01.png')} alt="" />
                            <div className={style['like-text']}>
                                <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                                <h3>¥116.00</h3>
                            </div>
                        </li>
                        <li>
                            <img src={require('./images/like_02.png')} alt="" />
                            <div className={style['like-text']}>
                                <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                                <h3>¥116.00</h3>
                            </div>
                        </li>
                        <li>
                            <img src={require('./images/like_03.png')} alt="" />
                            <div className={style['like-text']}>
                                <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                                <h3>¥116.00</h3>
                            </div>
                        </li>
                        <li>
                            <img src={require('./images/like_01.png')} alt="" />
                            <div className={style['like-text']}>
                                <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                                <h3>¥116.00</h3>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Like;
