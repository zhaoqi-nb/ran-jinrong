'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@/components/FastIntl';
import { GetQueryString, getUrlPath, getData, getDecData } from '@util';
import Api from './store/api';
import ReportList from './relativeReportList';
import { Button, message } from 'antd';
import RsIcon from '../component/rsIcon/index';
import { PDFObject } from 'react-pdfobject';

import './index.less';

const iconStyle = {
    fontSize: '16px',
    color: '#0678ff'
}



class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            detailData: null,
            //相关报告列表
            reportList: []
        }
    }
    componentDidMount() {
        this.initData()
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    initData = () => {
        let reportId = GetQueryString("reportId") || "";
        this.getReportInfoForGuest(reportId);
        this.getRelativeReport({ reportId, currentPage: 1, pageSize: 5 });

    }



    //详情获取
    getReportInfoForGuest = async (reportId) => {
        const result = await Api.getReportInfoForGuest({ reportId });
        if (result.code == 200) {
            const data = result?.data[0] || {};
            const haveAccess = data?.inFlag == 1 || data?.inFlag == 3 ? true : false;
            console.log("详情", result)
            //判断访问权限
            if (haveAccess) {
                this.setState({ isReady: true, detailData: data })
            } else {
                //重定向
                location.href = "/page/error/412"
            }
        }
    }

    //获取相关报告列表
    getRelativeReport = async (param) => {
        const result = await Api.getRelateShowReportListForSaas(param);
        if (result.code == 200) {
            console.log("相关报告列表", result)
            const list = result?.data?.rsList || [];

            this.setState({ reportList: list })
        }
    }



    //发送到邮箱
    addGuestReportJob = async () => {
        let reportId = GetQueryString("reportId") || "";
        const regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;;
        const menu = getData(PAGEMIXDATA);
        console.log("用户信息====", menu)
        let mail = menu?.userInfo?.mail || "";
        console.log("邮箱", mail, regex.test(mail))
        if (mail) {
            if (regex.test(mail)) {
                const result = await Api.addGuestReportJob({ reportId });
                if (result.code == 200) {
                    message.success(`${i18n.format("已发送到邮箱")}${mail}${','}${i18n.format("请稍后查看")}`)
                }
            } else {
                // message.error(i18n.format("邮箱格式不正确，请先更改邮箱"))
                message.info(i18n.format("系统里暂无您的邮箱，请联系销售录入邮箱地址。"))
            }
        } else {
            message.info(i18n.format("系统里暂无您的邮箱，请联系销售录入邮箱地址。"))
        }
    }

    //打开原文
    openReport = async () => {
        const { detailData } = this.state;
        //const url = encodeURI(`${pdfUrl}/crm/report/transitionPDF?contractAddr=${detailData.report_addr}&operator=${operator}`)
        const reportId = GetQueryString("reportId") || "";
        window.open(`/page/reportOriginal?reportId=${reportId}`)
    }

    //收藏、取消收藏
    followClick = async () => {
        const { collectFlag } = this.state.detailData;
        let reportId = GetQueryString("reportId") || "";

        const result = await Api.collectGuestReport({ reportId });
        if (result.code == 200) {
            message.success(`${collectFlag ? i18n.format("取消收藏成功") : i18n.format("收藏成功")}`)
            this.getReportInfoForGuest(reportId)
        }
    }

    render() {
        const { isReady, detailData, reportList } = this.state;
        const menu = getData(PAGEMIXDATA);
        const operator = menu.userInfo.sysUserId;
        if (!isReady) return null;

        return (
            <div className="report-detail-container" style={{ width: '100%' }}>
                <div className="left-content">
                    <h4 className="report-title">
                        {i18n.format(detailData?.report_title || "")}
                    </h4>

                    <div className="report-header">
                        <div className="report-date">{`${detailData?.open_date?.substring(0, 4)}-${detailData?.open_date?.substring(4, 6)}-${detailData?.open_date?.substring(6, 8)}`}</div>
                        <div className="report-buttons">
                            <div onClick={this.openReport} className="report-btn">
                                <RsIcon type="icon-dakaipdf" style={iconStyle} />
                                <span className="btn-title">{i18n.format('打开原文PDF')}</span>
                            </div>
                            <a href={encodeURI(`/api/report/reportDownload?contractAddr=${getDecData(detailData.report_addr)}&operator=${operator}`)}>
                                <div className="report-btn">
                                    <RsIcon type="icon-xiazai" style={iconStyle} />
                                    <span className="btn-title">{i18n.format('下载')}</span>
                                </div>
                            </a>
                            <div onClick={this.addGuestReportJob} className="report-btn">
                                <RsIcon type="icon-youxiang" style={iconStyle} />
                                <span className="btn-title">{i18n.format('发送到邮箱')}</span>
                            </div>
                            <div onClick={this.followClick} style={{ minWidth: '86px' }} className={detailData?.collectFlag ? "report-btn follow-button" : "report-btn"}>
                                <RsIcon type={"icon-weiguanzhu"} style={{ ...iconStyle, color: detailData?.collectFlag ? "#595959" : "#0678ff" }} />
                                <span className={detailData?.collectFlag ? "btn-title follow-title" : "btn-title"} >{detailData?.collectFlag ? i18n.format('取消收藏') : i18n.format('收藏')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pdf-viewer">
                        <PDFObject
                            height="100vh"
                            width="100%"
                            style={{ marginBottom: '16px' }}
                            forcePDFJS={true}
                            OpenParams={
                                { pagemode: 'none', view: 'FitH', zoom: 'scale' }
                            }

                            url={encodeURI(`/api/report/PDF?contractAddr=${getDecData(detailData.report_addr)}&operator=${operator}#toolbar=0&statusbar=0&page=1&view=FitH,top`)}
                        />
                    </div>
                </div>

                <div className="right-content">
                    <ReportList data={reportList} isReady={true} />
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;