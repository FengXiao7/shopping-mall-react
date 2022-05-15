import classnames from 'classnames'
import React, {useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import style from './index.module.css'
import {useDispatch,useSelector} from 'react-redux'
import { getCategoryListAction } from '@redux/action/getCategoryListAction';
import 'animate.css'
// 从仓库里取三级联动数据，获取三级联动数据
// {CategoryList,getCategoryList}
const TypeNav = () => {
    // 控制三级联动一上来是否展示
    const [isShow, SetIsShow] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams()
    const dispatch = useDispatch()
    // 拿到仓库数据
    const CategoryList = useSelector(state=>state.CategoryListState)
    // console.log(CategoryList)
    //home组件展示三级联动
    //发请求
    useEffect(() => {
        // console.log("hhh")
        // 只有home组件一上来才展示三级联动
        if (location.pathname === '/home') {
            SetIsShow(true)
        }
        // 只有当仓库里数据为初始状态才发送请求喔
        if(CategoryList.length===0){
            // getCategoryList()
            dispatch(getCategoryListAction())
        }
    }, [])
    // 下面两个函数控制鼠标移除和移入是否展示三级联动
    const mouseLeave = () => {
        if (location.pathname !== '/home') {
            SetIsShow(false)
        }
    }
    const mouseEnter = () => {
        if (location.pathname !== '/home') {
            SetIsShow(true)
        }
    }
    //整理并发送参数至search组件
    const goSearch = (event) => {
        event.preventDefault()
        let element = event.target
        let url = `/search`
        // 获取自定义属性
        let { categoryname, categoryid_1, categoryid_2, categoryid_3 } = element.dataset;
        //看下有没有keyword
        if(JSON.stringify(params) !== '{}' && typeof params.keyword!=='undefined'){
            url+=`/${params.keyword}`
        }
        //点击空白区域不会发请求
        if (categoryname) {
            if (categoryid_1) {
                url += `?categoryname=${categoryname}&category1Id=${categoryid_1}`
            } else if (categoryid_2) {
                url += `?categoryname=${categoryname}&category2Id=${categoryid_2}`
            } else {
                url += `?categoryname=${categoryname}&category3Id=${categoryid_3}`
            }
            // console.log(url,'TypeNav')
            navigate(url)
        }
    }

    return (
        CategoryList &&
        <div className={style['type-nav']}>
            <div className={style.container}>
                <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                    <h2 className={style.all}>全部商品分类</h2>
                    {
                        isShow &&
                        <div className={style.sort}>
                            <div className={style['all-sort-list2']} onClick={goSearch}>
                                {
                                    CategoryList.slice(0, CategoryList.length - 2).map(Category_1 => {
                                        return (
                                            <div key={Category_1.categoryId} className={style.item}>
                                                <h3>
                                                    <a href="" data-categoryid_1={Category_1.categoryId} data-categoryname={Category_1.categoryName}>{Category_1.categoryName}</a>
                                                </h3>
                                                <div className={classnames(style['item-list'], style.clearfix)}>
                                                    <div className={style.subitem}>
                                                        {
                                                            Category_1.categoryChild.map(Category_2 => {
                                                                return (
                                                                    <dl key={Category_2.categoryId} className={style.fore}>
                                                                        <dt>
                                                                            <a href="" data-categoryid_2={Category_2.categoryId} data-categoryname={Category_2.categoryName}>{Category_2.categoryName}</a>
                                                                        </dt>
                                                                        <dd>
                                                                            {
                                                                                Category_2.categoryChild.map((Category_3) => {
                                                                                    return (
                                                                                        <em key={Category_3.categoryId}>
                                                                                            <a href="" data-categoryid_3={Category_3.categoryId} data-categoryname={Category_3.categoryName}>{Category_3.categoryName}</a>
                                                                                        </em>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </dd>
                                                                    </dl>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
                <nav className={style.nav}>
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
    );
}

// export default connect(
//     ({CategoryListState})=>({
//         CategoryList:CategoryListState
//     }),
//     {getCategoryList:getCategoryListAction}
// )(TypeNav);
export default TypeNav