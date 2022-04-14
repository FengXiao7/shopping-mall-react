// 请确认安装了classnames
import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <header className={style.header}>
                {/* 头部的第一行 */}
                <div className={style.top}>
                    <div className={style.container}>
                        <div className={style.loginList}>
                            <p>尚品汇欢迎您！</p>
                            <p>
                                <span>请</span>
                                <Link to="/login">登录</Link>
                                <a href="###" className={style.register}>免费注册</a>
                            </p>
                        </div>
                        <div className={style.typeList}>
                            <a href="###">我的订单</a>
                            <a href="###">我的购物车</a>
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
                            <input type="text" id="autocomplete" className={classnames(style['input-error'], style['input-xxlarge'])} />
                            <button className={classnames(style['sui-btn'], style['btn-xlarge'], style['btn-danger'])} type="button">搜索</button>
                        </form>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
