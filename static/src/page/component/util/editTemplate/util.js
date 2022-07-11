'use strict';

import { getComponentParam } from '../../util/template';
// import { transformText } from '../../locales/index';
import i18n from '@/plugin/i18n'

//获取标题，适用于
function getEditTitle(controlledElement, option, data = {}, connect = "-") {
	if (!option || !option.length) return "";
	//合并数据
	let mergeData = Object.assign({}, getComponentParam(controlledElement), data);
	console.log('mergeDatamergeData', mergeData)
	let arr = [];
	for (let i = 0, len = option.length; i < len; i++) {
		let obj = option[i],
			type = obj.type,
			value = obj.value;
		//占位
		if (type == "placeholder" && value == "pageTitle") {
			arr.push(i18n.format(document.title));
		}
		//动态
		else if (type == "dynamic" && mergeData) {
			let currValue = i18n.format(mergeData[value]) || ""
			if (value === 'first_type_name' || value === 'second_type_name') {
				if (currValue.indexOf('全部') != -1) {
					currValue = "全部"
				}
				// console.log('qiaojie=>mergeData',i18n.format(mergeData[value]));
			}
			if (Array.isArray(mergeData[value])) {
				arr = arr.concat(currValue);
			} else {
				arr.push(currValue)
			}
		}
		else if (type == "fixedText") arr.push(i18n.format(value));
	}
	return arr.join(connect)
}

//适用于表格趋势图标题
function getEditDrawerChartTitle(controlledElement, option, data = {}) {
	if (!option || !option.length) return "";
	//合并数据
	let mergeData = Object.assign({}, getComponentParam(controlledElement), data);
	let arr = [];
	for (let i = 0, len = option.length; i < len; i++) {
		let obj = option[i],
			type = obj.type,
			value = obj.value;
		if (type == "dynamic" && mergeData) {
			let temp = mergeData[value];
			arr.push({ type, value: temp })
		} else arr.push(obj)
	}
	return arr;
}

export { getEditTitle, getEditDrawerChartTitle };