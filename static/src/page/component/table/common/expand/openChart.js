'use strict';
import React from 'react';
import { Checkbox } from 'antd';
import { judgeSize, isNotANumber } from './base';
import { transformText } from '../../../locales/index';
// import { getComponentParam } from '../../../util/template'
import { getEditTitle } from '../../../util/editTemplate/util';
import { checkNum } from '../../../../../utils/Util'
import RsIcon from '../../../rsIcon/index';
import ArrowLongPress from '@/components/ArrowLongPress'
import ArrowBtn from '@/components/ArrowLongPress/ArrowBtn';
import i18n from '@/plugin/i18n';
import { cloneDeep } from 'lodash'

function getChartAxisName($this, record, ifNoFirstName, tooltipName) {
    const { title, desc, yAxisPropsName, pageInfo, iconPosition, chartTitle, controlledElement, templateData } = $this.props;
    let pageTitle = [],
        xAxisName = transformText("common_time"),
        yAxisName = "",
        componentName = i18n.format(title ? title : desc),
        firstObj = getFirstData($this, record.index);

    if (templateData && templateData.titleOption) {
        pageTitle.push(getEditTitle(controlledElement, templateData.titleOption, record))
    }
    else {
        //资源属性里面有 type 
        if (pageInfo && pageInfo.resAttr && pageInfo.resAttr.type && pageInfo.resAttr.type.indexOf("-") != -1) {
            let type = pageInfo.resAttr.type.split("-")
            pageTitle.push(i18n.format(type[type.length - 1]));
        }

        if (pageInfo && pageInfo.resName && !chartTitle) pageTitle.push(getTitle(pageInfo));
        else if (chartTitle) pageTitle.push(chartTitle);

        if (componentName) pageTitle.push(componentName)

    }

    if (record["classify"] || record["original_classify"]) pageTitle.push(record["classify"] ? record["classify"] : record["original_classify"])
    if (record[iconPosition]) pageTitle.push(record[iconPosition])
    if (firstObj) {
        yAxisName = yAxisPropsName ? yAxisPropsName : (firstObj ? firstObj[iconPosition] : "");
        if (ifNoFirstName) yAxisName = record.title || record['截止日期']
        if (tooltipName) yAxisName = tooltipName
    }

    return {
        pageTitle: pageTitle.join("-"),
        xAxisName,
        yAxisName,
        tooltipName
    }
}

function getTitle(pageInfo) {
    let title = pageInfo.resName;
    if (pageInfo.resAttr && pageInfo.resAttr.menuName) title = pageInfo.resAttr.menuName;
    return i18n.format(title);
}

function getFirstData($this, index) {
    const { dataSource } = $this.state;

    let firstObj = null;
    const loop = (data) => {
        for (let i = 0, len = data.length; i < len; i++) {
            var obj = data[i],
                treeLevel = obj.treeLevel,
                children = obj.children;

            if (treeLevel == 1) firstObj = obj;
            if (index == obj.index) return firstObj;
            if (children && children.length) {
                let result = loop(children);
                if (result) return result;
            }
        }
        return null;
    }

    if (dataSource && dataSource.length) return loop(dataSource)
    else return null;
}

function getOperate(record) {
    if (record.operate) return record.operate;
    else if (record.operate_multiple) {
        let obj = record.operate_multiple;
        for (let key in obj) {
            if (isNotANumber(key)) return obj[key];
        }
    }
    return null;
}


function ifNumber(num) {
    return checkNum(num)
}


//获取一行数据
export function getRowData($this, record, columns) {
    let flag = null

    if (columns.length) {
        flag = columns.filter(item => {
            return ifNumber(item.dataIndex)
        })
        if (flag.length) flag = flag[0]['dataIndex']
        else flag = null
    }

    let series = [],
        xData = [];

    const { noView } = $this.props;
    const dateRule = noView && noView.dateRule ? noView.dateRule : null;
    for (let key in record) {
        let value = record[key];
        if (isNotANumber(key)) {
            //限制
            if (!judgeSize(key, dateRule)) {
                if ((flag && key >= flag) || !flag) {
                    series.push(new Array(key, value))
                    xData.push(key);
                }
            }
        }
    }
    series = series.sort((a, b) => {
        return a[0].replace(/[^0-9]/ig, "") - b[0].replace(/[^0-9]/ig, "")
    })

    return {
        series,
        xData
    };
}


