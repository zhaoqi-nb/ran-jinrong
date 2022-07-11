// 获取筛选条件的的工具类
import { i18n } from '@/components/FastIntl';

// const excludeTitle = ['指标选择','触发title组件'];

export function handelExplain(data) {
    let explain = '';
    data && data.split && data.split('&&').forEach(item => {
        explain += `${i18n.format(item)}\r\n`;
    })
    return explain
    // return data && data.replace && data.replace(/&&/g, '\r\n')
}

function getItem(item) {
    const title = item.querySelector('.select-title')?.textContent;
    let value = item.querySelector('.ant-select-selection-item')?.textContent;
    const divTitle = item.querySelector('.excel-select-content')?.getAttribute('title');
    if (divTitle && divTitle !== 'EMPTY') {
        value = divTitle;
    }
    if (!value) {
        const pTitle = item.querySelector('.excel-select-content')?.getAttribute('pTitle');
        value = pTitle;
    }
    return {
        title,
        value,
    }
}

function getFilterOptionItem(item) {
    const title = item.querySelector('.filter-title')?.textContent;
    const valueList = item.querySelectorAll('.filter-list .active');
    const value = Array.from(valueList)?.map(item => item?.textContent)?.join(',');
    return {
        title,
        value
    }
}


// 排除一些带Id
let excludeSelectIds = ["9935",'11369', '11370','11373', '11371','11374',
'11375','11376', '11377','11378', '11379', '11383', '11384', '11385','11386', '11387', '11388',
'11389', '11390', '11391', '11392', '11393', '11394', '11395', '11396', '11397', '11402', '11403', 
'11404', '11405', '11406', '11407', '11408', '11409', '11410','11411', '11412', '11413', '11414', '11415', '11416'];

function excludeSelectIdsFun(currElement) {
    let isExclude = false;
    for (let j = 0; j < excludeSelectIds.length; j++) {
        const key = `[t-id="${excludeSelectIds[j]}"]`;

        if (currElement?.querySelector(key)) {
            isExclude = true;
        }
    }
    return isExclude;
}

/**
 * 排除一些筛选项
 * @param {*} list 
 * @returns 
 */
function excludeSelect(list) {
    let newList = [];
    const dateSelect = document.querySelector('.excel-date .excel-select'); // 日期选择框
    const excludeSelect = document.querySelector('.excel-exclude-down-select');
    for (let i = 0; i < list.length; i++) {
        const curr = list[i];
        
      
        // 排除日期选择框
        if (curr !== dateSelect && curr !== excludeSelect && !excludeSelectIdsFun(curr)) {
            newList.push(curr);
        }
    }
    return newList;
}

/**
 * 获取处理后的ItemList
 * @param {*} list 
 * @returns 
 */
function getItemList(list) {
    const excludeTitle = [i18n.format("指标选择"), '触发title组件'];
    let itemList = [];
    let upItem = {};
    for (let i = 0; i < list.length; i++) {
        const curr = list[i];
        const item = getItem(curr);
        if (!item.value) {
            continue;
        }
        if (item.title) {
            // 排除title
            if (excludeTitle.indexOf(item.title) !== -1) {
                continue;
            }

            itemList.push(item);
            upItem = item;
        } else {
            upItem.value += `-${item.value}`
        }
    }

    return itemList;
}

function getFilterOptionList(list) {
    let itemList = [];
    for (let i = 0; i < list.length; i++) {
        const curr = list[i];
        const item = getFilterOptionItem(curr);
        itemList.push(item);
    }
    return itemList;
}


function getFilterGroupList() {
    const dom = document.querySelector('.excel-filter-group');
    if (!dom) {
        return [];
    }
    try {
        const str = dom.getAttribute('excel-data');
        return JSON.parse(str);
    } catch (error) {
        return []
    }

}

export function getFilterInfo(isDownload) {
    /**
     * 处理下拉选项
     */
    const list = isDownload ? document.querySelectorAll(`.ant-drawer-body .excel-select`) : document.querySelectorAll(`.excel-select`);
    let newList = excludeSelect(list);
    newList = getItemList(newList);

    /**
     * 处理filterOption
     */
    const filterOptionList = document.querySelectorAll('.custom-filterOption');
    const filterList = getFilterOptionList(filterOptionList);

    /**
     * 处理filter-group
     */

    const filterGroupList = getFilterGroupList();
    return [...newList, ...filterList, ...filterGroupList];
}

// 界面名称
export function getPageName() {
    return document.querySelector('.excel-title')?.textContent;
}

// 数据周期
function getDataCycle() {
    const content = document.querySelector('.excel-time')?.textContent;
    if (content) {
        return content.replace('数据周期', '').replace('Data Period', '').replace('：', '').replace(':', '');
    }
    return null;
}


export function getPageInfo() {
    const currPageName = getPageName();
    const list = [];
    if (currPageName) {
        list.push({
            title: `${i18n.format("界面名称")}`,
            value: getPageName()
        })
    }

    const dataCycle = getDataCycle();
    if (dataCycle) {
        list.push({
            title: `${i18n.format("数据周期")}`,
            value: dataCycle
        })
    }
    return list;
}

export function getPageDesc() {


    const valueContent = document.querySelector('.excel-explain-wrapper-content')?.getAttribute('title'); // 财报说明
    const value = document.querySelector('.excel-title-desc')?.getAttribute('title');
    if (valueContent || value) {
        return {
            title: `${i18n.format("页面说明")}`,
            value: handelExplain(valueContent || value)
        }
    }
    return null;
}