// 请确认安装了classnames
import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'
const Rank = () => {
    return (
        // <!-- 商品排行 -->
        <div className={style.rank}>
          <div className={style.tab}>
            <div className={classnames(style['tab-tit'], style.clearfix)}>
              <a href="#" className={style.on}>
                <p className={style.img}>
                  <i></i>
                </p>
                <p className={style.text}>热卖排行</p>
              </a>
              <a href="#">
                <p className={style.img}>
                  <i></i>
                </p>
                <p className={style.text}>特价排行</p>
              </a>
              <a href="#">
                <p className={style.img}>
                  <i></i>
                </p>
                <p className={style.text}>新品排行</p>
              </a>
            </div>
          </div>
          <div className={style.content}>
            <ul>
              <li>
                <div className={style['img-item']}>
                  <p className={style['tab-pic']}>
                    <a href="#">
                      <img src={require('./images/1.jpg')}/>
                    </a>
                  </p>
                  <div className={style['tab-info']}>
                    <div className={style['info-title']}>
                      <a href="#"
                        >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                        移动联通电信4G手机</a
                      >
                    </div>
                    <p className={style['info-price']}>定金：¥100.00</p>
                  </div>
                </div>
                <div className={style['img-item']}>
                  <p className={style['tab-pic']}>
                    <a href="#">
                      <img src={require('./images/1.jpg')}/>
                    </a>
                  </p>
                  <div className={style['tab-info']}>
                    <div className={style['info-title']}>
                      <a href="#"
                        >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                        移动联通电信4G手机</a
                      >
                    </div>
                    <p className={style['info-price']}>定金：¥100.00</p>
                  </div>
                </div>
                <div className={style['img-item']}>
                  <p className={style['tab-pic']}>
                    <a href="#">
                      <img src={require('./images/1.jpg')}/>
                    </a>
                  </p>
                  <div className={style['tab-info']}>
                    <div className={style['info-title']}>
                      <a href="#"
                        >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                        移动联通电信4G手机</a
                      >
                    </div>
                    <p className={style['info-price']}>定金：¥100.00</p>
                  </div>
                </div>
                <div className={style['img-item']}>
                  <p className={style['tab-pic']}>
                    <a href="#">
                      <img src={require('./images/1.jpg')}/>
                    </a>
                  </p>
                  <div className={style['tab-info']}>
                    <div className={style['info-title']}>
                      <a href="#"
                        >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                        移动联通电信4G手机</a
                      >
                    </div>
                    <p className={style['info-price']}>定金：¥100.00</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    );
}

export default Rank;
