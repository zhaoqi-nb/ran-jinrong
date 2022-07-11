'use strict';
import { getFormatMode } from '../../table/common/expand/base';

//获取Y轴格式化
export function getYAxisFormat(type, data, optionYAxis) {
    if (!data || !data.length) return {};
    let format = [];
    let firstAxisLabel = {
        ...getFormatMode(data[0]),
        bit_number: 0
    };
    let firstFormat = getFormatMode(data[0]);
    if (optionYAxis && optionYAxis.axisLabel) {
        if (Array.isArray(optionYAxis.axisLabel)) {
            firstAxisLabel = { ...firstAxisLabel, ...optionYAxis[0].axisLabel }
        } else {
            firstAxisLabel = { ...firstAxisLabel, ...optionYAxis.axisLabel }
        }
    }

    if (type && type.indexOf("mix") > -1) {
        let secondAxisLabel = {

            ...getFormatMode(data[1]),
            bit_number: 0,
        };
        let secondFormat = getFormatMode(data[1]);
        if (optionYAxis) {
            if (Array.isArray(optionYAxis)) {
                if (optionYAxis.length > 1 && optionYAxis[0].axisLabel) {
                    secondAxisLabel = { ...secondAxisLabel, ...optionYAxis[1].axisLabel }
                    firstAxisLabel = { ...firstAxisLabel, ...optionYAxis[0].axisLabel }
                } else {
                    secondAxisLabel = { ...secondAxisLabel, ...optionYAxis[0].axisLabel }
                }
            } else {
                secondAxisLabel = { ...secondAxisLabel, ...optionYAxis.axisLabel }
            }
        }

        format.push({
            axisLabel: firstAxisLabel,
            format: firstFormat
        })
        if (secondAxisLabel || secondFormat) {
            format.push({
                axisLabel: secondAxisLabel,
                format: secondFormat
            })
        }
    } else {
        format = {
            axisLabel: firstAxisLabel,
            format: firstFormat
        }
    }

    return format;
}

//获取X轴格式化
export function getXAxisFormat(params, xAxis) {
    if (xAxis && xAxis.axisLabel && xAxis.axisLabel.constructor === Object) {
        return {
            "type": "category",
            "axisLabel": xAxis.axisLabel,
        }
    } else {
        if (params && params["date_type"]) {
            if (params["date_type"] === 'week'
                || params["date_type"] === 'month_week'
                || params["date_type"] === 'quarter_week'
            ) {
                return {
                    "axisLabel": {
                        "date_type": 'day',
                        "type": "date"
                    },
                    "type": "category"
                }
            } else if (params["date_type"] === 'week_yyyyww') {
                return {
                    "axisLabel": {
                        "date_type": 'week_yyyyww',
                        "type": "date"
                    },
                    "type": "category"
                }
            } else {
                return {
                    "axisLabel": {
                        "date_type": params["date_type"],
                        "type": "date"
                    },
                    "type": "category"
                }
            }
        } else {
            return {
                "type": "category",
                "axisLabel": {
                    "type": "string"
                },
            }
        }
    }
}

//获取字符串宽度
export function getStrLength(str) {
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}