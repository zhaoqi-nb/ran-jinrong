'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import DataSourceLayout from '../layout/dataSource/index';
import { transformText } from '../component/locales/index';
import i18n from '@/plugin/i18n';

const Loading = () => {
    return <div style={{ position: "absolute", left: "45%", top: "30%" }}>
        <Spin
            size="large"
            tip={`${i18n.format("加载中")}...`}
        />
    </div>
};

const customPath = [,"appAnalysis","app_overview","app_contrast","app_detail","app_overview_user_scale","app_contrast_user_scale","app_detail_user_scale","app_overview_scale_trend","app_contrast_scale_trend","app_overview_user_retention","app_contrast_user_retention","app_detail_user_retention","app_overview_user_attribute","app_contrast_user_attribute","app_detail_user_attribute","app_overview_user_region","app_contrast_user_region","app_detail_user_region","app_overview_user_behavior","app_contrast_user_behavior","app_detail_user_behavior","app_overview_usage_time","app_overview_usage_time_trend","app_overview_number_starts","app_overview_number_starts_trend","app_overview_user_stickiness","app_overview_user_stickiness_trend","app_overview_user_time_sharing","app_detail_usage_time_trend","app_detail_number_starts_trend","app_detail_user_stickiness_trend","app_detail_user_time_sharing","app_contrast_usage_time","app_contrast_usage_time_trend","app_contrast_number_starts","app_contrast_number_starts_trend","app_contrast_user_stickiness","app_contrast_user_stickiness_trend","app_contrast_user_time_sharing"];
// const customPath = [,"appAnalysis","app_overview","app_contrast","app_detail","app_overview_user_scale","app_contrast_user_scale","app_detail_user_scale","app_overview_scale_trend","app_contrast_scale_trend","app_overview_user_retention","app_contrast_user_retention","app_detail_user_retention","app_overview_user_attribute","app_contrast_user_attribute","app_detail_user_attribute","app_overview_user_region","app_contrast_user_region","app_detail_user_region","app_overview_user_behavior","app_contrast_user_behavior","app_detail_user_behavior","app_overview_usage_time","app_overview_usage_time_trend","app_overview_number_starts","app_overview_number_starts_trend","app_overview_user_stickiness","app_overview_user_stickiness_trend","app_overview_user_time_sharing","app_detail_usage_time_trend","app_detail_number_starts_trend","app_detail_user_stickiness_trend","app_detail_user_time_sharing","app_contrast_usage_time","app_contrast_usage_time_trend","app_contrast_number_starts","app_contrast_number_starts_trend","app_contrast_user_stickiness","app_contrast_user_stickiness_trend","app_contrast_user_time_sharing"];
const appMicroPath = ['9800', '9862', '9876'];

// page/appAnalyze/:appId/:resId/

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr    = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
        if (type == "custom") {
            arr.push({
                path: [`/page/dataSource/:appId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <DataSourceLayout className="customPage" {...props} children={<Component {...props} urlPath={key} i18n={i18n}/>} />;
                    }
                })
            })
        }
        if (type === 'app') {
            console.log('key==>', key);
            arr.push({
                path: [`/page/appAnalyze/:appId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/appAnalyze`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <DataSourceLayout className="customPage" {...props} isMicroApp children={<Component {...props} urlPath={key} i18n={i18n}/>} />;
                    }
                })
            })
        }
    }
    return arr;
}

let list = [];
list = list.concat(setList('custom', customPath));
list = list.concat(setList('app', appMicroPath));

export default list;