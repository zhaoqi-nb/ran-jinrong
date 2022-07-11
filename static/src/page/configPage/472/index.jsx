'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Chart from '@chart/config'

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
            pageInfo: null,
            resAttr: {},
        }
    }
    getData = (data) => {
        if (!data) return;
        data = Base64.decode(data);
        if (!data) return;
        try {
            data = JSON.parse(data);
        } catch (error) {
            return null;
        }
        return data;
    }
    initData = () => {
        const menu = this.getData(PAGEMIXDATA);
        if (menu) {
            let pageInfo = menu.pageInfo,
                resAttr = pageInfo.resAttr,
                privilegeDtoList = pageInfo.privilegeDtoList;
            this.setState({ pageInfo, resAttr: JSON.parse(resAttr) });
        }
    }

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    setOption = (option, param) => {
        option.title.text = `${param['legend'][0]}-近30日线上销售额及同比增速`
        option.title.left = 'center'
        option.title.textStyle = {
            fontStyle : 'normal',
            fontSize  : 16
        }
        option.grid.top = '40'
        option.yAxis[0].name = ''
        option.series = option.series.map(item=>{
            item.name = ''
            return item
        })
        return option
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div className="">
                <span><FormattedMessage id="更新频率" /></span>
                <Custom_Date id='490' style={{marginRight: '24px', marginTop: 0}} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                <CustomSelect id='491' />

                <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                    <CompanyTitle id='492' />
                    {/* <UpdateTime style={{ marginLeft: '16px' }} id='493' /> */}
                </div>
                <div style={{ display: 'none' }}><CustomSelect id='494' /></div>
                <Chart id='495' style={{ height: 200 }} optionRender={this.setOption}/>
                
            </div>
        )
    }
}

Index.propTypes = {

};

export default Index;