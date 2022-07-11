
/*
 * @Description: 文件描述
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 14:52:18
 * @LastEditTime: 2022-03-30 14:55:30
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Empty } from 'antd';
import { judgeWhetherObj } from '../../util/template'
import { addBaseColumn, getFormatData, addMergeRow, getComplexHeader, basicColumnReset, addTableColumnRender, tableRowAddColor, judgeMergeKey, resetLastColumnWidth } from './expand/base';
import { addChartColumn, addFocusColumn } from './expand/openChart';
// import { i18n.format } from '../../locales/index';
import Watermark from '../../watermark/index';
import DownExcel from '@downExcel/common/index'
import i18n from '@/plugin/i18n'
import _ from 'lodash'
import { addPageData } from '../../../../utils/pageData';
import { setTableData } from './expand/util';
import ModalTable from '../../modalTable/common'
class SectionTable extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.addBaseColumn = addBaseColumn.bind(this);
        this.getFormatData = getFormatData.bind(this);
        this.addChartColumn = addChartColumn.bind(this);
        this.addFocusColumn = addFocusColumn.bind(this);
        this.addMergeRow = addMergeRow.bind(this);
        this.addTableColumnRender = addTableColumnRender.bind(this);
        this.downExcelRef = React.createRef();
        addPageData(this.downExcelRef);
        if (props.tableRef && props.tableRef.current) {
            props.tableRef.current = this;
        }
    }

    componentDidMount() {
        //设置组件初始化数据
        this.setComponentInitData();
        // this.screenChange();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data || this.props.date_type != nextProps.date_type) {
            console.log('render====>')
            this.props = nextProps
            this.setComponentInitData(true);
        }
    }
    componentWillUnmount() {
        console.log('colors===render 卸载')
        this.setState(this.getInitialState())
    }
    // shouldComponentUpdate(nextProps) {
    //     return _.isEqual(this.props, nextProps)
    // }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            loading: false,
            columns: [],
            allData: [],
            dataSource: [],
            expandedRowKeys: [],
            locale: {
                filterConfirm: i18n.format("确定"),
                filterReset: i18n.format('重置'),
                emptyText: <Empty description={i18n.format('暂无数据')} />
            },
            //分页
            pagination: false,
            //排序
            sortField: null,
            sortType: null,
            isModalVisible: false

        }
    }
    getSorterDefaultData = (headerMapping) => {
        const { defaultActive: sorter, defaultOrder: sortDirections } = _.get(this.props.option, 'sortConfig', {})

        return _.isEmpty(_.compact(sorter, sortDirections)) ? null : { sorter, sortDirections }
        // for (let key in headerMapping) {
        //     let obj = headerMapping[key],
        //         defaultSorter = obj.defaultSorter,
        //         sortDirections = obj.sortDirections || "descend";
        //     if (defaultSorter) {
        //         return {
        //             sorter: key,
        //             sortDirections
        //         }
        //     }
        // }
        // return null;
    }

    setComponentInitData = (isRenderData, nextProps) => {
        const { ifShowChart, mergeRow, data: propsData, ifPage, ifSorter, ifAsyncSorter, ifAsyncPage, defaultExpanded, columnsRender, dataSourceRender, headerMapping, pagination: propsPagination, showFocus, onFocus } = nextProps || this.props;
        let data = _.cloneDeep(propsData);
        let columns = [],
            dataSource = [],
            expandedRowKeys = [],
            sortField = null,
            sortType = null;

        let pagination = this.state.pagination;
        let sorterOptiion = {};
        try {
            columns = data.columns;
            dataSource = data.dataSource;
            //添加表头特殊信息，如？解释说明
            columns = this.addBaseColumn(columns, nextProps || this.props);

            //格式化数据
            dataSource = this.getFormatData(dataSource, this.props)

            //是否显示图标列
            if (ifShowChart) {
                columns = this.addChartColumn(columns, nextProps || this.props)
            }

            const pageSize = _.get(this.props, 'option.pageSize', 10)
            //是否显示关注列
            if (showFocus) {
                columns = this.addFocusColumn(columns)
            }

            //合并行
            if (judgeMergeKey(mergeRow, columns)) {
                let temp = this.addMergeRow(columns, dataSource);
                columns = temp.columns;
                dataSource = temp.dataSource;
            }

            //是否默认展开
            if (defaultExpanded != "none") {
                expandedRowKeys = this.getDefaultExpanded(dataSource);
            }

            //定制化表格头部
            if (columnsRender) {
                columns = columnsRender(columns, dataSource, headerMapping);
            }

            //定制化数据
            if (dataSourceRender) {
                dataSource = dataSourceRender(columns, dataSource, headerMapping)
            }


            //是否支持分页
            if (ifPage || ifAsyncPage) {
                // const pageSize = _.get(this.props, 'option.pageSize', 10)
                pagination = {
                    current: 1,
                    pageSize: pageSize,
                    total: 0,
                    showSizeChanger: false,

                    pageSizeOptions: [10, 20, 50],
                    position: ["bottomCenter"],
                    showTotal: (total, range) => `${i18n.format("共")} ${total} ${i18n.format("项")}`,
                    ...propsPagination
                }
                //是否后端分页
                let pages = data.pages;
                if (pages) {
                    pagination = Object.assign({}, pagination, {
                        current: pages.currentPage,
                        total: pages.totalCount,
                    })
                }
            }

            //排序
            if ((ifSorter) && headerMapping) {
                let obj = this.getSorterDefaultData(headerMapping);
                if (obj) {
                    sorterOptiion["sorter"] = obj.sorter;
                    sorterOptiion["sortDirections"] = obj.sortDirections;
                }
            }
            //后端排序
            if ((ifAsyncSorter) && headerMapping) {
                let { defaultActive, defaultOrder } = _.get(this.props.option, 'sortConfig', {})
                sorterOptiion["sorter"] = defaultActive;
                sorterOptiion["sortDirections"] = defaultOrder;
                sortField = defaultActive
                sortType = defaultOrder
            }



        } catch (error) {
            console.log(error)
        }

        if (isRenderData) {
            this.setState({
                columns, dataSource,
                pagination,
                loading: false,
                iconDisplayArr: null
            })
            return;
        }
        this.setState({ isReady: true, columns, dataSource, pagination, expandedRowKeys, ...sorterOptiion, sortField, sortType, iconDisplayArr: null })
    }

    getDefaultExpanded = (data) => {
        if (!data || !data.length) return [];
        const { defaultExpanded } = this.props;
        let arr = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i],
                index = obj.index;
            if (defaultExpanded == "all" ||
                (defaultExpanded == "firstRow" && !i)
            ) {
                arr.push(index)
            }
        }
        return arr;
    }
    handleTableChange = (pagination, filters, sorterObj, { action }) => {
        const { ifAsyncSorter, ifAsyncPage } = this.props;
        console.log('basicColumnReset', pagination, filters, sorterObj)

        let obj = {};
        //判断是否后端分页
        if (ifAsyncSorter) {
            this.setState({ loading: true });
        }
        if (action === 'sort' && ifAsyncSorter) {
            setTableData({ isTableDestroy: false })
            obj["sortField"] = sorterObj.field
            obj["sortType"] = sorterObj.order
            obj["sorter"] = sorterObj.field;
            obj["sortDirections"] = sorterObj.order;
            // this.setState({ loading: true });
        } else {
            if (!judgeWhetherObj(sorterObj)) {
                obj["sorter"] = sorterObj.field;
                obj["sortDirections"] = sorterObj.order;
            }
        }

        if (!judgeWhetherObj(pagination)) {
            obj["pagination"] = Object.assign({}, this.state.pagination, pagination);
        }

        // 清除关注状态
        obj.iconDisplayArr = null

        // this.setState(obj, () => {
        //     if ((obj.sorter && ifAsyncSorter) || (obj.pagination && ifAsyncPage)) this.props.onChange(this.state)
        // });
        this.setState(obj, () => {
            if ((action === 'paginate' && obj.pagination && ifAsyncPage)
                || (action === 'sort' && obj.sorter && ifAsyncSorter)) this.props.onChange(this.state)
        });
    }
    screenChange() {
        window.addEventListener('resize', this.resize);
    }
    resize = () => {
        //查询区域
        let clientHeight = document.body.clientHeight,
            clientWidth = document.body.clientWidth;
        this.setState({ clientHeight, clientWidth })
    }
    calculateWidth = () => {
        const { columns } = this.state;
        let totle = 0;
        const loop = (data) => {
            try {
                data.forEach(item => {
                    let children = item.children,
                        width = item.width ? parseInt(item.width) : 0;
                    if (children && children.length) {
                        loop(children);
                    } else {
                        totle += width;
                    }
                })
            } catch (error) {
                console.log("calculateWidth格式化出错");
            }
        }

        loop(columns);

        return totle;
    }
    // groupColums = () => {
    //     const { sorter, sortDirections } = this.state;
    //     const { ifSorter, ifAsyncSorter } = this.props;
    //     let temp_columns = [];
    //     console.log('columns', this.state.columns)

    //     let loop = (datas) => {
    //         for (let i = 0, len = datas.length; i < len; i++) {
    //             let obj = datas[i],
    //                 dataIndex = obj.dataIndex;

    //             if (ifSorter || ifAsyncSorter) {
    //                 if (dataIndex == sorter && sortDirections) {
    //                     obj["sortOrder"] = sortDirections;
    //                 } else {
    //                     obj["sortOrder"] = false;
    //                 }
    //             } else obj.sortOrder = false;

    //             temp_columns.push(obj)
    //         }
    //     }

    //     loop(this.state.columns || []);

    //     return temp_columns;
    // }

    getIndicatorData() {
        const { columns } = this.state;
        const temp = this.getScroll(columns);

        const curColumns = _.get(temp, 'columns')

        const callback = (item) => {
            if (_.has(item, 'desc')) {

                return { name: item.orginTitle, value: (item.desc && item.desc.text) ? item.desc.text : item.desc }
            }

            return null
        }

        return _.reduce(curColumns, (acc, item) => {

            if (item.children) {
                acc = [...acc, ..._.chain(item.children).map(callback).compact().value()]
            }

            const data = callback(item)

            if (!data) return acc

            return [...acc, data]
        }, [])
    }

    // 弹出表格
    showTable = () => {
        this.setState({ isModalVisible: true })
    }
    // 关闭表格
    closeModalTable = () => {
        this.setState({ isModalVisible: false })
    }

    getScroll = () => {
        const { collapsed = false } = this.props;
        let XScroll = 'max-content';

        let isFixed = (_w) => {
            let clientWidth = document.body.clientWidth,
                otherWidth = collapsed ? 80 : 200,
                divWidth = clientWidth - otherWidth - 60;
            if (divWidth > _w) return false

            return true;
        }
        let columns = basicColumnReset(this.state.columns, { props: this.props, state: this.state })

        // let columns = this.groupColums();
        let width = this.calculateWidth();

        let result = isFixed(width);
        if (result) XScroll = width;

        // if (columns && columns.length) {
        //     columns.map(item => {
        //         if (item.fixed != undefined) item["fixed"] = result ? item["fixed"] : false;
        //         return item;
        //     })
        // }
        const _columns = this.addTableColumnRender(columns, this.props);

        return {
            columns: _columns,// resetLastColumnWidth(_columns),//getComplexHeader(columns),
            XScroll,
        };
    }
    handleExpandedRows = (expandedRows) => {
        this.setState({ expandedRowKeys: expandedRows });
    }
    renderDownload = () => {
        const { title, params, iconStyle, ifDownload, downIndex, sortIndex, download, getTableRequestParams } = this.props;
        const { dataSource, columns = [], sorter, sortDirections } = this.state;
        if (!ifDownload || (ifDownload && !ifDownload.show)) return null;
        if (!dataSource || !columns) return null;

        let ifComplexTable = columns.findIndex(item => item.header_combine);
        let newColumns = getComplexHeader(columns);

        const result = sortDirections && sorter
            ? _.sortBy(dataSource, (a, b) => {
                const n = typeof a[sorter] === 'string' ? parseFloat(a[sorter]?.replace(/\,/g, "")) : a[sorter]
                if (sortDirections === 'ascend') {
                    return n//- parseFloat(b[sorter])
                }
                return n < 0 ? Math.abs(n) : -n //( - parseFloat(b[sorter]))
            })
            : dataSource
        const _style = Object.assign({ "float": "right", marginRight: "10", marginBottom: 4 }, iconStyle);
        const indicatorData = this.getIndicatorData();
        console.log('newColumns=>', newColumns);
        return <div style={{ fontSize: 16 }}><DownExcel getTableRequestParams={getTableRequestParams} download={download} sortIndex={sortIndex} ref={this.downExcelRef} ifDownload={ifDownload} downIndex={downIndex} indicatorData={indicatorData} config={{ show: true, dataType: "table", ifComplexTable: ifComplexTable != -1 }} params={params} columns={newColumns} dataSource={result} title={title} style={_style} /></div>
    }
    renderTools = () => {
        return <div className="tableTools-wrap">
            {this.renderDownload()}
        </div>
    }

    onSelectChange = (record, selected, selectedRows) => {
        console.log('recordrecordrecord', record, selected);
        const { rowSelection, onRowSelectionChange } = this.props;
        const selectedRowKeys = _.get(rowSelection, 'selectedRowKeys', [])
        let values = [];
        if (!selected) {
            values = _.filter(selectedRowKeys, t => record.type_id !== t.value)
        } else {
            values = [{ value: record.type_id, label: record.type_name }, ...selectedRowKeys]
        }
        onRowSelectionChange && onRowSelectionChange(_.slice(values, 0, 10))
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        const { rowSelection, onRowSelectionChange } = this.props;
        const selectedRowKeys = _.get(rowSelection, 'selectedRowKeys', []);
        let values = [];
        if (!selected) {
            const ids = _.map(changeRows, t => t.type_id);
            values = _.filter(selectedRowKeys, (item) => {
                return !_.includes(ids, item.value)
            })
        } else {
            values = [
                ..._.chain(changeRows)
                    .map(item => ({ value: item.type_id, label: item.type_name }))
                    .reverse()
                    .value(),
                // ..._.map(changeRows, item => ({ value: item.type_id, label: item.type_name })),
                ...selectedRowKeys
            ]
        }
        onRowSelectionChange && onRowSelectionChange(_.slice(values, 0, 10))
    }

    getSelectedRowKeys = () => {
        const { dataSource } = this.state;
        const { rowSelection } = this.props;
        const selectedRowKeys = _.get(rowSelection, 'selectedRowKeys', [])
        return _.reduce(dataSource, (acc, item) => {
            if (_.find(selectedRowKeys, t => t.value === item.type_id)) {
                acc.push(item.key)
            }
            return acc
        }, [])
    }

    render() {
        const { isReady, loading, columns, dataSource, expandedRowKeys, pagination, locale, sortField, sortType, sorter, sortDirections, isModalVisible } = this.state;
        if (!isReady) return null;
        const { id, ifWatermark, rowSelection } = this.props;
        const temp = this.getScroll(columns);
        let scroll = { x: temp.XScroll };
        // console.log('render section', this.props, this.state.sortConfig)
        // console.log('render columns', columns, temp, rowSelection)
        // console.log('basicColumnReset', temp.columns, this.getIndicatorData())
        return (
            <div className='general-form'>
                <Spin tip={`${i18n.format("加载中")}...`} spinning={loading}>
                    <Watermark ifWatermark={ifWatermark}>
                        <Table
                            key={JSON.stringify(this.state.iconDisplayArr)}
                            // loading={loading}
                            bordered={false}
                            columns={temp.columns}
                            dataSource={dataSource}
                            expandedRowKeys={expandedRowKeys}
                            pagination={pagination}
                            onChange={this.handleTableChange}
                            scroll={scroll}
                            onExpandedRowsChange={this.handleExpandedRows}
                            size="middle"
                            locale={locale}
                            sortDirections={['descend', 'ascend', 'descend']}
                            rowKey={(record, index) => record.key}
                            expandedRowClassName={() => {
                                return 'highlight-1'
                            }}
                            expandable={{
                                rowClassName() {
                                    return 'highlight-1'
                                }
                            }}
                            rowClassName={tableRowAddColor(this.props)}
                            rowSelection={rowSelection ? {
                                selectedRowKeys: this.getSelectedRowKeys(),
                                // onChange: this.onSelectChange,
                                onSelect: this.onSelectChange,
                                onSelectAll: this.onSelectAll,
                            } : undefined}
                        />
                    </Watermark>
                    {this.renderTools()}
                    <ModalTable key={`modalTable_${id}`} isModalVisible={isModalVisible} {...this.props} closeModalTable={this.closeModalTable} />
                </Spin>
            </div>
        );
    }
}

SectionTable.defaultProps = {
    chartOptionRender: chartOption => chartOption,
}

SectionTable.propTypes = {
    ifPage: PropTypes.bool,
    ifSorter: PropTypes.bool,
    ifAsyncSorter: PropTypes.bool,
    headerMapping: PropTypes.object.isRequired,
    columnsRender: PropTypes.func,
    dataSourceRender: PropTypes.func,
    chartOptionRender: PropTypes.func,
    onChange: PropTypes.func,
    onOpenPopup: PropTypes.func
};

export default SectionTable;