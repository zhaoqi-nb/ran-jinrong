import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { Form, Input, Button, Checkbox, message } from 'antd';

import Api from './store/api';

import LoginFormat from '@/utils/LoginFormat';

import './nc_scale.less'

const initConfig = {
  tocken: null,
  sig: null,
  sessionId: null,
  scene: null,
}

const DefaultTime = 60;

export default function FormLogin({ onChangeType }) {
  const [form] = Form.useForm();
  const [{ time, isFlag }, setState] = useState({
    time: DefaultTime,
    isFlag: true
  })
  const [{ tocken, sig, sessionId, scene }, setConfig] = useState(initConfig);
  const [sliderVerification, setSliderVerification] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const renderNoCaptcha = (callback) => {
    let nc_token = ["FFFF0N00000000009DA2", (new Date()).getTime(), Math.random()].join(':');
    let NC_Opt = {
      renderTo: "#rs_login",
      appkey: "FFFF0N00000000009DA2",
      scene: "nc_login",
      token: nc_token,
      customWidth: 320,
      customHeight: 40,
      trans: { "key1": "code0" },
      elementID: ["usernameID"],
      is_Opt: 0,
      language: "cn",
      isEnabled: true,
      timeout: 3000,
      times: 5,
      callback: function (data) {
        callback && callback({ ...data, nc_token })
      }
    }
    let nc = new noCaptcha(NC_Opt)
    nc.upLang('cn', {
      _startTEXT: "请按住滑块，拖动到最右边",
      _yesTEXT: "验证通过",
      _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
      _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
    })
  }

  const setVerificationCode = (callback) => {
    setSliderVerification(true)
    renderNoCaptcha((data) => {
      const conf = {
        tocken: data.nc_token,
        sig: data.sig,
        sessionId: data.csessionid,
        scene: 'nc_login',
      }
      setConfig(conf)
      setSliderVerification(false);
      callback && callback(conf)
    })
  }

  const handleSendCode = useCallback((config = initConfig) => {
    const { username } = form.getFieldsValue()
    let loginName = _.trim(username);
    if (!loginName) {
      message.warning(LoginFormat("请输入邮箱/手机号"));
      return;
    }
    setSendEmailLoading(true)
    Api.getVerificationCode({
      loginName,
      tocken: config.tocken,
      sig: config.sig,
      sessionId: config.sessionId,
      scene: config.scene
    }).then((res) => {
      if (res.code == 200) {
        if (res.data == "506") {
          setVerificationCode()
          return;
        }
        if (res.data == "1") message.success(LoginFormat("验证码已发送到邮箱"));
        if (res.data == "2") message.success(LoginFormat("验证码已发送到邮箱、手机"));
        const timmer = setInterval(() => {
          setState(({ time }) => {
            if (time <= 1) {
              clearInterval(timmer)
              // 重置秒数
              return { time: DefaultTime, isFlag: true }
            }
            return { time: time - 1, isFlag: false }
          })
        }, 1000)
        setSendEmailLoading(false)
      }
    })
  }, [])

  const onFinish = useCallback((values) => {
    const params = {
      loginName: _.trim(values.username),
      password: values.password,
      verifyCode: values.verifyCode,
      redirectData: CACHEDATA,
      // openId,
      tocken,
      sig,
      sessionId,
      scene
    }
    Api.doLogin(params).then((res) => {
      console.log(res);
      if (res.code == 6000) {
        message.error(res.message);
        return
      }
      if (res.code == 200) {
        if (res.data == "506") {
          setVerificationCode(form.submit)
          return;
        }
        localStorage.setItem('agreement_checked', true)
        message.success(LoginFormat("登录成功"));
        setTimeout(() => {
          location.href = res.data.redirectUrl;
        }, 1000)
      }
    })
  }, [tocken, sig, sessionId, scene])

  const default_agreement_checked = localStorage.getItem('agreement_checked');

  return (
    <div className='form-login-wrapper'>
      <Form
        form={form}
        // name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ agreement: default_agreement_checked }}
        // autoComplete="off"
        onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: LoginFormat("请输入账号") }]}
        >
          <Input placeholder={LoginFormat("账号")} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: LoginFormat("请输入密码") }]}
        >
          <Input.Password placeholder={LoginFormat("密码")} visibilityToggle={false} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <>
            <div id="rs_login" className="nc-container" style={{ display: sliderVerification ? "block" : "none" }}></div>
            <div style={{ display: !sliderVerification ? 'flex' : 'none' }}>
              <Form.Item
                name="verifyCode"
                rules={[{ required: true, message: LoginFormat("请输入验证码") }]}
                noStyle
              ><Input placeholder={LoginFormat("验证码")} style={{ flex: 1 }} /></Form.Item>
              <Button
                type="primary"
                className='code-btn'
                style={{ marginLeft: 8, width: 112 }}
                onClick={() => handleSendCode()}
                disabled={!isFlag}
                loading={sendEmailLoading}
              >
                {isFlag ? LoginFormat('点击获取') : `${LoginFormat('重新获取')} ${time}S`}</Button>
            </div>
          </>
        </Form.Item>
        <Form.Item style={{ marginBottom: 8, textAlign: "right" }}>
          <div
            style={{ display: "inline-block" }}
            className='reset-btn'
            onClick={useCallback(() => {
              onChangeType && onChangeType('resetpass')
            }, [onChangeType])}
          >{LoginFormat('忘记密码')}</div>
        </Form.Item>
        <Form.Item style={{ marginBottom: 9 }} shouldUpdate>
          {
            () => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(['username', 'password', 'verifyCode'], true)
                  || !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  || sliderVerification
                }
                style={{ width: '100%' }}>
                {LoginFormat('登录')}
              </Button>
            )
          }
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 0, fontSize: "12px" }}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error(LoginFormat('请阅读并同意协议'))),
            },
          ]}
        >
          <Checkbox
            style={{ fontSize: "12px" }}
          >
            {LoginFormat('我已阅读并同意')}
            &nbsp;
            <a className='blue-text' href="/page/explain?tab=0" target="_blank">{LoginFormat('用户协议')}</a>
            &nbsp;
            {LoginFormat('和')}
            &nbsp;
            <a className='blue-text' href="/page/explain?tab=1" target="_blank">{LoginFormat('隐私政策')}</a>
          </Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
