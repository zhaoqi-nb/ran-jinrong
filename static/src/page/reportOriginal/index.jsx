'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@/components/FastIntl';
import { GetQueryString, getUrlPath, getData, getDecData } from '@util';
import Api from './store/api';
import { message } from 'antd';
import { PDFObject } from 'react-pdfobject';


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
            detailData: null
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
                // 请求pdf流
                const pdfData = await Api.transitionPDF({  });
            } else {
                //重定向
                location.href = "/page/error/412"
            }
        }
    }


    render() {
        const { isReady, detailData } = this.state;
        const menu = getData(PAGEMIXDATA);
        const operator = menu.userInfo.sysUserId;
        if (!isReady) return null;

        return (
            <div style={{ width: '100%' }}>
                <PDFObject
                    height="100vh"
                    width="100%"
                    style={{ marginBottom: '16px' }}
                    //forcePDFJS={true}
                    //PDFJS_URL={getDecData(detailData.report_addr)}
                    OpenParams={
                        { pagemode: 'none', view: 'FitH', zoom: 'scale' }
                    }               
                    url={encodeURI(`/api/report/PDF?contractAddr=${getDecData(detailData.report_addr)}&operator=${operator}`)}
                />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;