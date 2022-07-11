'user strict';
import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import IndexLayout from '../layout/index/index';
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


const customPath = ["index"];

const setList = (type, data) => {
    if (!data || !data.length) return [];
    let arr    = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let key = data[i];
       if (type == "custom") {
            arr.push({
                path: [`/page/${key}`],
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "custom-[index]"*/`../${key}/index`), loading: Loading, render(loaded, props) {
                        let Component = loaded.default;
                        return <IndexLayout children={<Component {...props} i18n={i18n}/>} />;
                    }
                })
            })
        }
    }
    return arr;
}

let list = [];
list = list.concat(setList('custom', customPath));

export default list;