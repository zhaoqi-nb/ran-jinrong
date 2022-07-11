'use strict';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getTemplateData, getPrivilegeData, getKeyPrivilege } from '../util/template';
import RsIcon from '../rsIcon/index';
import EditTemplate from '../util/editTemplate/index';
import Api from './store/api';
import Component from '../util/component';
import i18n from '@/plugin/i18n'

import './index.less'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        const { id, text } = this.props;
        //注册事件
        this.registerEvent();
        //存在模版ID 则走组件化
        if (id) this.queryComponentData();
        else if (text) {
            //普通组件直接调用
            this.setState({ isReady: true }, () => {
                this.exportLoadDataFun(text)
            });
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            instantiationId: null,
            //模版数据
            templateData: null,
            apiParamNames: null,
            url: null
        }
    }
    getApiText = async () => {
        const { id } = this.props;
        const { url, platform_codes } = this.state
        if (!id) return;
        //get 请求参数
        let result
        if (url) {
            console.log('explainParams', platform_codes)
            result = await Api.getExplain({ params: JSON.stringify({ platform_codes }) }, url)
        } else {
            const params = this.getApiParam();
            if (!params || params === -1) {
                setTimeout(this.getApiText, 500);
                return null;
            }
            result = await Api.getExplainData({
                instantiationId: id,
                params: JSON.stringify(params)
            })
        }
        let text = '';
        const data = result.data;
        try {
            if (url) {
                text = data
            } else {
                text = data && data.result && data.result.list && data.result.list[0].data
            }
        } catch (e) {
            console.log('获取标题出错: ', e)
        }
        return text
    }
    exportLoadDataFun = async (title) => {
        const { ifShowIcon } = this.props
        const { icon } = this.state
        if (!title) {
            title = await this.getApiText()
        }
        if (!title || (typeof title != "string")) return title;
        let contentArr = title.split("&&");
        let titleContent = ''
        const _title = <div class='explain-wrapper-title-caibao' style={{ display: 'flex' }}>
            {/* {ifShowIcon ? <RsIcon type={icon || "icon-shuoming"} style={{ fontSize: 16, marginRight: 8 }} /> : null} */}
            <div>
                {contentArr.map((item, index) => {
                    const value = i18n.format(item);
                    titleContent += `${value}\r\n`
                    return <div key={`qq${index}`}>
                        {value}
                    </div>
                })}
            </div>
        </div>;
        this.setState({
            text: _title,
            textContent: titleContent,
        })
    }
    //获取 组件数据
    queryComponentData = async () => {
        const { id } = this.props;
        const tempData = getTemplateData(id);
        //defalut value
        let templateData = null,
            apiParamNames = null,
            text = "",
            controlledElement = null,
            icon = null,
            url = null,
            privilegeKey = null,
            platform_codes = '1,2,3',
            instantiationId = null;

        try {
            let templateProperty = tempData.templatePropertyValueJson;

            instantiationId = tempData.instantiationId;
            templateData = templateProperty;
            apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
            //默认从模版配置里面text获取
            text = templateProperty.text;
            icon = this.setDefault(templateProperty.icon, null);
            controlledElement = this.setDefault(templateProperty.controlledElement, []);
            url = this.setDefault(templateProperty.url, null);
            privilegeKey = this.setDefault(templateProperty.privilegeKey, null);
            //从应用权限中获取
            let resData = getPrivilegeData([privilegeKey]);
            let privilegeData = _.get(resData, `${privilegeKey}.data`, []);
            platform_codes = privilegeData.length ? _.chain(privilegeData)
                .map(t => t.code)
                .join(',')
                .value() : platform_codes
            if (resData && resData.pageInfo) {
                let pageInfo = resData.pageInfo,
                    resAttr = pageInfo.resAttr,
                    obj = resAttr.text;
                if (obj && obj[id] != undefined) text = obj[id];
            }
        } catch (error) {
            console.log(error);
        }
        this.setState({ instantiationId, templateData, controlledElement, text, icon, apiParamNames, url, platform_codes, isReady: true }, () => {
            setTimeout(() => {
                this.exportLoadDataFun(text)
            }, 500)
        });
    }
    render() {
        const { isReady, text, instantiationId, textContent, icon } = this.state;
        if (!isReady || !text) return null;
        const { style, ifShowIcon, type = 'config' } = this.props;
        const temp_style = Object.assign({}, {}, style);
        return (
            <div style={temp_style} title={textContent} className="explain-wrapper excel-explain-wrapper-content">
                <div className={ifShowIcon ? 'tips showIcon' : 'tips noIcon'}>
                    {ifShowIcon ? <RsIcon type={icon || "icon-shuoming"} style={{ fontSize: 16, marginRight: 8 }} /> : null}
                    {type === 'config' ? i18n.format(text) : text}
                </div>
                {type === 'config' && <EditTemplate instantiationId={instantiationId} />}
            </div>
        );
    }
}

Index.defaultProps = {
    text: "",
    style: {},
    ifShowIcon: true.valueOf,
    type: 'config' // config => 配置  custom => 定制
};


Index.propTypes = {
    id: PropTypes.number.isRequired,
    style: PropTypes.object,
    text: PropTypes.any,
    ifShowIcon: PropTypes.bool
};

export default Index;