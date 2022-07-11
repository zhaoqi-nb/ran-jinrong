'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './api'
import { Table, Input, InputNumber, Form, Typography, Select, Button, Menu, Dropdown, Modal, message } from 'antd';
import AddBatchAppend from './addBatchAppend';
import CreateRecord from './createRecord';
import CopyRecord from './copyRecord';
import EditJsonConfig from './EditJsonConfig';
import copy from 'copy-to-clipboard'

const { Option } = Select

const defaultTemplate = {
    "instantiationId": 0,
    "parentInstantiationId": 0,
    "rootInstantiationId": 0,
    "templateId": 0,
    "templatePropertyValue": "",
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    formRef = React.createRef()

    componentDidMount() {
        this.initData()
    }

    getInitialState = () => {
        return {
            data: [],
            editingKey: '',
            editJsonValue: '',
            paramType: 'instantiationId',
            paramValue: '',
            append_visible: false,
            create_visible: false,
            json_visible: false,
            copy_visible: false,
        }
    }

    initData = async () => {
        const { paramType, paramValue } = this.state
        let param = {}
        param[paramType] = paramValue
        const res = await Api.getTemplateList(param)
        if (res.code == 200) {
            this.setState({
                data: res.data,
                editingKey: ''
            })
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.state = this.getInitialState()
    }

    EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? dataIndex === 'templatePropertyValue' ?
                    (
                        <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{
                            validator: (_, value) => {
                                try {
                                    JSON.parse(value);
                                    return Promise.resolve()
                                } catch (e) {
                                    return Promise.reject(new Error(e))
                                }
                            }
                        }]}>
                            {inputNode}
                        </Form.Item>
                    ) : (
                        <Form.Item name={dataIndex} style={{ margin: 0, }}>
                            {inputNode}
                        </Form.Item>
                    ) : (
                        children
                    )}
            </td>
        );
    };

    configInfoTable = () => {
        const { data, editingKey } = this.state

        const isEditing = (record) => {
            const { editingKey } = this.state
            return record.instantiationId === editingKey
        }

        const edit = (record) => {
            this.formRef.current.setFieldsValue({
                ...record,
            });
            this.setState({
                editingKey: record.instantiationId
            })
        };

        const cancel = () => {
            this.setState({
                editingKey: ''
            })
        };

        const save = async (key) => {
            try {
                const row = await this.formRef.current.validateFields();
                let newRow = Object.assign({}, defaultTemplate, row)
                newRow.instantiationId = key
                const res = await Api.upTemplateInfo(newRow)
                if (res.code == 200) {
                    this.initData()
                }
            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };

        const columns = [
            {
                title: 'instantiationId',
                dataIndex: 'instantiationId',
                editable: false,
            },
            {
                title: 'parentInstantiationId',
                dataIndex: 'parentInstantiationId',
                editable: true,
            },
            {
                title: 'rootInstantiationId',
                dataIndex: 'rootInstantiationId',
                editable: true,
            },
            {
                title: 'templateId',
                dataIndex: 'templateId',
                editable: true,
            },
            {
                title: 'templatePropertyValue',
                dataIndex: 'templatePropertyValue',
                editable: true,
            },
            {
                title: 'backendPropertyValue',
                dataIndex: 'backendPropertyValue',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                fixed: 'right',
                width: 200,
                render: (_, record) => {
                    const editable = isEditing(record);
                    return (
                        <div style={{ width: 120 }}>
                            {
                                editable ? (
                                    <span>
                                        <Typography.Link
                                            onClick={() => save(record.instantiationId)}
                                            style={{
                                                marginRight: 8,
                                            }}
                                        >
                                            保存
                                        </Typography.Link>
                                        <Typography.Link onClick={cancel} >
                                            取消
                                        </Typography.Link>
                                    </span>
                                ) : (
                                        <>
                                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                                编辑
                                            </Typography.Link>

                                            <Typography.Link
                                                disabled={editingKey !== ''}
                                                style={{ margin: '0 12px' }}
                                                onClick={() => {
                                                    this.setState({
                                                        json_visible: true,
                                                        editJsonValue: record,
                                                    })
                                                }}
                                            >
                                                json
                                            </Typography.Link>

                                            <Typography.Link
                                                disabled={editingKey !== ''}
                                                onClick={() => {
                                                    try {
                                                        if (
                                                            copy(
                                                                JSON.stringify(JSON.parse(record.templatePropertyValue), null, 2)
                                                            )
                                                        ) message.success('复制成功～')
                                                    } catch (err) {
                                                        message.warn('数据类型错误')
                                                    }
                                                }}>
                                                copy
                                            </Typography.Link>

                                        </>
                                    )
                            }
                        </div>
                    )
                },
            },
        ];
        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: typeof defaultTemplate[col.dataIndex],// === 'number' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });
        return (
            <Form ref={this.formRef} component={false}>
                <Table
                    components={{
                        body: {
                            cell: this.EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                />
            </Form>
        );
    }

    onFinish = () => {
        this.initData()
    }
    onGenderChange = (val) => {
        this.setState({
            paramType: val
        })
    }
    setParamValue = (e) => {
        this.setState({
            paramValue: e.target.value
        })
    }
    searchBox = () => {
        const { paramType, paramValue } = this.state
        return <Form layout='inline' ref={this.formRef} name="control-ref" onFinish={this.onFinish} style={{ margin: "10px 0" }}>
            <Form.Item name="paramType" label="搜索">
                <Select
                    placeholder="选择参数类型"
                    onChange={this.onGenderChange}
                    style={{ width: 200 }}
                    value={paramType}
                >
                    <Option value="instantiationId">实例化id</Option>
                    <Option value="rootInstantiationId">根实例化id</Option>
                    <Option value="templatePropertyValue">前端属性配置</Option>
                    <Option value="backendPropertyValue">后端属性配置</Option>
                </Select>
            </Form.Item>
            <Form.Item name="paramValue" >
                <Input placeholder="输入参数值" value={paramValue} onChange={this.setParamValue} onPressEnter={this.setParamValue} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ height: 32, padding: '4px 16px' }}>
                    确定
                </Button>
            </Form.Item>
        </Form>
    }

    addRecord = async () => {
        const res = await Api.addTemplate(defaultTemplate)
        if (res.code == 200) {
            this.initData()
        }
    }
    handleMoreClick = (e) => {
        if (!e) return;
        let key = e.key;
        if (key == "add") this.setState({ append_visible: !this.state.append_visible })
        else if (key == "new") this.setState({ create_visible: !this.state.create_visible })
        else if (key == "copy") this.setState({ copy_visible: !this.state.copy_visible })
    }
    handleChange = (code) => {
        if (code == "ok") this.initData();
    }

    handleEditSave = (value) => {
        return Api.upTemplateInfo(value)
            .then(res => {
                if (res.code == 200) {
                    // this.setState({json_visible: false, editJsonValue: ''})
                    this.initData()
                }
                message.success('操作成功~')

                return Promise.resolve()
            })
            .catch(errInfo => {
                console.log('Validate Failed:', errInfo);
                return Promise.reject()
            })
    }

    render() {
        const { append_visible, create_visible, copy_visible, json_visible, editJsonValue } = this.state;
        const menu = (
            <Menu onClick={this.handleMoreClick}>
                <Menu.Item key="add">+ 根据父页面追加（适用于在页面里追加）</Menu.Item>
                <Menu.Item key="new">+ 一次创建多个（适用于创建新页面）</Menu.Item>
                <Menu.Item key="copy">+ 复制页面</Menu.Item>
            </Menu>
        );
        return (
            <div style={{ margin: "20px", overflow: 'auto', height: "calc(100vh - 40px)" }}>
                {this.searchBox()}
                <div>
                    <span>操作：</span>
                    <Dropdown.Button type="primary" overlay={menu} onClick={this.addRecord} style={{ marginBottom: "10px" }}>创建</Dropdown.Button>
                </div>
                {this.configInfoTable()}
                <AddBatchAppend visible={append_visible} onChange={this.handleChange} />
                <CreateRecord visible={create_visible} onChange={this.handleChange} />
                <CopyRecord visible={copy_visible} onChange={this.handleChange} />
                <EditJsonConfig
                    visible={json_visible}
                    data={editJsonValue}
                    onOk={this.handleEditSave}
                    onCancel={() => this.setState({ json_visible: false, editJsonValue: '' })}
                />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;