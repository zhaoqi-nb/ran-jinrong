'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import CustomCheckbox from '@checkbox/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import LinkTo from '@/page/component/url/config';
import Guide from 'byte-guide';
import RsIcon from '@/page/component/rsIcon/index';
import Observer from '@/plugin/Observer';
import { getChartReady } from './util';
import { isMatchRoute } from '../../../utils/Util';
import Api from '../../../page/component/page/menu/api';
import { getCurrSysId } from '../../../page/component/page/util';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
        this.stepFun();
    }

    //获取引导记录
    getUserGuideRecord = async () => {
        const result = await Api.getUserGuideRecord({
            sysId: getCurrSysId(),
            type: 2
        })
        let flag = null
        if (result.code == 200) {
            flag = !result.data.length ? true : false
        }
        return flag
    }

    async stepFun() {
        const isMatch = isMatchRoute('/page/company/:key/:key1/:key2');
        if (!isMatch) {
            return;
        }
        // 有没有设置过
        const isSetGuid = await this.getUserGuideRecord()
        this.setState({ isSetGuid })
        if (!isSetGuid) {
            return;
        }

        Observer.listen('顶部tab', ({ onChange }) => {
            onChange('2')
        })
        Observer.listen('底部tab', ({ onChange }) => {
            onChange('2')
        })
        getChartReady().then(() => {
            this.getSteps();
        })
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
            steps: [],
            isSetGuid: false
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

            this.setState({ pageInfo, resAttr });
        }
    }
    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    titleRender = (obj, option) => {
        if (!option.platform_code) obj.titleRight = '平台：天猫+京东'
        else {
            if (option.platform_code == 1) obj.titleRight = '平台：天猫+京东'
            else if (option.platform_code == 2) obj.titleRight = '平台：天猫+京东+抖音'
        }
        return obj
    }

    getSteps = () => {
        let steps = [{
            selector: document.querySelector(".header-industry .select-btn"),
            content: <div>{i18n.format("点击后可切换同行业其他公司")}</div>,
            placement: 'bottom-left',
            // onEvent: () => {
            //     Observer.listen('切换公司', ({ onVisibleChange }) => {
            //         console.log('onVisibleChangeonVisibleChange', onVisibleChange);
            //         onVisibleChange(true)
            //     })
            // },
            offset: {
                x: 45,
            },
        }, {
            selector: document.querySelector('.custom-date'),
            content: <div>{i18n.format("点击后可切换时间更新频率")}</div>,
            placement: 'bottom',
        },
        {
            selector: '.guide-company-platform',
            content: <div>{i18n.format(`点击下拉框可切换平台，如切换至“天猫+京东+抖音”`)}</div>,
            placement: 'bottom',
           
        },
        {
            selector: document.querySelectorAll('.guide-company-tab .ant-tabs-tab')[1],
            content: <div>{i18n.format("点击后可查看具体品牌的线上销售趋势")}</div>,
            placement: 'bottom',
          
        },
        {
            selector: document.querySelectorAll('.filter')[0],
            content: <div>{i18n.format("点击后可筛选展示的品牌")}</div>,
            placement: 'left-bottom',
            onEvent: () => {
                Observer.listen('9133', ({ onVisibleChange }) => {
                    console.log('onVisibleChangeonVisibleChange', onVisibleChange);
                    onVisibleChange(true)
                })
            },
            offset: {
                y: 100,
            }
        },
        {
            selector: document.querySelectorAll('.filter')[1],
            content: <div>{i18n.format("点击后可筛选展示的指标")}</div>,
            placement: 'left-bottom',
            onEvent: () => {
                Observer.listen('121', ({ onVisibleChange }) => {
                    console.log('onVisibleChangeonVisibleChange', onVisibleChange);
                    onVisibleChange(true)
                })
            },
            offset: {
                y: 100,
            }
        }];
        if (document.querySelector('.downIcon-wrap')) {
            steps.push({
                selector: document.querySelector('.downIcon-wrap'),
                content: <div>{i18n.format("点击后可下载图形展示的数据；表格的下载键与图形一致，在表格最右侧")}</div>,
                placement: 'left',
                // offset: {
                //     y: 10,
                // }
            })
        }
        this.setState({
            steps: steps
        })
    }

    addUserGuideRecord = async (sysId) => {
        const result = await Api.addUserGuideRecord({
            sysId,
            type: 2,
        })
    }

    onClose = () => {
        this.addUserGuideRecord(getCurrSysId());
        document.querySelector('html').style = {}
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <ComponentProps id="169" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab
                    id="98"
                    position="top-outside"
                    onObserver={(params) => {
                        Observer.loopPublish('顶部tab', params)
                    }}
                >
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='99' style={{ marginRight: '24px' }} select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} />
                            <CustomSelect id='100' />
                        </div>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='101' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='102' />
                        </div>
                        <CustomTab id="103" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomSelect id='104' style={{ marginTop: '0px' }} select_style={{ width: '230px' }} />
                                <Chart id='105' />
                                <Table id='106' titleRender={this.titleRender} />
                                {/* <LinkTo id="9158" /> */}
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='107' style={{ width: '300px' }} />
                                    <Chart id="108" />
                                    {/* <LinkTo id="9158" /> */}
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='109' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='110' titleRender={this.titleRender} />
                                    {/* <LinkTo id="9158" /> */}
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品牌分布 */}
                    <CustomTabPane>
                        <Custom_Date
                            id='111'
                            style={{ marginRight: '24px' }}
                            select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }}
                        />
                        <CustomSelect
                            id='112'
                            className="guide-company-platform"
                            style={{ marginRight: '24px' }}
                        />
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='113' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='114' />
                        </div>
                        <CustomTab
                            id="115" style={{ paddingTop: '8px' }}
                        >
                            <CustomTab
                                id="698"
                                className="guide-company-tab"
                                onObserver={(params) => {
                                    Observer.loopPublish('底部tab', params)
                                }}
                            >
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='119' style={{ width: '300px' }} />
                                    </div>
                                    <Chart id="120" />
                                    {/* <LinkTo id="9158" /> */}
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter
                                            id='9133'
                                            style={{ width: '300px' }}
                                            onObserver={(params) => {
                                                Observer.loopPublish('9133', params)
                                            }}
                                            isShowiGuid={this.state.isSetGuid}
                                        />
                                        <Filter
                                            id='121'
                                            onObserver={(params) => {
                                                Observer.loopPublish('121', params)
                                            }}
                                            style={{ width: '500px' }}
                                            style_btn={{ marginLeft: '16px' }}
                                            isShowiGuid={this.state.isSetGuid}
                                        />
                                    </div>
                                    <Chart
                                        id="123"
                                        onObserver={(params) => {
                                            Observer.publish('图表', '图表加载完成')
                                        }}
                                    />
                                    {/* <LinkTo id="9158" /> */}
                                </CustomTabPane>
                            </CustomTab>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='124' style={{ width: '300px', marginBottom: "10px" }} />
                                    <Table id='125' titleRender={this.titleRender} />
                                    {/* <LinkTo id="9158" /> */}
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='116' style={{ marginTop: 0 }} />
                                <Chart id='117' />
                                <Table id='118' titleRender={this.titleRender} />
                                {/* <LinkTo id="9158" /> */}
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类分布 */}
                    <CustomTabPane>
                        <Custom_Date id='126' style={{ marginRight: '24px' }} />
                        <CustomSelect id='127' style={{ marginRight: '24px' }} />
                        <CustomSelect id='282' style={{ marginRight: '24px' }} />
                        <CustomSelect id='283' style={{ marginRight: '24px' }} />

                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='128' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='129' />
                        </div>
                        <CustomTab id="130" style={{ paddingTop: '8px' }}>
                            <CustomTab id="699">
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='134' style={{ width: '300px' }} />

                                    </div>
                                    <Chart id="135" />
                                    {/* <LinkTo id="9158" /> */}
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='9134' style={{ width: '300px' }} />
                                        <Filter id='136' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                    </div>
                                    <Chart id="138" />
                                    {/* <LinkTo id="9158" /> */}
                                </CustomTabPane>
                            </CustomTab>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='139' style={{ width: '300px' }} />
                                    <Table id='140' titleRender={this.titleRender} />
                                    {/* <LinkTo id="9158" /> */}
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='131' style={{ marginTop: 0 }} />
                                <Chart id='132' />
                                <Table id='133' titleRender={this.titleRender} />
                                {/* <LinkTo id="9158" /> */}
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**渠道分布 */}
                    <CustomTabPane>
                        <Custom_Date id='141' style={{ marginRight: '24px' }} />
                        <CustomSelect id='142' style={{ marginRight: '24px' }} />
                        <CustomSelect id='371' style={{ marginRight: '24px' }} />
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='143' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='144' />
                        </div>
                        <CustomTab id="145" style={{ paddingTop: '8px' }}>
                            <CustomTab id="700">
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='149' style={{ width: '300px' }} />
                                    </div>
                                    <Chart id="150" />
                                    {/* <LinkTo id="9158" /> */}
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='9135' style={{ width: '300px' }} />
                                        <Filter id='151' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                    </div>
                                    <Chart id="153" />
                                    {/* <LinkTo id="9158" /> */}
                                </CustomTabPane>
                            </CustomTab>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='154' style={{ width: '300px' }} />
                                    <Table id='155' titleRender={this.titleRender} />
                                    {/* <LinkTo id="9158" /> */}
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='146' style={{ marginTop: 0 }} />
                                <Chart id='147' />
                                <Table id='148' titleRender={this.titleRender} />
                                {/* <LinkTo id="9158" /> */}
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**产品系列分布 */}
                    <CustomTabPane>
                        <Custom_Date id='156' style={{ marginRight: '24px' }} />
                        <CustomSelect id='157' style={{ marginRight: '24px' }} />
                        {/* <CustomSelect id='158' style={{ marginLeft: '24px' }} />
                        <CustomSelect id='159' style={{ marginLeft: '24px' }} /> */}
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='160' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='161' />
                        </div>
                        <CustomTab id="162" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id='373' >
                                    <CustomTabPane>
                                        <CustomSelect id='163' />
                                        <Chart id='164' />
                                        <Table id='165' titleRender={this.titleRender} />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <Filter id='375' style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                        <Table id='376' titleRender={this.titleRender} />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='166' style={{ marginTop: 0 }} />
                                <Chart id='167' />
                                <Table id='276' titleRender={this.titleRender} />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='277' style={{ marginRight: '24px', marginTop: 0 }} />
                                <CustomSelect id='279' style={{ marginTop: 0 }} />
                                <Chart id='280' />
                                <Table id='281' titleRender={this.titleRender} />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                {
                    this.state.steps.length > 0 && <Guide
                        steps={this.state.steps}
                        visible={true}
                        onClose={() => { this.onClose() }}
                        afterStepChange={(nextIndex, nextStep) => {
                            if (!nextStep) return
                            nextStep.onEvent && nextStep.onEvent();
                        }}
                        closeEle={<RsIcon type="icon-guanbi" style={{ color: '#8c8c8c', fontSize: 16 }} />}
                        stepText={(stepIndex, stepCount) => `${stepIndex}/${stepCount}`}
                        nextText={i18n.format("下一个")}
                        prevText={i18n.format("上一步")}
                        okText={i18n.format('我知道了')}
                    />
                }

            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;