'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { Modal, Input, Button, Tabs, message } from 'antd';
import RsIcon from '../../../rsIcon/index';
import Explain from '../../../explain/index';
import { MenuItem } from "react-contextmenu-ranshu";
import AceEdit from '@/components/AceEdit'
import Api from '../store/api';
import {FormattedMessage} from '@/components/FastIntl'


const { TextArea } = Input;
const { TabPane } = Tabs;

class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    componentDidMount() {
        this.initData();
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
            visible: false,
            tabs: ["编辑属性", "属性说明"],
            current: 0
        }
    }
    initData = async () => {
        const { userInfo, templateId } = this.props;
        let isReady = true;
        this.setState({ isReady })
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    renderTabContent = (data) => {
        return data.map((item, index) => {
            let content = null;
            if (!index) content = <EditText {...this.props} onChange={this.handleCancel} />
            let disabled = index == 2 ? true : false;
            return <TabPane tab={item} key={index} disabled={disabled}>
                {content}
            </TabPane>
        })
    }
    handleTabChange = (current) => {
        this.setState({ current })
    }
    handleOpen = () => {
        this.setState({ visible: true })
    }
    render() {
        const { isReady, visible, current, tabs } = this.state;
        if (!isReady) return null;
        const { instantiationId, templateId } = this.props;
        return (
            <div className="tool-item">
                <MenuItem onClick={this.handleOpen}>
                    <RsIcon type="icon-shezhi" />
                        <span style={{ marginLeft: "10px" }}>
                            <FormattedMessage id="修改组件属性" />
                        </span>
                </MenuItem>
                <Modal
                    title={<FormattedMessage id="编辑模版属性" />}
                    visible={visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    destroyOnClose={true}
                    width="600px"
                    style={{ padding: "10px 20px" }}
                    footer={false}
                >
                    <p>
                        <span className="f-title">
                            <FormattedMessage id="记录" />ID：
                        </span>{instantiationId}
                        <span className="f-title" style={{ marginLeft: "50px" }}>
                            <FormattedMessage id="模版" />ID：
                        </span>{templateId}
                    </p>
                    <Tabs value={current} onChange={this.handleTabChange}>
                        {this.renderTabContent(tabs)}
                    </Tabs>
                </Modal>
            </div>
        );
    }
}


class EditText extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        const { templateData } = this.props;
        
        const getStringify = (v) => _.isString(v) ? v : JSON.stringify(v, null, 2)

        if (templateData) this.setState({ value: getStringify(templateData) })
    }

    // componentWillReceiveProps(nextProps) {
    // }

    componentWillUnmount() {
        this.setState(this.getInitialState());
    }
    getInitialState = () => {
        return {
            value: "",
            loading: false
        }
    }
    handleTextChange = (newValue) => {
        this.setState({ value: newValue })
    }
    updateFrontTemplate = async () => {
        const { instantiationId } = this.props;
        const { value } = this.state;
        if (!value) {
            message.warn("内容不能为空");
            return;
        } else {
            try {
                let text = JSON.parse(value);
            } catch (error) {
                message.error("内容必须是JSON格式！");
                return;
            }
        }
        this.setState({ loading: true })
        let result = await Api.updateFrontTemplate({
            instantiationId,
            templatePropertyValue: value
        })
        if (result.code == 200) {
            message.success("修改成功！即将刷新页面...");
            this.props.onChange();
            setTimeout(() => location.reload(), 700);
        }
        this.setState({ loading: false })
    }
    render() {
        const { value, loading } = this.state;
        // {/* <TextArea style={{ height: 300, resize: "none" }} value={value} onChange={this.handleTextChange} /> */}
        return (
            <div>
                {/* TODO： 临时注释  */}
                {/* <Explain text="请谨慎修改！！！确保数据内容及格式正确!" style={{ color: "red" }} /> */}
                <AceEdit value={value} onChange={this.handleTextChange} />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button 
                        type="primary" 
                        disabled={!value} 
                        loading={loading} 
                        onClick={this.updateFrontTemplate}
                    >提交</Button>
                    <Button 
                        onClick={this.props.onChange} 
                        style={{ marginLeft: "20px" }}
                    >关闭</Button>
                </div>
            </div>
        );
    }
}


EditProperty.propTypes = {
    instantiationId: PropTypes.number.isRequired,
    templateId: PropTypes.number.isRequired,
    templateData: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
};

export default EditProperty;