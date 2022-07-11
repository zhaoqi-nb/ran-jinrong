import React, { useCallback, useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode.react'
import uuid from 'uuid/v1';
import Api from './store/api';
import LoginFormat from '@/utils/LoginFormat';

export default function FormLogin() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [wxUrl, setWxUrl] = useState('');
  const timmer = useRef(null);
  const timmerLoop = useRef(null);

  const getWXToken = () => {
    Api.getWXToken().then((res) => {
      if (res && res.data) {
        getQrcode(res.data, uuid())
      }
    })
  }

  const waitToSubscribe = (wxBindId) => {
    if (!wxBindId) return;
    Api.waitToSubscribe({
      wxBindId,
      redirectData: CACHEDATA,
      _t: (new Date).getTime()
    }).then((result) => {
      if (result && result.data) {
        let data = result.data,
          openId = data.openId,
          redirectUrl = data.redirectUrl;
        if (redirectUrl) {
          message.success(transformText("message_login_success"));
          let redirectUrl = result.data.redirectUrl;
          setTimeout(() => {
            location.href = redirectUrl;
          }, 1000)
        }
      }
      timmerLoop.current = setTimeout(() => {
        timmerLoop.current && clearTimeout(timmerLoop.current)
        waitToSubscribe(wxBindId)
      }, 1000);
    });
  }

  const getQrcode = useCallback(
    (access_token, wxBindId) => {
      if (!access_token || !wxBindId) return;
      timmer.current && clearTimeout(timmer.current);
      Api.getQrcode({ access_token, wxBindId }).then((result) => {
        const { expire_seconds, url } = _.get(result, 'data')
        if (url) {
          setWxUrl(url)
        }
        if (expire_seconds) {
          timmer.current = setTimeout(() => {
            setIsInvalid(() => {
              return true
            })
            timmerLoop.current && clearTimeout(timmerLoop.current)
          }, expire_seconds * 1000)
          waitToSubscribe(wxBindId)
        }
      }).catch(() => {
        getWXToken();
      })
    }, [getWXToken]
  )

  useEffect(() => {
    getWXToken()
    return () => {
      timmer.current && clearTimeout(timmer.current)
      timmerLoop.current && clearTimeout(timmerLoop.current)
    }
  }, [])


  const onRefreshCode = useCallback(() => {
    setIsInvalid(false)
    getWXToken()
  }, [getWXToken])

  return (
    <div className='wx-login-wrapper'>
      <span className='tips'>{LoginFormat('请使用微信扫描二维码登录')}</span>
      <div className='qr-code'>
        <QRCode
          value={wxUrl}
          size={216}
          style={{ display: 'block' }}
        />
        {
          isInvalid && (
            <div className='invalid-tip' onClick={onRefreshCode}>
              <span>{LoginFormat('二维码已失效')}</span>
              <span>{LoginFormat('点击刷新')}</span>
            </div>
          )
        }
      </div>
      <span className='agreement'>
        {LoginFormat('登录即代表我已阅读并同意')}
        &nbsp;
        <span className='blue-text'>{LoginFormat('服务协议')}</span>
        &nbsp;
        和
        &nbsp;
        <span className='blue-text'>{LoginFormat('隐私政策')}</span>
      </span>
    </div>
  )
}
