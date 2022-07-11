import React from 'react'
import { cloneDeep } from 'lodash';
import Component from '../../util/component';
import Search from '../common/index'
import Api from './store/api'
import i18n from '@/plugin/i18n'
import EditTemplate from '../../util/editTemplate/index'
import { getPrivilegeData, getKeyPrivilege } from '../../util/template';

class PmSearch extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.searchCallBack = this.searchCallBack.bind(this)
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

    getInitialState() {
        return {
            componentState: "WillMount",
            instantiationId: null,
            controlledElement: null,
            effectElement: null,
            //组件数据
            templateData: null,
            placeholder: null,
            style: null,
            searchCallBack: null,
            selectCallBack: null,
            options: null,
            ifClear: null,
            paramKey: null,
            url: null,
            selectCode: null,
        }
    }

    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);

        let instantiationId = null,
            //组件状态
            componentState = "InMount",
            templateData = null,
            placeholder = null,
            style = null,
            ifClear = null,
            paramKey = null,
            controlledElement = null,
            effectElement = null,
            url = null,
            first_type_limit_app = null,
            first_type_no_limit_app = null,
            second_type_limit_app = null,
            second_type_no_limit_app = null;

        if (tempData) {
            try {
                instantiationId = id
                componentState = 'DidMount'
                templateData = tempData.templatePropertyValueJson;
                style = this.setDefault(templateData.style, null);
                paramKey = this.setDefault(templateData.paramKey);
                placeholder = this.setDefault(templateData.placeholder);
                controlledElement = this.setDefault(templateData.controlledElement);
                effectElement = this.setDefault(templateData.effectElement);
                url = this.setDefault(templateData.url);

                // 行业权限
                let privilegeData = getPrivilegeData(["first_type_limit_app"])
                first_type_limit_app = _.get(privilegeData, 'first_type_limit_app.data', null)
                first_type_limit_app = first_type_limit_app ? first_type_limit_app.join(',') : first_type_limit_app
                let privilegeData1 = getPrivilegeData(["first_type_no_limit_app"])
                first_type_no_limit_app = _.get(privilegeData1, 'first_type_no_limit_app.data', null)
                first_type_no_limit_app = first_type_no_limit_app ? first_type_no_limit_app.join(',') : first_type_no_limit_app
                let privilegeData2 = getPrivilegeData(["second_type_limit_app"])
                second_type_limit_app = _.get(privilegeData2, 'second_type_limit_app.data', null)
                second_type_limit_app = second_type_limit_app ? second_type_limit_app.join(',') : second_type_limit_app
                let privilegeData3 = getPrivilegeData(["second_type_no_limit_app"])
                second_type_no_limit_app = _.get(privilegeData3, 'second_type_no_limit_app.data', null)
                second_type_no_limit_app = second_type_no_limit_app ? second_type_no_limit_app.join(',') : second_type_no_limit_app

            } catch (error) {
                console.log(error);
            }
        }

        this.setState({
            instantiationId, componentState, templateData, placeholder, style, ifClear, paramKey, controlledElement, effectElement, url,
            first_type_limit_app, first_type_no_limit_app, second_type_limit_app, second_type_no_limit_app, componentState: "DidMount"
        })
    }

    exportLoadDataFun = () => {
        // 每次被影响，清空搜索内容
        this.setState({ ifClear: true, options: null })
    }

    exportParamFun = () => {
        const { options, selectCode, paramKey } = this.state
        // console.log('optionsoptionsoptions', options)
        if (!options || !options.length) return {}
        const option = options.find(item => item.code == selectCode)
        if (!option) return {}
        const { selected_type_id_arr } = option
        const first_type_id = selected_type_id_arr.find(item => item.type_level === 1)
        const second_type_id = selected_type_id_arr.find(item => item.type_level === 2)
        const third_type_id = selected_type_id_arr.find(item => item.type_level === 3)
        if (first_type_id) option.first_type_id = first_type_id.type_id
        if (second_type_id) option.second_type_id = second_type_id.type_id
        if (third_type_id) option.third_type_id = third_type_id.type_id
        return {
            ...option,
            [paramKey]: option.code
        }
    }

    searchCallBack = async (search_key) => {
        // 从 controlledElement 取参数，用 val 请求搜索列表，回显给 common 组件
        const { controlledElement, url, instantiationId, first_type_limit_app, first_type_no_limit_app, second_type_limit_app, second_type_no_limit_app } = this.state
        if (!url) return null
        const searchParam = { search_key, first_type_limit_app, first_type_no_limit_app, second_type_limit_app, second_type_no_limit_app }
        console.log('searchParam', searchParam)
        const { data } = await Api.getOptions(searchParam, url)
        const options = [] //cloneDeep(data)
        if (Array.isArray(data)) {
            const noCode = data.find(item => !(item.code && item.name))
            if (noCode) {
                //格式化无code或name的选项
                data.map(item => {
                    options.push({
                        ...item,
                        code: item.type_id,
                        name: item.type_name,
                        // displayName: i18n.format(item.type_name)
                        displayName: item.full_type_name?.split('>').map(item => i18n.format(item)).join('>')
                    })
                })
            }
        }
        this.setState({ options })
        // return options
    }

    selectCallBack = (val) => {
        // 触发 effectElement
        const { effectElement } = this.state
        this.setState({ selectCode: val }, () => {
            this.triggerLoadData(effectElement);
        })
    }

    resetClear = () => {
        const { effectElement } = this.state
        this.setState({
            ifClear: false,
            selectCode: null
        }, () => {
            this.triggerLoadData(effectElement);
        })
    }

    render() {
        const { componentState, instantiationId, placeholder, style, options, ifClear } = this.state;
        if (componentState == "WillMount") return null;
        return (
            <EditTemplate instantiationId={instantiationId}>
                <Search
                    resetClear={this.resetClear}
                    placeholder={placeholder}
                    style={style}
                    searchCallBack={this.searchCallBack}
                    selectCallBack={this.selectCallBack}
                    ifClear={ifClear}
                    options={options}
                />
            </EditTemplate>
        );
    }
}

export default PmSearch;