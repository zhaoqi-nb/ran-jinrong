import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Row, Col, Button } from 'antd';

const title = {
    color: "#434e59",
    fontSize: "72px",
    fontWeight: 600,
    lineHeight: "72px",
    marginBottom: "24px",
}

const detail = {
    color: "rgba(0,0,0,.45)",
    fontSize: "20px",
    lineHeight: "28px",
    marginBottom: "16px",
}

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        // 401 /dashboard
        // 402  /dashboard/-1
        // 403 /dashboard/tab/-1/1999
        // 404 /tab/-1/2290
        // 405 /page/-1/2409/companyList  /page/config/-1/2293/196
        // 406 /page/:path
        // 407 /page/detail/:userGroupId/:resId/:path
        // 408 /page/setfilter/:userGroupId/:resId/:path/:param
        // 409 /page/config/filter/:userGroupId/:md5/:resId/:path
        // 410 /page/filter/:userGroupId/:md5/:resId/:path
        // 411 /page/redirect/:userGroupId/:type/companyList
        return {
            allData:{
                // 404:{
                //     title:"404",
                //     img:require('./image/404.svg'),
                //     ifBack:true,
                //     detail:"抱歉，你访问的页面不存在"
                // },
                500:{
                    title:"500",
                    img:require('./image/500.svg'),
                    ifBack:true,
                    detail:"抱歉，服务器出错了"
                },
                504:{
                    title:"500",
                    img:require('./image/500.svg'),
                    ifBack:false,
                    detail:"抱歉，该用户没有该系统权限，请联系管理员！"
                },
                530:{
                    title:"500",
                    img:require('./image/500.svg'),
                    ifBack:false,
                    detail:"抱歉，请刷新页面或重试"
                },
                531:{
                    title:"500",
                    img:require('./image/500.svg'),
                    ifBack:false,
                    detail:"抱歉，请刷新页面或重试"
                },
                532:{
                    title:"500",
                    img:require('./image/500.svg'),
                    ifBack:false,
                    detail:"抱歉，该用户访问受限"
                },
                403:{
                    title:"403",
                    img:require('./image/403.svg'),
                    ifBack:true,
                    detail:"抱歉，你无权访问该页面"
                }
            }
        }
    }
    render() {
        const { params } = this.props.match;
        const { allData } = this.state;
        let currPage = null;
        try {
            currPage = !allData[params.code]?allData["403"]:allData[params.code];
        } catch (error) {
            console.log(error);
        }
        if(!currPage) return null;
        return (
            <div>
                 <div style={{margin:"200px auto 0 auto",width: "60%"}}>
                    <Row>
                        <Col span={15} style={{textAlign: "center"}}>
                           <img src={currPage.img} /> 
                        </Col>
                        <Col span={6}>
                            <p style={title}>{currPage.title}</p>
                            <p style={detail}>{currPage.detail}</p>
                            {currPage.ifBack?<Button type="primary" href="/dashboard" block>返回主页</Button>:null}
                        </Col>
                    </Row>
                 </div>
            </div>
        );
    }
}

ErrorPage.propTypes = {

};

export default ErrorPage;