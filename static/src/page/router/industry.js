'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import IndustryLayout from '../layout/industry/index';
import i18n from '@/plugin/i18n';
import { transformText } from '../component/locales/index';

const Loading = () => {
    return <div style={{ position: "absolute", left: "45%", top: "30%" }}>
        <Spin
            size="large"
            tip={`${i18n.format("加载中")}...`}
        />
    </div>
};

const configPath = ["381", "13", "47", "463", "473", "502", "610", "617", "624", "630", "9475", "reportAnalysis", "researchViewpoint", "11449"];

const customPath = ["industry_overview_zhuanti", "competition_pattern", "brandRanking", "productSeriesAnalysis", "priceAnalysis", "brandComparison", "commodity_ranking", "self_help_analysis", "myCombination"];

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
        if (type == "config") {
            arr.push({
                path: [`/page/industry/:industryId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../configPage/${key}/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <IndustryLayout className="configPage" {...props} children={<Component {...props} i18n={i18n} />} />;
                    }
                })
            })
        } else if (type == "custom") {
            arr.push({
                path: [`/page/industry/:industryId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <IndustryLayout className="customPage" {...props} children={<Component {...props} urlPath={key} />} />;
                    }
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