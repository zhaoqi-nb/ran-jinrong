'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import { Select, message } from 'antd';
import RsIcon from '@/page/component/rsIcon/index';
import { GetQueryString } from '@util';
import { getMaxItemWidth } from './util';
import Tooltip from '@toolTip'
// import { i18n } from '@/components/FastIntl';

import './index.less';
import i18n from '@/plugin/i18n';
// import { _ } from 'core-js';

const { Option } = Select;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.divRef = React.createRef();
    }

    componentDidMount() {
        this.initData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options || nextProps.defaultSelectKey !== this.props.defaultSelectKey) {
            const { options, ifSearchAsync, controlledElement } = nextProps
            if (!controlledElement || !controlledElement.length || controlledElement.length < 1) {
                // 没有受控组件，也不是后端搜索的，用通用方法
                this.initData(nextProps)
            } else if (!ifSearchAsync) {
                // 受其他组件影响后，重新设置默认选中值
                const newDefaultKey = options && options.length ? options[0].code : "";
                this.initData({ ...nextProps, defaultSelectKey: newDefaultKey });
            } else {
                this.initData(nextProps)
            }
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
            className: "",
            select_style: {},
            title: null,
            options: [],
            value: "",
            placeholder: "支持搜索输入",
            //选中那个option
            defaultSelectKey: "",
            //默认值
            //下拉更多提示文字
            moreText: "",
            //下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动
            dropdownMatchSelectWidth: null,
            //有无数据是否展示  
            ifEmptyHide: null,
            //是否默认选中
            ifDefaultSelect: null,
            //是否禁用
            disabled: null,
            // 是否多选
            mode: null,
            // 限制最多显示条数
            maxTagCount: null,
            // 限制最多可选条数
            maxSelectCount: null,
            // 是否限制显示条数
            ifLimitMaxTagCount: null,
            ifHidden: null,
            isOpen: false,
            explain: "",
            showArrow: true,
            showSearch: true,

        }
    }

    getDefaultSelectValue = (props) => {
        const { locationSearchKey, ifDefaultSelect, defaultSelectKey, options, ifSearchAsync } = props

        const locationSearchValue = i18n.format(GetQueryString(locationSearchKey))
        if (locationSearchKey && _.find(options, (t) => t.name === locationSearchValue)) {
            return locationSearchValue
        }

        // 如果配置了默认选中，组件支持两种选中，第一：通过配置项制定数据，第二：获取数据data的第一个值
        if (ifDefaultSelect) {
            // options && options.length && options.length > 1 && 
            if (defaultSelectKey) {
                return defaultSelectKey;
            } else {
                return options && options.length ? options[0].code : "";
            }
        } else {
            // 没有默认选中时，给一个默认值，防止取不到params
            return 'EMPTY'
        }
        return undefined

    }
    //初始化数据
    initData = (_props) => {
        const { ifSearchAsync } = _props
        console.log('_props_props', _props);
        try {
            let id = setDefault(_props.id, "");
            let style = setDefault(_props.style);
            let className = setDefault(_props.className);
            let select_style = setDefault(_props.select_style);
            let title = setDefault(_props.title);
            let options = setDefault(_props.options, "");
            let placeholder = setDefault(_props.placeholder, []);
            let defaultSelectKey = setDefault(_props.defaultSelectKey, "");
            let moreText = setDefault(_props.moreText, "");
            let dropdownMatchSelectWidth = setDefault(_props.dropdownMatchSelectWidth, true);
            let ifEmptyHide = setDefault(_props.ifEmptyHide, false);
            let ifDefaultSelect = setDefault(_props.ifDefaultSelect, true);
            let disabled = setDefault(_props.disabled, false);
            let mode = setDefault(_props.mode);
            let maxTagCount = setDefault(_props.maxTagCount);
            let maxSelectCount = setDefault(_props.maxSelectCount);
            let ifLimitMaxTagCount = setDefault(_props.ifLimitMaxTagCount);
            let locationSearchKey = setDefault(_props.locationSearchKey);
            let value = this.getDefaultSelectValue({ ifDefaultSelect, defaultSelectKey, options, locationSearchKey });
            let ifHidden = setDefault(_props.ifHidden);
            let explain = setDefault(_props.explain);
            let showArrow = setDefault(_props.showArrow, true);
            let showSearch = setDefault(_props.showSearch, true);
            // // 如果配置了默认选中，组件支持两种选中，第一：通过配置项制定数据，第二：获取数据data的第一个值
            // if (ifDefaultSelect) {
            //     if (defaultSelectKey) {
            //         value = defaultSelectKey;
            //     } else {
            //         value = options && options.length ? options[0].code : "";
            //     }
            // }
            // if (!options || !options.length) disabled = true
            // 设置组件状态
            const { isExchangeRate, initSelectValue } = _props
            if (isExchangeRate && initSelectValue && typeof initSelectValue === 'function') {
                value = initSelectValue(value, options)
            }
            this.setState({ id, value, style, className, select_style, title, options, placeholder, defaultSelectKey, moreText, dropdownMatchSelectWidth, ifEmptyHide, ifDefaultSelect, disabled, mode, maxTagCount, maxSelectCount, ifLimitMaxTagCount, ifHidden, explain, showArrow, showSearch, isReady: true }, () => {

                if (!ifSearchAsync) {
                    value = this.props.setSelectValue ? this.props.setSelectValue(value, options) : value
                    // this.props.getSelectValue(value)
                    let _value = _.get(_.find(options, t => t.name === value), 'code', value)
                    this.props.getSelectValue(_value)
                }
            });
        } catch (error) {
            console.log(`tab组件渲染出错：${error}`);
        }
    }

    // 返回下拉选项内容
    getCommonContent = () => {
        let { options } = this.state;
        const { rerenderOption } = this.props

        if (!options || !options.length) return null
        return options.map((item, index) => {
            return <Option key={index} disabled={item.disabled} value={item.code}>
                {rerenderOption ? rerenderOption(item.disabledName || item.name, item.name) : item.disabledName || item.name}
            </Option>
        })
    }

    handleSearch = (val) => {
        const { onSearch, ifSearchAsync } = this.props
        if (ifSearchAsync) {
            onSearch(val)
        }
    }

    handleChange = (value) => {
        if (!value) { value = 'EMPTY' }
        const { getSelectValue, setSelectValue, isExchangeRate } = this.props;
        const { mode, maxTagCount, maxSelectCount, ifLimitMaxTagCount, ifDefaultSelect, options } = this.state;
        if (mode == "multiple") {
            if (ifDefaultSelect && (!value || !value.length)) {
                message.warning(i18n.format('最少选择1条数据'));
                return;
            }
            if (ifLimitMaxTagCount && maxSelectCount && value.length > maxSelectCount) {
                message.warning(`${i18n.format(`最多可选`)}${maxSelectCount}${`条数据`})}`);
                return;
            }
            let newValue = value.join(",");
            this.setState({ value }, () => { console.log('value=>', value); if (getSelectValue) getSelectValue(newValue) })

        } else {
            if (isExchangeRate && setSelectValue && typeof setSelectValue === 'function') {
                value = setSelectValue ? setSelectValue(value, options) : value
            }
            this.setState({ value }, () => {
                if (getSelectValue) {
                    value = setSelectValue ? setSelectValue(value, options) : value
                    getSelectValue(value);
                }
            })
        }
    }

    onDropdownVisibleChange = (open) => {
        console.log('faffsafasffassfa', open)
        this.setState({
            open,
        })
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    getMultipleTitle = (value) => {
        const { isMultipleI18n } = this.props;
        const {options} = this.state;
        if (!isMultipleI18n) {
            return Array.isArray(value) && value.join(',')
        }

        
        return Array.isArray(value) && value.map(item => {
            const currOption = options.find(f => f.code == item);
            return currOption ? i18n.format(currOption.name) : i18n.format(item);
        }).join(',');
    }

    getSuffixIcon() {
        const { suffixIcon, suffixIconRender, type, open } = this.props;
        const { disabled } = this.state;
        if (suffixIcon) {
            if (suffixIconRender && typeof (suffixIconRender) === 'function') {
                return suffixIconRender(open)
            }
            return suffixIcon
        }


        const iconType = type === 'search'
            ? 'icon-gb-sousuo'
            : (true && open) ? 'icon-gb-sousuo' : "icon-tianchongxiajiantou"
        const iconStyle = type === 'search' ? {
            fontSize: 16
        } : {
            marginTop: 2
        }

        return (
            <RsIcon
                onClick={this.handleClick}
                type={iconType}
                style={{ color: !disabled ? '#8C8C8C' : '#BFBFBF', ...iconStyle }}
            />
        )

    }

    render() {
        const { id, isReady, title, options, value, mode, maxTagCount, style, className, select_style, placeholder, defaultSelectKey, disabled, dropdownMatchSelectWidth, ifDefaultSelect, ifHidden, explain, showArrow, showSearch, ifSearchAsync } = this.state;

        const { excludeDown } = this.props
        if (!isReady) return null;

        // const maxItemWidth

        console.log('optionsoptions', options);

        const selectWidth = getMaxItemWidth(options)

        //minWidth: '192px',
        const temp_style = Object.assign({}, { position: "relative", display: "inline-block", marginLeft: title ? "8px" : '4px', width: selectWidth, ...select_style });
        const _style = Object.assign({}, { ...style });

        const suffixIcon = this.getSuffixIcon()

        return (
            <div id={`commonSelect-${id}`} className={classnames("select-wrapper excel-select ", `${excludeDown ? 'excel-exclude-down-select' : ''}`, `${className ? className : ""}`)} style={{ ..._style, display: ifHidden ? "none" : "" }} >
                {title ? <div className="select-title" style={{ display: "inline-block" }}>
                    {/* 添加说明文字 */}
                    {/* {this.addExplain(explain)} */}
                    {title}
                    {explain ?
                        <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                            <RsIcon type="icon-shuoming" className="titleIcon" />
                        </Tooltip> : null}
                </div> : null}
                <div ref={this.divRef} title={(mode === 'multiple' && Array.isArray(value)) ? this.getMultipleTitle(value) : ''} pTitle={i18n.format(placeholder)} style={temp_style} className="select-content excel-select-content" t-id={id}>
                    <Select
                        className='rs-select'
                        showSearch={showSearch}
                        key={defaultSelectKey}
                        bordered={this.props.bordered}
                        // defaultOpen={true}
                        // autoFocus={true}
                        value={(value && value !== 'EMPTY') ? value : undefined}
                        disabled={disabled}
                        getPopupContainer={() => this.divRef.current}
                        mode={mode}
                        dropdownClassName={mode === "multiple" ? "multiple-dropdown" : ""}
                        suffixIcon={suffixIcon}
                        open={this.state.open}
                        showArrow={showArrow}
                        onDropdownVisibleChange={this.onDropdownVisibleChange}
                        maxTagCount={maxTagCount}
                        virtual={false}
                        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                        optionFilterProp="children"
                        notFoundContent={i18n.format("暂无数据")}
                        placeholder={i18n.format(placeholder)}
                        allowClear={!ifDefaultSelect}
                        clearIcon={
                            <RsIcon type="icon-qingchu1" style={{ fontSize: 16, color: '8c8c8c' }} />
                        }
                        onClear={!ifDefaultSelect ? () => {
                            this.handleSearch()
                        } : () => { }}
                        style={{ width: '100%' }} //
                        // onFocus={onFocus}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}>
                        {this.getCommonContent()}
                    </Select>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    defaultSelectKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    moreText: PropTypes.string,
    dropdownMatchSelectWidth: PropTypes.bool,
    ifEmptyHide: PropTypes.bool,
    ifDefaultSelect: PropTypes.bool,
    disabled: PropTypes.bool,

    getSelectValue: PropTypes.func
};

Index.defaultProps = {
    id: `title_${gethashcode()}`,
    getSelectValue: value => value
}

export default Index;