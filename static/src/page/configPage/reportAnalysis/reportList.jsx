'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@/components/FastIntl';
import _ from 'lodash';

import { List, message } from 'antd';
import { getData, getDecData} from '@util';
import Api from './store/api';
import RsIcon from '../../component/rsIcon/index';

const iconStyle = {
    fontSize: '16px',
    color: "#0678ff"
}

const followIcon = {
    fontSize: "16px",
    color: "#595959"
}

const noFollowIcon = {
    fontSize: '16px',
    color: "#8C8C8C"
}

const applyIcon = {
    fontSize: "16px",
    color: "#fff",
    marginRitht: '1px'
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
            auditStatus: { "auditing": i18n.format("审核中"), "haveAudited": i18n.format("审核通过"), "noPass": i18n.format("审核未通过") }
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }


    //申请查看
    updateReportApplyInfo = async (item) => {
        //审核中禁用事件
        if (!(!item.haveAccess && item.status == "auditing")) {
            const result = await Api.updateReportApplyInfo({ reportId: item.report_id });
            if (result.code == 200) {
                message.success(i18n.format("申请成功，请等待审核"))
                console.log("申请查看", result)
                this.props.updateList()
            }
        }
    }

    //点击去详情
    goToDetail = (item) => {
        if (item.haveAccess) {
            window.open(`/page/reportDetail?reportId=${item.report_id}`);
        } else {
            message.info(i18n.format("请先申请查看"))
        }

    }

    //收藏
    collectGuestReport = async (item) => {
        console.log("点击", item)
        const result = await Api.collectGuestReport({ reportId: item.report_id });

        if (result.code == 200) {
            if (item?.collectFlag) {
                const cancelText = i18n.format('取消收藏成功')
                message.success(cancelText)
            } else {
                const successText = i18n.format('收藏成功')
                message.success(successText)
            }
            //重新请求列表数据
            this.props.updateList()
        }
    }



    render() {
        const { data, key, total, loading } = this.props;
        const { auditStatus } = this.state;
        const menu = getData(PAGEMIXDATA);
        const operator = menu.userInfo.sysUserId;
        
        return (
            <div className="report-list">
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={data}
                    header={<div className="list-header"><div >{i18n.format(`${i18n.format("报告列表")}（${total || 0}）`)}</div> <div style={{ marginRight: '84px' }}>{i18n.format("操作")}</div></div>}
                    renderItem={item => (
                        <List.Item
                            actions={item?.haveAccess ? [
                                <a href={encodeURI(`/api/report/reportDownload?contractAddr=${getDecData(item.report_addr)}&operator=${operator}`)}>
                                    <div className="operator-btn">
                                        <RsIcon type="icon-xiazai" style={iconStyle} />
                                        <span className="btn-title">{i18n.format("下载")}</span>
                                    </div>
                                </a>,
                                <div className={item.collectFlag ? "operator-btn follow-btn" : "operator-btn"} onClick={() => { this.collectGuestReport(item) }}>
                                    <RsIcon type="icon-weiguanzhu" style={item.collectFlag ? followIcon : iconStyle} />
                                    <span className={item.collectFlag ? "follw-btn-title" : "btn-title"}>{item.collectFlag ? i18n.format("取消收藏") : i18n.format("收藏")}</span>
                                </div>
                            ] : [
                                <div className="apply-btn" onClick={_.throttle(() => { this.updateReportApplyInfo(item) }, 2500, ({ leading: true, trailing: false }))}
                                    style={{ opacity: item.status === "auditing" ? '0.5' : '1' }}>
                                    <RsIcon type={item?.status == "noPass" ? "icon-zhongxinshenqing" : "icon-shenqing"} style={applyIcon} />
                                    <span>{i18n.format(`${item?.status == "noPass" ? i18n.format("重新申请") : i18n.format("申请查看")}`)}</span>
                                </div>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<img onClick={() => { this.goToDetail(item) }} className="report-item-avatar" src={item.report_pic} />}
                                title={<div style={{ height: '24px' }}>
                                    <span onClick={() => { this.goToDetail(item) }} className={item.haveAccess ? "report-item-title have-access-color" : "report-item-title no-access-color"}>{item.report_title}</span>
                                    {(!item.haveAccess) && <RsIcon type="icon-suo" style={{ ...iconStyle, marginLeft: '8px', verticalAlign: 'middle' }} />}
                                    {(item.haveAccess && item.status === "haveAudited") && <RsIcon type="icon-jiesuo" style={{ ...iconStyle, marginLeft: '8px', verticalAlign: 'middle' }} />}
                                    {((!item.haveAccess && item.status) || (item.haveAccess && item.status === "haveAudited")) && <span className={`report-audit ${item?.status}-background`}>{auditStatus[item?.status]}</span>}
                                </div>}
                                description={<div className={item.haveAccess ? "report-item-date":"report-item-date no-access-color"}>{`${item?.open_date?.substring(0, 4)}-${item?.open_date?.substring(4, 6)}-${item?.open_date?.substring(6, 8)}`}</div>}
                            />
                        </List.Item>
                    )}
                >
                </List>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;