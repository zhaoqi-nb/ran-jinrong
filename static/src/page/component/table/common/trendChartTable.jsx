
/*
 * @Description: 文件描述
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 14:52:18
 * @LastEditTime: 2022-03-31 18:43:13
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { Table, Spin, Empty } from 'antd';
import { judgeWhetherObj } from '../../util/template'
import { addBaseColumn, getFormatData, addMergeRow, getComplexHeader, basicColumnReset, judgeMergeKey, addMinChartColumn, addTableColumnRender } from './expand/base';
import { addChartColumn, addFocusColumn } from './expand/openChart';
// import { transformText } from '../../locales/index';
import Watermark from '../../watermark/index';
import DownExcel from '@downExcel/common/index'
import i18n from '@/plugin/i18n';
import { addPageData } from '../../../../utils/pageData';
import { setTableData } from './expand/util';
import ModalTable from '../../modalTable/common'

import './index.less'

class SectionTable extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.addBaseColumn = addBaseColumn.bind(this);
        this.getFormatData = getFormatData.bind(this);
        this.addChartColumn = addChartColumn.bind(this);
        this.addFocusColumn = addFocusColumn.bind(this);
        this.addMinChartColumn = addMinChartColumn.bind(this);
        this.addTableColumnRender = addTableColumnRender.bind(this);
        this.addMergeRow = addMergeRow.bind(this);
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
        this.setState(this.getInitialState())
    }
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
                emptyText: <Empty />
            },
            //分页
            pagination: false,
            //排序
            sortField: null,
            sortType: null,
            isModalVisible: false
        }
    }
    // 弹出表格
    showTable = (record, openCurrent) => {
        this.setState({ isModalVisible: true, record, openCurrent })
    }
    // 关闭表格
    closeModalTable = () => {
        this.setState({ isModalVisible: false })
    }

    getSorterDefaultData = (headerMapping) => {
        const { defaultActive: sorter, defaultOrder: sortDirections } = _.get(this.props.option, 'sortConfig', {})

        return _.isEmpty(_.compact(sorter, sortDirections)) ? null : { sorter, sortDirections }
    }
    setComponentInitData = (isRenderData, nextProps) => {
        const { ifShowChart, mergeRow, data: propsData, ifPage, ifSorter, ifAsyncSorter, ifAsyncPage, defaultExpanded, columnsRender, dataSourceRender, headerMapping, minChartOption, pagination: propsPagination, showFocus } = nextProps || this.props;
        console.log('his.props', this.props)
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
            columns = this.addBaseColumn(columns);

            //定制化表格头部
            if (columnsRender) {
                columns = columnsRender(columns, dataSource, headerMapping);
            }

            columns = this.addTableColumnRender(columns, this.props)

            //格式化数据
            dataSource = this.getFormatData(dataSource, this.props)

            //是否显示图标列
            if (ifShowChart) {
                columns = this.addChartColumn(columns)
            }

            const pageSize = _.get(this.props, 'option.pageSize', 10)
            //是否显示关注列
            if (showFocus) {
                columns = this.addFocusColumn(columns)
            }

            //指定列增加minChart
            if (minChartOption) {
                columns = this.addMinChartColumn(columns, minChartOption, dataSource)
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
        console.log('tableAction', action)

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
        let width = this.calculateWidth();

        let result = isFixed(width);
        if (result) XScroll = width;

        // if (columns && columns.length) {
        //     columns.map(item => {
        //         if (item.fixed != undefined) item["fixed"] = result ? item["fixed"] : false;
        //         return item;
        //     })
        // }

        return {
            columns: getComplexHeader(columns),
            XScroll,
        };
    }
    handleExpandedRows = (expandedRows) => {
        this.setState({ expandedRowKeys: expandedRows });
    }
    renderDownload = () => {
        const { ifDownload, title, params, iconStyle, downIndex, sortIndex, download, getTableRequestParams } = this.props;
        const { dataSource, columns = [], sorter, sortDirections } = this.state;
        if (!ifDownload || (ifDownload && !ifDownload.show)) return null;
        if (!dataSource || !columns) return null;

        const result = sortDirections && sorter
            ? _.sortBy(dataSource, (a, b) => {
                const n = parseFloat(a[sorter]?.replace(/\,/g, ""))
                if (sortDirections === 'ascend') {
                    return n//- parseFloat(b[sorter])
                }
                return n < 0 ? Math.abs(n) : -n //( - parseFloat(b[sorter]))
            })
            : dataSource
        const indicatorData = this.getIndicatorData();
        const _style = Object.assign({ "float": "right", marginRight: "10", marginBottom: 4 }, iconStyle)
        return <div style={{ fontSize: 16 }}><DownExcel getTableRequestParams={getTableRequestParams} download={download} ref={this.downExcelRef} sortIndex={sortIndex} downIndex={downIndex} indicatorData={indicatorData} config={{ show: true, dataType: "chart" }} params={params} columns={columns} dataSource={result} title={title} style={_style} /></div>
    }
    renderTools = () => {
        return <div className="tableTools-wrap">
            {this.renderDownload()}
            {/* {this.renderNavBar()} */}
        </div>
    }
    render() {
        const { isReady, loading, columns, dataSource, expandedRowKeys, pagination, locale, isModalVisible, record, openCurrent } = this.state;
        if (!isReady) return null;
        const { id, paramsOptions, ifWatermark } = this.props;
        const temp = this.getScroll(columns);
        let scroll = { x: temp.XScroll };
        // console.log('temasfasfasp', temp, this.getIndicatorData())
        return (
            <div className="general-form">
                <Spin tip={`${i18n.format("加载中")}...`} spinning={loading}>
                    <Watermark ifWatermark={ifWatermark}>
                        {/* style={{ overflow: 'visible' }} */}
                        <Table
                            key={JSON.stringify(this.state.iconDisplayArr)}
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
                        />
                    </Watermark>
                    {this.renderTools()}
                    <ModalTable key={`modalTable_${id}`} record={record} openCurrent={openCurrent} queryParams={paramsOptions} isModalVisible={isModalVisible} {...this.props} closeModalTable={this.closeModalTable} />
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