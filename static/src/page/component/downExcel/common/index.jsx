/*
 * @FileDescription    : condition
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-12 15:30:24 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:56:28
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Tooltip, Dropdown, Menu } from 'antd';
import Api from './store/api';
// import { getKeyPrivilege } from '../../common/configComponent/util/index';
import { getKeyPrivilege } from '../../util/template';
import RsIcon from '../../rsIcon/index';
import { getTableSplitData, getChartSplitData, geComplexTableSplitData } from './util';
import { exportExcel } from './export';
import { downLoad, downloadBackEnd } from '../utils/downUtil';
import { getPageData, getPageTile, getPageIndicator } from '../../../../utils/pageData';
import i18n from '@/plugin/i18n'

import './index.less'

class DownExcel extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getTableSplitData = getTableSplitData.bind(this);
        this.getChartSplitData = getChartSplitData.bind(this);
        this.geComplexTableSplitData = geComplexTableSplitData.bind(this);
        this.exportExcel = exportExcel.bind(this);
    }

    componentDidMount() {
        const { dataSource } = this.props;
        //设置下载次数
        let privilege = getKeyPrivilege("downNumLimit");
        let accumulation = 0;
        if (privilege) {
            accumulation = privilege.accumulation;
        }
        this.setState({ accumulation, disabled: !dataSource || !dataSource.length ? true : false }, this.setAllDownUrl)
    }

    componentWillReceiveProps(nextProps) {
        const { params } = this.props;
        if (!nextProps.callback && (!nextProps.dataSource || !nextProps.dataSource.length)) this.setState({ disabled: true });
        else if (params != nextProps.params && nextProps.config && nextProps.config.type == "all") {
            this.setAllDownUrl(nextProps)
        } else this.setState({ disabled: false });
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            loading: false,
            disabled: false,
            text: "下载",
            downLink: null,
            accumulation: 0
        }
    }
    writeData = async (param) => {
        const _this = this;
        _this.exportExcel(param, () => {
            _this.setState({
                loading: false,
                disabled: false,
                text: "下载"
            })
        });
    }
    queryApiData = async () => {
        const { callback } = this.props;
        let datas = null;
        const getCallBackData = (data) => {
            if (!data) return null;
            if (typeof data == "object") {
                if (data.constructor === Array) return data;
                else if (data.constructor === Object && data["dataSource"]) return data.dataSource;
            }
            return null;
        }
        try {
            //获取数据
            datas = await callback();
            datas = getCallBackData(datas);
            if (!datas || !datas.length) {
                message.warn("暂无可用数据下载！");
                this.setState({ loading: false, disabled: false, text: "下载" })
                return;
            }
        } catch (error) {
            console.log("-- queryApiData --" + error);
        }

        return datas;
    }
    //增加下载日志
    downloadOperation = async () => {
        const { accumulation } = this.state;
        const { params, title } = this.props;

        //如果参数类型是 字符串转换为 对象
        //if(params&&params.constructor == String) params = JSON.parse(params);

        let paramJson = Object.assign({
            pageUrl: window.location.href,
            pageTitle: document.title,
            fileName: title,
            _t: (new Date).getTime()
        }, params);

        let result = await Api.downloadOperation({
            accumulation,
            paramStr: JSON.stringify(paramJson)
        });
        return result.code == 200 ? true : false;
    }

    getExcelData = async () => {
        const { config, columns, dataSource, callback, title, ifAddtime, excelData: upExcelData } = this.props;
        let datas = null;

        if (upExcelData) {
            datas = upExcelData;
        } else {
            if (!dataSource && callback) {
                datas = await this.queryApiData();
            } else if (dataSource && dataSource.length) {
                datas = dataSource;
            }
        }
        console.log('原始Data=>', datas);
        let excelData = null;
        if (config.dataType == "table") {
            if (config.ifComplexTable) excelData = this.geComplexTableSplitData(window._sortByTimeColumns || columns, datas, this)
            //是否下载多个 sheet
            else if (config.ifMoreSheet) {
                excelData = [];
                for (let i = 0, len = columns.length; i < len; i++) {
                    let temp = this.getTableSplitData(window._sortByTimeColumns?.[i] || columns[i], datas[i], this)
                    excelData.push(temp);
                }
            }
            //下载单个 普通表格
            else {
                excelData = this.getTableSplitData(window._sortByTimeColumns || columns, datas, this)
            }
        } else if (config.dataType == "chart") {
            // TODO 如果是chart，不需要拆分表头，bug http://jira.databurning.inc/browse/DAGAIBAN-548?filter=-1
            excelData = this.getChartSplitData(window._sortByTimeColumns || columns, datas, this)
        }


        return excelData;

    }

    getFileName = () => {
        const { config, title, ifAddtime } = this.props;
        const drawerTitle = document.querySelector('.ant-tabs-tabpane-active .excel-drawer-title')?.textContent;
        const excelTitle = document.querySelector('.excel-title')?.textContent;
        if (drawerTitle) {
            return `${drawerTitle}.xlsx`
        }

        if (excelTitle) {
            return `${excelTitle}.xlsx`
        }

        let file_name = null
        if (ifAddtime) file_name = title ? `${title}.xlsx` : `${document.title}.xlsx`;
        else file_name = title ? `${title}_${new Date().getTime()}.xlsx` : `${document.title}.xlsx`;

        return file_name;
    }
    handlerClick = async () => {
        // console.log('download=>')
        // return;
        const { config, title, ifAddtime, indicatorData } = this.props;
        const file_name = this.getFileName();
        let excelData = null;
        if (this.props.downPage) {
            excelData = await getPageData();
            let indicatorDataPage = getPageIndicator();
            const fileName = getPageTile();
            // TODO 这块的指标数据得共用的地方获取
            downLoad(excelData, fileName, { dataType: 'table' }, indicatorDataPage);
            return;
        }
        this.setState({ loading: true, disabled: true, text: "下载中..." });
        excelData = await this.getExcelData();


        //记录下载日志
        let OperationAllow = await this.downloadOperation();
        downLoad(excelData, file_name, config, indicatorData);
        this.setState({ loading: false, disabled: false, text: "下载" })


        // if (datas) {// && OperationAllow) {
        //     this.writeData(excelData);
        // } else {
        //     this.setState({ loading: false, disabled: false, text: "下载" })
        // }
    }
    getParam = ({ params, title, config }) => {
        if (typeof params == "string") params = JSON.parse(params);
        let paramKey = config.paramKey;
        let str = '';
        for (let key in params) {
            if (paramKey.indexOf(key) == -1) continue;
            let value = params[key];
            str += `${key}=${value}&`
        }
        return str ? `?file_name=${title}&${str.substring(0, str.length - 1)}` : str;
    }
    setAllDownUrl = (props = this.props) => {
        const { config } = props;
        if (config.type != "all") return;
        let downApi = config.api;
        //get 请求参数
        let downLink = `${downApi}${this.getParam(props)}`;
        this.setState({ downLink });
    }

    goToDownloadBackend = async (downloadType, download_type_name) => {
        let fileName = this.getFileName();
        fileName = fileName.replace('.xlsx', '');
        const data_params = await this.props.getTableRequestParams();
        downloadBackEnd({
            download_type: downloadType,
            data_params,
            download_name: fileName,
            download_type_name,
            type: 'list'
        })
    }

    render() {
        const { loading, disabled, downLink } = this.state;
        const { style, config, ifDisabled, downText = '下载数据', ifDownload, iconStyle, children, download } = this.props;
        const _style = Object.assign({ display: "inline-block", color: '#595959' }, style)
        const text = config && config.btnText ? config.btnText : "";

        if (!ifDownload) return null;

        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.goToDownloadBackend(1, '截面数据')} key="1">
                    <span>{i18n.format('下载截面数据')}</span>
                </Menu.Item>
                <Menu.Item  onClick={() => this.goToDownloadBackend(2, '趋势数据')} key="2">
                    <span>{i18n.format('下载趋势数据')}</span>
                </Menu.Item>
                <Menu.Item onClick={() => this.goToDownloadBackend(3, '截面+趋势数据')} key="3">
                    <span>{i18n.format('下载截面+趋势')}</span>
                </Menu.Item>

            </Menu>)
        return (
            <>
                {children ? (
                    <span className='down-text' onClick={this.handlerClick}>{children}</span>
                ) : (
                    <div className="downIcon-wrap" style={_style}>
                        {
                            download && download.type === 'backend' ? <Dropdown placement='bottomRight' overlay={menu}>
                                <RsIcon className="xiazai-icon" type="icon-xiazai" style={{ color: '#595959', ...iconStyle }} />
                            </Dropdown> : <Tooltip placement="left" title={i18n.format(downText)}>
                                {config.type == "all" && downLink ?
                                    // <Button type="primary" icon={<RsIcon type="icon-xiajiang" />} href={downLink} style={{ marginRight: "10px", position: "relative", top: "1px" }}>
                                    //     全部数据
                                    // </Button>
                                    <RsIcon className="xiazai-icon" type="icon-xiazai" href={downLink} style={{ marginRight: "10px", position: "relative", top: "1px", ...iconStyle }} />
                                    : null}
                                {config.show ?
                                    // <Button type="primary" icon={<RsIcon type="icon-xiajiang" />}
                                    //     loading={loading} disabled={ifDisabled ? ifDisabled : disabled} onClick={this.handlerClick}>
                                    //     {text}
                                    // </Button>
                                    <RsIcon className="xiazai-icon" type="icon-xiazai" onClick={this.handlerClick} style={{ color: '#595959', ...iconStyle }} />
                                    : null}
                            </Tooltip>
                        }
                    </div>
                )}
            </>
        );
    }
}

DownExcel.defaultProps = {
    //是否切分表头的/ 目前只用于表格
    ifSplitColumns: true,
    ifDisabled: false,
    config: {},
    ifDownload: true, // 默认显示下载
}

DownExcel.propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    ifSplitColumns: PropTypes.bool,
    ifDisabled: PropTypes.bool,
    config: PropTypes.object,
    params: PropTypes.object,
    callback: PropTypes.func,
    ifDownload: PropTypes.bool,
};

export default DownExcel;