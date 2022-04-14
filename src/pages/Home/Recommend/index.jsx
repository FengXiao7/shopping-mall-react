import React from 'react';
import style from './index.module.css'
const Recommend = () => {
    return (
        // <!--今日推荐-->
        <div className={style['today-recommend']}>
            <div className={style['py-container']}>
                <ul className={style.recommend}>
                    <li className={style.clock}>
                        <div className={style.time}>
                            <img src={require("./images/clock.png")} />
                            <h3>今日推荐</h3>
                        </div>
                    </li>
                    <li className={style.banner}>
                        <img src={require('./images/today01.png')} />
                    </li>
                    <li className={style.banner}>
                        <img src={require('./images/today02.png')} />
                    </li>
                    <li className={style.banner}>
                        <img src={require('./images/today03.png')} />
                    </li>
                    <li className={style.banner}>
                        <img src={require('./images/today04.png')} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Recommend;
