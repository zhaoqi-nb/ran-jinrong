'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './index.less';
import RsIcon from '../../../component/rsIcon/index';
import { getSearchCompanyData, getSearchIndustryData } from '../searchUtil';
import i18n from '@/plugin/i18n'
import Badge from '../../../../components/Badge';
import Highlighter from "react-highlight-words";

const { Option } = Select;
class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.cacheData = React.createRef();
        this.cacheEmptyData = React.createRef();
        this.searchValue = React.createRef();
    }

    async componentDidMount() {
        const companyData = await getSearchCompanyData();
        const industryData = await getSearchIndustryData();
        console.log('my=>companyData=>', companyData)
        this.cacheData.current = [...industryData, ...companyData];
        this.cacheEmptyData.current = this.cacheData.current.filter(item => !item.searchValue);
        this.setState({
            optionList: this.cacheEmptyData.current
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }

    getInitialState = () => {
        return {
            isReady: false,
            placeholder: `${i18n.format('行业')}、${i18n.format('公司')}、${i18n.format('平台')}、${i18n.format('品牌')}`,
            optionList: [],
            searchText: "",

        }
    }

    renderOption = (item, index) => {
        if (!item) return null;

        let href = "",
            text = "",
            name = item.menuName,
            code = item.code,
            menuType = item.menuType,
            type = item.type,
            userGroupId = item.userGroupId,
            versionName = item.versionName;

        if (type == "industry") {
            text = `${"行业维度"}：${name}（${versionName}）`;
            href = `/page/${userGroupId}/${item.resId}/${item.path}?first_type_name=${name}&first_type_id=${code}`;
        } else if (type == "brand") {
            text = `${"品牌维度"}：${name}（${versionName}）`;
            href = `/page/${userGroupId}/${item.resId}/${item.path}?first_type_name=${name}&first_type_id=${code}`;
        } else if (type == "company") {
            text = `${"公司"}：${name}（${versionName}）`;
            if (menuType == "config") href = `/page/config/${userGroupId}/${item.resId}/${item.path}`;
            else href = `/page/${userGroupId}/${item.resId}/${item.path}`;
        }

        return (
            <Option key={index} text={name}>
                <a href={href} target="_blank" style={{ display: "block" }}>{text}</a>
            </Option>
        )
    }

    goTo = (e, item) => {
        e.stopPropagation();
        if (item.disabled) {
            return;
        };

        window.open(item.href)
    }

    onSelect = (item, option) => {
        if (item.disabled) {
            return;
        };
        window.open(option.link)
    }

    onSearch = (searchValue) => {
        this.searchValue.current = searchValue;
        if (!searchValue) {
            this.setState({ optionList: this.cacheEmptyData.current })
            return;
        }
        let result = []
        for (const item of this.cacheData.current) {
            if (item.searchValue) {
                if (item.searchValue.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
                    if (item.searchItem) { // 行业处理
                        item.globalDisplayNameSearch = item.globalDisplayName + `${item.searchPrefix}` + item.searchItem.join('-')

                    } else {
                        item.globalDisplayNameSearch = item.globalDisplayName + `(${item.searchPrefix}:${item.searchValue})`
                    }
                    result.push(item);
                }
                continue;
            }
            if (item.globalDisplayName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
                result.push(item);
            }
        }
        console.log('result=>', result);
        this.setState({ optionList: result })
    }

    render() {
        const { placeholder, optionList, searchText } = this.state;
        //const _style = merge({},{width:400,textAlign: "left"},style);
        const locale = i18n.getLocalLanguage();
        const isZh = locale === 'zh_CN';
        return (
            <div className="search-wrapper" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', width: '20px', height: '20px', zIndex: '100', marginLeft: '12px', marginTop: '6px' }}>
                    <RsIcon type="icon-gb-sousuo" style={{ color: '#007AFF', fontSize: '20px' }} />
                </div>
                <Select
                    className='global-search'
                    showSearch
                    value={[]}
                    placeholder={placeholder}
                    style={{ width: '100%' }} //400
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    dropdownClassName={isZh ? '' : 'global-search-dropdown-wrapper'}
                    dropdownStyle={{ width: '650px !important' }}
                    onSearch={_.debounce(this.onSearch, 500)}
                    prefix={<RsIcon type="icon-gb-sousuo" style={{ color: "#999", fontSize: 20 }} />}
                >
                    {
                        optionList.map(item => {
                            let valueStr = item.globalDisplayNameSearch || item.globalDisplayName
                            return <Option value={valueStr} link={item.href} key={valueStr} disabled={item.disabled}>
                                <div style={{ display: 'flex', alignItems: 'center', cursor: `${item.disabled ? 'not-allowed' : 'pointer'}` }} onClick={(e) => this.goTo(e, item)}>
                                    <span style={{ flex: 1 }}>
                                        <Highlighter
                                            highlightClassName="global-search-highlight"
                                            searchWords={[this.searchValue.current]}
                                            autoEscape={true}
                                            textToHighlight={valueStr}
                                        />
                                        </span>
                                    {item.disabled && <Badge style={{}} name={item?.accessState?.name} />}
                                </div>

                                {/* <a target="_blank" style={{ display: "block" }}>{}</a> */}
                            </Option>
                        })
                    }
                </Select>
            </div>
        );
    }
}

SearchInput.propTypes = {

};

export default SearchInput;