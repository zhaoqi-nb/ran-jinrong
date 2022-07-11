'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin} from 'antd';
import './index.less';
import  RsIcon from '../component/rsIcon/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();

    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            colorList: {
                "联系申请" : "linear-gradient(270deg, #0697FF 0%, #0678FF 100%)",
                "付费使用": "linear-gradient(270deg, #33C292 0%, #00B277 100%)",
                "敬请期待": "linear-gradient(270deg, #FF6C79 0%, #FF4757 100%)",
                "不能访问": "linear-gradient(270deg, #A4B6CC 0%, #90A5BF 100%)"
            }
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    handleOnChange = (id) =>{
        this.setState({id})
        
    }
    renderContent = (data) => {
        const { colorList } = this.state;

        return data.map((item, index) => {
            let _className = !(item.accessState && (item.accessState.code == 'all' || item.accessState.code == 'view'))?"content-item disabled":"content-item box-shadow-add";
            return <a href={item.href} target={item.href && item.href !='javascript:void(0);'?"_blank" : "_self"}>
                <div className={_className}>
                    {!(item.accessState && (item.accessState.code == 'all' || item.accessState.code == 'view')) ? <span className="content-flag" style={{background: `${colorList[item.accessState.name]}`}}>{item.accessState.name}</span> : null}
                    {
                        !(item.accessState && (item.accessState.code == 'all' || item.accessState.code == 'view')) ? (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="item-name" style={{ color: '#8C8C8C' }}>{item.resName}</div>
                                    {item.resObj && <div className="item-info"><span className="stock-code" style={{ color: '#8C8C8C' }}>{item.resObj.stock_code}</span><span className="vertical-divider" style={{ marginRight: '8px', color: '#E5E5E5' }}></span><span className="industry-category" style={{ color: '#8C8C8C' }}>{item.resObj.industry}</span>
                                        {item.attendFlag && <React.Fragment><span className="vertical-divider" style={{ marginRight: '9px', color: '#E5E5E5'  }}></span><RsIcon type="icon-guanzhu" style={{ fontSize: '16px', color: '#FFBA00' }} /> </React.Fragment> }
                                    </div>}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="item-name" >{item.resName}</div>
                                    {item.resObj && <div className="item-info"><span className="stock-code" >{item.resObj.stock_code}</span><span className="vertical-divider" style={{ marginRight: '8px' }}></span><span className="industry-category">{item.resObj.industry}</span>
                                        {item.attendFlag && <React.Fragment><span className="vertical-divider" style={{ marginRight: '9px', color: item.flag ? '#E5E5E5' : '' }}></span><RsIcon type="icon-guanzhu" style={{ fontSize: '16px', color: '#FFBA00' }} /> </React.Fragment> }
                                    </div>}
                                </div>
                            </div>
                        )
                    }
                </div>
            </a>
        })
    }
 

    render() {
        const { data, isReady} = this.props;
        return (
            <Spin spinning={!isReady}>
            <div className="componay-content-wrapper">
                <div className="company-num">共{data.length || 0}个公司</div>
                <div id="content" className="content">
                    {this.renderContent(data)}
                </div>
            </div>
            </Spin>
        );
    }
}

Index.propTypes = {

};

export default Index;