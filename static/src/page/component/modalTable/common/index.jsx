import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import Api from '../store/api'
import CommonTable from '@table/common'

export default function index(props) {
    const { isModalVisible = false, record, openCurrent, closeModalTable, queryParams } = props
    if (!openCurrent) return null
    const defaultOption = {
        type: "section",
        ifShowChart: false,
        headerMapping: {
            "other": {
                "type": "string",
                "columnStyle": {
                    "width": 130,
                    "align": "center"
                }
            },
            "title": {
                "type": "string",
                "columnStyle": {
                    "width": 130,
                    "fixed": "left",
                    "align": "left"
                }
            }
        }
    }
    const { path, tableConfig, rowParamKeys } = openCurrent
    const [visible, setVisible] = useState();
    const [option, setOption] = useState(Object.assign({}, defaultOption, tableConfig));
    const [data, setData] = useState();

    useEffect(() => {
        try {
            if (isModalVisible) {
                getTableData()
            } else {
                setVisible(isModalVisible)
            }
        } catch (error) {
            console.log('open modal table error:', error)
        }
    }, [isModalVisible])

    useEffect(() => {
        setOption(Object.assign({}, defaultOption, tableConfig))
    }, [tableConfig])

    const columnsRender = (columns, dataSource, headerMapping) => {
        if (!tableConfig && JSON.stringify(tableConfig) === "{}") {
            return columns
        } else {
            return columns.map(v => {
                const { dataIndex } = v
                let renderContent = v
                if (tableConfig[dataIndex]) {
                    v.render = (text, record) => {
                        if (tableConfig[dataIndex].img && tableConfig[dataIndex].url) {
                            renderContent = <div style={{ display: "flex", justifyContent: 'center' }}>
                                <div style={{ width: 48, height: 48, borderRadius: 4, flex: '1 0 48px' }}>
                                    <img style={{ width: '100%', height: '100%' }} src={record[`${tableConfig[dataIndex].img}`]} alt="" />
                                </div>
                                <div style={{ marginLeft: '8px' }}>
                                    <a href={record[`${tableConfig[dataIndex].url}`]} target="_blank">{text}</a>
                                </div>
                            </div>
                        } else if (tableConfig[dataIndex].url) {
                            renderContent = <a href={record[`${tableConfig[dataIndex].url}`]} target="_blank">{text}</a>
                        }
                        return renderContent
                    }
                }
                return renderContent
            })
        }
    }

    const getTableData = async () => {
        if (!isModalVisible || !path) return null
        let params = {}
        if (rowParamKeys && record) {
            rowParamKeys.map(p => {
                params[p] = record[p]
            })
        }
        params = JSON.stringify(Object.assign({}, queryParams, params))
        const { data } = await Api.getTableData({ instantiationId: 'noId', type: option.type, headerMapping: JSON.stringify(option.headerMapping), params, url: path })
        setData(data)
        setVisible(isModalVisible)
    }

    return (
        data ?
            <Modal width='80%' visible={visible} footer={null} onCancel={() => { closeModalTable && closeModalTable() }}>
                {/* {renderTable()} */}
                <CommonTable option={option} data={data} columnsRender={columnsRender} />
            </Modal>
            : null
    )
}
