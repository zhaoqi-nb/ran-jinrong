'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../../util/hash';
import RsIcon from '../../../rsIcon'
import { Checkbox, Row, Col, Dropdown } from 'antd'
import Button, { IconTextButton } from '@/components/Button'
import classnames from 'classnames';
import { i18n } from '@/components/FastIntl';
import Tooltip from '@toolTip'
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.initData();
        const { onObserver } = this.props;
        onObserver && onObserver({ onVisibleChange: this.onVisibleChange })
    }

    componentWillReceiveProps(nextProps) {
        const { plainOptions } = this.props
        if (JSON.stringify(plainOptions) != JSON.stringify(nextProps.plainOptions)) {
            this.initData(nextProps)
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
            text: "",
            style: {},
            plainOptions: [],
            defaultval: [],
            selectValue: [],
            lastSelectValue: [],
            ifAllSelect: false,
            visible: false
        }
    }
    //初始化数据
    initData = (nextProps) => {
        let { plainOptions, defaultval, selectValue, lastSelectValue, ifAllSelect, downloadChange } = nextProps || this.props
        selectValue = defaultval
        lastSelectValue = defaultval
        if (selectValue.length == plainOptions.length) ifAllSelect = true
        this.setState({ isReady: true, plainOptions, defaultval, selectValue, lastSelectValue, ifAllSelect }, () => this.props.handleChange(selectValue))
        downloadChange && downloadChange(defaultval)
    }

    //打开筛选modal
    openContbox = () => {

        this.setState({ visible: true })
    }
    //关闭modal
    onCancel = () => {
        let { defaultval, ifAllSelect, plainOptions, lastSelectValue } = this.state
        if (defaultval.length != plainOptions.length) ifAllSelect = false
        else ifAllSelect = true
        this.setState({ visible: false, selectValue: lastSelectValue, ifAllSelect })
    }

    //多选
    changeCheckbox = (e, ifAll) => {
        const {downloadChange} = this.props;
        let { plainOptions, ifAllSelect, selectValue } = this.state
        if (ifAll) {
            //点击全选
            let flag = e.target.checked
            if (flag) selectValue = plainOptions.map(item => item.value)
            else selectValue = []
            this.setState({ ifAllSelect: flag, selectValue })
        } else {
            //单个选择
            if (e.length != plainOptions.length) ifAllSelect = false
            else ifAllSelect = true
            this.setState({ selectValue: e, ifAllSelect })
            downloadChange && downloadChange(e);
        }
    }
    //恢复默认选中
    setDefaultValue = () => {
        let { defaultval, ifAllSelect, plainOptions } = this.state
        if (defaultval.length != plainOptions.length) ifAllSelect = false
        else ifAllSelect = true
        this.setState({ selectValue: defaultval, ifAllSelect })
    }
    //掉接口
    onOK = () => {
        const { selectValue } = this.state
        this.setState({ visible: false, lastSelectValue: selectValue }, () => this.props.handleChange(selectValue))
    }

    onVisibleChange = (visible) => {
        if (!visible) {
            this.onCancel();
        }
        this.setState({ visible: visible });
    }

    render() {
        const { isReady, plainOptions, defaultval, selectValue, ifAllSelect, visible } = this.state;
        const { style, style_btn, title, className, icon, explain, isShowiGuid, downloadDisplay } = this.props
        if (!isReady) return null;
        let sureFLag = selectValue.length ? true : false;
        console.log('fasfafsafsafsafs', this.props);
        const localeZh = i18n.getLocalLanguage() === 'zh_CN';

        const searchOverlay = <div className='ui-contbox-simple'>
            <div className="filter-content">
                <div className='filter-all'>
                    <Checkbox onChange={(e) => this.changeCheckbox(e, true)} checked={ifAllSelect}>{i18n.format("全选")}</Checkbox>
                </div>
                <div className='filter-center'>
                    <Checkbox.Group options={plainOptions} defaultValue={defaultval} value={selectValue} onChange={(e) => this.changeCheckbox(e)} />
                </div>
                <Row className='filter-footer'>
                    <Col span={localeZh ? 12 : 10}>
                        {/* <span className='cancel-btn' onClick={this.setDefaultValue}>恢复默认</span> */}
                        <Button size="small" type="link" onClick={this.setDefaultValue} style={{ color: "#8C8C8C", paddingLeft: 0 }}>{i18n.format("恢复默认")}</Button>
                    </Col>
                    <Col span={localeZh ? 6 : 8}>
                        {/* <span className='default-btn' onClick={this.onCancel}>取消</span> */}
                        <Button size="small" type="link" onClick={this.onCancel} style={{ color: "#595959" }}>{i18n.format("取消")}</Button>
                    </Col>
                    <Col span={6}>
                        {/* {
                            sureFLag ? <span className='sure-btn' onClick={this.onOK}>确定</span> : <span className='sure-btn-disabled'>确定</span>
                        } */}
                        <Button size="small" type="primary" disabled={!sureFLag} onClick={this.onOK}>{i18n.format("确定")}</Button>
                    </Col>
                </Row>
            </div>
        </div>

        if (downloadDisplay) {
            return <div className="filter-download-container">
                <Checkbox.Group options={plainOptions} defaultValue={defaultval} value={selectValue} onChange={(e) => this.changeCheckbox(e)} />
            </div>

        }
        return (
            <div ref={this.ref} className={classnames('filter', `${className ? className : ""}`)} style={{ ...style_btn }}>

                <Dropdown
                    trigger={['click']}
                    visible={visible}
                    getPopupContainer={() => isShowiGuid ? document.body : this.ref.current}
                    onVisibleChange={this.onVisibleChange}
                    overlay={searchOverlay}
                    overlayStyle={isShowiGuid ? { pointerEvents: 'none' } : {}}
                >
                    <div className='btnbox'>
                        <IconTextButton
                            icon={<RsIcon type={icon || "icon-shaixuan"} />}
                            num={`${selectValue.length}/${plainOptions.length}  `}
                        >
                            {i18n.format(title)}
                        </IconTextButton>
                        {
                            explain
                                ? <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                                    <RsIcon type="icon-shuoming" className="titleIcon" />
                                </Tooltip>
                                : null
                        }
                        {/* <div className='filter-btn'>
                            <RsIcon type="icon-shaixuan" />
                            <span style={{ marginLeft: '4px' }}>{title}</span>
                            <span className='filterNum' style={{ marginLeft: '4px' }}>{selectValue.length}/{plainOptions.length}</span>
                        </div> */}
                    </div>
                </Dropdown>


            </div>
        );
    }
}

Index.propTypes = {
    id: PropTypes.string,
};

Index.defaultProps = {
    id: `title_${gethashcode()}`,
}

export default Index;