/*
 * @FileDescription    : 文件描述
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-07 14:24:08
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-10-Sa 05:32:11
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Router from './router';
import { initPageData } from './component/page/util';
import { DisableBrowserOperations } from '../utils/Util';
import i18n from '@/plugin/i18n';
import { ConfigProvider, Modal } from 'antd';
//测试页面
import Login from './login/index';

import en_US from 'antd/lib/locale/en_US';
import zh_CN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import { getGuideCount } from '../utils/guideData';
import { AliveScope } from 'react-activation'
import 'moment/locale/zh-cn';


import '../fonts/iconfont.css';
import '../less/index.less';
import './index.less';
import { getSubMenuData, getMenuData } from '../page/component/page/util';

import { getAccessState } from '../page/component/util/template';
import { isPrimaryMarket } from '../utils/primaryMarketUtil';

import { Provider } from 'react-redux'
import store from '@/redux/configureStore'
import { getInformList, getUnReadInformList } from '@/redux/actions/inform'
import { getUserInfoData } from '@/page/component/page/util';

import InformModal from './InformModal';

//禁止鼠标操作
let env = process.env.NODE_ENV;
if (env == "production") DisableBrowserOperations();

const menuAuth = (menu) => {
    // 判断权限
    let currItem = null;
    const findItem = (childList, resId) => {
        childList.forEach(item => {
            if (item.resId == resId) {
                //判断菜单是否显示
                currItem = item;
                // let menuNotDisplay = item.menuNotDisplay;
                // if (!menuNotDisplay) { 
                // }
            }

            if (item.child) {
                findItem(item.child, resId);
            }
        })
    }

    if (menu) {
        const splitList = location.pathname.split('/');
        if (Array.isArray(splitList) && splitList[4]) {
            let resId = splitList[4];

            findItem(menu.child, resId);
            if (currItem) {
                let accessState = getAccessState(currItem.privilegeDtoList);
                if (!accessState || accessState.code != "all") {
                    location.href = '/';
                    return true;
                };
            } else {
                location.href = '/';
                return true;
            }
        }
    }
}

const mainMenuAuth = (menu) => {
    // 判断权限
    let currItem = null;
    const findItem = (childList, pathname) => {
        childList.forEach(item => {
            const resAttrObj = JSON.parse(item.resAttr);
            if (pathname.indexOf(resAttrObj.path) > -1) {
                //判断菜单是否显示
                currItem = item;
                // let menuNotDisplay = item.menuNotDisplay;
                // if (!menuNotDisplay) { 
                // }
            }

            if (item.child) {
                findItem(item.child, pathname);
            }
        })
    }

    if (menu) {
        const pathname = location.pathname;
        if (pathname) {

            findItem(menu, pathname);
            if (currItem) {
                let accessState = getAccessState(currItem.privilegeDtoList);
                if (!accessState || accessState.code != "all") {
                    location.href = '/';
                    return true;
                };
            } else {
                location.href = '/';
                return true;
            }
        }
    }
}

const auth = () => {
    // 判断权限
    const menu = getSubMenuData();

    const isPrimaryMarketValue = isPrimaryMarket();
    const isMenu = menuAuth(menu);
    if (isMenu) {
        return isMenu;
    }
    if (isPrimaryMarketValue) {
        const menuData = getMenuData();
        const isMenuData = mainMenuAuth(menuData);

        if (isMenuData) {
            return isMenuData;
        }
    }

}

//初始化页面数据
i18n.init({
    next() {
        console.log('isLogin=>referred:', document.referrer)
        initPageData();
        const isNoAuth = auth();
        if (isNoAuth) {
            return;
        }
        const locale = i18n.getLocalLanguage();
        const isZh = locale === 'zh_CN'
        if (!isZh) {
            moment.locale('en');
        } else {
            moment.locale('zh-cn');
        }
        const count = getGuideCount().then(res => {
            console.log('count=>', res);
        });

        // const userInfo = getUserInfoData();
        // const dispatch = store.dispatch;
        // dispatch(getInformList({ userId: userInfo.sysUserId })) //
        // dispatch(getUnReadInformList({ userId: userInfo.sysUserId, isRead: 0 })) //

        ReactDOM.render(
            <Provider store={store}>
                <ConfigProvider locale={isZh ? zh_CN : en_US}>
                    <AliveScope>
                        <BrowserRouter forceRefresh={true}>
                            <Switch>
                                <Route path="/login" exact={true} component={Login} />
                                <Route path="/resetpass" exact={true} component={Login} />
                                <Router />
                            </Switch>
                        </BrowserRouter>
                        {/* <InformModal /> */}
                    </AliveScope>
                </ConfigProvider>
            </Provider>
            , document.getElementById('container'));
    }
})