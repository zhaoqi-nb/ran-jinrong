'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchInput from './searchInput';
import { Dropdown, Menu, Divider, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import RsIcon from '../../../component/rsIcon/index';
import { getUserInfoData } from '../../page/util';
import { getSystemData, setCurrSysId, getCurrSysId } from '../../page/util';
import { isPrimaryMarket } from '../../../../utils/primaryMarketUtil';

import { transformText } from '../../locales/index';
import i18n from '@/plugin/i18n'
import { FormattedMessage } from '@/components/FastIntl';
import Guide from '@/components/Guide';
import NoI18nList from './NoI18nList';
import InformList from './InformList';
import Api from '../menu/api';
import './index.less';
// import Guide from 'byte-guide';

const iconStyle = {
    fontSize: "20px",
    color: "#333333"
}

const jiantouStyle = {
    fontSize: '12px',
    color: '#0678ff',
}

class Index extends Component {
    constructor(props) {
        super(props);

        localStorage.removeItem('global-search-map-list');
        let currentLanguage = i18n.getLocalLanguage();
        if (isPrimaryMarket() && currentLanguage == "en_US") {
            i18n.switchLanguage('')
            return
        }
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady: false,
            userInfo: null,
            AllSystemList: [{
                code: "ranshu-finance-node",
                title: i18n.format("金融研究系统"),
                href: "/"
            }, {
                code: "ranshu-consumer-node",
                title: i18n.format("消费研究系统"),
                href: "javascript:void(0);"
            }, {
                code: "ranshu-lowCode-node",
                title: i18n.format("低代码平台"),
                href: "javascript:void(0);"
            }],
            systemList: [],
            currentLanguage: i18n.getLocalLanguage(),//'ranshu-finance-node',
            systemName: i18n.format("金融研究系统"),
            dropDownVisible: false,
            tags: [],
            ifAppPM: false
        }
    }
    initData = () => {
        let { AllSystemList, ifAppPM } = this.state;
        const userInfo = getUserInfoData();
        const systemList = this.transformData(getSystemData(), AllSystemList);
        const currentSystem = _.find(getSystemData(), t => t.sysUniqueCode === 'ranshu-finance-node')

        const currSystemList = _.filter(systemList, t => t.code === 'ranshu-finance-node');

        if (Array.isArray(currSystemList) && currSystemList.length > 0) {
            setCurrSysId(currSystemList[0].sysId)
        }
        let hrefs = window.location.href

        if (isPrimaryMarket()) ifAppPM = true

        this.setState({
            systemList: currSystemList,
            tags: _.chain(_.get(currentSystem, 'versionInfo'))
                .map(t => t.tag)
                .compact()
                .value(),
            userInfo,
            isReady: true,
            ifAppPM
        });
    }
    transformData = (data, AllSystemList) => {
        let systemList = [];
        for (let i = 0, len = AllSystemList.length; i < len; i++) {
            let obj = AllSystemList[i];
            let fData = data.find(item => item.sysUniqueCode == obj.code);
            if (fData) {
                obj.sysId = fData.sysId;
                systemList.push(obj);
            }
        }
        return systemList;
    }
    // 切换语言
    changeLanguage = () => {
        localStorage.removeItem('global-search-map-list');
        let currentLanguage = this.state.currentLanguage;
        if (currentLanguage == "en_US") {
            i18n.switchLanguage('')
            this.setState({ currentLanguage: "" });
        } else {
            i18n.switchLanguage('en_US')
            this.setState({ currentLanguage: "en_US" });
        }
    }
    getMenu = (systemList) => {
        return (
            <Menu>
                {
                    systemList.map(item => <Menu.Item key={item.code}>
                        <a href={item.href}>
                            {item.title}
                        </a>
                    </Menu.Item>)
                }
            </Menu>
        )
    }
    renderLoginMenu = (userInfo) => {
        return (
            <Menu>
                <Menu.Item style={{ lineHeight: "35px" }} disabled>
                    {userInfo ? userInfo.name : ""}
                </Menu.Item>
                <Menu.Item style={{ lineHeight: "35px" }}>
                    <a href={`/page/userCenter/`}>{i18n.format("用户中心")}</a>
                </Menu.Item>
                <Divider style={{ margin: 0 }} />
                <Menu.Item style={{ lineHeight: "35px" }}>
                    <a href="/doLogout">{i18n.format("退出登录")}</a>
                </Menu.Item>
            </Menu>
        )
    }

    visibleChange = (visible) => {
        this.setState({ dropDownVisible: visible })
    }

    tagsRender = () => {
        const { tags } = this.state;
        const lan = i18n.getLocalLanguage();
        return _.map(tags, (item, idx) => {
            try {
                let src = require(`../../../image/tag/${item}.svg`);
                if (lan === 'en_US') {
                    src = require(`../../../image/tag/${item}_en.svg`)
                }
                return <img key={idx} src={src} />
            } catch (error) {
                console.log('图片路径错误');
            }
            return null
        })
    }

    handleViewPDF = async () => {
        const url = 'https://ranshu-image.oss-cn-zhangjiakou.aliyuncs.com/000guide/%E7%87%83%E6%95%B0%E9%87%91%E8%9E%8D%E7%A0%94%E7%A9%B6%E7%B3%BB%E7%BB%9F%E5%8D%87%E7%BA%A7%E4%BB%8B%E7%BB%8D.pdf';
        window.open(url, '_blank')
    }
    getMenuGuide = () => {
        return (
            <Menu style={{ marginTop: "-15px" }}>
                <Menu.Item key={1}>
                    <a target="_blank" href={"https://ranshu-image.oss-cn-zhangjiakou.aliyuncs.com/000guide/%E7%87%83%E6%95%B0%E9%87%91%E8%9E%8D%E7%A0%94%E7%A9%B6%E7%B3%BB%E7%BB%9F%E5%8D%87%E7%BA%A7%E4%BB%8B%E7%BB%8D%EF%BC%88%E4%B8%80%E7%BA%A7%E5%B8%82%E5%9C%BA%EF%BC%89.pdf"}>
                        一级市场
                    </a>
                </Menu.Item>
                <Menu.Item key={2}>
                    <a target="_blank" href={"https://ranshu-image.oss-cn-zhangjiakou.aliyuncs.com/000guide/%E7%87%83%E6%95%B0%E9%87%91%E8%9E%8D%E7%A0%94%E7%A9%B6%E7%B3%BB%E7%BB%9F%E5%8D%87%E7%BA%A7%E4%BB%8B%E7%BB%8D.pdf"}>
                        二级市场
                    </a>
                </Menu.Item>

            </Menu>
        )
    }

    render() {
        const { isReady, userInfo, systemList, currentLanguage, systemName, dropDownVisible, tags, ifAppPM } = this.state;
        if (!isReady) return null;
        const { unReadInformList } = this.props;
        return (
            <div className="header-container">
                <div className="header-left">
                    <a href="/">
                        <img src={require("../../../image/logo.png")} alt="logo" className="logo" />
                    </a>
                    <div className="vertical-divider"></div>
                    <Dropdown overlayClassName="drop-down-container" overlay={this.getMenu(systemList)} onVisibleChange={this.visibleChange} style={{ width: 192 }} trigger={['click', 'hover']}>
                        <div className="system-button">
                            <div className="system-name">{systemName}</div>
                            <div className="system-jiantou">
                                {dropDownVisible ? (<RsIcon type="icon-tianchongshangjiantou" style={jiantouStyle} />) : (
                                    <RsIcon type="icon-tianchongxiajiantou" style={jiantouStyle} />
                                )}

                            </div>
                        </div>
                    </Dropdown>
                    <div className='tag-wrapper'>
                        {this.tagsRender()}
                    </div>
                </div>
                {/**后期需求，暂时隐藏全局搜索 */}
                <div className="header-center">
                    <SearchInput />
                </div>

                <div className="header-right">
                    <div className="vertical-divider"></div>
                    <Dropdown overlayClassName="drop-down-container" overlayStyle={{ width: "86px" }} overlay={this.getMenuGuide()} onVisibleChange={this.visibleChange} style={{ width: 80 }} trigger={['click', 'hover']}>
                        <div className="menu-item">
                            <div className='guide' guide-tip='改版指南'>
                                <RsIcon type="icon-zhinan" style={{ fontSize: 16, color: '#0678FF' }} />
                                <FormattedMessage id="改版指南" />
                            </div>
                        </div>
                    </Dropdown>
                </div>
                <div className="header-right">
                    {/* <div className="menu-item">
                        <NoI18nList></NoI18nList>
                    </div> */}
                    <div className="menu-item">
                        <Link to={"/page/index"} key="index" className="menu-link">
                            <RsIcon type="icon-shouye" style={iconStyle} />
                            <div><FormattedMessage id="首页" /></div>
                        </Link>
                    </div>
                    {/* <div className="menu-item">
                        <RsIcon type="icon-xiaoxi" style={iconStyle}/>
                        <div>消息</div>
                    </div> */}
                    <div className="menu-item">
                        {/* <Guide.Item guideStep='2' guideTip='服务包'> */}
                        <Link target="_blank" to={"/page/servicePackage"} key="index" className="menu-link">
                            <RsIcon type="icon-fuwubao" style={iconStyle} />
                            <div><FormattedMessage id="服务包" /></div>
                        </Link>
                        {/* </Guide.Item> */}
                    </div>
                    {/*  暂时禁用掉 */}

                    <div id="" className="menu-item guied-language" onClick={ifAppPM ? null : this.changeLanguage} style={{ cursor: ifAppPM ? "not-allowed" : "" }}>
                        {currentLanguage == "en_US" ? (
                            <React.Fragment>
                                <RsIcon type="icon-zhongwen" style={iconStyle} />
                                <div><FormattedMessage id="中文" /></div>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    <RsIcon type="icon-fanyi" style={iconStyle} />
                                    <div>English</div>
                                </React.Fragment>
                            )}
                    </div>
                    {/* <Dropdown overlay={<InformList />}>
                        <div className="menu-item menu-inform-item">
                            <RsIcon type="icon-xiaoxi" style={iconStyle} />
                            <div><FormattedMessage id="通知" /></div>
                            {
                                _.size(unReadInformList) ? <span className='inform-tag'>{_.size(unReadInformList)}</span> : null
                            }
                        </div>
                    </Dropdown> */}
                    <div className="user-avatar">
                        <Dropdown overlay={this.renderLoginMenu(userInfo)} overlayClassName="user-avatar-overlay">
                            <img style={{ width: 32, height: 32, borderRadius: 4 }} src={userInfo && userInfo.headimgurl ? userInfo.headimgurl : require("../../../image/user.png")} />
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

function mapStateToProps(state) {
    return { ...state.inform }
}

const enhance = connect(mapStateToProps, {})

export default enhance(Index); 
