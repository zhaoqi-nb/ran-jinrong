import React, { useEffect, useMemo, useState, useCallback } from 'react';
import _ from 'lodash';
import { Button } from 'antd';

import { getUserInfoData } from '@/page/component/page/util';

import ChangePassModal from './ChangePassModal';
import LoginFormat from '@/utils/LoginFormat';

import './style.less';

export default function UserCenter() {

    const [info, setInfo] = useState({});
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setInfo(getUserInfoData())
    }, [])


    const list = [{
        label: LoginFormat('姓名'),
        value: info.name
    }, {
        label: LoginFormat('密码'),
        value: '********', //info.password
        suffix: <Button onClick={useCallback(() => (setVisible(true)), [])}>{LoginFormat('修改密码')}</Button>
    }, {
        label: LoginFormat('邮箱'),
        value: info.mail
    }, {
        label: LoginFormat('手机'),
        value: info.phone
    }, {
        label: LoginFormat('公司'),
        value: info.dept
    }, {
        label: LoginFormat('账户有效期'),
        value: info.passwdValidTime || LoginFormat('不过期')
    }]

    return (
        <div className='usercenter-wrapper'>
            <div className='header'>
                <img src={_.get(info, 'headimgurl') || require("@/page/image/user.png")} alt="" />
            </div>
            <div className='list-wrapper'>
                {
                    _.map(list, (item, idx) => (
                        <div key={idx} className='item'>
                            <span className='title'>{item.label}</span>
                            <span className='value'>{item.value}</span>
                            <span className='suffix'>{item.suffix}</span>
                        </div>
                    ))
                }
            </div>
            <ChangePassModal
                visible={visible}
                info={info}
                onCancel={useCallback(
                    () => {
                        setVisible(false)
                    }, [])
                }
            />
        </div>
    )
}