function judgeIfshowChart(obj) {
    let result = false;
    let dataIndexArr = ["index", "title", "treeLevel", "operate", "children", "front_metadata"];
    for (let key in obj) {
        let value = obj[key];
        if (dataIndexArr.indexOf(key) == -1 && value) return true;
    }
    return result;
}


function getIndex(datas, iconPosition) {
    const loop = (data) => {
        let arr = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i],
                dataIndex = obj.dataIndex,
                children = obj.children;
            if (dataIndex == iconPosition) return arr.push(i);
            if (children && children.length) {
                let temp = loop(children);
                if (temp && temp.length) {
                    temp.unshift(i)
                    return temp;
                }
            }
        }
        return null;
    }

    return loop(datas);
}

//----------

//获取截面数据
function getSectionChartData(columns, chartOption) {
    let result = [];
    let titlePrefix = chartOption.titlePrefix;
    for (let i = 0, len = columns.length; i < len; i++) {
        let obj = columns[i];
        let code = obj.dataIndex;
        let name = obj.original_title ? obj.original_title : obj.title;
        let title = `${titlePrefix}_${name}`;

        result.push({
            code,
            name,
            title
        })
    }
    return result;
}

function judgeLeftDisabled(firstShowIndex, defaultShowColumn) {
    let currIndex = firstShowIndex - 1;
    if (currIndex < 0 || currIndex - defaultShowColumn < 0) return true;
    return false;
}

function judgeRightDisabled(middleColumn, firstShowIndex, defaultShowColumn) {
    let currIndex = firstShowIndex + 1;
    if (middleColumn.length < currIndex + defaultShowColumn) return true;
    return false;
}

// function getOperation(middleColumn, firstShowIndex, defaultShowColumn){
//     console.log("title === ");
//     return <div className="arrow-page"><RsIcon type="icon-jiantouzuo" className="arrow" onClick={this.toLeft}/><RsIcon type="icon-jiantouyou" className="arrow" onClick={this.toRight}/></div>
// }

