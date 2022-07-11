import _ from 'lodash';
import { getUserInfoData } from '../page/component/page/util';
import { getMenuData, getDataSourceMenuData } from '../page/component/page/util';
import Api from '../page/dataSourceAnalysis/store/api'
/**
 * 当前路由是否是一级市场
 */
export function isPrimaryMarket() {
    return location.pathname.startsWith('/page/appPM')
}

export function isAppAnalyze() {
    return location.pathname.startsWith('/page/appAnalyze')
}


function getMenuDataByMapKeyName(keyName) {
    const menuData = getMenuData();
    let result = null;
    const find = (menusList) => {
        for (const item of menusList) {
            const resAttrJson = JSON.parse(item.resAttr);
            if (resAttrJson.mapKey === keyName) {
                result = item; //
            }

            if (item.child) {
                find(item.child)
            }
        }
    }

    find(menuData);
    return result;
}

function getAppAnalysisMenuDataByMapKeyName(keyName) {
    const appAnalysisMenuData = getDataSourceMenuData()
    let result = null;
    let parentId = null;
    const find = (menusList) => {
        for (const item of menusList) {
            const resAttrJson = item.resAttr ? JSON.parse(item.resAttr) : {};
            if (resAttrJson.mapKey === keyName) {
                result = item
                result.parentId = parentId
                break
            }
            if (item.child) {
                parentId = item.resId
                find(item.child)
            }
        }
    }

    find(appAnalysisMenuData.child);
    return result;
}

export function getPrimaryMarketRouterParams(pmMapKeyName) {
    let currMapMenu = null;
    if (isPrimaryMarket(pmMapKeyName)) {
        if (pmMapKeyName) {
            currMapMenu = getMenuDataByMapKeyName(pmMapKeyName);
            // console.log('pmMapKeyName=>', pmMapKeyName, currMapMenu);
        }
        const splits = location.pathname.split('/');
        return {
            resId: currMapMenu?.resId || splits[splits.length - 2],
            pageId: splits[splits.length - 1]
        }
    } else if (isAppAnalyze()) {
        // pmMapKeyName ==  'app分析-行业详情' || 'app分析-行业对比'
        const currMapMenu = getAppAnalysisMenuDataByMapKeyName(pmMapKeyName);
        const splits = location.pathname.split('/');
        return {
            parentId: currMapMenu?.parentId || splits[splits.length - 3],
            resId: currMapMenu?.resId || splits[splits.length - 2],
            pageId: splits[splits.length - 1]
        }
    }
    return null;
}

/**
 * 获取关注数据
 * @returns 
 */
export function getPrimaryMarketFocusOptions() {
    return getUserInfoData().primaryMarketFocusOptions;
}

/**
 * 获取关注数据
 * @params ['国内电商', '行业分析']
 * @returns '/page/appPM/15160'
 */
export function getMenuPathByKeys(keys) {
    const menuData = getMenuData();
    let current = menuData;
    const href = _.chain(keys)
        .reduce((acc, key) => {
            const f = _.find(current, t => t.resName === key)
            if (!f) return acc;
            current = f.child || [];
            const resAttr = JSON.parse(_.get(f, 'resAttr', "{}"))
            acc = resAttr.path
            return acc
        }, '')
        .value()
    if (!href) return '/';
    return `/page/${href}`
}

window.cc = getMenuPathByKeys;