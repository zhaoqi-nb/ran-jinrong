'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Common from '../common/index';
import Config from '../config/index';
import { GetQueryString, getUrlPath } from '@util';
import { Form, Input, Button } from 'antd';
import ControlledElement from '../../controlledElement/config/index';

const backClass = {
    margin: "20px",
    background: "#F5F7FA",
    border: "1px solid #8C8C8C",
    padding: "10px"
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            id: null
        }
    }
    initData = () => {
        let id = GetQueryString("id");
        this.setState({ id, isReady: true });
    }
    onFinish = (values) => {
        let id = values.id;
        let path = getUrlPath();
        location.href = `${path}?id=${id}`;
    }
    onFinishFailed = () => {
        console.log('Failed:', errorInfo);
    }
    render() {
        const { isReady, id } = this.state;
        if (!isReady) return null;
        return (
            <div>
                <div style={backClass}>
                    <p>公用组件调用</p>
                    {/* <Common id="test" type="double"/> */}
                </div>
                <div style={backClass}>
                    <p>配置化组件调用</p>
                    <div>
                        <Form
                            name="basic"
                            layout="inline"
                            initialValues={{ id }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="输入组件ID"
                                name="id"
                                rules={[{ required: true, message: '组件id不能为空!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                                <Button type="primary" htmlType="submit" size="small">
                                    更新
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    {id ? <Config id={id} /> : null}
                    <ControlledElement id="6753" />
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;