//添加 图表列
export function addChartColumn(columns, props = this.props) {
    const { type } = props;
    const { middleColumn, firstShowIndex, defaultShowColumn } = this.state;
    if (columns && columns.length) {
        let index = columns.findIndex(item => item.dataIndex == "operation");
        if (index == -1) {
            let lastobj = null;
            if (type == "trend" || !type) {
                // let disabledLeft  = judgeLeftDisabled(firstShowIndex, defaultShowColumn);
                // let disabledRight = judgeRightDisabled(middleColumn,firstShowIndex, defaultShowColumn);
                lastobj = {
                    align: "center",
                    dataIndex: "operation",
                    // title:<div className="arrowPage"><RsIcon type="icon-jiantouzuo" className={disabledLeft?"arrow disabled":"arrow"}/><RsIcon type="icon-jiantouyou" className={disabledRight?"arrow disabled":"arrow"}/></div>,
                    title: () => {
                        const { arrowLeftDisabled, arrowRightDisabled, sortByTime } = this.state;
                        return (
                            <div className="oprator-column">
                                {/* <div className='date-sort-inner'>
                                    <Checkbox
                                        checked={sortByTime === 'desc'}
                                        onChange={this.onSortByTime}
                                    >最新在左</Checkbox>
                                </div> */}
                                <div className="arrow-page-inner">
                                    <div className='left'>
                                        <ArrowBtn
                                            disabled={arrowLeftDisabled}
                                            type="icon-shuangjiantouzuo"
                                            onClick={this.handleEvent('toAfter')}
                                        />
                                        <ArrowLongPress
                                            disabled={arrowLeftDisabled}
                                            direction="left"
                                            onLongPress={this.handleEvent('toLeft')}
                                        />
                                    </div>
                                    <div className='right'>
                                        <ArrowLongPress
                                            disabled={arrowRightDisabled}
                                            direction="right"
                                            onLongPress={this.handleEvent('toRight')}
                                        />
                                        <ArrowBtn
                                            disabled={arrowRightDisabled}
                                            type="icon-shuangjiantouyou"
                                            onClick={this.handleEvent('toBefore')}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    },
                    // title: getOperation(middleColumn, firstShowIndex, defaultShowColumn),
                    fixed: "right",
                    width: 176,
                    render: (text, record) => {
                        return <RsIcon
                            type="icon-qushi"
                            className="table-trend-chart"
                            onClick={() => this.onOpenPopup(record)}
                        />
                    },
                }
            } else if (type == "section") {
                lastobj = {
                    align: "center",
                    dataIndex: "operation",
                    title: "趋势",
                    fixed: "right",
                    width: 60,
                    render: (text, record) => {
                        return <RsIcon
                            type="icon-qushi"
                            className="table-trend-chart"
                            onClick={() => {

                                this.props.onOpenPopup(record)
                            }}
                        />
                    },
                }
            } else if (type == "trendChart") {
                lastobj = {
                    align: "center",
                    dataIndex: "operation",
                    title: "趋势",
                    fixed: "right",
                    width: 60,
                    render: (text, record) => {
                        return <RsIcon type="icon-qushi" className="table-trend-chart" onClick={() => this.props.onOpenPopup(record)} />
                    },
                }
            }
            if (lastobj) columns.push(lastobj)
        }
    }
    return columns;
}

// 添加关注列
export function addFocusColumn(columns, pageSize = 10) {
    let loading = false;
    if (columns && columns.length) {
        let index = columns.findIndex(item => item.dataIndex == "focus");
        let iconDisplayArr = this.state.iconDisplayArr ? this.state.iconDisplayArr : new Array(pageSize).fill(-1)
        if (index == -1) {
            let lastobj = null;
            lastobj = {
                align: "center",
                dataIndex: "focus",
                title: "关注",
                fixed: "left",
                width: 48,
                render: (text, record, index) => {
                    let iDisplay = iconDisplayArr[index]
                    if (iDisplay === -1) iDisplay = record.attentionFlag === 1 ? 1 : 0;
                    // console.log('loadingloadingloading', loading)
                    const iconStyle = iDisplay === 1
                        ? { fontSize: 16, color: '#ffaf00', cursor: loading ? 'not-allowed' : 'pointer' }
                        : { fontSize: 16, color: '#8c8c8c', cursor: loading ? 'not-allowed' : 'pointer' }
                    return (
                        <RsIcon
                            type={iDisplay === 1 ? "icon-guanzhu" : "icon-weiguanzhu"}
                            key={iDisplay}
                            style={iconStyle}
                            onClick={async () => {
                                if (loading) return;
                                loading = true
                                const res = await this.props.onFocus(record, iDisplay)
                                if (res) {
                                    loading = false
                                    iconDisplayArr[index] = iDisplay === 1 ? 0 : 1
                                    this.setState({
                                        iconDisplayArr
                                    })
                                }
                            }}
                        />
                    )

                    //     : <RsIcon type="icon-weiguanzhu" key={iconDisplay} style={{ fontSize: 16, color: '#333333' }} onClick={() => {
                    //     iconDisplay = 1
                    //     this.props.onFocus(record, 0)
                    // }} />
                    // let iconAttr = {}
                    // const iconAttr1 = {
                    //     type: "icon-weiguanzhu",
                    //     style: { fontSize: 16, color: '#333333' },
                    //     clickFn: () => {
                    //         record.attentionFlag = 1
                    //         this.props.onFocus(record, 0)
                    //     }
                    // }
                    // const iconAttr2 = {
                    //     type: "icon-guanzhu",
                    //     style: { fontSize: 16, color: '#ffaf00' },
                    //     clickFn: () => {
                    //         record.attentionFlag = 0
                    //         this.props.onFocus(record, 1)
                    //     }
                    // }
                    // iconAttr = record.attentionFlag === 1 ? iconAttr2 : iconAttr1
                    // return <RsIcon type={iconAttr.type} style={iconAttr.style} onClick={iconAttr.clickFn} />
                },
            }
            if (lastobj) columns.unshift(lastobj)
        }
    }
    return columns;
}


//获取弹出层标题
export function getChartTitle(chartTitleData, record) {
    if (!chartTitleData || !chartTitleData.length) return record.title;
    let title = [];
    let indexName = null
    for (let i = 0, len = chartTitleData.length; i < len; i++) {
        let obj = chartTitleData[i];
        let type = obj.type;
        let value = i18n.format(obj.value);
        if (type == "record") {
            let temp = cloneDeep(record[value]);
            if (temp) {
                //判断是否是字符串
                if (typeof temp == "string") title.push(temp);
                else if (temp.constructor === Array) {
                    // level大于2时，把parentTitle的第一个值放在标题最后
                    const level = obj.level || 0
                    if (level > 2) {
                        indexName = temp.shift()
                    }
                    title = title.concat(temp);
                }
            }
        } else if (value) title.push(value);
    }
    if (indexName) title.push(indexName)
    return title && title.length ? title.join("-") : "";
}