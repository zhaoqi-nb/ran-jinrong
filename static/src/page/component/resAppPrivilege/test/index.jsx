import React, { Component } from 'react';
import ResAppPrivilege from '../config/index'
import { Form, Input, Button } from 'antd';
import { GetQueryString, getUrlPath } from '@util';
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
            //instantiationId
            id: null,
            resId: null
        }
    }
    initData = () => {
        let id = GetQueryString("id");
        let resId = GetQueryString("resId");
        this.setState({ id, resId, isReady: true });
    }
    onFinish = (values) => {
        let id = values.id;
        let resId = values.resId;
        let path = getUrlPath();
        location.href = `${path}?id=${id}&resId=${resId}`;
    }
    onFinishFailed = () => {
        console.log('Failed:', errorInfo);
    }
    render() {
        const { isReady, id, resId } = this.state;
        if (!isReady) return null;
        return (
            <div style={backClass}>
                <p>配置化组件调用</p>
                <div>
                    <Form
                        name="basic"
                        layout="inline"
                        initialValues={{ id, resId }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="菜单资源Id"
                            name="resId"
                            rules={[{ required: true, message: '菜单资源Id不能为空!' }]}
                        >
                            <Input />
                        </Form.Item>
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
                {id ? <ResAppPrivilege id={id} /> : null}
                <ControlledElement id="6747" />
            </div>
        );
    }
}

export default Index;