'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Divider, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { isEmpty } from '../../../../../../app/util/index';
import RsIcon from '../../../component/rsIcon/index';
import { getAccessState } from '../../util/template';
import { getMenuData, getSystemData } from '../util';
import i18n from '@/plugin/i18n';
import { setGuideData, getGuideCount, getCompanyLoad } from '../../../../utils/guideData';
import './index.less';
import Guide from 'byte-guide'
import { getCurrSysId, isCompanyAddress } from '../../page/util';
import { getUserInfoData } from '@/page/component/page/util';
import { isMatchRoute } from '../../../../utils/Util';
import Api from './api'
import { _ } from 'core-js';

const { SubMenu } = Menu;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
        this.getViewpointIsRead()
    }

    getViewpointIsRead = () => {
        const userInfo = getUserInfoData();
        const userId = userInfo.sysUserId;
        Api.getViewpointIsRead({ userId: userId })
            .then((res) => {
                if (res.code) {
                    this.setState({
                        viewpointIsRead: _.get(res, 'data', 0)
                    })
                }
            })
    }

    //获取引导记录
    getUserGuideRecord = async () => {
        const result = await Api.getUserGuideRecord({
            sysId: getCurrSysId(),
            type: 1
        })
        let flag = null
        if (result.code == 200) {
            flag = !result.data.length ? true : false
        }
        return flag
    }


    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
        // isMenuExpanded=false;
    }
    getInitialState = () => {
        return {
            isReady: false,
            //展开状态
            isMenuExpanded: true,
            mouseIn: false,
            mouseTimer: null,
            //菜单数据
            menuData: null,
            selectedKeys: [],
            openKeys: [],
            ifGuide: null,
            steps: [],
            viewpointIsRead: 0 //观点是否有未读  0 无 
        }
    }

    getGuidHref = (obj) => {
        let resAttr = null
        if (obj.resAttr) {
            resAttr = JSON.parse(obj.resAttr)
            obj.menuIcon = resAttr.icon
        }
        if (resAttr.path || (resAttr && resAttr.redirectUrl)) {
            let resId = obj.resId;
            let path = resAttr.path;
            let url = "";
            if (resAttr && resAttr.menuType == "config") {
                url = `/page/config/${resId}/${path}`;
            } else if (resAttr && path) {
                url = `/page/${path}`;
            } else if (resAttr && resAttr.redirectUrl) {
                url = resAttr.redirectUrl;
            }
            return url;
        }
    }

    getGuideMenus = async (menuData) => {
        const secondeMenus = menuData.find(f => f.resName === '二级市场研究');
        const guideMenus = [];
        secondeMenus && secondeMenus.child.forEach(menuItem => {
            if (!menuItem.menuNotDisplay) {
                let accessState = getAccessState(menuItem.privilegeDtoList);
                if (!(!accessState || accessState.code != "all")) {
                    let _class = ""
                    if (menuItem.resName == "综合看板") _class = ".guied-kanban"
                    else if (menuItem.resName == "行业分析") _class = ".guied-industry"
                    else if (menuItem.resName == "公司分析") _class = ".guied-company"
                    else if (menuItem.resName == "品牌分析") _class = ".guied-brand"
                    else if (menuItem.resName == "其他数据源") _class = ".guied-datas"
                    const href = this.getGuidHref(menuItem);
                    guideMenus.push({ ...menuItem, href, select: _class });
                };
            }
        });
        setGuideData('header', [{
            selector: '.guied-language',
            content: <div>{i18n.format("点击后可切换系统语言为英文；")}</div>,
            placement: 'bottom-right',
        }]);
        setGuideData('menu', guideMenus);
        return guideMenus;
    }

    initData = () => {
        const { ifFixExpanded, path } = this.props;

        let menuData = getMenuData();

        // 适配老系统的一级市场
        let systemData = getSystemData();
        const smartInvest = systemData.find(f => f.sysId == 1809) // 1809 金融投研
        const currVersionInfo = smartInvest && Array.isArray(smartInvest.versionInfo) && smartInvest.versionInfo.find(f => f.versionName.indexOf('一级市场') !== -1);
        const currVersionInfoDingZhi = smartInvest && Array.isArray(smartInvest.versionInfo) && smartInvest.versionInfo.find(f => f.versionName.indexOf('一级市场定制版') !== -1);
        console.log('currVersionInfo=>', currVersionInfo);
        // debugger;
        const currPrimaryMenu = menuData.find(f => f.resName === '一级市场研究')
        if (smartInvest && currVersionInfo && currVersionInfoDingZhi) { // 有没有二级的其它数据源
            let otherData = {
                "lft": 9311,
                "rht": 9312,
                "level": 3,
                "sortNum": null,
                "child": null,
                "resId": 18422,
                "resUniqueCode": "3868dec7-3d60-4a50-a361-769e0510c123",
                "resName": i18n.format("特色数据源"),
                "resNameEn": "",
                "resType": "MENU",
                "resAttr": `{"icon":"icon-gb-yiji","position":2,"minName":"一级","redirectUrl":"${process.env.OLD_VERSION_URL}/dashboard/${currVersionInfoDingZhi.id}"}`,
                "privilegeDtoList": [
                    {
                        "resId": 9698,
                        "privilegeId": 46724,
                        "privilegeName": "完全权限",
                        "privilegeType": "PRIVILEGE",
                        "privilegeCode": 3,
                        "property": null,
                        "weight": null,
                        "privilegeUniqueCode": "be77bcff-c13c-4d9e-be5b-ba6d25404697"
                    },
                    {
                        "resId": 9698,
                        "privilegeId": 46761,
                        "privilegeName": "pageAccessInfo",
                        "privilegeType": "APP",
                        "privilegeCode": null,
                        "property": "{\"accessState\":\"all\"}",
                        "weight": 0,
                        "privilegeUniqueCode": "0587213d-b2fc-40c1-8a74-e3478f57e06e"
                    }
                ],
                "flag": null,
                "menuNotDisplay": false,
                "source": null,
                "attendFlag": null,
                "companyNum": null,
                "displayResName": i18n.format("特色数据源")
            }
            if (currPrimaryMenu) {
                currPrimaryMenu?.child.push(otherData)
            } else {
                menuData.push({
                    "lft": 9034,
                    "rht": 9035,
                    "level": 2,
                    "sortNum": null,
                    "child": [otherData],
                    "resId": 'new',
                    "resUniqueCode": "57abb580-f3f1-4f3d-a9f8-44b652575klk",
                    "resName": i18n.format("一级市场研究"),
                    "resNameEn": "",
                    "resType": "MENU",
                    "resAttr": `{"icon":"icon-gb-yiji","position":2,"minName":"一级"}`,
                    "privilegeDtoList": [
                        {
                            "resId": 9698,
                            "privilegeId": 46724,
                            "privilegeName": "完全权限",
                            "privilegeType": "PRIVILEGE",
                            "privilegeCode": 3,
                            "property": null,
                            "weight": null,
                            "privilegeUniqueCode": "be77bcff-c13c-4d9e-be5b-ba6d25404697"
                        },
                        {
                            "resId": 9698,
                            "privilegeId": 46761,
                            "privilegeName": "pageAccessInfo",
                            "privilegeType": "APP",
                            "privilegeCode": null,
                            "property": "{\"accessState\":\"all\"}",
                            "weight": 0,
                            "privilegeUniqueCode": "0587213d-b2fc-40c1-8a74-e3478f57e06e"
                        }
                    ],
                    "flag": null,
                    "menuNotDisplay": false,
                    "source": null,
                    "attendFlag": null,
                    "companyNum": null,
                    "displayResName": i18n.format("一级市场研究"),
                })
            }
        }

        console.log('menuData1212=>', menuData);
        let ifGuide = true
        let { selectedKeys, openKeys } = this.getDefaultKeys(path, menuData);
        this.setState({ menuData, selectedKeys, openKeys, isMenuExpanded: ifFixExpanded, isReady: true, ifGuide })

        const isMatch = isMatchRoute('/page/:key'); // 是否需要开启全局预览
        if (isMatch) {
            this.getGuideMenus(menuData)
            this.getSteps();
        }
    }

    addUserGuideRecord = async (sysId) => {
        const result = await Api.addUserGuideRecord({
            sysId,
            type: 1,
        })
    }

    removeUserGuideRecord = async (sysId) => {
        const result = await Api.removeUserGuideRecord({
            sysId
        })
    }

    /**
     * TODO 选中需要优化
     * @returns 
     */
    getParentPath = () => {
        const { urlData } = this.props;
        const { companyId, brandId, industryId, boardId, path, appId } = urlData || {};
        if (brandId) {
            return 'brandAnalysis'
        }
        if (industryId) {
            return 'industryAnalysis'
        }

        if (companyId) {
            return 'companyAnalysis'
        }
        if (boardId) {
            return 'comprehensiveBoard'
        }

        if (appId) {
            return 'dataSourceAnalysis'
        }

        if (path === 'reportDetail') {
            return 'researchReport'
        }
        if (path) {
            return path;
        }
        return null;
    }

    getDefaultKeys = (path, datas) => {

        let selectedKeys = [];
        let openKeys = [];
        let level = 1;
        // console.log('openKeys=>path=>', path,this.props);
        if (!path) { // 进入页面之后选中
            path = this.getParentPath();
            console.log('ppppp=> path: ' + path, datas)
        }
        const loop = (data, level, currParent, grandpa) => {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i];
                let resId = obj.resId;
                let child = obj.child;
                let resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {};
                if (path == resAttr.path) {
                    // console.log('ppppp=> path:111 ' + path,  currParent?.resId.toString())
                    // 处理详情页面
                    if (resAttr.mapKey) {
                        selectedKeys.push(currParent?.resId.toString());
                        openKeys.push(grandpa?.resId.toString());
                    } else {
                        selectedKeys.push(resId.toString());
                        openKeys.push(currParent?.resId.toString());
                    }


                    // return;
                }

                if (child && child.length) {
                    if (level <= 3) {
                        openKeys.push(resId.toString());
                    }
                    loop(child, resId, obj, currParent)
                };
            }
        }

        loop(datas, level, {}, {});

        return {
            selectedKeys,
            openKeys,
        }
    }
    handleClick = () => { }
    handleFooterClick = (e) => {
        e.stopPropagation();
        this.setState({
            isMenuExpanded: !this.state.isMenuExpanded
        })
    }
    renderMenuFooter = () => {
        const { isMenuExpanded } = this.state;
        return <div className="menu-footer" onClick={this.handleFooterClick}>
            <RsIcon className="menu-icon" style={{ fontSize: 12, color: '#8c8c8c' }} type={`${isMenuExpanded ? 'icon-shuangjiantouzuo' : 'icon-shuangjiantouyou'}`} />
        </div>
    }

    renderMenuSuffix = (record) => {
        if (record.displayResName === '研究观点') {
            const { viewpointIsRead } = this.state;
            return (
                viewpointIsRead ? <span className='unread'></span> : null
            )
        }
    }

    renderLeftMenu = (datas, parentId) => {
        if (!datas) return;
        const getContent = (obj) => {
            let resAttr = null
            if (obj.resAttr) {
                resAttr = JSON.parse(obj.resAttr)
            }
            if ((obj.menuIcon && !parentId && !resAttr.iconLeftHide) || (obj.menuIcon && obj.children && obj.children.length && !resAttr.iconLeftHide)) {
                if (!this.state.isMenuExpanded) {
                    // style={{ marginTop: 8 }}
                    return <div >
                        <div style={{ textAlign: 'center' }}>
                            <RsIcon className="menu-icon" style={{ marginLeft: 0, fontSize: 20, lineHeight: '20px' }} type={obj.menuIcon} />
                        </div>
                        {/* <div style={{height: 18, textAlign: 'center', fontSize: 12, color: '#595959'}}>{i18n.format(resAttr.minName)}</div> */}
                    </div>
                }

                return <span style={{ display: 'flex', alignItems: 'center' }}>
                    <RsIcon className="menu-icon" style={{ marginLeft: 8, fontSize: 20 }} type={obj.menuIcon} />
                    <span className="subMenu menu-text limitText" style={{ paddingLeft: 0 }}>{i18n.format(obj.displayResName)}</span>
                </span>
            } else {
                const { tipIcon, tipIconLastDate } = obj.resAttr ? JSON.parse(obj.resAttr) : {}
                const last_date = tipIconLastDate ? new Date(tipIconLastDate) : 0 // "2022-6-18"
                const now_date = new Date()
                const isValid = !tipIconLastDate || last_date - now_date > 0 ? true : false
                return (
                    <span
                        className="subMenu menu-text limitText"
                        style={{ paddingLeft: 0 }}
                    >
                        {this.renderMenuSuffix(obj)}
                        {i18n.format(obj.displayResName)}
                        {tipIcon && isValid ? <RsIcon type={tipIcon} className="menu-tip-icon" /> : null}
                    </span>
                )
            }
        }

        const getHref = (obj) => {
            if (!obj) return null
            let resAttr = null
            if (obj.resAttr) {
                resAttr = JSON.parse(obj.resAttr)
                obj.menuIcon = resAttr.icon
            } else return null
            if (resAttr.path || (resAttr && resAttr.redirectUrl)) {
                let resId = obj.resId;
                let path = resAttr.path;
                let url = "";
                if (resAttr && resAttr.menuType == "config") {
                    url = `/page/config/${resId}/${path}`;
                } else if (resAttr && path) {
                    url = `/page/${path}`;
                } else if (resAttr && resAttr.redirectUrl) {
                    url = resAttr.redirectUrl;

                    return <a href={url} target="_blank" title={obj.displayResName}>
                        {getContent(obj)}
                    </a>
                }

                return <a href={url} title={obj.displayResName}>
                    {getContent(obj)}
                </a>
            } else return getContent(obj)
        }

        const menuList = datas.map((item) => {
            //判断菜单是否显示
            let menuNotDisplay = item.menuNotDisplay;
            //两种情况，1.菜单根本没有配置pageAccessInfo  2.菜单没有分配pageAccessInfo=all
            /*
                有pageAccessInfo，当前没配：当前节点及子节点不展示在左侧菜单树上               ===> menuNotDisplay=false
                有pageAccessInfo，当前配了，最终是all：现有逻辑不变                         ===> menuNotDisplay=false
                有pageAccessInfo，当前配了，最终不是all：当前节点及子节点不展示在左侧菜单树上   ===> menuNotDisplay=false
                
                没有pageAccessInfo：现有逻辑不变                                         ===> menuNotDisplay=true
            */
            if (!menuNotDisplay) {
                let accessState = getAccessState(item.privilegeDtoList);
                if (!accessState || accessState.code != "all") return null;
            }

            let resAttr = null
            if (item.resAttr) {
                resAttr = JSON.parse(item.resAttr)
            }

            if (item && resAttr && (!item.child || resAttr.ifHideSubMenu) && !resAttr.ifHideMenu) {
                let _class = ""
                if (item.resName == "综合看板") _class = "guied-kanban"
                else if (item.resName == "行业分析") _class = "guied-industry"
                else if (item.resName == "公司分析") _class = "guied-company"
                else if (item.resName == "品牌分析") _class = "guied-brand"
                else if (item.resName == "其他数据源") _class = "guied-datas"
                let res = <Menu.Item level={item.level} style={{ paddingLeft: item.level > 3 ? 60 : 44, margin: '4px 0px' }} key={item.resId} className={_class}>
                    {getHref(item)}
                </Menu.Item>;
                if (item.level == 2) {
                    res = {
                        attr: {
                            ...resAttr
                        },
                        dom: <Menu.Item level={item.level} style={{ paddingLeft: 0, margin: '0px' }} key={item.resId}>
                            {getHref(item)}
                        </Menu.Item>
                    }
                }
                return res;
            } else if (item && item.child) {
                let temp_children = this.renderLeftMenu(item.child, item.resId);
                if (isEmpty(temp_children)) return null;
                let res = <SubMenu level={item.level} style={{ paddingLeft: 0, margin: 0 }} className={`${item.level > 2 ? 'menu-after-the-third' : ''}`} key={item.resId} title={getHref(item)} >
                    {temp_children}
                </SubMenu>
                if (item.level == 2) {
                    res = {
                        attr: {
                            ...resAttr
                        },
                        dom: <SubMenu level={item.level} style={{ paddingLeft: 0, margin: 0 }} key={item.resId} title={getHref(item)} >
                            {temp_children}
                        </SubMenu>
                    }
                }
                return res;
            }

        });
        return menuList
    }

    renderLeftMenuListGrounp = (leftMenu) => {
        const leftMenuList = leftMenu && leftMenu.length ? this.renderLeftMenu(leftMenu) : []
        let leftMenuListGroup = []
        if (leftMenuList.length > 0) {
            let group1 = []
            let group2 = []
            let group3 = []
            leftMenuList.map(item => {
                const position = item.attr.position
                if (position == 1) group1.push(item.dom)
                else if (position == 2) group2.push(item.dom)
                else if (position == 3) group3.push(item.dom)
            })
            leftMenuListGroup = [
                ...group1,
                group1.length > 0 && <Divider style={{ borderColor: '#E1E8F0' }} key="divider1" />,
                ...group2,
                group3.length > 0 && <Divider style={{ borderColor: '#E1E8F0' }} key="divider2" />,
                ...group3,
            ]
        }
        console.log('leftMenuListGroup', leftMenuListGroup)
        return leftMenuListGroup
    }
    handleMouseEnter = () => {
        const { ifFixExpanded } = this.props;
        this.setState({
            isMenuExpanded: true,
            mouseIn: true
        })
        // if (ifFixExpanded) return;
        // const mouseTimer = setTimeout(() => {

        // }, 500)
        // this.setState({ mouseTimer })
    }
    handleMuseLeave = () => {
        setTimeout(() => {
            this.setState({ isMenuExpanded: false, mouseIn: false })
        }, 400);
        // const { ifFixExpanded } = this.props;
        // if (ifFixExpanded) return;
        // const { mouseTimer, mouseIn } = this.state


        // if (mouseTimer) clearTimeout(mouseTimer)
        // if (mouseIn) {
        //     this.setState({ isMenuExpanded: false, mouseIn: false })
        // }
    }
    handleOpenChange = (openKeys) => {
        if (!this.state.isMenuExpanded) {
            return
        }
        this.setState({ openKeys })
    }

    expandIcon = (props) => {
        const { isSubMenu, isOpen, eventKey, level } = props;
        if (isSubMenu) {
            const isChildLevel = level > 2
            if (isOpen) {
                if (isChildLevel) {
                    // iconType = 'icon-jiantouyou'
                    return <RsIcon type='icon-jiantouxia' className='menu-select-icon' style={{ color: '#8c8c8c', fontSize: 12 }} />
                }
                return <RsIcon type='icon-jiantoushang-jiacu' className='menu-select-icon' style={{ color: '#8c8c8c', fontSize: 12 }} />
            } else {
                if (isChildLevel) {
                    // iconType = 'icon-jiantouyou'
                    return <RsIcon type='icon-jiantouyou' className='menu-select-icon' style={{ color: '#8c8c8c', fontSize: 12 }} />
                }
                return <RsIcon type="icon-jiantouxia-jiacu" className='menu-select-icon' style={{ color: '#8c8c8c', fontSize: 12 }} />
            }
        }
    }

    getSteps = async () => {
        // const data = await getGuideCount();
        const res = await Promise.all([getGuideCount(), this.getUserGuideRecord()]);
        const data = res[0];

        if (!res[1]) {
            return;
        }

        if (location.pathname === '/page/companyAnalysis') {
            const isCompanyLoad = await getCompanyLoad()
            if (!isCompanyLoad) {
                return;
            }
        }

        let steps = [{
            selector: '.guied-language',
            content: <div>{i18n.format("点击后可切换系统语言为英文；")}</div>,
            placement: 'bottom-right',

        }];
        if (data && data[1]) { //菜单分析
            data[1].forEach(item => {
                if (item.select === '.guied-kanban') {
                    steps.push({
                        selector: '.guied-kanban',
                        content: <div>{i18n.format(`包含线上消费看板，对应原金融二级市场消费版:“我的关注”；`)}</div>,
                        placement: 'right',
                        offset: {
                            x: 5,
                        },
                    })
                }
                if (item.select === '.guied-industry') {
                    steps.push({
                        selector: '.guied-industry',
                        content: <div>
                            <div className="add-margin-bottom">{i18n.format(`包含标准行业分析、特色细分行业；对应原金融二级市场消费版："行业洞察"、"专题洞察"、"特色洞察"；`)}</div>
                            <div className="guide-reamrks">{i18n.format(`备注：原金融二级市场消费版："行业洞察-公司线上排名模块”已移动到线上消费看板中的公司维度`)}</div>
                        </div>,
                        placement: 'right',
                        offset: {
                            x: 5,
                        },
                    })
                }

                if (item.select === '.guied-company') {
                    steps.push({
                        selector: '.guied-company',
                        content: <div>
                            <div>{i18n.format(`包含二级市场消费公司、TMT公司；对应原金融二级市场消费版："公司洞察"、金融二级市场科技版："美股、港股、A股上市公司分析"`)}</div>
                        </div>,
                        placement: 'right',
                        offset: {
                            x: 5,
                        },
                    })

                    if (data[2]) {
                        steps.push({

                            skip: window.location.pathname !== '/page/companyAnalysis',
                            selector: document.querySelectorAll(".company-analysis-head .ant-tabs-tab")[0],
                            content: <div>
                                <div >{i18n.format(`点击后切换至消费公司列表；对应原金融二级市场消费版："公司洞察"`)}</div>
                            </div>,
                            placement: 'bottom-left'
                        })
                    }

                    if (data[2] && data[2].length === 2) {
                        steps.push({
                            skip: window.location.pathname !== '/page/companyAnalysis',
                            selector: document.querySelectorAll(".company-analysis-head .ant-tabs-tab")[1],
                            content: <div>
                                <div>{i18n.format(`点击后切换至科技公司列表；对应原金融二级市场科技版："美股、港股、A股上市公司分析"`)}</div>
                            </div>,
                            placement: 'bottom-left'
                        })
                    }
                }

                if (item.select === '.guied-brand') {
                    steps.push({
                        selector: '.guied-brand',
                        content: <div>
                            <div>{i18n.format(`包含线上消费品牌分析，对应原金融二级市场消费版："品牌洞察"`)}</div>
                        </div>,
                        placement: 'right',
                        offset: {
                            x: 5,
                        },
                    })
                }

                if (item.select === '.guied-datas') {
                    steps.push({
                        selector: '.guied-datas',
                        content: <div>
                            <div>{i18n.format(`包含App特色分析，对应原金融二级市场科技版：“特色数据洞察”`)}</div>
                        </div>,
                        placement: 'right',
                        offset: {
                            x: 5,
                        },
                    })
                }
            })
        }

        this.setState({
            steps: steps
        })
    }

    onClose = () => {
        document.querySelector('html').style = {}
        this.addUserGuideRecord(getCurrSysId())
    }



    render() {
        const { isMenuExpanded, isReady, menuData, selectedKeys, openKeys, ifGuide } = this.state;
        if (!isReady) return null;
        const { ifFixExpanded, style } = this.props;
        let menuClass = null
        console.log('menuData=>', menuData, this.state.steps, openKeys);

        menuClass = isMenuExpanded ? "menu-wrapper" : "menu-wrapper close";
        return (
            <>
                {
                    !ifFixExpanded && isMenuExpanded ? <div className='mark' onMouseEnter={this.handleMuseLeave}></div> : ''
                }
                <div style={style} className={ifFixExpanded ? 'menusset' : 'menus'} >
                    <div className={menuClass} onClick={this.handleMouseEnter}>
                        {
                            !ifFixExpanded ? this.renderMenuFooter() : null
                        }
                        {
                            menuData && menuData.length ?
                                <Menu
                                    expandIcon={isMenuExpanded ? this.expandIcon : null}
                                    mode="inline"
                                    style={{ width: '100%', height: '100%' }}
                                    inlineCollapsed={!isMenuExpanded}
                                    selectedKeys={selectedKeys}
                                    openKeys={isMenuExpanded ? openKeys : []}
                                    onOpenChange={this.handleOpenChange}
                                >
                                    {this.renderLeftMenuListGrounp(menuData)}
                                </Menu> : null
                        }
                    </div>
                    {
                        (this.state.steps.length > 0 && (ifGuide)) && <Guide
                            steps={this.state.steps}
                            visible={true}
                            onClose={() => { this.onClose() }}
                            afterStepChange={(nextIndex, nextStep) => { }}
                            closeEle={<RsIcon type="icon-guanbi" style={{ color: '#8c8c8c', fontSize: 16 }} />}
                            stepText={(stepIndex, stepCount) => `${stepIndex}/${stepCount}`}
                            nextText={i18n.format("下一个")}
                            prevText={i18n.format("上一步")}
                            okText={i18n.format('我知道了')}
                        />
                    }
                </div>
            </>


        );
    }
}

Index.propTypes = {
    ifFixExpanded: PropTypes.bool
};

Index.defaultProps = {
    ifFixExpanded: true
};

export default Index;