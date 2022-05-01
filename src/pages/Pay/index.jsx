import classnames from 'classnames'
import React, { useEffect, useState,useRef } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import style from './index.module.css'
import { reqPayInfo,reqPayStatus } from '@/api'
import { Modal,message } from 'antd'
import QRCode from 'qrcode'
import {getToken} from '../../utils/token'


const Pay = () => {
    //里面装一个计时器,用于不断向后台发送请求确认是否支付成功
    const timerRef = useRef()
    //从路由search参数中获取orderId
    const [searchParams] = useSearchParams()
    //编程式路由导航
    const navigate = useNavigate()
    //支付信息
    const [payInfo, SetPayInfo] = useState({})
    //控制对话框是否弹出
    const [isModalVisible, setIsModalVisible] = useState(false);
    //微信二维码url
    const [weChatUrl,SetWeChatUrl] = useState('')
    //支付是否成功,这个是让我们绕过支付，便于测试的
    const [isPay,SetIsPay] = useState(false)
    //点击支付打开对话框
    const showModal =async () => {
        setIsModalVisible(true);
        // 设置二维码url
        let url = await QRCode.toDataURL(payInfo.codeUrl)
        SetWeChatUrl(url)
        //开启定时器
        timerRef.current=setInterval(async()=>{
            let result=await reqPayStatus(searchParams.get('orderId'))
            // console.log(result)
            if(result.code===200){
                SetIsPay(true)
                clearInterval(timerRef.current)
                navigate('/paySuccess')
            }
        },1000)
    };
    //对话框点击确认
    const handleOk = () => {
        clearInterval(timerRef.current)
        setIsModalVisible(false);
        if(isPay){
            navigate('/paySuccess')
        }else{
            message.warning('尚未支付成功！')
        }
        
    };
    //对话框点击取消
    const handleCancel = () => {
        message.warning('请联系管理员！');
        clearInterval(timerRef.current)
        setIsModalVisible(false);
    };
    //发送请求获取支付信息
    useEffect(() => {
        if(!getToken()){
            message.warning('请登录!')
            navigate('/login')      
        }
        const doAsyc = async () => {
            let result = await reqPayInfo(searchParams.get('orderId'))
            if (result.code === 200) {
                SetPayInfo(result.data)
            }
        }
        doAsyc().catch(error => alert(error))
    }, [])
    return (
        <div className={style['pay-main']}>
            <div className={style['pay-container']}>
                <div className={style['checkout-tit']}>
                    <h4 className={style['tit-txt']}>
                        <span className={style['success-icon']}></span>
                        <span className={style['success-info']}>订单提交成功，请您及时付款，以便尽快为您发货~~</span>
                    </h4>
                    <div className={style.paymark}>
                        <span className={style.fl}>请您在提交订单<em className={classnames(style.orange, style.time)}>4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>145687</em></span>
                        <span className={style.fr}><em className={style.lead}>应付金额：</em><em className={classnames(style.orange, style.money)}>￥17,654</em></span>
                    </div>
                </div>
                <div className={style['checkout-info']}>
                    <h4>重要说明：</h4>
                    <ol>
                        <li>尚品汇商城支付平台目前支持<span className={style.zfb}>支付宝</span>支付方式。</li>
                        <li>其它支付渠道正在调试中，敬请期待。</li>
                        <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
                    </ol>
                    <h4>支付宝账户信息：（很重要，<span className={style.save}>请保存！！！</span>）</h4>
                    <ul>
                        <li>支付帐号：11111111</li>
                        <li>密码：111111</li>
                        <li>支付密码：111111</li>
                    </ul>
                </div>
                <div className={style['checkout-steps']}>
                    <div className={style['step-tit']}>
                        <h5>支付平台</h5>
                    </div>
                    <div className={style['step-cont']}>
                        <ul className={style.payType}>
                            <li><img src={require('./images/pay2.jpg')} /></li>
                            <li><img src={require('./images/pay3.jpg')} /></li>
                        </ul>

                    </div>
                    <div className={style.hr}></div>

                    <div className={style.payshipInfo}>
                        <div className={style['step-tit']}>
                            <h5>支付网银</h5>
                        </div>
                        <div className={style['step-cont']}>
                            <ul className={style.payType}>
                                <li><img src={require('./images/pay10.jpg')} /></li>
                                <li><img src={require('./images/pay11.jpg')} /></li>
                                <li><img src={require('./images/pay12.jpg')} /></li>
                                <li><img src={require('./images/pay13.jpg')} /></li>
                                <li><img src={require('./images/pay14.jpg')} /></li>
                                <li><img src={require('./images/pay15.jpg')} /></li>
                                <li><img src={require('./images/pay16.jpg')} /></li>
                                <li><img src={require('./images/pay17.jpg')} /></li>
                                <li><img src={require('./images/pay18.jpg')} /></li>
                                <li><img src={require('./images/pay19.jpg')} /></li>
                                <li><img src={require('./images/pay20.jpg')} /></li>
                                <li><img src={require('./images/pay21.jpg')} /></li>
                                <li><img src={require('./images/pay22.jpg')} /></li>

                            </ul>
                        </div>

                    </div>
                    <div className={style.hr}></div>

                    <div className={style.submit}>
                        <a className={style.btn} onClick={showModal}>立即支付</a>
                        <Modal
                            style={{textAlign:'center'}}
                            width={400}
                            title="请你微信支付"
                            visible={isModalVisible}
                            closable={false}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            cancelText="支付遇见问题"
                            okText="确认支付"
                        >
                            <img src={weChatUrl} alt="" />
                        </Modal>
                    </div>
                    <div className={style.otherpay}>
                        <div className={style['step-tit']}>
                            <h5>其他支付方式</h5>
                        </div>
                        <div className={style['step-cont']}>
                            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
                            <span>中国银联</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;
