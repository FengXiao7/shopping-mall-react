import React, { useState, useEffect, useRef} from 'react';
import { useParams, useSearchParams, useNavigate,Link } from 'react-router-dom'
import { reqGetSearchInfo } from '@/api'
import style from './index.module.css'
import classnames from 'classnames'
import TypeNav from '@com/TypeNav';
import SearchSelector from './SearchSelector'
import Pagination from '@com/Pagination'
import PubSub from 'pubsub-js';
import LazyLoad from 'react-lazyload';
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
                    //把参数改一下再跳转，这样就可以发请求了。顺便清除一下header组件搜索框里的关键字
                    PubSub.publish('clearKeyword',null)
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
    //下面四个函数都和控制箭头上下有关
    const isOne = () => {
        return NewSearchParams.current.order.includes('1')
    }
    const isTwo = () => {
        return NewSearchParams.current.order.includes('2')
    }
    const isAsc = () => {
        return NewSearchParams.current.order.includes('asc')
    }
    const isDesc = () => {
        return NewSearchParams.current.order.includes('desc')
    }
    //改变排序发送请求,flag是字符串形式的1或者2
    const changeOrder = (flag) => {
        return () => {
            let originSort = NewSearchParams.current.order.split(":")[1];
            originSort === "asc" ? NewSearchParams.current.order = flag + ":desc" : NewSearchParams.current.order = flag + ":asc";
            getData();
        }
    }
    //点击对应页数发送请求,传给子组件
    const getPageNo = (pageNo) => {
        return () => {
            NewSearchParams.current.pageNo = pageNo
            // console.log(pageNo)
            getData()
        }
    }
    //选择每页展示数据发送请求，传给子组件
    const getPageSize = (pageSize) => {
        NewSearchParams.current.pageSize = pageSize
        // console.log(pageSize)
        getData()
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
        // console.log(NewSearchParams.current)
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
                        {
                            goodsList.length === 0 ? <h1 style={{ textAlign: 'center', color: '#eb0d36' }}>暂无该商品信息！！！</h1> :
                                <div className={classnames(style.details, style.clearfix)}>
                                    <div className={style['sui-navbar']}>
                                        <div className={classnames(style['navbar-inner'], style.filter)}>
                                            <ul className={style['sui-nav']}>
                                                <li className={isOne() ? style.active : null} onClick={changeOrder('1')}>
                                                    <a>综合
                                                        {
                                                            isOne() &&
                                                            <span
                                                                className={['iconfont', isDesc() ? 'icon-xiangxiajiantou' : null, isAsc() ? 'icon-xiangshangjiantou' : null].join(' ')}
                                                            ></span>
                                                        }
                                                    </a>
                                                </li>
                                                <li className={isTwo() ? style.active : null} onClick={changeOrder('2')}>
                                                    <a>价格
                                                        {
                                                            isTwo() &&
                                                            <span
                                                                className={['iconfont', isDesc() ? 'icon-xiangxiajiantou' : null, isAsc() ? 'icon-xiangshangjiantou' : null].join(' ')}
                                                            ></span>
                                                        }
                                                    </a>
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
                                                                    <Link to={`/detail/${goods.id}`}>
                                                                <LazyLoad placeholder={<img width="100%" height="100%" src={"images/加载.gif"} alt="logo"/>}>
                                                                        <img src={goods.defaultImg} />
                                                                </LazyLoad>
                                                                    </Link>
                                                                    
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
                                    <Pagination
                                        pageSize={pageSize}
                                        pageNo={pageNo}
                                        total={total}
                                        totalPages={totalPages}
                                        continues='5'
                                        getPageNo={getPageNo}
                                        getPageSize={getPageSize}
                                    />


                                </div>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Search;
