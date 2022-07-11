'use strict';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.less'
import { Link } from 'react-router-dom';
import { getSystemData } from '../component/page/util';
import { Row, Col} from 'antd'
import i18n from '@/plugin/i18n'

const locale = i18n.getLocalLanguage();
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady      : false,
            AllSystemList: [{
                code:"ranshu-finance-node",
                title:i18n.format("金融研究系统"),
                desc:_.map([
                    {title:"面向客户",text:"一级市场和二级市场的机构投资者;"},
                    {title:"数据源",text:"线上消费、舆情评论、外卖餐饮、招聘、线下门店、APP等多个新型数据源;"},
                    {title:"覆盖行业",text:"大消费 (服装/美妆/食品/餐饮/旅游/家电/3C等)、电商平台、娱乐等;"},
                    {title:"使用场景",text:"行业趋势分析、竞争格局分析、赛道扫描、商业尽调、投后管理等;"},
                ], ({title, text}) => ({title: i18n.format(title), text: i18n.format(text)})),
                tag:_.map(["我的看板", "行业分析", "品牌排行", "公司分析"], item => i18n.format(item)),
                img:"../page/image/finance.png",
                href:"/"
            }
            // ,{
            //     code:"ranshu-consumer-node",
            //     title:"消费研究系统",
            //     desc:"面向消费企业研究客户，覆盖电商、线下门店、APP等多个数据源支持赛道，品牌，商品，概念，舆情等多个角度洞察品牌极其竞品。",
            //     tag:["看板", "数据总结", "研究报告", "赛道洞察", "品牌、概念洞察"],
            //     img:"../page/image/consumption.png",
            //     href:"javascript:void(0);"
            // },{
            //     code:"ranshu-lowCode-node",
            //     title:"低代码平台",
            //     desc:"面向消费企业研究客户，覆盖电商、线下门店、APP等多个数据源支持赛道，品牌，商品，概念，舆情等多个角度洞察品牌极其竞品。",
            //     tag:["看板", "数据总结", "研究报告", "按数据源分类产品", "行业、公司、品牌、事件分析"],
            //     img:"../page/image/lowcode.png",
            //     href:"javascript:void(0);"
            // }
        ],
            systemList : []
        }
    }
    initData = async () => {
        const { AllSystemList } = this.state;
        const systemList = this.transformData(getSystemData(), AllSystemList)
        this.setState({ systemList, isReady: true });
    }
    transformData = (data, AllSystemList) =>{
        let systemList = [];
        for(let i=0,len=AllSystemList.length;i<len;i++){
            let obj = AllSystemList[i];
            let index = data.findIndex(item=>item.sysUniqueCode == obj.code);
            if(index !=-1) systemList.push(obj);
        }
        if(systemList && systemList.length) systemList.push({});
        return systemList;
    }

    renderDesc = (arr) => {
        return arr.map(item=>{
            return <Row>
                <Col span={locale=='zh_CN'?4:5}>{item.title} <span style={{float: "right"}}>：</span></Col>
                <Col span={locale=='zh_CN'?20:19} >{item.text}</Col>
            </Row>
        })
    }
    renderHome = ()=> {
        const {AllSystemList} = this.state
        return AllSystemList.map((item, index)=>{
            return <div className={`module${index%2!=0?' rightmodule':""}${item.code?"":" none"}`} style={{height:`${locale=='zh_CN'?'304px':'404px'}`}}>
                        {
                            item.code?<div>
                            <p>
                                <span className='title'>{item.title}</span>
                                <Link to={item.href} key="index">
                                    <span className='link-btn'>{i18n.format('进入系统')}</span>
                                </Link>
                            </p>
                            <p className='desc' style={{height:`${locale=='zh_CN'?'125px':'225px'}`}}>{this.renderDesc(item.desc)}</p>
                            <p className='tag-title'>{i18n.format('核心功能')}</p>
                            <div className='content'>
                                <p className='tagsList'>
                                    {
                                        item.tag.map(v=>{
                                            return <span className="tags">#{v}</span>
                                        })
                                    }
                                </p>
                                <p className='imgs'>
                                    <p>
                                        {
                                            item.code=="ranshu-finance-node"&&<img src={require("../image/finance.png")}/>
                                        }
                                        {
                                            item.code=="ranshu-consumer-node"&&<img src={require("../image/consumption.png")}/>
                                        }
                                        {
                                            item.code=="ranshu-lowCode-node"&&<img src={require("../image/lowcode.png")}/>
                                        }
                                    </p>
                                </p>
                            </div>
                        </div>:<div>{i18n.format('更多产品')}</div>
                        }
                        
                    </div>
        })
    }
    render() {
        const { isReady } = this.state;
        if (!isReady) return null;
        return (
            <div className='home-page'>
                <div className='home-box'>
                    {this.renderHome()}
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;