// 请确认安装了classnames
import classnames from 'classnames'
import React from 'react';
import Carousel from '@com/Carousel'
import style from './index.module.css'


const Floor = (props) => {
    // console.log(props.imgUrl)
    return (
        <div className={style.floor}>
            <div className={style['py-container']}>
                <div className={classnames(style.title, style.clearfix)}>
                    <h3 className={style.fl}>{props.name}</h3>
                    <div className={style.fr}>
                        <ul className={classnames(style['nav-tabs'], style.clearfix)}>
                            {
                                props.navList.map((nav, index) => {
                                    return <li className={style.active} key={index}>
                                        <a href={Navigator.URL} data-toggle="tab">{nav.text}</a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={style['tab-content']}>
                    <div className={style['tab-pane']}>
                        <div className={style['floor-1']}>
                            <div className={style.blockgary}>
                                <ul className={style['jd-list']}>
                                    {
                                        props.keywords.map((keyword, index) => {
                                            return <li key={index}>{keyword}</li>
                                        })
                                    }
                                </ul>
                                <img src={require(`${props.imgUrl}`)} />
                            </div>
                            <div className={style.floorBanner}>
                                <Carousel imgList={props.carouselList} />
                            </div>
                            <div className={style.split}>
                                <span className={style['floor-x-line']}></span>
                                <div className={style['floor-conver-pit']}>
                                    <img src={require(`${props.recommendList[0]}`)} />
                                </div>
                                <div className={style['floor-conver-pit']}>
                                    <img src={require(`${props.recommendList[1]}`)} />
                                </div>
                            </div>
                            <div className={classnames(style.split, style.center)}>
                                <img src={require(`${props.bigImg}`)} />
                            </div>
                            <div className={style.split}>
                                <span className={style['floor-x-line']}></span>
                                <div className={style['floor-conver-pit']}>
                                    <img src={require(`${props.recommendList[2]}`)} />
                                </div>
                                <div className={style['floor-conver-pit']}>
                                    <img src={require(`${props.recommendList[3]}`)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Floor;
