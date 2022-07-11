'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import CompanyLayout from '../layout/company/index';
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

const configPath = ["397", "97", "170", "181", "208", "219", "238", "357", "347", "295", "312", "284", "443", "452", "6554", "527", "517", "248", "6598", "6612", "6627", "6630", "6662", "6724", "6771", "6803", "6912", "6692", "6787", "6833", "6867", "6882", "6897", "6677", "6709", "6756", "6818", "6852", "7012", "6956", "7154", "7175", "7229", "7372", "7447", "7586", "7604", "7630", "7680", "7418", "7430", "7893", "7715", "7742", "7753", "7764", "7775", "7786", "7809", "7821", "7725", "7798", "7833", "8039", "8049", "8080", "8094", "8097", "8277", "8292", "8438", "8453", "8472", "8487", "8468", "8380", "8406", "8329", "8422", "8502", "8799", "8868", "8902", "8947", "9120", "9142", "9355", "9454", "9475", "9484", "9511", "9578", "9656", "9765", "9780", "reportAnalysis", "researchViewpoint", "10547", "10641", "10570", "10600", "10771", "10920", "10979", "11003", "11061", "11119", "11178", "11202", "11226", "11303", "11426"];

const customPath = ["appAnalysis"];

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
        if (type == "config") {
            arr.push({
                path: [`/page/company/:companyId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../configPage/${key}/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <CompanyLayout className="configPage" {...props} children={<Component {...props} i18n={i18n} />} />;
                    }
                })
            })
        } else if (type == "custom") {
            arr.push({
                path: [`/page/company/:companyId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <CompanyLayout className="customPage" {...props} children={<Component {...props} urlPath={key} />} />;
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