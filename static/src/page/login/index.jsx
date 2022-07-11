/**
 * 登录页面
 *
 */
import React, { useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames'
import Header from './Header';
import FormLogin from './FormLogin';
import WxLogin from './WxLogin';
import ResetPassword from './ResetPassword';
import LoginFormat from '@/utils/LoginFormat';

import './style.less';

function LoginWrapper({ onChangeType }) {
    const tabs = [{
        label: LoginFormat("扫码登录"),
        value: 'wx'
    }, {
        label: LoginFormat("密码登录"),
        value: 'form'
    }]
    const [activeKey, setActiveKey] = useState('form');

    const handleChange = useCallback(
        (key) => () => {
            if (key == "wx") return null;
            setActiveKey(key)
        },
        [],
    )

    return (
        <div className='login-wrapper'>
            <div className='tabs'>
                {
                    _.map(tabs, (item) => (
                        <div
                            key={item.value}
                            className={classnames('tabs-item', {
                                active: activeKey === item.value
                            })}
                            disabled={"wx" === item.value}
                            onClick={handleChange(item.value)}
                        >
                            {item.label}
                        </div>
                    ))
                }
            </div>
            {
                activeKey === 'wx' ? <WxLogin /> : <FormLogin onChangeType={onChangeType} />
            }
        </div>
    )
}

function ResetWrapper({ onChangeType }) {
    return (
        <div className='reset-wrapper'>
            <div className='tabs'>
                <div className={classnames('tabs-item', 'active')}>
                    {LoginFormat('重置密码')}
                </div>
            </div>
            <ResetPassword onChangeType={onChangeType} />
        </div>
    )
}

export default function LoginMain(props) {

    const { history } = props;

    // const [type, setType] = useState('login');

    const handleChangeType = useCallback((type) => {
        switch (type) {
            case 'login':
                history.push('/login')
                break;
            case 'resetpass':
                history.push('/resetpass')
                break;
            case 'applytrial':
                history.push('/applytrial')
                break;
        }
    }, [])

    return (
        <div className='login-page'>
            <Header />
            <div className='container'>
                <img className='login-bg' src={require('../image/login-bg.png')} alt="" />
                <Switch>
                    <Route path="/login" exact>
                        <LoginWrapper onChangeType={handleChangeType} />
                    </Route>
                    <Route path="/resetpass" exact>
                        <ResetWrapper onChangeType={handleChangeType} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
