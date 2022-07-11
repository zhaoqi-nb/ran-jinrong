'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './api'
import { Modal, InputNumber, Form, Button } from 'antd';

const defaultTemplate = {
    "backendPropertyValue": "",
    "instantiationId": 0,
    "parentInstantiationId": 0,
    "rootInstantiationId": 0,
    "templateId": 0,
    "templatePropertyValue": "",
}

class AddBatchAppend extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = this.props;
        if(visible!=nextProps.visible) this.openModal();
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            visible: false,
            loading: false,
        }
    }
    openModal = () =>{
        this.setState({
            visible:true
        })
    }
    onFinish = async(values) =>{
        this.setState({loading:true})
        let param = {
            param : JSON.stringify(defaultTemplate),
            ...values,
        }
        const res = await Api.addBatchAppend(param)
        if (res.code == 200) {
            this.props.onChange("ok")
        }
        this.setState({loading:false, visible:false})
    }
    handleCancel = () =>{
        this.setState({visible:false});
        this.props.onChange()
    }
    render() {
        const { visible, loading } = this.state;
        return (
            <Modal
                visible={visible}
                title="追加多条记录"
                destroyOnClose
                footer={null}
                >
                <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="rootInstantiationId值"
                            name="rootInstantiationId"
                            rules={[{ required: true, message: '请输入页面ID!' }]}
                        >
                            <InputNumber  style={{width:"300px"}}/>
                        </Form.Item>
                        <Form.Item
                            label="追加几行"
                            name="num"
                            rules={[{ required: true, message: '请输入追加几行!' }]}
                        >
                            <InputNumber  style={{width:"300px"}}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button key="back" onClick={this.handleCancel}>
                                返回
                            </Button>
                            <Button key="submit" type="primary" htmlType="submit" loading={loading} style={{marginLeft:"50px"}}>
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
            </Modal>
        );
    }
}

AddBatchAppend.propTypes = {

};

export default AddBatchAppend;