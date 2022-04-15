import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import { reqGetSearchInfo } from '@/api'
import style from './index.module.css'
import classnames from 'classnames'
import TypeNav from '@com/TypeNav';
import SearchSelector from './SearchSelector'
const Search = () => {
    const params = useParams()
    const [searchInLocation] = useSearchParams()
    // console.log(searchInLocation.get('categoryname'))
    // console.log(params)
    //初始参数对象
    const InitSearchParams = {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
    }
    //修改参数对象
    const [searchParams, SetSearchParams] = useState(InitSearchParams)
    //发送请求
    const [SearchInfo, SetSearchInfo] = useState([])
    //发送请求
    // const getData = async () => {
    //     console.log(searchParams)
    //     let result = await reqGetSearchInfo(searchParams)
    //     if (result.code === 200) {
    //         SetSearchInfo(result.data)
    //     } else {
    //         return Promise.reject(new Error('faile'))
    //     }
    // }
    const getData = () => {
        console.log(searchParams)
    }
    useEffect(() => {
        let categoryName = searchInLocation.get('categoryname');
        let keyword = params.keyword;
        let category1Id = searchInLocation.get('category1Id')
        let category2Id = searchInLocation.get('category2Id')
        let category3Id = searchInLocation.get('category3Id')
        // console.log('name:' + categoryName + ' keyword:' + keyword + ' Id1:' + category1Id + ' Id2:' + category2Id + ' Id3:' + category3Id)
        //异步调用,我们需要拿到最新的searchParams！！！
        SetSearchParams(pre =>  {
            return { ...pre, keyword, categoryName, category1Id, category2Id, category3Id }
        })
        // SetSearchParams({ ...InitSearchParams, keyword, categoryName, category1Id, category2Id, category3Id })
        //category1Id改变，设置新的category1Id的参数对象
        // if (searchInLocation.get('category1Id')) {
        //     SetSearchParams({ ...InitSearchParams, category1Id})
        // }
        // if (searchInLocation.get('category2Id')) {
        //     SetSearchParams({ ...InitSearchParams, category2Id})
        // }
        // if (searchInLocation.get('category3Id')) {
        //     SetSearchParams({ ...InitSearchParams, category3Id})
        // }
        // console.log(searchParams)
        getData()
    },
        [
            params.keyword,
            searchInLocation.get('category1Id'),
            searchInLocation.get('category2Id'),
            searchInLocation.get('category3Id'),
        ])

    // const [count,setCount] = useState(1)
    // useEffect(()=> {
    //     // setCount(2)
    //     test()
    //   },[count])
    // const test=()=>{
    //     console.log(count)
    // }
    //从返回的数据拆成三个数组和其他一些分页需要的数据
    // const { trademarkList, attrsList, goodsList, total, pageSize, pageNo, totalPages } = SearchInfo
    // console.log(totalPages)
    return (
        <>
            <TypeNav />
            <div className={style.main}>
                <div className={style['py-container']}>
                    {/* <!--bread--> */}
                    <div className={style.bread}>
                        <ul className={classnames(style.fl, style['sui-breadcrumb'])}>
                            <li>
                                <a href="#">全部结果</a>
                            </li>
                        </ul>
                        <ul className={classnames(style.fl, style['sui-tag'])}>
                            <li className={style['with-x']}>手机</li>
                            <li className={style['with-x']}>iphone<i>×</i></li>
                            <li className={style['with-x']}>华为<i>×</i></li>
                            <li className={style['with-x']}>OPPO<i>×</i></li>
                        </ul>
                    </div>

                    <SearchSelector />

                    {/* <!--details--> */}
                    <div className={classnames(style.details, style.clearfix)}>
                        <div className={style['sui-navbar']}>
                            <div className={classnames(style['navbar-inner'], style.filter)}>
                                <ul className={style['sui-nav']}>
                                    <li className={style.active}>
                                        <a href="#">综合</a>
                                    </li>
                                    <li>
                                        <a href="#">销量</a>
                                    </li>
                                    <li>
                                        <a href="#">新品</a>
                                    </li>
                                    <li>
                                        <a href="#">评价</a>
                                    </li>
                                    <li>
                                        <a href="#">价格⬆</a>
                                    </li>
                                    <li>
                                        <a href="#">价格⬇</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={style['goods-list']}>
                            <ul className={style['yui3-g']}>
                                <li className={style['yui3-u-1-5']}>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <a href="item.html" target="_blank"><img src={require("./images/mobile01.png")} /></a>
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.attr}>
                                            <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                                        </div>
                                        <div className={style.commit}>
                                            <i className={style.command}>已有<span>2000</span>人评价</i>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="success-cart.html" target="_blank" className={classnames(style['sui-btn'], style['btn-bordered'], style['btn-danger'])}>加入购物车</a>
                                            <a href="#" className={classnames(style['sui-btn'], style['btn-bordered'])}>收藏</a>
                                        </div>
                                    </div>
                                </li>
                                <li className={style['yui3-u-1-5']}>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/mobile02.png")} />
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.attr}>
                                            <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                                        </div>
                                        <div className={style.commit}>
                                            <i className={style.command}>已有<span>2000</span>人评价</i>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="success-cart.html" target="_blank" className={classnames(style['sui-btn'], style['btn-bordered'], style['btn-danger'])}>加入购物车</a>
                                            <a href="#" className={classnames(style['sui-btn'], style['btn-bordered'])}>收藏</a>
                                        </div>
                                    </div>
                                </li>
                                <li className={style['yui3-u-1-5']}>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/mobile03.png")} />
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.attr}>
                                            <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                                        </div>
                                        <div className={style.commit}>
                                            <i className={style.command}>已有<span>2000</span>人评价</i>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="success-cart.html" target="_blank" className={classnames(style['sui-btn'], style['btn-bordered'], style['btn-danger'])}>加入购物车</a>
                                            <a href="#" className={classnames(style['sui-btn'], style['btn-bordered'])}>收藏</a>
                                        </div>
                                    </div>
                                </li>
                                <li className={style['yui3-u-1-5']}>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/mobile04.png")} />
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.attr}>
                                            <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                                        </div>
                                        <div className={style.commit}>
                                            <i className={style.command}>已有<span>2000</span>人评价</i>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="success-cart.html" target="_blank" className={classnames(style['sui-btn'], style['btn-bordered'], style['btn-danger'])}>加入购物车</a>
                                            <a href="#" className={classnames(style['sui-btn'], style['btn-bordered'])}>收藏</a>
                                        </div>
                                    </div>
                                </li>
                                <li className={style['yui3-u-1-5']}>
                                    <div className={style['list-wrap']}>
                                        <div className={style['p-img']}>
                                            <img src={require("./images/mobile05.png")} />
                                        </div>
                                        <div className={style.price}>
                                            <strong>
                                                <em>¥</em>
                                                <i>6088.00</i>
                                            </strong>
                                        </div>
                                        <div className={style.attr}>
                                            <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                                        </div>
                                        <div className={style.commit}>
                                            <i className={style.command}>已有<span>2000</span>人评价</i>
                                        </div>
                                        <div className={style.operate}>
                                            <a href="success-cart.html" target="_blank" className={classnames(style['sui-btn'], style['btn-bordered'], style['btn-danger'])}>加入购物车</a>
                                            <a href="#" className={classnames(style['sui-btn'], style['btn-bordered'])}>收藏</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={classnames(style.fr, style.page)}>
                            <div className={classnames(style['sui-pagination'], style.clearfix)}>
                                <ul>
                                    <li className={classnames(style.prev, style.disabled)}>
                                        <a href="#">«上一页</a>
                                    </li>
                                    <li className={style.active}>
                                        <a href="#">1</a>
                                    </li>
                                    <li>
                                        <a href="#">2</a>
                                    </li>
                                    <li>
                                        <a href="#">3</a>
                                    </li>
                                    <li>
                                        <a href="#">4</a>
                                    </li>
                                    <li>
                                        <a href="#">5</a>
                                    </li>
                                    <li className={style.dotted}><span>...</span></li>
                                    <li className={style.next}>
                                        <a href="#">下一页»</a>
                                    </li>
                                </ul>
                                <div><span>共10页&nbsp;</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
