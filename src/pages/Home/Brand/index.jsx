import React from 'react';
import style from './index.module.css'
const Brand = () => {
    return (
        // <!--商标-->
        <div className={style.brand}>
          <div className={style['py-container']}>
            <ul className={style['brand-list']}>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_21.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_03.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_05.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_07.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_09.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_11.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_13.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_15.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_17.png")} />
              </li>
              <li className={style['brand-item']}>
                <img src={require("./images/brand_19.png")} />
              </li>
            </ul>
          </div>
        </div>
    );
}

export default Brand;
