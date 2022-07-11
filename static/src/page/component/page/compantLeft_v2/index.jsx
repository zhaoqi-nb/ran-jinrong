'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Input } from 'antd'
import RsIcon from '../../rsIcon/index';
import data from './company-alibb.json'
import { getAccessState } from '../../util/template';
import './index.less';
import SearchtTable from '../searchTable'

import debounce from 'lodash/debounce';

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getAnchor = debounce(this.getAnchor, 800);
    }

    componentDidMount() {
        this.initData()
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }

    initData = () => {
        let leftMenu = data.data.child,
            pageInfo = data.data,
            topInfo = {},
            openKeys = [];
        if (pageInfo.resAttr) {
            let obj = pageInfo.resAttr ? JSON.parse(pageInfo.resAttr) : {}
            topInfo.resName = pageInfo.resName
            topInfo.stock_code = obj.stock_code
        }
        let { industryList, industryListShow, selectId } = this.state
        industryListShow = industryList
        selectId = industryListShow[0].code
        openKeys = leftMenu.map(item => item.resId)
        this.setState({ leftMenu, pageInfo, topInfo, industryListShow, selectId, openKeys, isReady: true })
    }
    getInitialState = () => {
        return {
            isReady: false,
            collapsed: false,
            leftMenu: {},
            pageInfo: {},
            topInfo: {},
            openKeys: [],
            inputValue: null,
            visible: false,
            selectId: null,
            industryList: [
                { name: "美妆个护", code: "1" },
                { name: "纺织服装", code: "2" },
                { name: "家用电器", code: "3" },
                { name: "数码3C", code: "4" },
                { name: "家装服饰", code: "5" },
                { name: "轻工制造", code: "6" },
                { name: "1111", code: "7" },
                { name: "2222", code: "8" },
                { name: "3333", code: "9" },
            ],
            industryListShow: []
        }
    }

    renderLeftMenu = (datas, parentId) => {
        if (!datas) return;

        return datas.map(item => {
            //判断菜单是否显示
            let menuNotDisplay = item.menuNotDisplay;
            if (!menuNotDisplay) {
                let accessState = getAccessState(item.privilegeDtoList);
                if (!accessState || accessState.code != "all") return null;
            }
            //折叠菜单
            if (item.child && item.level == 5) {
                return <SubMenu key={item.resId} title={item.resName} >
                    {
                        this.renderLeftMenu(item.child)
                    }
                </SubMenu>

            }
            //如果有child 返回本身和child
            else if (item.child && item.level == 6) {
                let HTMl = [<Menu.Item key={item.resId} style={{ margin: 0 }} disabled className='disabledSelected' style={{ cursor: 'text', marginLeft: '-5px' }}>
                    <span style={{ color: '#595959', cursor: 'text' }}>{item.resName}</span>
                    {/* {getHref(item)} */}
                </Menu.Item>, ...this.renderLeftMenu(item.child)]
                return HTMl
            }
            // // 没有child直接返回
            else {
                return <Menu.Item key={item.resId} style={{ margin: 0 }}>
                    <span style={{ color: "#262626", paddingLeft: '14px' }}>{item.resName}</span>
                    {/* {getHref(item)} */}
                </Menu.Item>
            }
        })

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    //只允许打开一个父级
    onOpenChange = (keys) => {
        const { openKeys } = this.state
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] })
    }
    //左侧导航
    renderLeft = () => {
        const { leftMenu, openKeys } = this.state
        let defaultSelectedKey = []
        const findDefaultKey = (arr) => {
            for (let i in arr) {
                if (!arr[i].menuNotDisplay) {
                    if (!arr[i].child) {
                        defaultSelectedKey.push(arr[i].resId.toString())
                        return true
                    } else {
                        findDefaultKey(arr[i].child)
                        return false
                    }
                }
            }

            return defaultSelectedKey
        }
        findDefaultKey(leftMenu)
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                // style={{ height: '100%', borderRight: 0 }}
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
            >
                {this.renderLeftMenu(leftMenu)}
            </Menu>
        )
    }

    //切换行业，公司
    showChangeModal = () => {
        this.setState({ visible: true })
    }

    getAnchor = () => {
        let { industryList, industryListShow, inputValue } = this.state
        industryListShow = industryList.filter(item => {
            return item.name.indexOf(inputValue) != -1
        })
        this.setState({ industryListShow })
    }

    //筛选行业
    filertLi = (e) => {
        let { industryListShow } = this.state

        this.setState({ inputValue: e.target.value }, () => {
            this.getAnchor()
        })

    }
    changeSelectid = (e, code) => {
        e.stopPropagation()
        this.setState({ selectId: code, visible: false })
    }
    getValue(val) {
        this.setState({
            visible: val
        })
    }
    setSearchfix(val) {
        this.setState({
            inputValue: val
        })
    }
    renderHeader = () => {
        const { pageInfo, topInfo, industryListShow, visible, inputValue, selectId } = this.state
        return (
            <div className='header-industry'>
                <RsIcon type="icon-guanzhu-weiguanzhu" style={{ color: "#333333", marginRight: "5px", cursor: 'pointer', position: 'absolute', right: '6px' }} />
                <dl style={{ marginBottom: '0em' }}>
                    <dt><img src={require("../../../image/user.png")} /></dt>
                    <dd className='show-name'>{topInfo.resName}</dd>
                    <dd className='show-code'>{topInfo.stock_code}</dd>
                </dl>
                <SearchtTable visible={visible} inputValue={inputValue} selectOption={selectOption} searchfix={this.setSearchfix.bind(this)} content={this.getValue.bind(this)} />

            </div>
        )
    }
    closeSearchModal = (e, type) => {
        const { visible } = this.state
        if (!visible) return
        e.stopPropagation()
        this.setState({ visible: type })
    }


    render() {
        const { isReady } = this.state
        if (!isReady) return null
        // const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        return (
            <div className='rightMenuBoxv2' onClick={(e) => this.closeSearchModal(e, false)}>
                <Layout>
                    <Sider trigger={null} width={200} className="site-layout-background">
                        {this.renderHeader()}
                        <p style={{ height: 1, background: '#E1E8F0', margin: 0 }}></p>
                        {this.renderLeft()}
                    </Sider>
                    <Layout className="site-layout">
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >

                            {/* {childrenWithProps} */}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;