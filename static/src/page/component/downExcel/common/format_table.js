'use strict';

import numeral from 'numeral';

//获取表格数据
export function getTableSplitData(columns, datas) {
    const { ifSplitColumns } = this.props;

    let header = [],
        dataSource = [];


    let temp = [];
    let setHeader = (dataIndex, title) => {
        if (!dataIndex || !title) return;

        let add = (text) => {
            temp.push(dataIndex);
            header.push(text);
        }

        try {
            if (title && (typeof title === "string") && title.indexOf("/") == -1) {
                add(title)
            } else {
                if (ifSplitColumns) {
                    let arr = title.split("/");
                    for (let i = 0, len = arr.length; i < len; i++) {
                        add(arr[i]);
                    }
                } else {
                    add(title)
                }
            }
        } catch (error) {
            console.log(error)
        }
        return;
    }
    //表头
    // let tempColumns = columns[columns.length-1];
    columns.forEach((item, index) => {
        let dataIndex = item.dataIndex,
            title = item.original_title ? item.original_title : item.title;
        if (Object.prototype.toString.call(item.title) === '[object Object]') {
            title = item.orginTitle;
        }
        if (dataIndex != "operation" && dataIndex != "focus") setHeader(dataIndex, title);
    });

    let titleArr = [];
    const setData = (item, title) => {
        let obj = {},
            treeLevel = item.treeLevel;

        if (!title) titleArr = [];

        const setTitleArr = (index, value) => {
            let arr = [];
            if (!index) arr.push(value);
            else if (titleArr[index] == undefined) {
                arr = titleArr;
                arr.push(value);
            } else {
                arr = titleArr.slice(0, index);
                arr[index] = value;
            }
            return arr;
        }

        const setContent = (key, index) => {
            let temp = "";
            let value = item[key];
            if (key == "title") {
                if ((!title && titleArr.indexOf(value) == -1) || (index && treeLevel == index + 1)) {
                    if (item.children && item.children.length) titleArr = setTitleArr(index, value);
                    else titleArr[index] = value;
                }
                temp = titleArr[index];

            } else if (value) {
                try {
                    let tempValue = "";
                    //是否是 千分位置
                    if (value.indexOf(',') != -1) {
                        tempValue = Number(value.replaceAll(",", ""));
                        //判读是不是数字
                        if (!isNaN(tempValue)) value = numeral(tempValue).value()
                    } else {
                        tempValue = Number(value)
                        if (!isNaN(tempValue)) value = numeral(tempValue).value()
                    }
                } catch (error) {
                    console.log("判断是否是数字出错");
                }
                temp = value;
            }

            return temp;
        }

        temp.forEach((id, i) => {
            obj[header[i]] = setContent(id, i);
        })
        dataSource.push(obj);
    }

    const loopData = (_data, _title, _treeLevel = 0) => {
        for (let i = 0, len = _data.length; i < len; i++) {
            // if (!_data[i].treeLevel) _data[i].treeLevel = _treeLevel + 1
            let item = _data[i],
                title = item.original_title ? item.original_title : item.title,
                treeLevel = item.treeLevel,
                children = item.children;
            setData(item, _title);
            if (children && children.length) loopData(children, title, treeLevel);
        }
    }

    //数据
    loopData(datas)

    return {
        dataSource,
        header
    }
}
