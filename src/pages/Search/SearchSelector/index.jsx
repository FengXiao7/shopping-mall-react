import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'

const SearchSelector = () => {
    return (
        <div className={classnames(style.clearfix, style.selector)}>
            <div className={classnames(style['type-wrap'], style.logo)}>
                <div className={classnames(style.fl, style.key, style.brand)}>品牌</div>
                <div className={classnames(style.value, style.logos)}>
                    <ul className={style['logo-list']}>
                        <li>索尼（SONY）</li>
                        <li>TCL</li>
                        <li>长虹（CHANGHONG）</li>
                        <li>飞利浦（PHILIPS）</li>
                        <li>风行电视</li>
                        <li><img src={require("./images/phone01.png")}/></li>
                        <li><img src={require("./images/phone02.png")}/></li>
                        <li><img src={require("./images/phone06.png")}/></li>
                        <li><img src={require("./images/phone07.png")}/></li>
                        <li><img src={require("./images/phone08.png")}/></li>
                        <li><img src={require("./images/phone09.png")}/></li>
                        <li><img src={require("./images/phone10.png")}/></li>
                        <li><img src={require("./images/phone11.png")}/></li>
                        <li><img src={require("./images/phone12.png")}/></li>
                        <li><img src={require("./images/phone14.png")}/></li>
                        
                    </ul>
                </div>
                <div className={style.ext}>
                    <a href="#" className={style['sui-btn']}>多选</a>
                    <a href="#">更多</a>
                </div>
            </div>
            <div className={style['type-wrap']}>
                <div className={classnames(style.fl, style.key)}>网络制式</div>
                <div className={classnames(style.fl, style.value)}>
                    <ul className={style['type-list']}>
                        <li>
                            <a>GSM（移动/联通2G）</a>
                        </li>
                        <li>
                            <a>电信2G</a>
                        </li>
                        <li>
                            <a>电信3G</a>
                        </li>
                        <li>
                            <a>移动3G</a>
                        </li>
                        <li>
                            <a>联通3G</a>
                        </li>
                        <li>
                            <a>联通4G</a>
                        </li>
                        <li>
                            <a>电信3G</a>
                        </li>
                        <li>
                            <a>移动3G</a>
                        </li>
                        <li>
                            <a>联通3G</a>
                        </li>
                        <li>
                            <a>联通4G</a>
                        </li>
                    </ul>
                </div>
                <div className={classnames(style.fl, style.ext)}></div>
            </div>
            <div className={style['type-wrap']}>
                <div className={classnames(style.fl, style.key)}>显示屏尺寸</div>
                <div className={classnames(style.fl, style.value)}>
                    <ul className={style['type-list']}>
                        <li>
                            <a>4.0-4.9英寸</a>
                        </li>
                        <li>
                            <a>4.0-4.9英寸</a>
                        </li>
                    </ul>
                </div>
                <div className={classnames(style.fl, style.ext)}></div>
            </div>
            <div className={style['type-wrap']}>
                <div className={classnames(style.fl, style.key)}>摄像头像素</div>
                <div className={classnames(style.fl, style.value)}>
                    <ul className={style['type-list']}>
                        <li>
                            <a>1200万以上</a>
                        </li>
                        <li>
                            <a>800-1199万</a>
                        </li>
                        <li>
                            <a>1200-1599万</a>
                        </li>
                        <li>
                            <a>1600万以上</a>
                        </li>
                        <li>
                            <a>无摄像头</a>
                        </li>
                    </ul>
                </div>
                <div className={classnames(style.fl, style.ext)}></div>
            </div>
            <div className={style['type-wrap']}>
                <div className={classnames(style.fl, style.key)}>价格</div>
                <div className={classnames(style.fl, style.value)}>
                    <ul className={style['type-list']}>
                        <li>
                            <a>0-500元</a>
                        </li>
                        <li>
                            <a>500-1000元</a>
                        </li>
                        <li>
                            <a>1000-1500元</a>
                        </li>
                        <li>
                            <a>1500-2000元</a>
                        </li>
                        <li>
                            <a>2000-3000元 </a>
                        </li>
                        <li>
                            <a>3000元以上</a>
                        </li>
                    </ul>
                </div>
                <div className={classnames(style.fl, style.ext)}>
                </div>
            </div>
            <div className={style['type-wrap']}>
                <div className={classnames(style.fl, style.key)}>更多筛选项</div>
                <div className={classnames(style.fl, style.value)}>
                    <ul className={style['type-list']}>
                        <li>
                            <a>特点</a>
                        </li>
                        <li>
                            <a>系统</a>
                        </li>
                        <li>
                            <a>手机内存 </a>
                        </li>
                        <li>
                            <a>单卡双卡</a>
                        </li>
                        <li>
                            <a>其他</a>
                        </li>
                    </ul>
                </div>
                <div className={classnames(style.fl, style.ext)}>
                </div>
            </div>
        </div>
    );
}

export default SearchSelector;
