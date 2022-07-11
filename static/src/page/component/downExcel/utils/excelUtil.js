import * as ExcelJs from 'exceljs';
import { saveAs } from "file-saver";
import { getPageInfo, getFilterInfo, getPageDesc, handelExplain } from './filterUtil';
import { getResType } from '../common/export';
import { i18n } from '@/components/FastIntl';

function isNumber(inputData) {
    var reg = /^[+-]?\d+(\.\d+)?$/;   
    if (!reg.test(inputData)) {
        return false;
    } else {
        return true;
    }
}

function isNumFmt(cell) {
    // return false;
    if (typeof cell !== 'string') {
        return false;
    }
    return cell.endsWith('%') && isNumber(cell.substring(cell, cell.length - 1));
}



/**
 * 判断是否为千分位数字
 * @param {*} item 
 * @returns 
 */
function isThousands(item) {
    if (!item || typeof item !== 'string') {
        return false;
    }
    
    const list = item.split(',');

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (!isNumber(item)) {
            return false;
        }
    }

    return true;

}

function handleThousands(item) {
    return handleNumber(item.replace(/\,/g, ""));
}


function getNumFmt(cell) {
    // 数字替换成0;
    return cell.replace(/[0-9]/g, "0").replace('-', '');;
}
function handleNumFmt(cell) {
    return parseFloat(cell) / 100;
}

function handleNumber(cell) {
    return parseFloat(cell);
}


function getAlphabetByNumber(n) {
    // if ( num === 26 || num === 27) {
    //     debugger;
    // }
    n = n - 1;
    const ordA = 'A'.charCodeAt(0)
    const ordZ = 'Z'.charCodeAt(0)
    const len = ordZ - ordA + 1
    let str = ""
    while (n >= 0) {
        str = String.fromCharCode(n % len + ordA) + str
        n = Math.floor(n / len) - 1
    }
    return str;
}


function getMergeKey(addNumber, rowIndex) {

    let result = '';
    for (var i = 0; i < addNumber; i++) {
        if (result !== '') {
            result += ':';
        }
        const currItem = i + 1;
        const apNumber = getAlphabetByNumber(currItem);

        result += `${apNumber}${rowIndex}`;
    }
    return result;
}

function setFill(fill) {
    return {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: fill.bgColor },
        bgColor: { argb: fill.bgColor }
    };
}

function setAlignment(align) {
    switch (align) {

        case 'center':
            return { vertical: 'middle', horizontal: 'center' }

        case 'left':
            return { horizontal: 'left', vertical: 'middle' }

        case 'right':
            return { horizontal: 'right', vertical: 'middle' }
    }
}

function convertNewLine(title) {
    return title.replace('\\n','\r\n')
}


class DownloadExcel {

    constructor({
        data,
        sheetName,
        downFileName,
        dataConfig = {
            dataType: DownloadExcel.dataType.normalTable  // ComplexTable 
        },
        indicatorData,
        config = {
            fillBgColor: 'FFB4C6E7',
        }
    }) {
        this.data = data;
        this.sheetName = sheetName;
        this.dataConfig = dataConfig;
        this.config = config;
        this.downFileName = downFileName;
        this.indicatorData = indicatorData;


        // excel 相关
        this.workbook = new ExcelJs.Workbook();

        this.setProperties(this.workbook);
        this.setDisclaimer(this.workbook);

        this.worksheet = this.workbook.addWorksheet(this.sheetName);
        this.excelRef = {
            rowIndex: 1,
            columnsIndex: 1,
        }
    }

    // 数据处理类型
    static dataType = {
        complexTable: 'ComplexTable', // 复杂表格
        normalTable: 'NormalTable', // 正常表格
        chart: 'Chart' // 图表数据
    }


    setProperties(wb) {
        //Set Workbook Properties
        wb.created = new Date();
        wb.modified = new Date();
        wb.lastPrinted = new Date();
    }


