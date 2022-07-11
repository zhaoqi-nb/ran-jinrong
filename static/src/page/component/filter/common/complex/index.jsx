'use strict';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../../util/hash';
import { setDefault } from '@util';
import { Cascader, Checkbox, Col, Row, Dropdown } from 'antd'
import Button, { IconTextButton } from '@/components/Button'
import RsIcon from '../../../rsIcon'
import { i18n } from '@/components/FastIntl';
import './index.less';
import Tooltip from '@toolTip'
import _ from 'lodash'

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
            this.setState(this.getInitialState(), () => this.initData(nextProps))
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
            visible: false,
            firstSelectId: null,
            options: [],
            selectedList: [],
            selectListLength: 0,
            firstSelectId: null,
            lastSelectValue: [], //上一次确认的值
            defautFirstValue: _.cloneDeep(this.props.defaultval)
        }
    }
    //初始化数据
    initData = (nextProps) => {
        let { selectListLength, firstSelectId, selectedList, lastSelectValue } = this.state
        const { plainOptions, defaultval } = nextProps || this.props
        if (!plainOptions || !plainOptions.length) return
        //默认选中第一个一级菜单
        firstSelectId = plainOptions[0].zb_name
        plainOptions.forEach(item => {
            item.children.forEach(v => selectListLength++)
        })
        //默认选中一个筛选项
        selectedList = _.cloneDeep(defaultval)
        lastSelectValue = _.cloneDeep(defaultval)
        let arr = this.setOption(selectedList, 'value'),
            brr = this.setOption(selectedList, 'label');
        this.setState({ isReady: true, selectListLength, firstSelectId, selectedList, options: plainOptions, lastSelectValue }, () => this.props.handleChange(arr, brr))
    }

    //打开modal
    openContbox = () => {
        this.setState({ visible: true })
    }
    onChange = (e) => {

    }

    clickFirst = (e) => {
        this.setState({ firstSelectId: e }, () => {
            // console.log(this.state.defautFirstValue,'切换tab',this.props.defaultval);
        })
    }

    //左侧指标
    renderLeft = () => {
        const { options, firstSelectId } = this.state
        return (<div className='left'>
            <ul>
                {options.map(item => <li className={firstSelectId == item.zb_name ? "selected" : ""} onClick={() => this.clickFirst(item.zb_name)}><span className='label'>{item.zb_name}</span><RsIcon type="icon-jiantouyou" style={{ color: '#8c8c8c' }} /></li>)}
            </ul>
        </div>)
    }

    // 中间
    renderCenter = () => {
        let { firstSelectId, options, selectedList } = this.state
        let plainOptions = options.filter(item => item.zb_name == firstSelectId)[0].children
        let arr = this.setOption(selectedList, 'value')
        return (<div className='center'>
            <Checkbox.Group options={plainOptions} value={arr} onChange={(e) => this.selectIndicators(e, firstSelectId)} />
        </div>)
    }

    selectIndicators = (e, flag) => {
        let { selectedList, options } = this.state
        for (let i in options) {
            if (options[i].zb_name == flag) flag = i
        }
        selectedList[flag] = e
        this.setState({ selectedList }, () => {
            console.log(this.state.defautFirstValue, '选择指标', this.props.defaultval);
        })
    }
    //恢复默认
    changeDefault = () => {
        this.setState({ selectedList: _.cloneDeep(this.state.defautFirstValue) }, () => {
            console.log(this.state.defautFirstValue, '恢复默认', this.props.defaultval);
        })
    }
    //清空已选择
    clearSelected = () => {
        this.setState({ selectedList: [] }, () => {
            console.log(this.state.defautFirstValue, '清空选择', this.props.defaultval);
        })
    }
    //删除已选择
    delSelected = (flag) => {
        let { selectedList } = this.state
        selectedList = selectedList.map(item => {
            if (item) {
                item = item.filter(v => {
                    if (v != flag) return v
                })
                return item
            }
        })
        this.setState({ selectedList }, () => {
            console.log(this.state.defautFirstValue, '删除已选', this.props.defaultval);
        })
    }
    //关闭弹层
    closeModal = () => {
        const { lastSelectValue } = this.state
        this.setState({ visible: false, selectedList: lastSelectValue })
    }

    //掉接口
    onOK = () => {
        let { selectedList, lastSelectValue } = this.state
        lastSelectValue = _.cloneDeep(selectedList)
        let arr = this.setOption(selectedList, 'value')
        this.setState({ visible: false, lastSelectValue }, () => this.props.handleChange(arr))
    }

    setOption = (selectedList, key) => {
        let arr = []
        const { options } = this.state
        let brr = []
        options.forEach(item => {
            item.children.map(v => {
                brr.push(v)
            })
        })

        for (let i in selectedList) {
            if (selectedList[i]) {
                selectedList[i].forEach(item => {
                    if (item) {
                        if (key == 'label') {
                            item = brr.filter(v => item == v.value)[0]
                        }
                        arr.push(item)
                    }
                })
            }
        }

        return arr
    }

    // 已选择
    renderRight = () => {
        const { selectedList, selectListLength } = this.state
        let arr = this.setOption(selectedList, 'label')
        return (<div className='right'>
            <Row style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                <Col span={20} className='top'>{i18n.format("已选")}<span style={{ color: '#0678FF' }}>{` ${arr.length}/${selectListLength}`}</span></Col>
                <Col span={4} style={{ textAlign: 'right', color: '#8C8C8C', cursor: 'pointer' }} onClick={this.clearSelected}>{i18n.format("清空")}</Col>
            </Row>
            <ul className='selected'>

                {
                    arr.map(item => {
                        return <li><span className='label' title={item.label
                        }>{item.label}</span><RsIcon type="icon-qingchu" style={{ color: '#8C8C8C', cursor: 'pointer', fontSize: 16 }} onClick={() => this.delSelected(item.value)} /></li>
                    })
                }


            </ul>
            <Row style={{ paddingRight: 12 }} >
                <Col span={10} style={{ color: '#595959', cursor: 'pointer' }} >
                    <Button size="small" type="link" onClick={this.changeDefault} style={{ color: "#8C8C8C" }}>{i18n.format("恢复默认")}</Button>
                </Col>
                <Col span={14} style={{ textAlign: 'right' }}>
                    <Button size="small" type="link" onClick={this.closeModal} style={{ color: "#595959" }}>{i18n.format("取消")}</Button>
                    <Button size="small" type="primary" disabled={!arr.length} onClick={this.onOK}>
                        {i18n.format("确认")}
                    </Button>
                    {/* <span className='cancel-btn' onClick={this.closeModal}>取消</span>
                    <span className={arr.length ? 'sure-btn' : 'disabled-sure'} onClick={this.onOK}>确认</span> */}
                </Col>
            </Row>
        </div>)
    }

    onVisibleChange = (visible) => {
        if (!visible) {
            this.closeModal();
        }
        this.setState({ visible: visible });
    }

    render() {
        const { isReady, visible, selectListLength, selectedList } = this.state;
        const { explain, isShowiGuid } = this.props
        if (!isReady) return null;
        let arr = this.setOption(selectedList, 'value');
        const searchOverlay = <div className='ui-contbox'>
            <div className='content' >
                {this.renderLeft()}
                {this.renderCenter()}
                {this.renderRight()}
            </div>

        </div>
        return (
            <div ref={this.ref} className='filter'>
                <Dropdown
                    trigger={['click']}
                    getPopupContainer={() => isShowiGuid ? document.body : this.ref.current}
                    visible={visible}
                    onVisibleChange={this.onVisibleChange}
                    overlay={searchOverlay}
                    overlayStyle={isShowiGuid ? { pointerEvents: 'none' } : {}}
                >
                    <div className='btnbox'>
                        <IconTextButton
                            icon={<RsIcon type="icon-shaixuan" />}
                            num={`${arr.length}/${selectListLength}`}
                        >
                            {i18n.format("指标筛选")}
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
                            <span style={{ marginLeft: '4px' }}>指标筛选<span style={{ color: '#0678FF' }}>{` ${arr.length}/${selectListLength}`}</span></span>
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