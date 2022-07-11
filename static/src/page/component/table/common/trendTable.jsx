
/*
 * @Description: 文件描述
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 14:52:18
 * @LastEditTime: 2022-03-30 16:35:00
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, Spin, Empty, Popover, Menu, Dropdown } from 'antd';
import { judgeWhetherObj } from '../../util/template'
import { addBaseColumn, getFormatData, addMergeRow, addTableColumnRender, getFormatMode, tableRowAddColor, judgeMergeKey, getComplexHeader } from './expand/base';
import { addChartColumn, getChartTitle, addFocusColumn } from './expand/openChart';
// import { transformText } from '../../locales/index';
import Watermark from '../../watermark/index';
import cloneDeep from 'lodash/cloneDeep';
import { checkNum } from '../../../../utils/Util';
import DrawerChart from '../../drawerChart/common/index';
import RsIcon from '../../rsIcon/index';
import DownExcel from '@downExcel/common/index'
import TableExpandIcon from '@/components/TableExpandIcon';
import { addPageData, getTableIsDownload } from '../../../../utils/pageData';
import TableScrollWrapHoc from '../HOC/TableScrollWrap';
import i18n from '@/plugin/i18n'


class TrendTable extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.addBaseColumn = addBaseColumn.bind(this);
        this.getFormatData = getFormatData.bind(this);
        this.addChartColumn = addChartColumn.bind(this);
        this.addFocusColumn = addFocusColumn.bind(this);
        this.addMergeRow = addMergeRow.bind(this);
        this.getChartTitle = getChartTitle.bind(this);
        this.addTableColumnRender = addTableColumnRender.bind(this);
        this.downExcelRef = React.createRef();
        this.tableWrapRef = React.createRef(null);
        addPageData(this.downExcelRef);
        if (props.tableRef && props.tableRef.current) {
            props.tableRef.current = this;
        }

    }

    componentDidMount() {
        //设置组件初始化数据
        this.setComponentInitData();
    }
    componentWillReceiveProps(nextProps) {
        // if (this.props.tableIsDestroy != nextProps.tableIsDestroy) {
        //     this.setState(this.getInitialState(), () => {
        //         this.setComponentInitData();
        //     })
        // }
        if (!_.isEqual(this.props.data, nextProps.data)
            || this.props.date_type != nextProps.date_type
        ) {
            console.log('render====>', nextProps)
            this.props = nextProps
            this.setComponentInitData();
        }
    }
    componentWillUnmount() {
        console.log('colors===render 卸载')
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            loading: false,
            //跟弹出层相关
            visible: false,
            option: [],
            data: [],
            //跟表格数据相关
            columns: [],
            allData: [],
            dataSource: [],
            expandedRowKeys: [],
            //跟切换列相关
            beforeColumn: [],
            middleColumn: [],
            afterColumn: [],
            lastShowIndex: 0,
            showColumnCount: 0,
            columnCount: _.map(['6', '9', '12'], item => {
                return { code: item, name: `${item}${i18n.format('列/页')}` } // /${i18n.format('页')
            }),
            // [{ "code": "6", "name": `6${i18n.format('列')}/${i18n.format('页')}` }, { "code": "9", "name": "9列/页" }, { "code": "12", "name": "12列/页" }],

            locale: {
                filterConfirm: i18n.format("确定"),
                filterReset: i18n.format('重置'),
                emptyText: <Empty />
            },
            //分页
            pagination: false,
            arrowLeftDisabled: false,
            arrowRightDisabled: false,
            sortByTime: 'asc'
        }
    }
    getSorterDefaultData = (headerMapping) => {
        for (let key in headerMapping) {
            let obj = headerMapping[key],
                defaultSorter = obj.defaultSorter,
                sortDirections = obj.sortDirections || "descend";
            if (defaultSorter) {
                return {
                    sorter: key,
                    sortDirections
                }
            }
        }
        return null;
    }
    setComponentInitData = (props = this.props) => {
        const { ifShowChart, data: propsData, ifPage, ifSorter, mergeRow, ifAsyncSorter, ifAsyncPage, defaultExpanded, columnsRender, dataSourceRender, headerMapping, pagination: propsPagination, showFocus } = props;

        let data = _.cloneDeep(propsData);
        let columns = [],
            dataSource = [],
            expandedRowKeys = [];

        let pagination = this.state.pagination;
        let sorterOptiion = {};
        try {
            columns = data.columns;
            dataSource = data.dataSource;
            //添加表头特殊信息，如？解释说明
            columns = this.addBaseColumn(columns, props);

            //格式化数据
            dataSource = this.getFormatData(dataSource, props)
            //是否显示图标列
            if (ifShowChart) {
                columns = this.addChartColumn(columns)
            }

            const pageSize = _.get(props, 'option.pageSize', 10)
            //是否显示关注列
            if (showFocus) {
                columns = this.addFocusColumn(columns, pageSize)
            }

            //是否默认展开
            if (defaultExpanded != "none") {
                expandedRowKeys = this.getDefaultExpanded(dataSource);
            }

            //合并行
            if (judgeMergeKey(mergeRow, columns)) {
                let temp = this.addMergeRow(columns, dataSource);
                columns = temp.columns;
                dataSource = temp.dataSource;
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
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50],
                    position: ["bottomCenter"],
                    showTotal: (total, range) => `${i18n.format("共")} ${total} ${i18n.format("项")}`,
                    ...propsPagination,
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
            if ((ifSorter || ifAsyncSorter) && headerMapping) {
                let obj = this.getSorterDefaultData(headerMapping);
                if (obj) {
                    sorterOptiion["sorter"] = obj.sorter;
                    sorterOptiion["sortDirections"] = obj.sortDirections;
                }
            }
        } catch (error) {
            console.log(error)
        }

        this.setState({ isReady: true, columns, dataSource, pagination, expandedRowKeys, ...sorterOptiion, iconDisplayArr: null, arrowLeftDisabled: false, arrowRightDisabled: false }, () => {
            this.setColumnsDetail();
        })
    }

    setColumnsDetail = () => {
        const { ifShowChart } = this.props;
        const { columns } = this.state;
        let beforeColumn = [];
        let middleColumn = [];
        let afterColumn = [];
        let lastShowIndex = 0;
        let showColumnCount = "6";
        let oldColumns = cloneDeep(columns);

        let defaultWidth = 0;

        for (let i = 0, len = oldColumns?.length; i < len; i++) {
            let obj = oldColumns[i];
            let dataIndex = obj.dataIndex;
            if (checkNum(dataIndex)) {
                middleColumn.push(obj);
            } else {
                let width = obj.width ? parseInt(obj.width) : 130;
                defaultWidth += width;

                if (dataIndex == "operation") afterColumn.push(obj);
                else beforeColumn.push(obj);
            }
        }
        // 显示全部列
        if (!ifShowChart) {
            showColumnCount = _.size(middleColumn)
        }

        lastShowIndex = middleColumn.length;
        this.setState({
            beforeColumn,
            middleColumn,
            afterColumn,
            lastShowIndex,
            showColumnCount
        })
    }
    getDefaultExpanded = (data) => {
        if (!data || !data.length) return [];
        const { defaultExpanded } = this.props;
        let arr = [];
        function setDefaultExpanded(data) {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i],
                    key = obj.key;
                if (defaultExpanded == "all" ||
                    (defaultExpanded == "firstRow" && !i)
                ) {
                    arr.push(key)
                    if (obj.children) setDefaultExpanded(obj.children)

                }
            }
        }
        setDefaultExpanded(data)
        return arr;
    }

    handleTableChange = (pagination, filters, sorterObj, { action }) => {
        const { ifAsyncSorter, ifAsyncPage } = this.props;

        let obj = {};

        if (!judgeWhetherObj(sorterObj)) {
            obj["sorter"] = sorterObj.field;
            obj["sortDirections"] = sorterObj.order;
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
    groupColums = (columns) => {
        const { sorter, sortDirections } = this.state;
        const { ifSorter, ifAsyncSorter } = this.props;
        let temp_columns = [];

        let loop = (datas) => {
            for (let i = 0, len = datas.length; i < len; i++) {
                let obj = datas[i],
                    dataIndex = obj.dataIndex;

                if (ifSorter || ifAsyncSorter) {
                    if (dataIndex == sorter && sortDirections) {
                        obj["sortOrder"] = sortDirections;
                    } else {
                        obj["sortOrder"] = false;
                    }
                } else obj.sortOrder = false;

                temp_columns.push(obj)
            }
        }

        loop(columns);

        return temp_columns;
    }
    handleExpandedRows = (expandedRows) => {
        this.setState({ expandedRowKeys: expandedRows });
    }

    getIndicatorData() {
        const curColumns = this.getConcatData();

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

    getConcatData = () => {
        const { beforeColumn, middleColumn, afterColumn, lastShowIndex, showColumnCount, sortByTime } = this.state;

        let oldMiddleColumn = cloneDeep(
            _.orderBy(middleColumn, (col) => {
                return Number(col.dataIndex)
            }, [sortByTime])
        );
        window._sortByTimeColumns = [...beforeColumn, ...oldMiddleColumn, ...afterColumn];
        let start = 0;
        let end = lastShowIndex;
        //向前推 showColumnCount 个
        if ((lastShowIndex - showColumnCount) <= 0) {
            if (middleColumn.length > showColumnCount) {
                start = 0;
                end = showColumnCount;
            } else {
                start = 0;
                end = middleColumn.length;
            }
        } else {
            start = lastShowIndex - showColumnCount;
            end = lastShowIndex;
        }

        let temp = oldMiddleColumn.slice(start, end);

        const columns = _.chain(beforeColumn)
            .concat(temp, afterColumn)
            .map(item => {
                if (['left', 'right'].includes(item.align)) {
                    return { ...item, title: () => <div style={{ textAlign: 'center' }}>{item.title}</div> }
                }

                return item
            })
            .value()


        return this.addTableColumnRender(columns, this.props)
    }

    handleEvent = (eventName) => (param) => {
        console.log('eventNameeventName', eventName, param);
        const { onLoopEvent } = this.props;
        if (onLoopEvent) {
            onLoopEvent && onLoopEvent(eventName, param);
            return
        }
        const event = this[eventName];
        event && event(param)

    }

    // 按最新时间排序
    onSortByTime = (e) => {
        const checked = e.target.checked;
        const sortByTime = checked ? 'desc' : 'asc';
        this.setState({ sortByTime });
    }
    // 跳转到最后
    toAfter = () => {
        const { showColumnCount } = this.state; // lastShowIndex, 
        const state = {
            lastShowIndex: Number(showColumnCount),
            arrowLeftDisabled: true,
            arrowRightDisabled: false
        }
        this.setState({ ...state })
        const { onWrapScrollTo } = this.props;
        onWrapScrollTo && onWrapScrollTo('toAfter')
    }
    // 回到最前面
    toBefore = () => {
        const { middleColumn } = this.state;
        const state = {
            lastShowIndex: _.size(middleColumn),
            arrowLeftDisabled: false,
            arrowRightDisabled: true
        }
        this.setState({ ...state })
        const { onWrapScrollTo } = this.props;
        onWrapScrollTo && onWrapScrollTo('toBefore')
    }
    toLeft = () => {
        const { lastShowIndex, showColumnCount } = this.state;
        let currIndex = lastShowIndex - 1;
        if (currIndex < showColumnCount) {
            // message.warning('左边到头了，请重试～');
            this.setState({ arrowLeftDisabled: true })
            return null;
        }
        const state = {
            lastShowIndex: currIndex,
            arrowLeftDisabled: false,
            arrowRightDisabled: false
        }
        this.setState({ ...state })
    }
    toRight = () => {
        const { middleColumn, lastShowIndex } = this.state;
        let currIndex = lastShowIndex + 1;
        if (middleColumn.length < currIndex) {
            // message.warning('右边到头了，请重试～');
            this.setState({ arrowRightDisabled: true })
            return null;
        }
        const state = {
            lastShowIndex: currIndex,
            arrowLeftDisabled: false,
            arrowRightDisabled: false
        }

        this.setState({ ...state })
    }
    getFormat = (item) => {
        let format = {};
        if (item.format == "long") {
            format = {
                "type": "int",
                "thousands": true,
                "divide": item.divide
            }
        } else if (item.format == "percent") {
            format = {
                "type": "percent",
                "divide": item.divide,
                "bit_number": item.bit_number,
            }
        } else if (item.format == "double") {
            format = {
                "type": "double",
                "bit_number": 2,
            }
        }
        return format;
    }
    getChartOption = (record) => {
        const { date_type, chartTitleData, chartIndex } = this.props;
        let operate = record.operate;
        let name = null
        if (chartIndex) {
            name = record[chartIndex]
        } else {
            if (record.parentTitle && record.parentTitle.length) name = record.parentTitle[0] ? record.parentTitle[0] : record.title
            else name = record.title
        }

        let format = getFormatMode(operate)
        let chartTitle = this.getChartTitle(chartTitleData, record);
        return [{
            code: "title",
            name,
            title: chartTitle,
            yAxis: {
                "type": "value",
                "name": name,
                "axisLabel": format
            },
            "xAxis": {
                "axisLabel": {
                    date_type,
                    "type": "date"
                },
                "name": "",
                "type": "category"
            }
        }]
    }
    getChartData = (record) => {
        const { middleColumn } = this.state;
        let series = [];
        let xData = [];
        for (let i = 0, len = middleColumn.length; i < len; i++) {
            let obj = middleColumn[i];
            let dataIndex = obj.dataIndex;
            let value = record.front_metadata[dataIndex];
            series.push([dataIndex, value]);
            xData.push(dataIndex);
        }
        return {
            legend: [record.title],
            series: [series],
            xData,
        }
    }
    onOpenPopup = (record) => {
        let option = this.getChartOption(record);
        let data = this.getChartData(record);
        this.setState({ visible: !this.state.visible, option, data })
    }
    handleChangeCount = (ev) => {
        const key = ev.key
        this.setState({ showColumnCount: key });
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

    renderNavBar = () => {
        const { columnCount, showColumnCount } = this.state;
        const { ifShowChart } = this.props

        if (!ifShowChart) return null;

        const menu = (
            <Menu
                onClick={this.handleEvent('handleChangeCount')}
                selectedKeys={[showColumnCount]}
                className="table-page"
            >
                {/* <Menu.Item disabled className="table-navBar-disabled">显示列数</Menu.Item> */}
                {
                    columnCount.map(item => <Menu.Item key={item.code}>{item.name}</Menu.Item>)
                }
            </Menu>
        );
        // {/* <Dropdown placement="bottomLeft" overlay={menu} onClick={e => e.preventDefault()} overlayStyle={{ "width": "6.25rem" }}>
        //             <RsIcon type="icon-lieshu" />
        //         </Dropdown> */}
        return (
            <Popover
                title={i18n.format('显示列数')}
                placement="leftTop"
                content={menu}
                trigger="hover"
                overlayClassName='table-navBar-overlay'
                // onClick={e => e.preventDefault()}
                overlayStyle={i18n.getLocalLanguage() === 'en_US' ? { width: 180 } : { width: 100 }}
            >
                <div className="table-navBar" >
                    <RsIcon type="icon-lieshu" />
                </div>
            </Popover>


        )
    }

    renderDownload = () => {
        const { ifDownload, title, params, iconStyle, downIndex, sortIndex } = this.props
        const { dataSource, columns = [], sorter, sortDirections } = this.state
        if (!ifDownload || (ifDownload && !ifDownload.show)) return null;
        if (!dataSource || !columns) return null;

        let ifComplexTable = columns.findIndex(item => item.header_combine);
        let newColumns = getComplexHeader(columns);
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
        return <div style={{ fontSize: 16 }}><DownExcel sortIndex={sortIndex} ifDownload={ifDownload} downIndex={downIndex} indicatorData={indicatorData} ref={this.downExcelRef} config={{ show: true, dataType: "table", ifComplexTable: ifComplexTable != -1 }} params={params} columns={newColumns} dataSource={result} title={title} style={_style} /></div>
    }

    renderTools = () => {
        return <div className="tableTools-wrap">
            {this.renderDownload()}
            {this.renderNavBar()}
        </div>
    }
    render() {
        const { isReady, loading, visible, dataSource, expandedRowKeys, pagination, locale, option, data } = this.state;
        if (!isReady) return null;
        const { id, ifWatermark, titleRender, rowSelection } = this.props;
        const newColumns = this.getConcatData();
        console.log('fffaafafaffafaffff', newColumns, this.state, this.props)
        console.log('render trend', this.props)
        // console.log('basicInfo', this.props)
        // console.log('colors===render 888', this.state)
        // console.log('colors===render 666', this.props, dataSource)

        return (
            <div
                className="general-form"
                key={`drawerChart_${id}`}
                ref={this.tableWrapRef}
            >
                <Spin tip={`${i18n.format("加载中")}...`} spinning={loading}>
                    <Watermark ifWatermark={ifWatermark}>
                        <Table
                            key={JSON.stringify(this.state.iconDisplayArr)}
                            columns={newColumns}
                            dataSource={dataSource}
                            expandedRowKeys={expandedRowKeys}
                            // bordered={false}
                            pagination={pagination}
                            onChange={this.handleTableChange}
                            scroll={{ x: 'max-content' }}
                            onExpandedRowsChange={this.handleExpandedRows}
                            size="middle"
                            locale={locale}
                            expandable={{
                                expandIcon: (props) => {
                                    return <TableExpandIcon {...props} />
                                },
                                indentSize: 21
                            }}
                            rowClassName={tableRowAddColor(this.props)}
                            sortDirections={['descend', 'ascend', 'descend']}
                            rowKey={(record, index) => record.key}
                            rowSelection={rowSelection ? {
                                selectedRowKeys: this.getSelectedRowKeys(),
                                // onChange: this.onSelectChange,
                                onSelect: this.onSelectChange,
                                onSelectAll: this.onSelectAll,
                            } : undefined}
                        />
                    </Watermark>
                </Spin>
                {this.renderTools()}
                <DrawerChart key={`drawerChart_${id}`} visible={visible} option={option} data={data} ifHideTab={true} titleRender={titleRender} params={this.props.option} />
            </div>
        );
    }
}

TrendTable.defaultProps = {
    chartOptionRender: chartOption => chartOption,
}

TrendTable.propTypes = {
    date_type: PropTypes.string,
    ifPage: PropTypes.bool,
    ifSorter: PropTypes.bool,
    ifAsyncSorter: PropTypes.bool,
    headerMapping: PropTypes.object.isRequired,
    columnsRender: PropTypes.func,
    dataSourceRender: PropTypes.func,
    chartOptionRender: PropTypes.func,
    onChange: PropTypes.func,
};

export default TableScrollWrapHoc(TrendTable);