    /**
     * 设置免责声明
     * @param {Object} Workbook 
     */
    setDisclaimer(wb) {
        let resType = getResType();
        // Add a Worksheet
        let worksheet = wb.addWorksheet(i18n.format('免责声明'), {
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
    }

    /**
    * 合并行列
    * @param {Array} merges 
    * @param {Worksheet} ws 
    */
    getMergeCells(merges) {
        if (!merges || !merges.length) return null;

        const currRow = this.excelRef.rowIndex;
        for (let i = 0, len = merges.length; i < len; i++) {
            let obj = merges[i],
                start = obj.s,
                end = obj.e;

            this.worksheet.mergeCells(currRow + start.r, start.c + 1, currRow + end.r, end.c + 1);
        }
    }


    generateData(data, isTable) {
        // debugger;
        let isFirstMerge = false;
        data.forEach(dataRows => {
            let rowIndex = this.excelRef.rowIndex;
            let rows = [];
            let mergeKeys = [];

            dataRows.forEach((cellItem, index) => {
                rows.push(cellItem.name);
                if (cellItem.merge) { // 需要合并
                    // let mergeKey = `A${rowIndex}:B${rowIndex}`;
                    const mergeKey = getMergeKey(cellItem.merge.rows, rowIndex);
                    mergeKeys.push(mergeKey)
                    // console.log('mergeKey', mergeKey)
                }
            })

            this.worksheet.addRow(rows);



            // 添加合并key
            mergeKeys.forEach(mergeKey => {
                this.worksheet.mergeCells(mergeKey);
            })

            if (isTable && this.data?.merges && !isFirstMerge) {
                isFirstMerge = true
                // 执行列表合并
                this.getMergeCells(this.data.merges)
            }

            // 行的内容添加完，才能设置样式
            dataRows.forEach((cellItem, index) => {
                let apNumber = getAlphabetByNumber(index + 1);
                let cell = this.worksheet.getCell(`${apNumber}${rowIndex}`);

                //设置对齐方式
                if (cellItem.alignment) {
                    cell.alignment = setAlignment(cellItem.alignment)
                }

                // 设置填充方式
                if (cellItem.fill) {
                    cell.fill = setFill(cellItem.fill);
                }

                if (cellItem.numFmt) {
                    // TODO
                    cell.numFmt = cellItem.numFmtValue;
                }
            })

            this.excelRef.rowIndex++;
        })


        // 添加一个空行
        this.worksheet.addRow([]);
        this.excelRef.rowIndex++;
    }

    // 处理 key value 数据
    _handleKeyValue(title, data) {
        let desc = [
            [{ name: title, alignment: 'center', merge: { rows: 2 }, fill: { bgColor: this.config.fillBgColor } }],
            // [{ name: '界面名称', alignment: 'left' }, { name: '科沃斯-品类分布', alignment: 'right' }],
        ]
        data.forEach(item => {
            desc.push([{ name: item.title, alignment: 'left' }, { name: item.value, alignment: 'left' }])
        });
        return desc;
    }

    handlePageDesc() {
        let pageInfo = getPageInfo();

        // TODO 处理一些说明内容
   
        // 页面说明
        let pageDesc = getPageDesc();
        if (pageDesc) {
            pageInfo.push(pageDesc);
        }

        // 指标说明
        // indicatorData
        if (Array.isArray(this.indicatorData)) {
            this.indicatorData.forEach(item => {
                pageInfo.push({
                    title: convertNewLine(item.name),
                    value: handelExplain(item.value),
                })
            })
        }
      

        return this._handleKeyValue(i18n.format('界面说明'), pageInfo);
    }

    handleFilterDesc() {
        const filterInfo = getFilterInfo();
        return this._handleKeyValue(i18n.format('筛选项'), filterInfo);
    }

    _handleTableHead(item) {
        this.dataConfig.dataType === ''
        const currHead = [];
        for (let i = 0; i < item.length; i++) {
            const cell = item[i];
            const currItem = { name: convertNewLine(cell), alignment: 'center', fill: { bgColor: this.config.fillBgColor } };

            currHead.push(currItem)
        }
        return currHead;
    }

    _handleTableRow(item) {
        const currHead = [];
        for (let i = 0; i < item.length; i++) {
            const cell = item[i];
            const isNF = isNumFmt(cell);
            // const isNum = isNumber(cell);
            // const isTh  = isThousands(cell);
            let getNFV = null;

            if (isNF) {
                getNFV = getNumFmt(cell);
            }

            // 处理百分比和数字类型，如有其它类型在优化
            let newName = cell;
            if (isNF) {
                newName = handleNumFmt(cell);
            } else if (isNumber(cell)) {
                newName = handleNumber(cell)
            } else if (isThousands(cell)) {
                newName = handleThousands(cell);
            } else if (Array.isArray(cell)) {
                newName = cell.map(item => item?.brandName).join(',');
            }

            currHead.push({ name: newName, alignment: 'center', numFmt: isNF, numFmtValue: getNFV })
        }
        return currHead;
    }

    _handleData(currData) {

        let newData = {};
        const dataType = this.dataConfig.dataType;

        // const data = this.data;

        const dimension = () => {
            if (Array.isArray(currData) && currData.length > 0) {
                currData = currData[0];
            }
            newData.header = [currData.header];
            newData.dataSource = [];
            for (let i = 0; i < currData.dataSource.length; i++) {
                const item = currData.dataSource[i];
                const itemArr = [];
                for (let j = 0; j < currData.header.length; j++) {
                    const key = currData.header[j];
                    itemArr.push(item[key]);
                }
                newData.dataSource.push(itemArr)

            }
        }

        if (dataType === DownloadExcel.dataType.normalTable) {
            dimension();
        } else if (dataType === DownloadExcel.dataType.complexTable) {
            newData = { ...currData }
        } else if (dataType === DownloadExcel.dataType.chart) {
            dimension();
        }

        return newData;
    }

    handleTableDesc() {

        const data = this.data;
        let resultTableList = [];

        const handle = (currData) => {
            const newData = this._handleData(currData);


            const tableList = [];
            for (let i = 0; i < newData.header.length; i++) {
                const curr = newData.header[i];

                tableList.push(this._handleTableHead(curr));
            }

            for (let i = 0; i < newData.dataSource.length; i++) {
                const curr = newData.dataSource[i];
                tableList.push(this._handleTableRow(curr));
            }

            return tableList;
        }
        if (Array.isArray(data)) {
            data.forEach(item => {
                resultTableList.push(handle(item));
            })
        } else {
            resultTableList.push(handle(data));
        }

        return resultTableList;
    }



    _saveWorkbook() {
        // 导出文件
        const downFileName = this.downFileName;
        this.workbook.xlsx.writeBuffer().then((data => {
            const blob = new Blob([data], { type: '' });
            saveAs(blob, downFileName);
        }))
    }

    setColumnWidth(data) {
        let c1 = this.worksheet.getColumn(1);
        c1.width = 30
        let c2 = this.worksheet.getColumn(2);
        c2.width = 40
        if (data.length > 0) {
            const tableDesc = data[0];
            let count = tableDesc[tableDesc.length - 1];
            for (let i = 3; i <= count.length; i++) {
                let cn = this.worksheet.getColumn(i);
                cn.width = 20
            }
        }
    }

    download() {
        const pageDesc = this.handlePageDesc();
        const filterDesc = this.handleFilterDesc();
        const tableDescList = this.handleTableDesc();

        this.setColumnWidth(tableDescList);
        this.generateData(pageDesc);
        this.generateData(filterDesc)
        tableDescList.forEach(tableDesc => {
            this.generateData(tableDesc, true)
        })
        this._saveWorkbook();
    }


}

// {data, sheetName, downFileName, dataConfig: {
//     tableType: DownloadExcel.tableType.complexTable
// }}

function downLoadExcelFactory({
    data,
    sheetName,
    downFileName,
    dataConfig = {
        dataType: DownloadExcel.dataType.normalTable,
    },
    config,
    indicatorData,
    ...otherParams
}) {
    const downloadExcel = new DownloadExcel(...arguments);
    downloadExcel.download();
    return downloadExcel;

}

export {
    downLoadExcelFactory,
    DownloadExcel
}

export default downLoadExcelFactory;