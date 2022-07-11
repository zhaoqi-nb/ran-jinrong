'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollView from '../../components/ScrollView';
import './index.less'

class Index extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
    }
    render() {
        return (
            <ScrollView>
                <div className='page-list'>
                    <a href="/page/entryRecord" target='_blank'>录入配置化页面</a>
                    <a href="/page/index" target='_blank'>首页</a>


                    <a href="/page/config/6598" target='_blank'>瑞幸</a>
                    <a href="/page/config/6627" target='_blank'>美团外卖</a>
                    <a href="/page/config/7893" target='_blank'>美团到家</a>
                    <a href="/page/config/6662" target='_blank'>饿了么</a>
                    <a href="/page/config/6612" target='_blank'>星巴克</a>
                    <a href="/page/config/6724" target='_blank'>盒马</a>
                    <a href="/page/config/6771" target='_blank'>天猫超市</a>
                    <a href="/page/config/6803" target='_blank'>天猫电商</a>
                    <a href="/page/config/6912" target='_blank'>Mercari</a>
                    <a href="/page/config/7418" target='_blank'>凑凑</a>
                    <a href="/page/config/7430" target='_blank'>呷哺呷哺</a>

                    <a href="/page/config/6630" target='_blank'>Shopee</a>

                    <a href="/page/config/6956" target='_blank'>九毛九</a>
                    <a href="/page/config/7154" target='_blank'>我爱我家-二手房业务分析</a>
                    <a href="/page/config/7175" target='_blank'>我爱我家-租房业务分析</a>
                    <a href="/page/config/6692" target='_blank'>有才天下猎聘</a>
                    <a href="/page/config/6787" target='_blank'>汽车之家</a>
                    <a href="/page/config/6833" target='_blank'>易车</a>
                    <a href="/page/config/6867" target='_blank'>青客</a>
                    <a href="/page/config/6882" target='_blank'>DoorDash</a>
                    <a href="/page/config/6897" target='_blank'>每日优鲜</a>

                    <a href="/page/config/6677" target='_blank'>京东-京东数据</a>
                    <a href="/page/config/6709" target='_blank'>京东-京造数据</a>
                    <a href="/page/config/6756" target='_blank'>奈雪的茶</a>
                    <a href="/page/config/6818" target='_blank'>Poshmark</a>
                    <a href="/page/config/6852" target='_blank'>前程无忧</a>

                    <a href="/page/config/7012" target='_blank'>百胜中国</a>
                    <a href="/page/config/7229" target='_blank'>阿里健康</a>
                    <a href="/page/config/7372" target='_blank'>京东健康</a>
                    <a href="/page/config/7447" target='_blank'>贝壳-二手房业务分析</a>
                    <a href="/page/config/7586" target='_blank'>贝壳-新房业务分析</a>
                    <a href="/page/config/7604" target='_blank'>贝壳-链家二手房业务分析</a>
                    <a href="/page/config/7630" target='_blank'>贝壳-租房业务分析</a>
                    <a href="/page/config/7680" target='_blank'>海底捞</a>

                    <p style={{ margin: '20px 0 10px 0' }}>模板四</p>
                    <a href="/page/config/7725" target='_blank'>抖音-电商业务分析</a>
                    <a href="/page/config/8277" target='_blank'>抖音-短视频业务分析(缺少后端配置)</a>
                    <a href="/page/config/7798" target='_blank'>心动公司</a>
                    <a href="/page/config/7833" target='_blank'>哔哩哔哩-视频业务分析</a>
                    <a href="/page/config/8468" target='_blank'>哔哩哔哩-直播业务分析(待联调)</a>
                    <a href="/page/config/7715" target='_blank'>西瓜视频-西瓜视频数据-视频业务分析</a>
                    <a href="/page/config/7742" target='_blank'>欢聚-YY数据-直播业务分析</a>
                    <a href="/page/config/7753" target='_blank'>欢聚-BIGO数据-直播业务分析(缺少后端配置)</a>
                    <a href="/page/config/7764" target='_blank'>斗鱼-斗鱼数据-直播业务分析</a>
                    <a href="/page/config/7775" target='_blank'>虎牙-虎牙数据-直播业务分析</a>
                    <a href="/page/config/7786" target='_blank'>腾讯控股-腾讯视频数据-视频业务分析</a>
                    <a href="/page/config/7809" target='_blank'>爱奇艺-爱奇艺数据-视频业务分析</a>
                    <a href="/page/config/7821" target='_blank'>芒果超媒-芒果TV数据-视频业务分析</a>
                    <a href="/page/config/8329" target='_blank'>网易云-音频业务分析</a>
                    <a href="/page/config/8422" target='_blank'>YY直播-直播业务分析(缺少后端配置)</a>

                    <p style={{ margin: '20px 0 10px 0' }}>模板六</p>
                    <a href="/page/config/8080" target='_blank'>海底捞数据-价格分析</a>
                    <a href="/page/config/8094" target='_blank'>海底捞数据-排队分析</a>
                    <a href="/page/config/8097" target='_blank'>呷哺呷哺-凑凑数据-排队分析</a>
                    <a href="/page/config/8039" target='_blank'>呷哺呷哺-呷哺呷哺数据-排队分析</a>
                    <a href="/page/config/8049" target='_blank'>九毛九-太二酸菜鱼数据-排队分析</a>



                    <p style={{ margin: '20px 0 10px 0' }}>模板一</p>
                    <a href="/page/config/8380" target='_blank'>映客数据-直播业务分析</a>
                    <a href="/page/config/8406" target='_blank'>网易云音乐-直播业务分析</a>
                    <a href="/page/config/8292" target='_blank'>喜马拉雅</a>
                    <a href="/page/config/8438" target='_blank'>猫眼娱乐</a>
                    <a href="/page/config/8453" target='_blank'>QQ音乐(缺后端配置)</a>
                    <a href="/page/config/8472" target='_blank'>酷狗音乐(缺后端配置)</a>
                    <a href="/page/config/8487" target='_blank'>全民K歌(缺后端配置)</a>
                    <a href="/page/config/8799" target='_blank'>心动公司-心动公司数据-自研游戏业务分析</a>
                    <a href="/page/config/8902" target='_blank'>拼多多</a>

                    <p style={{ margin: '20px 0 10px 0' }}>模板二</p>
                    <a href="/page/config/8502" target='_blank'>腾讯音乐-QQ音乐数据-音频业务分析</a>
                    <a href="/page/config/8947" target='_blank'>国美电器-国美电器数据-电商业务分析</a>
                    <a href="/page/config/9355" target='_blank'>波奇宠物（未对接)</a>

                    <p style={{ margin: '20px 0 10px 0' }}>财报</p>
                    <a href="/page/config/9454" target='_blank'>科技版财报（未对接)</a>
                    <a href="/page/config/9475" target='_blank'>消费版-行业：财报</a>

                    <p style={{ margin: '20px 0 10px 0' }}>其他</p>
                    <a href="/page/config/9578" target='_blank'>泡泡玛特：小红书舆情</a>
                    <a href="/page/config/9656" target='_blank'>泡泡玛特：公司概览</a>



                </div>
            </ScrollView>
        );
    }
}

Index.propTypes = {

};

export default Index;