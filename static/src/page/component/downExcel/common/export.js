'use strict';
import * as FileSaver from 'file-saver';
import { getPageInfo } from '../../util/privilege';
/**
 * 设置Excel基础属性
 * @param {Object} Workbook 
 */
function setProperties(wb) {
    //Set Workbook Properties
    wb.created = new Date();
    wb.modified = new Date();
    wb.lastPrinted = new Date();
}


function getResType() {
    let resType = "normal";
    try {
        let pageInfo = getPageInfo();
        let resAttr = pageInfo.resAttr;
        if (resAttr.downloadType) resType = resAttr.downloadType;
    } catch (error) {
        console.log("判断资源类型出错", error);
    }

    return resType;
}


/**
 * 设置免责声明
 * @param {Object} Workbook 
 */
function setDisclaimer(wb) {
    let resType = getResType();
    // Add a Worksheet
    let worksheet = wb.addWorksheet('免责声明', {
        properties: {
            defaultRowHeight: 26
        }
    });
    // Add Row
    worksheet.addRow(["免责声明："]);
    if (resType == "app") {
        worksheet.addRow([`Databurning procures data from qualified third party to enrich database and improve the service to our client.  Databurning uses commercially reasonable efforts to ensure that data sourced from third parties will be in compliance with our data protocols.  However, due to the limitation of investigation and supervision of the third party, we are not able to guarantee you that third party data will meet the requirement above at all times.  In the event any intellectual property infringement or incompliance with our protocol has been found in relation to any third-party data, Databurning will immediately stop the relationship with such third-party.`]);
        worksheet.addRow(["燃数从合资格的第三方获取数据，以丰富其数据库并为客户提供更好的服务。燃数将采取商业上合理的措施来确保来自第三方的数据符合数据协议的要求。但由于第三方调查和监督的限制，我们无法向您保证第三方数据始终满足上述要求。若发现任何与任何第三方数据有关的知识产权侵权或违反我司内控制度规定的情况，燃数将立即停止与该第三方数据供应商的合作。"]);
    } else {
        worksheet.addRow([`You expressly understand and agree that: (a) the service provided by Databurning and data therein, including the data Databurning sourced from third party, is provided on an "as is" and "as available" basis, and Databurning and its affiliates, officers, employees and licensors expressly disclaim all and any warranties, whether express or implied, of merchantability, title, fitness for a particular purpose; (b) Databurning and its affiliates, officers, employees, and licensors make no warranty that (i) the service will be error-free, (ii) the results that may be obtained from the use of our service will be accurate or reliable for a particular purpose; and (c) the services provides Databurning and its affiliates, officers or employees does not constitute and shall not be construed as any advice or warranty in relation to making any investment, forecast or deal, or other decision-making.`]);
        worksheet.addRow(["贵方明确理解并同意：(a) 燃数提供的服务和其中的数据，包括燃数从第三方获取的数据，是在“现况”和“现有”的基础上提供的，燃数及其附属公司、管理人员、员工和许可方明确表示不对相关适销性、所有权、特定用途适用性作出任何明示或暗示的担保；(b) 燃数及其附属公司、管理人员、员工和许可方不保证 (i) 服务不会出现任何差错，(ii) 使用我们的服务可能获得的结果对特定目的而言是准确或可靠的；以及(c) 燃数及其附属公司、管理人员或员工提供的服务不构成也不应被解释为就任何投资、预测或交易、或其他决策提出任何建议或作出任何保证。"]);
    }

    let col = worksheet.getColumn(1);
    col.width = 140;

    let row = worksheet.getRow(2);
    row.height = 90;

    row = worksheet.getRow(3);
    row.height = 90;

    worksheet.getCell('A2').alignment = { vertical: 'middle', wrapText: true };
    worksheet.getCell('A3').alignment = { vertical: 'middle', wrapText: true };
    let default_fontStyle = {
        name: "微软雅黑",
        size: 12,
        vertAlign: "left"
    }
    // worksheet.getCell('A1').font = {...default_fontStyle, bold: true};
    // worksheet.getCell('A2').font = {...default_fontStyle,...{size:11}};
}

/**
 * 合并行列
 * @param {Array} merges 
 * @param {Worksheet} ws 
 */
function getMergeCells(merges, ws) {
    if (!merges || !merges.length) return null;
    for (let i = 0, len = merges.length; i < len; i++) {
        let obj = merges[i],
            start = obj.s,
            end = obj.e;

        ws.mergeCells(start.r + 1, start.c + 1, end.r + 1, end.c + 1);
    }
}


/**
 * 表格头部
 * @param {Array} data 
 * @param {Object} config 
 * @param {worksheet} ws 
 */
function getHeader(data) {
    if (!data || !data.length) return null;
    let header = [];
    let width = 20;
    for (let r = 0, r_len = data.length; r < r_len; r++) {
        let value = data[r];
        header.push({ header: value, key: value })
    }
    return header;
}


/**
 * 设置业务数据
 * @param {*} wb 
 * @param {Object} param 
 * @param {Object} param 
 */
function setBusinessData(wb, param, config, title = "数据") {
    let header = param.header,
        dataSource = param.dataSource,
        merges = param.merges;

    let worksheet = wb.addWorksheet(title, {
        properties: {
            defaultRowHeight: 26,
            defaultColWidth: 13,
        },
        alignment: {
            vertical: 'middle', horizontal: 'center'
        }
    });
    //是否是复杂表头
    let ifComplexTable = config && config.ifComplexTable ? true : false;
    //复杂表头
    if (ifComplexTable) {
        worksheet.addRows(header);
    }
    //普通表格
    else {
        worksheet.columns = getHeader(header)
    }
    //添加数据
    worksheet.addRows(dataSource);
    //合并列
    if (merges && merges.length) getMergeCells(merges, worksheet)
}

//删除特殊字符
function deleteSpecialCharacters(val) {
    var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0, l = val.length; i < val.length; i++) {
        rs = rs + val.substr(i, 1).replace(reg, '');
    }
    return rs;
}

/**
 * 导出excel文件
 * @param {Object} param 
 * @param {Fun} callback 
 */
function exportExcel(param, callback = () => { }) {
    const { title, config, ifAddtime } = this.props;
    import(/* webpackChunkName: "exceljs"*/'exceljs').then(function (Excel) {
        try {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let workbook = new Excel.Workbook();
            //Set Workbook Properties
            setProperties(workbook);
            // Add a Worksheet
            setDisclaimer(workbook);
            //是否需要多个sheet
            if (config.ifMoreSheet && param.constructor === Array) {
                for (let i = 0, len = param.length; i < len; i++) {
                    let temp = param[i],
                        sheetTitle = config.sheetTitle;
                    //add table data
                    setBusinessData(workbook, temp, config, deleteSpecialCharacters(sheetTitle[i] || `数据${i + 1}`));
                }
            } else {
                //add table data
                setBusinessData(workbook, param, config);
            }

            let file_name = null

            if (ifAddtime) file_name = title ? `${title}.xlsx` : `${document.title}.xlsx`;
            else file_name = title ? `${title}_${new Date().getTime()}.xlsx` : `${document.title}.xlsx`;



            workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], { type: EXCEL_TYPE });
                // Given name
                FileSaver.saveAs(blob, file_name);
            })
            //执行回调
            callback();
        } catch (error) {
            console.log("数据写入文件失败！" + error);
        }

    }).catch(function (err) {
        console.log('Failed to load xlsx', err);
    })
}

export { exportExcel, getResType }