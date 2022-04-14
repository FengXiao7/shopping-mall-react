// 请确认安装了classnames
import classnames from 'classnames'
import React from 'react';
import style from './index.module.css'
const Login = () => {
    console.log(style)
    return (
        <>
            {/* <!-- 登录 --> */}
            <div className={style['login-wrap']}>
                <div className={style.login}>
                    <div className={style.loginform}>
                        <ul className={classnames(style.tab, style['clearFix'])}>
                            <li>
                                <a href="##" style={{borderRight: 0}}>扫描登录</a>
                            </li>
                            <li>
                                <a href="##" className={style.current}>账户登录</a>
                            </li>
                        </ul>

                        <div className={style.content}>
                            <form action="##">
                                <div className={classnames(style['input-text'],style.clearFix)}>
                                    <i></i>
                                    <input type="text" placeholder="手机号" />
                                    <span className={style['error-msg']}>错误提示信息</span>
                                </div>

                                <div className={classnames(style['input-text'], style.clearFix)}>
                                    <i className={style.pwd}></i>
                                    <input type="text" placeholder="请输入密码" />
                                    <span className={style['error-msg']}>错误提示信息</span>
                                </div>

                                <div className={classnames(style['setting'], style['clearFix'])}>
                                    <label className={classnames(style['checkbox'], style['inline'])}>
                                        <input name="m1" type="checkbox" value="2" defaultChecked="" />
                                        自动登录
                                    </label>
                                    <span className={style.forget}>忘记密码？</span>
                                </div>
                                <button className={style.btn}>登&nbsp;&nbsp;录</button>

                            </form>
                            <div className={classnames(style.call, style.clearFix)}>
                                <ul>
                                    <li><img src={require("./images/qq.png")} alt="" /></li>
                                    <li><img src={require("./images/sina.png")} alt="" /></li>
                                    <li><img src={require("./images/ali.png")} alt="" /></li>
                                    <li><img src={require("./images/weixin.png")} alt="" /></li>
                                </ul>
                                <a href="##" className={style.register}>立即注册</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- 底部 --> */}
            <div className={style.copyright}>
                <ul>
                    <li>关于我们</li>
                    <li>联系我们</li>
                    <li>联系客服</li>
                    <li>商家入驻</li>
                    <li>营销中心</li>
                    <li>手机尚品汇</li>
                    <li>销售联盟</li>
                    <li>尚品汇社区</li>
                </ul>
                <div className={style.address}>地址：北京市昌平区宏福科技园综合楼6层</div>
                <div className={style.beian}>京ICP备19006430号
                </div>
            </div>
        </>
    );
}

export default Login;
