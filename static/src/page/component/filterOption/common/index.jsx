'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import i18n from '@/plugin/i18n';
import Tooltip from '@toolTip'
import RsIcon from '@rsIcon';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            activeId: this.props.selectId ? this.props.selectId : null,

        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectId != this.props.selectId || nextProps.data != this.props.data) {
            this.setState({
                activeId: nextProps.selectId,
            });
        }
    }

    componentWillUnmount() {

    }

    triggerSelect = (item) => {
        const { disabled, type, data, isMutualExcluion } = this.props;
        if (!item || !item.code || disabled) return;
        let { activeId } = this.state;
        //选全部不用判断是否为多选
        if (item.name == i18n.format('全部') || item.name == i18n.format('全行业') || item.name == i18n.format('不限')) {
            this.setState({ activeId: i18n.format(item.code) });
            this.props.onSelect(item);
            return
        }
        //多选
        if (type == 'multiple') {
            //activeId转成数组方便处理
            const allCode = data.find(v => (v.name == i18n.format('全部') || v.name == i18n.format('全行业') || v.name == i18n.format('不限'))) ? data.find(v => (v.name == i18n.format('全部') || v.name == i18n.format('全行业') || v.name == i18n.format('不限'))).code : ''
            let selectId = activeId.split(',').filter(v => v != allCode)
            //多选-选中和取消选中
            if (selectId.indexOf(item.code) != -1) {
                //当多选时，选中只剩一个时不做取消选中处理
                if (selectId.length == 1) return
                selectId = selectId.filter(v => v != item.code)
            } else {
                selectId.push(item.code)
            }
            //todo:暂时去掉 全部选中&&data里面包括code为全部的
            // if (selectId.length == data.length -1 && data.some(v => v.name == '全部')) {
            //   activeId = data.find(v => v.name == '全部').code
            //   this.setState({ activeId });
            //   this.props.onSelect({
            //     name: '全部',
            //     code: activeId
            //   });
            //   return 
            // }
            // 如果配置了互斥属性 isMutualExcluion: 当除了“多选”外都选中时，直接选中“多选”
            if (isMutualExcluion) {
                const compareStrList = _.chain(data).filter((item) => item.code !== allCode).map('code').value();
                const difference = _.difference(compareStrList, selectId)
                if (!difference.length) {
                    selectId = [allCode]
                }
            }
            activeId = selectId.join(',')

            this.setState({ activeId });
            this.props.onSelect({
                name: '多选',
                code: activeId
            });
        } else {
            activeId = item.code
            this.setState({ activeId });
            this.props.onSelect(item);
        }
    }

    renderLi = (datas) => {
        if (!datas || !datas.length || datas.length == 0) return;
        const { disabled, type, background, noBg } = this.props;
        const _this = this;
        return datas.map((item, index) => {
            let _class;
            // 多选
            if (type == 'multiple') {
                _class = _this.state.activeId.split(',').indexOf(item.code) != -1 ? 'active' : (!item.code ? "disabled" : "")
            } else {
                _class = item.code == _this.state.activeId ? "active" : (!item.code ? "disabled" : "");//判断数据是否和本地默认的是一致的
            }

            if (disabled && _class !== "active") _class = "disabled";
            return (
                <li key={index} className={_class} style={noBg ? { background: "none" } : { background: _class == "active" ? background : "" }} onClick={() => this.triggerSelect(item)}>{item.disabledName || item.name}</li>
            )
        })

    }

    render() {
        const { style, data, title, explain } = this.props;
        if (!data) return null;
        return (
            <div className="custom-filterOption" style={style}>
                {title ?
                    <div className="filter-title">
                        <div className="filter-title-span">
                            {title}
                            {
                                explain ? <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                                    <RsIcon type="icon-shuoming" className="titleIcon" />
                                </Tooltip> : null
                            }
                        </div>
                    </div>
                    : null}
                <ul className="filter-list" >
                    {this.renderLi(data)}
                </ul>
            </div>
        );
    }
}

Index.propTypes = {
    title: PropTypes.string,
    selectId: PropTypes.string,
    data: PropTypes.array,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    onSelect: PropTypes.func
};

export default Index;