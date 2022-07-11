'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import PrimaryMarketLayout from '../layout/primaryMarket/index';
import i18n from '@/plugin/i18n';
import PrimaryMarketHomeLayout from '../layout/primaryMarket/home';
import { transformText } from '../component/locales/index';

const Loading = () => {
    return <div style={{ position: "absolute", left: "45%", top: "30%" }}>
        <Spin
            size="large"
            tip={`${i18n.format("加载中")}...`}
        />
    </div>
};

// const configPath = ["9910", "9936", "10014", "10107", "10121", "10134", "10149", "10181", "10285"];
const configPath = ["9936", "9978", "10134", "10149", "10290", "10348", "10364", "11261"];

const customPath = ["dashboard", "9910", "financing", "10014", "10107", "10121", "10181", "10285", "10273", "10394", "10405", "10428", "10439", "10453"];

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
        if (type == "config") {
            arr.push({
                path: [`/page/appPM/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/primaryMarket`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <PrimaryMarketLayout className="customPage" {...props} children={<Component {...props} urlPath={key} />} />;
                    }
                })
            })
        } else if (type == "custom") {
            arr.push({
                path: [`/page/appPM/:resId/${key}`],
                // component: Loadable({
                //     loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/primaryMarket`), loading: Loading, render(loaded, props) {
                //         let Component = loaded.default;
                //         return <PrimaryMarketLayout className="customPage" {...props} children={<Component {...props} urlPath={key} />} />;
                //     }
                // })
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/primaryMarket`), loading: Loading, render(loaded, props) {
                        console.log('一级loaded', loaded)
                        let Component = loaded.default;
                        return <PrimaryMarketHomeLayout className="customPage" {...props} children={<Component {...props} urlPath={key} />} />;
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