import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { reqGetSearchInfo } from '@/api'
import style from './index.module.css'
import classnames from 'classnames'
import TypeNav from '@com/TypeNav';
import SearchSelector from './SearchSelector'
const Search = () => {
    //编程式路由导航，用于更新地址栏，自己跳自己
    const navigate = useNavigate()
    //获取params参数
    const params = useParams()
    //获取search参数
    const [searchInLocation] = useSearchParams()
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
    //发送请求
    const [SearchInfo, SetSearchInfo] = useState({})
    //利用ref获取最新的状态
    const NewSearchParams = useRef()
    //发送请求
    const getData = async () => {
        let result = await reqGetSearchInfo(NewSearchParams.current)
        console.log('请求')
        if (result.code === 200) {
            SetSearchInfo(result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
    //删除面包屑,第一个参数是面包屑类型，第二个参数是索引
    //(第二个参数是索引，但只有props面包屑才会用到，因为pros是一个数组，可以有多个)
    const removeBreadCrumb = (kind, index) => {
        switch (kind) {
            case 'categoryName':
                return () => {
                    //直接跳转默认页面
                    navigate('/search')
                }
            case 'keyword':
                return () => {
                    //把参数改一下再跳转，这样就可以发请求了
                    if (NewSearchParams.current.categoryName) {
                        let url = `/search?categoryname=${NewSearchParams.current.categoryName}&`
                        if (NewSearchParams.current.category1Id) {
                            url += `category1Id=${NewSearchParams.current.category1Id}`
                        } else if (NewSearchParams.current.category2Id) {
                            url += `category2Id=${NewSearchParams.current.category2Id}`
                        } else {
                            url += `category3Id=${NewSearchParams.current.category3Id}`
                        }
                        navigate(url)
                    } else {
                        navigate('/search')
                    }
                }
            case 'trademark': {
                return () => {
                    NewSearchParams.current.trademark = ''
                    getData()
                }
            }
            case 'props': {
                return () => {
                    // 删除对应索引的props
                    NewSearchParams.current.props.splice(index, 1)
                    getData()
                }
            }
            default:
                return () => {

                }
        }
    }
    //传给子组件SearchSelector，用于点击品牌发送请求
    const clickTradeMark = (trademark) => {
        return () => {
            NewSearchParams.current.trademark = `${trademark.tmId}:${trademark.tmName}`
            getData()
        }
    }
    //传给子组件SearchSelector，用于点击商品参数发送请求
    const clickAttr = (attrId, attrValue, attrName) => {
        return () => {
            let arrayValue = `${attrId}:${attrValue}:${attrName}`;
            //注意不要添加重复参数项
            if (!NewSearchParams.current.props.includes(arrayValue)) {
                NewSearchParams.current.props.push(arrayValue)
            }
            getData()
        }
    }
    //核心钩子，检测地址栏4个参数，有一个变化就发送请求
    useEffect(() => {
        let categoryName = searchInLocation.get('categoryname');
        let keyword = params.keyword;
        let category1Id = searchInLocation.get('category1Id')
        let category2Id = searchInLocation.get('category2Id')
        let category3Id = searchInLocation.get('category3Id')
        //异步调用,我们需要拿到最新的searchParams！！！
        //改变ref存储内容
        const now = { ...InitSearchParams, keyword, categoryName, category1Id, category2Id, category3Id }
        NewSearchParams.current = now
        console.log(NewSearchParams.current)
        getData()
    },
        [
            //路由参数更新，发送请求
            params.keyword,
            searchInLocation.get('category1Id'),
            searchInLocation.get('category2Id'),
            searchInLocation.get('category3Id'),
        ])
    //从返回的数据拆成三个数组和其他一些分页需要的数据
    const { trademarkList, attrsList, goodsList, total, pageSize, pageNo, totalPages } = SearchInfo

    const isOne =()=>{
        return 
    }
    const isTwo =()=>{
        return NewSearchParams.current.order.includes('2')
    }

    return (
        <>
            <TypeNav />
            {
                JSON.stringify(SearchInfo) !== '{}' &&
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
                                {
                                    <div>
                                        {
                                            // 分类面包屑
                                            NewSearchParams.current.categoryName &&
                                            <li className={style['with-x']}>
                                                {NewSearchParams.current.categoryName}
                                                <i onClick={removeBreadCrumb('categoryName')}>x</i>
                                            </li>
                                        }
                                        {
                                            // 关键字面包屑
                                            typeof NewSearchParams.current.keyword !== 'undefined' && NewSearchParams.current.keyword !== '' &&
                                            <li className={style['with-x']}>
                                                {NewSearchParams.current.keyword}
                                                <i onClick={removeBreadCrumb('keyword')}>x</i>
                                            </li>
                                        }
                                        {
                                            //品牌面包屑
                                            NewSearchParams.current.trademark !== '' &&
                                            <li className={style['with-x']}>
                                                {NewSearchParams.current.trademark.split(':')[1]}
                                                <i onClick={removeBreadCrumb('trademark')}>x</i>
                                            </li>
                                        }
                                        {
                                            //商品属性面包屑(可以有多个)
                                            NewSearchParams.current.props.length > 0 &&
                                            NewSearchParams.current.props.map((item, index) => {
                                                return (
                                                    <li className={style['with-x']} key={index}>
                                                        {item.split(':')[1]}
                                                        <i onClick={removeBreadCrumb('props', index)}>x</i>
                                                    </li>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {/* <li className={style['with-x']}>手机</li> */}
                            </ul>
                        </div>

                        {/* <SearchSelector/> */}
                        <SearchSelector trademarkList={trademarkList} attrsList={attrsList} clickTradeMark={clickTradeMark} clickAttr={clickAttr} />

                        {/* <!--details--> */}
                        <div className={classnames(style.details, style.clearfix)}>
                            <div className={style['sui-navbar']}>
                                <div className={classnames(style['navbar-inner'], style.filter)}>
                                    <ul className={style['sui-nav']}>
                                        <li className={NewSearchParams.current.order.includes('1')?style.active:undefined}>
                                            <a>综合
                                                <span 
                                                className={classnames(style.iconfont,style['icon-xiangshangjiantou'])}
                                                ></span>
                                            </a>
                                        </li>
                                        <li className={NewSearchParams.current.order.includes('2')?style.active:undefined}>
                                            <a href="#">价格⬆</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* 商品列表 */}
                            <div className={style['goods-list']}>
                                <ul className={style['yui3-g']}>
                                    {
                                        goodsList.length > 0 &&
                                        goodsList.map(goods => {
                                            return (
                                                <li className={style['yui3-u-1-5']} key={goods.id}>
                                                    <div className={style['list-wrap']}>
                                                        <div className={style['p-img']}>
                                                            <a href="item.html" target="_blank"><img src={goods.defaultImg} /></a>
                                                        </div>
                                                        <div className={style.price}>
                                                            <strong>
                                                                <em>¥</em>
                                                                <i>{goods.price}</i>
                                                            </strong>
                                                        </div>
                                                        <div className={style.attr}>
                                                            <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{goods.title}</a>
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
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {/* 分页器 */}
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
            }
        </>
    );
}

export default Search;
