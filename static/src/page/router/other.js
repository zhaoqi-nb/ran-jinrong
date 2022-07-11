'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import HomeLayout from '../layout/home/index';
import ReportLayout from '../layout/report/index';
import ReportListLayout from '../layout/reportList/index';
import OtherLayout from '../layout/other/index';
import IndexLayout from '../layout/index/index';
import i18n from '@/plugin/i18n';
import { transformText } from '../component/locales/index';
import _ from 'lodash';

const Loading = () => {
    return <div style={{ position: "absolute", left: "45%", top: "30%" }}>
        <Spin
            size="large"
            tip={`${i18n.format("加载中")}...`}
        />
    </div>
};

const configPath = [];

const customPath = ["entryRecord", "companyAnalysis", "industryAnalysis", "comprehensiveBoard", "brandAnalysis", "dominantTarget", "eventAnalysis", "specialData", "dataSourceAnalysis", "explain", "userCenter", "servicePackage", "researchReport", "reportDetail", "reportOriginal", "researchViewpoint", 'researchViewpointDetail', 'download'];

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr = [];
    let Layout = null;
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
        let isExact = true;
        if (type == "config") {
            arr.push({
                path: [`/page/config/${key}`, `/page/config/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../configPage/${key}/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        console.log('Component=>', Component)
                        return <div className="configPage" {...props} children={<Component {...props} i18n={i18n} />} />;
                    }
                })
            })
        } else if (type == "custom") {
            if (key == "userCenter" || key == "servicePackage") {
                Layout = (loaded, props) => {
                    let Component = loaded.default;
                    return <IndexLayout {...{ "path": key }} children={<Component {...props} />} />;
                }
            } else if (key == "explain") {
                Layout = (loaded, props) => {
                    let Component = loaded.default;
                    return <OtherLayout {...{ "path": key }} children={<Component {...props} />} />;
                }

            } else if (_.includes(['reportDetail', 'researchViewpointDetail'], key)) {
                Layout = (loaded, props) => {
                    let Component = loaded.default;
                    return <ReportLayout {...{ "path": key }} children={<Component {...props} />} />;
                }

            } else if (_.includes(['researchReport', 'researchViewpoint', 'download'], key)) {
                Layout = (loaded, props) => {
                    let Component = loaded.default;
                    return <ReportListLayout {...{ "path": key }} children={<Component {...props} />} />;
                }
            } else if (!_.includes(['index', 'entryRecord', 'reportDetail', 'reportOriginal', 'researchViewpointDetail'], key)) {
                // } else if (key != "index" && key != "entryRecord" && key != "reportDetail" && key != "reportOriginal") {
                Layout = (loaded, props) => {
                    let Component = loaded.default;
                    return <HomeLayout {...{ "path": key }} children={<Component {...props} />} />;
                }
            } else {
                Layout = (loaded, props) => {
                    let Component = loaded.default;
                    return <div className="customPage" children={<Component {...props} />} />;
                }
            }
            arr.push({
                path: _.includes(['researchReport', 'researchViewpoint', 'download'], key) ?
                    [`/page/config/:resId/${key}`] :
                    [`/page/${key}`],
                isExact: isExact,
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "custom-[index]"*/`../${key}/index`), loading: Loading, render: Layout
                })
            })
        }
    }
    return arr;
}

let list = [];
list = list.concat(setList('config', configPath));
list = list.concat(setList('custom', customPath));

export default list;