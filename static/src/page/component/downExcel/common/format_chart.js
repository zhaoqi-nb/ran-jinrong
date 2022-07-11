'use strict';

//获取曲线图数据


function _getChartSplitData(columns, datas, props) {
    let header = [],
        dataSource = [];
    const { ifSplitColumns } = props;
    let temp = [];
    let setHeader = (dataIndex, title) => {
        if (!dataIndex || !title) return;

        let add = (text) => {
            temp.push(dataIndex);
            header.push(text);
        }

        try {
            if (!ifSplitColumns || title.indexOf("/") == -1) {
                add(title)
            } else {
                let arr = title.split("/");
                for (let i = 0, len = arr.length; i < len; i++) {
                    add(arr[i]);
                }
            }
        } catch (error) {
            console.log(error)
        }
        return;
    }
    //表头
    columns.forEach((item, index) => {
        let dataIndex = item.dataIndex,
            title = item.original_title ? item.original_title : item.title;
        if (Object.prototype.toString.call(item.title) === '[object Object]') {
            title = item.orginTitle;
        }
        if (dataIndex !== 'operation') {
            setHeader(dataIndex, title)
        }
    });

    const setData = (item) => {
        let obj = {};
        let setContent = (key, index, TitleLen) => {
            let temp = "";
            if (key == "title") {
                let value = item[key];
                if (value.indexOf("/") != -1 && ifSplitColumns) {
                    value = value.split("/");
                    if (value.length > TitleLen && index == TitleLen - 1) {
                        let newVal = []
                        for (let _i = index; _i < value.length; _i++) {
                            newVal.push(value[_i])
                        }
                        temp = newVal.join('/');
                    } else {
                        temp = value[index];
                    }

                } else temp = value;
            } else {
                temp = item[key];
                if (key == "classify" && !temp) {
                    if (item["original_classify"]) temp = item["original_classify"];
                }
            }

            return temp;
        }
        let TitleLen = 0
        temp.forEach((item) => {
            if (item === 'title') {
                TitleLen++
            }
        })
        temp.forEach((id, i) => {
            obj[header[i]] = setContent(id, i, TitleLen);
        })
        dataSource.push(obj);
    }

    const loopData = (_data) => {
        for (let i = 0, len = _data.length; i < len; i++) {
            let item = _data[i],
                children = item.children;
            setData(item);
            if (children && children.length) loopData(children);
        }
    }

    //数据
    loopData(datas || [])

    return {
        dataSource,
        header
    }
}

export function getChartSplitData(columns, datas) {

    // 有一种表格也是 trendChart 类型 bug地址 http://jira.databurning.inc/browse/DAGAIBAN-506?filter=-1
    if (!(Array.isArray(datas) && datas.length > 0 && datas[0].columns)) {
        datas = [{
            columns,
            dataSource: datas
        }]
    }

    let result = [];
    for (let i = 0; i < datas.length; i++) {
        let curr = datas[i];
        const currResult = _getChartSplitData(curr.columns, curr.dataSource, this.props)
        result.push(currResult);
    }

    return result;

}