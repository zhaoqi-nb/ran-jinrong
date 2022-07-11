'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import { Tabs, Anchor, Tooltip, Drawer } from 'antd';
import RsIcon from '../../rsIcon/index';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import { resetPageData } from '../../../../utils/pageData';
import BottomExplain from '../../page/bottomExplain';
import { getKeyPrivilege, getPrivilegeData } from '../../util/template';
import { i18n } from '@/components/FastIntl';
import PageDownload from './component/page-download'
import PageConfigDownload from './component/page-config-download';
import './index.less';


const { TabPane } = Tabs;
const { Link } = Anchor;

class CustomTab extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.ref = React.createRef();
        this.currentLink = React.createRef();
        this.endLink = React.createRef();
    }

    componentDidMount() {
        this.initData(this.props);
        const { onObserver } = this.props;
        onObserver && onObserver({ onChange: this.handlerChange })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabData !== this.props.tabData) {
            this.initData(nextProps);
        }
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            id: "",
            style: {},
            className: '',
            currSelect: "1",
            tabData: [],
            offsetTop: 40,
            type: 'line', // 默认为line类型，三种类型： anchor-锚点类型，line-line页签   card-card页签

            drawerVisible: false,
        }
    }

    // 处理数据
    processingData = (noView, tabData) => {
        let arr = [];
        for (let i = 0, len = tabData.length; i < len; i++) {
            let obj = tabData[i],
                title = obj.title;
            let index = noView.findIndex(item => item == title)
            if (index == -1) arr.push(obj)
        }
        return arr;
    }
    getNowCurrSelect = (_tabData = []) => {
        let { currSelect } = this.state

        const currIndex = _tabData.findIndex(item => item.value == currSelect)
        if (currIndex < 0 && _tabData.length) {
            currSelect = _tabData[0].value
        }

        return currSelect
    }

    //初始化数据
    initData = (_props) => {
        // const _props = this.props;
        try {
            //let offsetTop = document.getElementById("anchorContent").offsetTop;
            let id = setDefault(_props.id);
            let currSelect = setDefault(_props.currSelect);
            let tabData = setDefault(_props.tabData);
            let style = setDefault(_props.style);
            let className = setDefault(_props.className);
            let type = setDefault(_props.type);
            let isConfig = setDefault(_props.isConfig, false);

            // 不是config来的
            if (!isConfig) {
                // 直接调用common组件，需要单独获取权限数据 
                let privilegeData = getKeyPrivilege("tab_noView");
                if (privilegeData && privilegeData.data) {
                    let newData = privilegeData.data.map(item => i18n.format(item));
                    tabData = this.processingData(newData, tabData);
                    // if (tabData && tabData.length) currSelect = tabData[0]["value"];
                    if (tabData && tabData.length) currSelect = this.getNowCurrSelect(tabData)
                }
            }
            // 设置组件状态
            this.setState({ id, currSelect, tabData, style, className, type, isReady: true });
        } catch (error) {
            console.log(`tab组件渲染出错：${error}`);
        }
    }

    renderContent = () => {
        const { tabData, currSelect, type, style, className } = this.state;
        const { children } = this.props;
        const temp_style = Object.assign({}, { position: "relative" }, style);
        if (!tabData || !tabData.length) return;
        console.log('childrenchildren', children);
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        return tabData.map((item, index) => {
            return <TabPane tab={item.title} key={item.value ? item.value : index} style={temp_style} className={className}>
                {item.value === currSelect ? childrenWithProps[Number(currSelect) - 1] : null}
            </TabPane>
        })
    }

    renderAnchorContent1 = () => {
        // 渲染锚点列表内容
        const { tabData, currSelect } = this.state;
        const { children } = this.props;
        if (!tabData || !tabData.length) return;
        // const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));

        return tabData.map((item, index) => {
            //let dataIndex = tabData.findIndex(())
            if (tabData.length - 1 === index) {
                return <Link ref={this.endLink} title={item.title} href={`#${item.value}`} key={item.value ? item.value : index} />
            }
            return <Link title={item.title} href={`#${item.value}`} key={item.value ? item.value : index} />

        })
    }

    setLink = (type) => {
        const list = document.querySelectorAll('.ant-anchor-fixed .ant-anchor-link');
        list.forEach((item, index) => {
            item.classList.remove('ant-anchor-link-active');
            if (type == 'end' && list.length === index + 1) {
                item.classList.add('ant-anchor-link-active');
            }
            if (type === 'beforeEnd' && list.length === index + 2) {
                item.classList.add('ant-anchor-link-active');
            }
        })

    }

    onScroll = (e) => {
        const endHref = this.endLink.current.props.href;
        if (this.currentLink.current === endHref) {
            return;
        }
        const { scrollTop, offsetHeight, scrollHeight } = this.ref.current;
        if (scrollTop + offsetHeight >= scrollHeight - 50) {
            //    this.setLink('end')
            this.endLink.current?.handleClick();
        } else if (scrollTop + offsetHeight >= scrollHeight - 100) {
            // this.setLink('beforeEnd')
        }
    }

    renderAnchorContent2 = () => {
        // 渲染锚点列表内容
        const { tabData, currSelect, type } = this.state;
        const { children, bodyStyle, hiddenBottomExplain } = this.props;
        if (!tabData || !tabData.length) return;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        return <div className="anchor-container-body" ref={this.ref} onScroll={debounce(this.onScroll, 300)}>
            <div className="anchor-container-body-container">
                {tabData.map((item, index) => {
                    //  borderBottom: '1px solid #E1E8F0',
                    return (
                        <div id={item.value} style={{ paddingBottom: '16px', minHeight: '300px', ...bodyStyle }}>{childrenWithProps[(parseInt(item.value) - 1) || index]}</div>
                    )
                })}
            </div>

            {!hiddenBottomExplain && <BottomExplain />}
        </div>
    }

    // handleClick = (e,link) => {
    //     e.preventDefault();
    //     console.log(e.target, link);
    //     const { getCurrSelect } = this.props;
    //     this.setState({ currSelect: link}, () => {
    //         getCurrSelect(link.href);
    //     });
    // }
    handleAnchorChange = (currentLink) => {
        this.currentLink.current = currentLink;
        // if (!currentLink) return null;
        // const { getCurrSelect } = this.props;
        // this.setState({ currSelect: currentLink }, () => {
        //     getCurrSelect(currentLink);
        // });
    }

    handlerChange = (key) => {
        resetPageData();
        const { getCurrSelect, onChange } = this.props;
        this.setState({ currSelect: key }, () => {
            if (getCurrSelect) {
                getCurrSelect(key);
            }
            onChange && onChange(key)
        })

    }


    getCurrentAnchor = (anchor) => {
        return this.currentLink.current;

    }

    isAuth = () => {
        let privilege = getPrivilegeData(["ifDownload"]);
        if (privilege) {
            return privilege.ifDownload;
        }
        return false;
    }

    handleDownloadClick = () => {
        this.setState({
            drawerVisible: true,
        })
    }

    handleDrawerClose = () => {
        this.setState({
            drawerVisible: false
        })
    }

    render() {
        const { isReady, currSelect, style, type, className, drawerVisible, tabData } = this.state;
        const { hiddenBottomExplain, download } = this.props;
        if (!isReady) return null;
        return (
            <div >
                {
                    type == "anchor" ? (
                        <div className={classnames("anchor-container", {
                            'anchor-top-outside': this.props.position === 'top-outside',
                            'anchor-top-outside sm-tab-top-outside': this.props.position === 'sm-top-outside'
                        })} id="anchorContent">
                            <Anchor
                                affix={false}
                                showInkInFixed={false}
                                // targetOffset={32}
                                offsetTop={100}
                                // bounds={100}
                                // getCurrentAnchor={this.getCurrentAnchor}
                                getContainer={() => document.querySelector(".anchor-container-body")}
                                //onClick={this.handleClick} 
                                onChange={this.handleAnchorChange}
                            // getCurrentAnchor={this.getCurrentAnchor}
                            // onChange
                            >
                                {this.renderAnchorContent1()}
                            </Anchor>

                            {this.renderAnchorContent2()}

                        </div>

                    ) : (
                        <div className={classnames(className, {
                            'tab-line-style': type === "line" || !type,
                            'tab-card-style': type === "card",
                            "tab-button-style": type === "button",
                            'tab-top-outside': this.props.position === 'top-outside',
                            'tab-top-outside pm-tab-top-outside': this.props.position === 'pm-top-outside',
                            'tab-top-outside app-tab-top-outside': this.props.position === 'app-top-outside',
                        })}>
                            {
                                download && download.type == 'backend' 
                                && (download.displayDataValue && download.displayDataValue.indexOf(currSelect) != -1) && !drawerVisible && this.isAuth() && <div className="tab-download-container">
                                    <Tooltip placement="left" title={i18n.format('下载数据')}>
                                        <RsIcon className="xiazai-icon" type="icon-xiazai" onClick={this.handleDownloadClick} style={{ color: '#595959', fontSize: '16px' }} />
                                    </Tooltip>
                                </div>
                            }
                            <Tabs type={type ? type : 'line'} activeKey={currSelect} style={{ width: "100%" }} onChange={this.handlerChange}>
                                {this.renderContent()}
                                {(!type || type === 'line') && !hiddenBottomExplain && <BottomExplain />}
                            </Tabs>

                        </div>
                    )
                }

                <Drawer
                    title={<div style={{display: 'flex'}}>
                            <span style={{ flex: '1', color: '#333333', fontSize: '13px' }}>{i18n.format('创建下载任务')}</span>
                            <span onClick={this.handleDrawerClose} style={{cursor: 'pointer'}}><RsIcon  className="guanbi-icon" type="icon-guanbi" /></span>
                        </div>}
                    placement={'right'}
                    onClose={this.handleDrawerClose}
                    closable={false}
                    visible={drawerVisible}
                    width={576}
                    bodyStyle={{marginBottom: 50}}
                    destroyOnClose
                >   
                    {
                        download && download.pageId ? <PageConfigDownload pageId={download.pageId} onClose={this.handleDrawerClose} /> : <PageDownload onClose={this.handleDrawerClose} tabData={tabData} />
                    }
                </Drawer>
            </div >
        );
    }
}

CustomTab.propTypes = {
    id: PropTypes.string,
    currSelect: PropTypes.string,
    tabData: PropTypes.array,
    style: PropTypes.object,
};

CustomTab.defaultProps = {
    id: `title_${gethashcode()}`,
}

// CustomTabPane
class CustomTabPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        return (
            <div>
                {childrenWithProps}
            </div>
        );
    }
}

export { CustomTab, CustomTabPane };