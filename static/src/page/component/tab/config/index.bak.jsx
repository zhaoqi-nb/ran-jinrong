'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';

import _ from 'lodash';
import { Spin } from 'antd';
import { CustomTab as CustomTabCommon, CustomTabPane as CustomTabPaneCommon } from '../common/index';
import Api from './store/api';
import { getKeyPrivilege } from '../../util/template';
import EditTemplate from '../../util/editTemplate/index';
import { i18n } from '@/components/FastIntl';
import { setTableIsDownload, getBottomExplainFun } from '../../../../utils/pageData';
import { getPageData } from '../../../../page/component/page/util';
import { getData } from '../../../../page/component/util/template';
import cloneDeep from 'lodash/cloneDeep';

class CustomTab extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.queryComponentData();
        //注册事件
        this.registerEvent();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
        //销毁事件
        this.destroyEvnet();
    }

    getInitialState = () => {
        return {
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            instantiationId: null,
            //组件数据
            templateData: null,
            // 数据
            currSelect: null,
            tabData: null,
            type: null,
            // 影响元素
            effectElement: {},
            //受控元素
            controlledElement: null,
            //条件显示tab
            conditionShow: null
        }
    }
    queryComponentData = async () => {
        const { id } = this.props;
        console.log("tab 加载", id);
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            currSelect = null,
            tabData = null,
            type = null,
            style = {},
            controlledElement = [],
            //影响元素
            effectElement = {},
            conditionShow = null,
            children = [],
            //组件状态
            componentState = "InMount";


        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;

                currSelect = this.setDefault(templateProperty.defaultActiveKey);
                tabData = this.setDefault(templateProperty.data, []);
                style = this.setDefault(this.props.style, {});
                type = this.setDefault(templateProperty.type, "");
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                effectElement = this.setDefault(templateProperty.effectElement, {});
                conditionShow = this.setDefault(templateProperty.conditionShow, null);
                // 更新组件状态
                if (!tabData || !tabData.length) {
                    componentState = "InMount";
                } else {
                    componentState = "DidMount";
                }
                // 执行底部免责声明的layout
                if (!type || type === 'line' || type === 'anchor') {
                    getBottomExplainFun();
                }
            } catch (error) {
                console.log(error);
            }
        }

        children = React.Children.map(this.props.children, (child, idx) => {
            return React.cloneElement(child, {
                tabKey: _.get(tabData[idx], 'value', null)
            })
        }).filter((child) => child.props.tabKey)

        console.log('childrenchildrenchildren', children);
        // 获取权限数据 
        let privilegeData = getKeyPrivilege("tab_noView");
        if (privilegeData && privilegeData.data) {
            let newData = privilegeData.data.map(item => i18n.format(item));
            console.log('newDatanewDatanewData', newData, tabData)
            tabData = this.processingData(newData, tabData);
            children = _.filter(children, item => {
                return _.find(tabData, t => t.value === item.props.tabKey)
            })
            // if (tabData && tabData.length) currSelect = tabData[0]["value"];
            if (tabData && tabData.length) currSelect = this.getNowCurrSelect(tabData)
        }

        if (this.props.tabDataRender) {
            tabData = this.props.tabDataRender(tabData);
        }
        // debugger;
        this.setState({ instantiationId, templateData, currSelect, tabData, type, controlledElement, effectElement, style, componentState, conditionShow, children }, () => {
            // setTimeout(this.exportLoadDataFun, 600);
            this.exportLoadDataFun()
        });
    }

    // 重写状态更新方法
    exportLoadDataFun = async () => {
        const { templateData, instantiationId, effectElement, currSelect, tabData } = this.state;
        console.log("tab 负责处理数据", instantiationId, JSON.stringify(effectElement));
        // if (!templateData.data) {
        if (!tabData || (tabData.length < 1)) {
            const resData = await this.getTabData()
            let _tabData = []
            if (resData.result) {
                const tabList = resData.result.list
                tabList.map((item, index) => {
                    _tabData.push({
                        title: i18n.format(item.name),
                        value: (index + 1).toString()
                    })
                })
            }
            this.setState({ tabData: _tabData, componentState: "DidMount" }, this.exportLoadDataFun)
        } else {
            const temp = effectElement[currSelect];
            if (temp && Array.isArray(temp)) {
                for (let i = 0, len = temp.length; i < len; i++) {
                    let id = temp[i];
                    this.triggerEvnetFun(`getData_${id}`);
                }
            }
            this.forceUpdate()
        }
    }

    // 请求获取tabData 
    getTabData = async () => {
        const { instantiationId } = this.state;
        if (!instantiationId) return;
        //get 请求参数
        const params = this.getApiParam();
        if (!params) {
            setTimeout(this.getTabData, 500);
            return null;
        }
        let result = await Api.getTemplateData({
            instantiationId,
            params: JSON.stringify(params)
        })
        let data = {};
        if (result.code == 200) {
            data = result.data;
        }
        return data
    }

    transformApiData = (data) => {
        return data.map((item, index) => {
            return {
                title: item.name,
                value: index + 1
            };
        })
    }

    exportParamFun = () => {
        const { componentState, currSelect, tabData, templateData } = this.state;
        if (componentState !== "DidMount") return null;
        const curParam = tabData?.find(item => item.value === currSelect)
        return {
            [templateData.paramKey]: curParam?.title || ""
        };
    }

    getCurrSelect = (value) => {
        console.log(value);
        if (value.indexOf('#') !== -1) {
            this.setState({ currSelect: value.split("#")[1], isReady: true }, () => {
                this.exportParamFun();
                this.exportLoadDataFun();
            })

        } else {
            this.setState({ currSelect: value, isReady: true }, () => {
                this.exportParamFun();
                this.exportLoadDataFun()
            })
        }

    }

    renderLoading = () => {
        return <Spin tip="Loading..." />
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

    getConditionTabs = (tabData, conditionShow, controlledElement) => {
        const params = this.getComponentParam(controlledElement)
        if (params) {
            conditionShow.map(item => {
                const { key, value, tabs } = item
                if (params[key] == value) {
                    zhe = tabData.filter(_item => tabs.indexOf(_item.value) > -1)
                }
            })
        } else {
            setTimeout(() => {
                this.getConditionTabs(tabData, conditionShow, controlledElement)
            }, 500);
            return
        }

        return tabData
    }

    isDownload = (tabData, currSelect) => {
        if (!tabData || !currSelect) return false
        const currItem = tabData.find(f => f.value === currSelect);
        if (currItem.title === '表格' || currItem.title === 'Table') {
            const pageDate = getPageData();
            const privilegeDtoList = pageDate.privilegeDtoList;
            const ifDownload = getData('ifDownload', privilegeDtoList);
            return ifDownload && ifDownload.show;
        }
        return false;
    }

    renderContent = () => {
        const { instantiationId, tabData, type, style, conditionShow, controlledElement, children } = this.state;
        let { currSelect } = this.state
        const { bodyStyle = {}, position, className, containerStyle, onObserver, onChange } = this.props;
        let _tabData = cloneDeep(tabData)
        if (conditionShow && _tabData.length) {
            _tabData = this.getConditionTabs(_tabData, conditionShow, controlledElement)
            currSelect = this.getNowCurrSelect(_tabData)
        }
        let param = {
            id: instantiationId,
            currSelect,
            tabData: _tabData,
            type,
            style,
            className,
            children,
            bodyStyle,
            containerStyle,
            onObserver,
            onChange
        };
        const isDownload = this.isDownload(_tabData, currSelect)
        console.log('paramparamparam', param, this.props);
        console.log('11112=>', isDownload);
        setTableIsDownload(isDownload);
        return (<CustomTabCommon {...param} getCurrSelect={this.getCurrSelect} position={position}></CustomTabCommon>)
    }

    render() {
        const { componentState, instantiationId } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId}>
            {this.renderContent()}
        </EditTemplate>
    }
}

CustomTab.propTypes = {
    id: PropTypes.number.isRequired,
};

CustomTab.defaultProps = {
}

// TabPane 
class CustomTabPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <CustomTabPaneCommon children={children}></CustomTabPaneCommon>
        )
    }
}
export { CustomTab, CustomTabPane };
