// 请确认安装了classnames
import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'
const Login = () => {
    return (
        <div className={style['login-wrap']}>
            <div className={style.login}>
                <div className={style.loginform}>
                    <ul className={classnames(style.tab, style.clearFix)}>
                        <li>
                            <a href="##" style="border-right: 0;">扫描登录</a>
                        </li>
                        <li>
                            <a href="##" className={style.current}>账户登录</a>
                        </li>
                    </ul>

                    <div className={style.content}>
                        <form action="##">

                            <div className={classnames(style['input-text'], style.clearFix)}>
                                <i></i>
                                <input type="text" placeholder="手机号"/>
                                    <span className={style['error-msg']}>错误提示信息</span>
                            </div>

                            <div className={classnames(style['input-text'], style.clearFix)}>
                                <i className={style.pwd}></i>
                                <input type="text" placeholder="请输入密码"/>
                                    <span className={style['error-msg']}>错误提示信息</span>
                            </div>

                            <div className={classnames(style.setting, style.clearFix)}>
                                <label className={classnames(style.checkbox, style.inline)}>
                                    <input name="m1" type="checkbox" value="2" checked=""/>
                                        自动登录
                                </label>
                                <span className={style.forget}>忘记密码？</span>
                            </div>
                            <button className={style.btn}>登&nbsp;&nbsp;录</button>

                        </form>
                        <div className={classnames(style.call, style.clearFix)}>
                            <ul>
                                <li><img src={require("./images/qq.png")} alt=""/></li>
                                <li><img src={require("./images/sina.png")} alt=""/></li>
                                <li><img src={require("./images/ali.png")} alt=""/></li>
                                <li><img src={require("./images/weixin.png")} alt=""/></li>
                            </ul>
                            <a href="##" className={style.register}>立即注册</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
