import React from 'react';
import style from './index.module.css'
import { Link } from 'react-router-dom';
const Register = () => {
	return (
		<>
			{/* 注册内容  */}
			<div className={style['register-container']}>
				<div className={style.register}>
					<h3>注册新用户
						<span className={style.go}>我有账号，去 <Link to="/login">登录</Link>
						</span>
					</h3>
					<div className={style.content}>
						<label>手机号:</label>
						<input type="text" placeholder="请输入你的手机号" />
						<span className={style['error-msg']}>错误提示信息</span>
					</div>
					<div className={style.content}>
						<label>验证码:</label>
						<input type="text" placeholder="请输入验证码" />
						{/* <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"/> */}
						<span className={style['error-msg']}>错误提示信息</span>
					</div>
					<div className={style.content}>
						<label>登录密码:</label>
						<input type="text" placeholder="请输入你的登录密码" />
						<span className={style['error-msg']}>错误提示信息</span>
					</div>
					<div className={style.content}>
						<label>确认密码:</label>
						<input type="text" placeholder="请输入确认密码" />
						<span className={style['error-msg']}>错误提示信息</span>
					</div>
					<div className={style.controls}>
						<input name="m1" type="checkbox" />
						<span>同意协议并注册《尚品汇用户协议》</span>
						<span className={style['error-msg']}>错误提示信息</span>
					</div>
					<div className={style.btn}>
						<button>完成注册</button>
					</div>
				</div>
			</div>

			{/* 底部  */}
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

export default Register;
