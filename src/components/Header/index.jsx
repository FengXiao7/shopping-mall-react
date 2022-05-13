import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react';
import style from './index.module.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { reqUserInfo, reqLogout } from '@/api'
import { getToken, clearToken } from '@/utils/token'
import { connect } from 'react-redux';

const Header = (props) => {
    //装搜索栏内容
    const myRef = useRef()
    //装用户名
    const [userName, SetUserName] = useState('')
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    //整理并发送参数至search组件
    const goSearch = () => {
        let keyword = myRef.current.value
        // 空参数不发请求
        if (!keyword) {
            return
        }
        let url = `search/${keyword}`
        // 看一下有没有search参数
        if (searchParams.get('categoryname')) {
            url += `?categoryname=${searchParams.get('categoryname')}`
            if (searchParams.get('category1Id')) {
                url += `&category1Id=${searchParams.get('category1Id')}`
            } else if (searchParams.get('category2Id')) {
                url += `&category2Id=${searchParams.get('category2Id')}`
            } else {
                url += `&category3Id=${searchParams.get('category3Id')}`
            }
        }
        // console.log(url,'header')
        navigate(url)
    }
    //退出登录
    const logOut = async () => {
        let result = await reqLogout()
        console.log(result)
        if (result.code === 200) {
            clearToken()
            SetUserName('')
            navigate('/home')
        }

    }
    //请求用户名
    const getUserName = async () => {
        try {
            let result = await reqUserInfo()
            if (result.code === 200) {
                SetUserName(result.data.name)
            } else if (result.code === 208) {
                SetUserName('')
            }
        } catch (error) {
            alert(error.msg)
        }
    }
    //清除搜索栏
    useEffect(() => {
        // getUserName()
        myRef.current.value = ''
    }, [props.isClearKeyword]);
    useEffect(() => {
        getUserName()
    }, [getToken()])
    return (
        <div>
            <header className={style.header}>
                {/* 头部的第一行 */}
                <div className={style.top}>
                    <div className={style.container}>
                        <div className={style.loginList}>
                            <p>尚品汇欢迎您！</p>
                            {/* 用户名 */}
                            {
                                userName === '' ?
                                    <p>
                                        <span>请</span>
                                        <Link to="/login">登录</Link>
                                        <Link to="/register" className={style.register}>免费注册</Link>
                                    </p>
                                    :
                                    <p>
                                        <a>{userName}</a>
                                        <a style={{ cursor: "pointer" }} className={style.register} onClick={logOut}>退出登录</a>
                                    </p>
                            }

                        </div>
                        <div className={style.typeList}>
                            <Link to="/center">我的订单</Link>
                            <Link to="/shopCart">我的购物车</Link>
                            <a href="###">我的尚品汇</a>
                            <a href="###">尚品汇会员</a>
                            <a href="###">企业采购</a>
                            <a href="###">关注尚品汇</a>
                            <a href="###">合作招商</a>
                            <a href="###">商家后台</a>
                        </div>
                    </div>
                </div>
                {/* 头部第二行 搜索区域 */}
                <div className={style.bottom}>
                    <h1 className={style.logoArea}>
                        <Link className={style.logo} title="尚品汇" to="/home">
                            <img src={require('./images/logo.png')} alt="" />
                        </Link>
                    </h1>
                    <div className={style.searchArea}>
                        <form action="###" className={style.searchForm}>
                            <input
                                type="text"
                                id="autocomplete"
                                className={classnames(style['input-error'], style['input-xxlarge'])}
                                ref={myRef}
                            />
                            <button
                                className={classnames(style['sui-btn'], style['btn-xlarge'], style['btn-danger'])}
                                type="button"
                                onClick={goSearch}>
                                搜索
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        </div>
    );
}
const mapStateToProps = ({ clearKeyword }) => {
    return{
        isClearKeyword: clearKeyword
    }
}
export default connect(mapStateToProps)(Header);
