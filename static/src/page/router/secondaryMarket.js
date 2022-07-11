'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import i18n from '@/plugin/i18n';
import SecondaryMarketLayout from '../layout/secondaryMarket';
import BoardLayout from '../layout/board';
import PrimaryMarketHomeLayout from '../layout/primaryMarket/home';

const Loading = () => {
    return <div style={{ position: "absolute", left: "45%", top: "30%" }}>
        <Spin
            size="large"
            tip={`${i18n.format("加载中")}...`}
        />
    </div>
};

// const configPath = ["9910", "9936", "10014", "10107", "10121", "10134", "10149", "10181", "10285"];
const configPath = ["10492", "10253", "10518", "10532", "10615", "10723", "10737", "10679", "10694", "10708"];

const customPath = ['focus'];

const noResCustomPath = ['11342']

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
        if (type == "config") {
            arr.push({
                path: [`/page/appSM/:boardId/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/secondaryMarket`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <SecondaryMarketLayout className="configPage" {...props} children={<Component {...props} urlPath={key} i18n={i18n} />} />;
                    }
                })
            })
        }
        if (type === 'custom') {
            arr.push({
                path: [`/page/appSM/:resId/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/secondaryMarket`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <PrimaryMarketHomeLayout className="customPage" {...props} children={<Component {...props} urlPath={key} />} />;
                    }
                })
            })
        }
        if (type === 'noResCustom') {
            arr.push({
                path: [`/page/appSM/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "config-[index]"*/`../otherSystem/secondaryMarket`), loading: Loading, render(loaded, props) {
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
list = list.concat(setList('noResCustom', noResCustomPath));


export default list;