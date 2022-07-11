'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Common from '../common/index';
import Config from '../config/index';
import { GetQueryString, getUrlPath } from '@util';
import { Form, Input, Button } from 'antd';


const backClass = {
    margin:"20px",
    background:"#fff",//"#F5F7FA",
    border:"1px solid #8C8C8C",
    padding:"10px"
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            defaultSelectKey: "新一线城市",
            options: [{name:"全部",code:"全部"},{name:"一线城市",code:"一线城市"},{name:"新一线城市",code:"新一线城市"}],
            id: null
        }
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {

    }
 
    componentWillUnmount() {

    }

    initData = () =>{
        let id = GetQueryString("id");
        this.setState({id, isReady:true});
    }

    onFinish = (values) =>{
        let id = values.id;
        let path = getUrlPath();
        location.href = `${path}?id=${id}`;
    }

    onFinishFailed = () =>{
        console.log('Failed:', errorInfo);
    }

    getSelectValue = (value) => {
        console.log("选中", value)
    }

    render() {
        const { options, defaultSelectKey, id } = this.state;
        return (
            <div>
                <div style={backClass}>
                    <p>Select公用组件调用</p>
                    <Common id="测试" options={options} ifDefaultSelect={true} defaultSelectKey={defaultSelectKey}  title={"测试Select"} getSelectValue={this.getSelectValue}/>
                </div>
                <div style={backClass}>
                    <p>Select配置化组件调用</p>
                    {/* <Config id="910" style={{width:'300px'}}/> */}
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
                    {id ? <Config id="4335" /> : null}
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;