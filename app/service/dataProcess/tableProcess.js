/*
 * @FileDescription    : 文件描述  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-10-08 15:56:56 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-03-01 11:30:21
 */
 
'use strict';

const BaseProcess = require('./baseProcess');

/**
 *  
 */
class FiltrateProcess extends BaseProcess {
    //process footer table
	footerTableProcess(datas){
        if(!datas) return;
        let data = [],
            footer = {};
        if(datas.length>0){
            data = datas;
            footer = data[data.length-1];
            data.pop();
            data.map(function(val,idx){
                val["xh"] = idx+1;
            });
        }
        
        return {
            data,
            footer
        };
    }
    //process rank table
	rankTableProcess(datas){
        if(!datas) return;
        let data = [];
        if(datas.bottomList.length>0){
            let obj = {};
            for(let key in datas.topList[0]){
                obj[key] = "--";
            }
            datas.topList.push(obj);
            data = [...datas.topList,...datas.bottomList];
        }else{
            data = datas.topList;
        }
        return data;
    }
    //tree Table Process
    treeTableProcess(datas){
        if(!datas) return;
        let reData = datas.map(function(val,idx){
            if(val.detailList.length>0){
                let obj = val.detailList.shift();
                val = {...val,...obj};
                val["children"] = val.detailList;
                delete val.detailList;
                return val;
            }
        })
        return reData;
    }
}

module.exports = FiltrateProcess;