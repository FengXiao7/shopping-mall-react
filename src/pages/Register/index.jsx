import React, { useState } from 'react';
import style from './index.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { reqVerificationCode, reqUserRegister } from '@/api'
const Register = () => {
	// 这个地方这样子设置，主要是为了受控组件
	//验证码
	const [verificationCode, SetVerificationCode] = useState({ code: '' })
	//这个是发送注册请求得到的响应状态码200,223等。只有200是满足我们要求的
	const [StatusCode, SetStatusCode] = useState()
	const navigate = useNavigate()
	const getCode = (phone, phoneError) => {
		return async () => {
			// 已输入手机号并且已经点击过完成注册但没有成功
			if (verificationCode.code && StatusCode === undefined) {
				return
			}
			//一上来就点按钮的
			if (phone === '') {
				alert('请先输入手机号')
				return
			}
			//手机号格式不对的
			if (phoneError) {
				alert(phoneError)
				return
			}

			try {
				let result = await reqVerificationCode(phone)
				if (result.code === 200) {
					SetVerificationCode({ code: result.data })
				}
			} catch (error) {
				alert(error)
			}




		}
	}

	return (
		<>
			{/* 注册内容  */}
			<div className={style['register-container']}>
				<div className={style.register}>
					<h3>注册新用户
						<span className={style.go}>我有账号，去 <Link to="/login">登录</Link>
						</span>
					</h3>
					<Formik
						initialValues={{
							//电话号码
							phone: "",
							//密码
							password: "",
							//确认密码
							password1: "",
							//是否同意
							agree: true,
						}}
						validate={values => {
							const errors = {};
							if (!values.phone) {
								errors.phone = '电话号码必填';
							} else if (
								!/^(?:(?:\+|00)86)?1\d{10}$/.test(values.phone)
							) {
								errors.phone = '无效的电话格式';
							}
							if (!values.password) {
								errors.password = '密码必填';
							} else if (
								!/^[0-9A-Za-z]{8,20}$/.test(values.password)
							) {
								errors.password = '密码格式必须为8-20位的字母或数字';
							}
							if (!values.password1) {
								errors.password1 = '确认密码必填';
							} else if (
								values.password1 !== values.password
							) {
								errors.password1 = '确认密码必须和密码相同';
							}
							if (!values.agree) {
								errors.agree = '协议是必须的';
							}
							return errors;
						}}
						onSubmit={async (values, { setSubmitting }) => {
							const { phone, password } = values
							const code = verificationCode.code
							try {
								let result = await reqUserRegister({ phone, code, password })
								SetStatusCode(result.code)
								//无误直接跳转
								if (result.code === 200) {
									navigate('/login')
								} else if (200 < result.code && 300 > result.code) {
									alert(result.message)
								}
								setSubmitting(false);
							} catch (error) {
								alert(error.ErrorMessage)
							}

						}}

					>
						{({ isSubmitting, values, errors }) => (
							<Form>
								<div className={style.content}>
									<label>手机号:</label>
									<Field type="phone" name="phone" placeholder="请输入你的手机号" />
									<ErrorMessage name="phone" component="span" className={style['error-msg']} />
								</div>
								<div className={style.content}>
									<label>验证码:</label>
									<input placeholder="请点击右方按钮获取验证码" disabled value={verificationCode.code} />
									<button style={{ width: '100px', height: '36px', marginLeft: '3px' }} type="button" onClick={getCode(values.phone, errors.phone)}>获得验证码</button>
								</div>
								<div className={style.content}>
									<label>登录密码:</label>
									<Field type="password" name="password" placeholder="请输入你的登录密码" />
									<ErrorMessage name="password" component="span" className={style['error-msg']} />
								</div>
								<div className={style.content}>
									<label>确认密码:</label>
									<Field type="password" name="password1" placeholder="请输入确认密码" />
									<ErrorMessage name="password1" component="span" className={style['error-msg']} />
								</div>
								<div className={style.controls}>
									<Field type="checkbox" name="agree" />
									<span>同意协议并注册《尚品汇用户协议》</span>
									<ErrorMessage name="agree" component="span" className={style['error-msg']} />
								</div>
								<div className={style.btn}>
									<button type="submit" disabled={isSubmitting}>
										完成注册
									</button>
								</div>
							</Form>
						)}

					</Formik>
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
