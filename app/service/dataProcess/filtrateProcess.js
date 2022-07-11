/*
 * @FileDescription    : 文件描述  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-10-08 15:56:56 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2018-12-24 15:07:04
 */
 
'use strict';

const BaseProcess = require('./baseProcess');

/**
 *  
 */
class FiltrateProcess extends BaseProcess {
    //process filtrate select
	processFiltrateSelect(data,type_id=""){
        if(!data) return;
        let reData = {
            list:data,
            selectId:data.length>0?data[0].code:"",
        }
        for(let i=0;i<data.length;i++){
            const code = data[i].code;
            if(code==type_id){
                reData.selectId = type_id;
            }
        };
        return reData;
    }
    //process multiple select
	processMultipleSelect(data,type_id=""){
        if(!data) return;
        let list = data,
            select = [];
        list.map(function(value,index){
            let selectId = value.code;
            type_id.indexOf(selectId)>-1?select.push(selectId):"";
        });
        return {
            list,
            select
        };
    }
    //
    processFiltrateToCodeAndName (data,key,isAll){
        if(!data) return;
        let arr = data.map((item)=>{
            return {
                code: item[key],
                name: item[key]
            }
        });
        if(isAll) arr.unshift({code:"全部",name:"全部"});
        return arr;
    }
}

module.exports = FiltrateProcess;