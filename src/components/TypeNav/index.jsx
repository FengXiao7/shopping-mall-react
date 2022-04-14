import classnames from 'classnames'
import React, { useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import style from './index.module.css'
import { reqCategoryList} from '@/api'
const TypeNav = () => {
    const [CategoryList, SetCategoryList] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const doAsync = async () => {
            let result = await reqCategoryList()
            if (result.code == 200) {
                // console.log("hahahhaha")
                SetCategoryList(result.data)
            }
        }
        doAsync().catch((error) => console.log(error.msg))
    }, [])
    // console.log(CategoryList,'List')
    
    const goSearch=(event)=> {
        let element =event.target
        let { categoryname, categoryid_1, categoryid_2, categoryid_3 } =element.dataset;
        if(categoryname){
            if(categoryid_1){
                navigate(`/search?categoryname=${categoryname}&categoryid_1=${categoryid_1}`)
            }else if(categoryid_2){
                navigate(`/search?categoryname=${categoryname}&categoryid_2=${categoryid_2}`)
            }else{
                navigate(`/search?categoryname=${categoryname}&categoryid_3=${categoryid_3}`)
            }
        }

    }

    return (
        CategoryList &&
        <div className={style['type-nav']}>
            <div className={style.container}>
                <h2 className={style.all}>全部商品分类</h2>
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
                <div className={style.sort}>
                    <div className={style['all-sort-list2']} onClick={goSearch}>
                        {
                            CategoryList.slice(0, CategoryList.length - 1).map(Category_1 => {
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
            </div>
        </div>
    );
}

export default TypeNav;
