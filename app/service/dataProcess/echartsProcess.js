/*
 * @FileDescription    : 文件描述  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-10-23 15:56:56 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-03-20 16:18:48
 */
 
'use strict';

const BaseProcess = require('./baseProcess');

/**
 *  
 */
class EchartsProcess extends BaseProcess {
    //转化echarts线图数据
    lineBraProcess(data){
        if(!data) return;
        let length = [],
            xData  = [],
            series = [];
            length = Object.keys(data);
        for(let i=0;i<length.length;i++){
            let key = length[i];
            let xRecord = data[key];
            let xArr = [];
            for(let date in xRecord){
                let arr = [];
                let x = xRecord[date];
                if(xData.indexOf(date)==-1) xData.push(date);
                arr.push(date,x);
                xArr.push(arr);
            }
            series.push(xArr);
        }
        return {
            length,
            series,
            xData:xData.sort(),
        }
    }
    //转化线图数据
    /*
        适用数据类型：
        {
            oneLine:[{202001014:200},{20200102:100}],
            twoLine:[{202001014:200},{20200102:100}],
        }
    */
    lineProcess(data){
        if(!data) return;
        let lineName = Object.keys(data),
            reData = {};
        lineName.forEach((name)=>{
            let series = data[name].map((item)=>{
                let arr = [];
                for(let key in item){
                    arr.push(key,item[key]);
                }
                return arr;
            });
            reData[name] = series;
        });
        return reData;
    }
    //转化饼图
    pieProcess(data){
        if(!data) return;
        let rsList = data.rsList,
            reData = [];
        reData = rsList.map(function(val,idx){
            let obj = {};
            for(let key in val){
                obj.name = key;
                obj.value = val[key];
            }
            return obj;
        });
        return reData;
    }
    //
    twoXBraProcess(data){
        if(!data) return;
        let financial = data.financialReportMap,
            predict   = data.predictStatisticsJson;
        let xData = Object.keys(financial),
            yData = [];
            xData.push(predict["report_period"]);
        for(let i=0;i<5;i++){
            let arr = [];
            if(i<4){
                for(let j=1;j<xData.length;j++){
                    arr.push(null);
                }
                if(i==0) arr.push(predict["fengjr_predict_value"]);
                else if(i==1) arr.push(predict["min_predict_value"]);
                else if(i==2) arr.push(predict["avg_predict_value"]);
                else if(i==3) arr.push(predict["max_predict_value"]);
                
            }else{
                for(let j=0;j<xData.length;j++){
                    if(j==(xData.length-1)){
                        arr.push(null);
                    }else{
                        let xKey = xData[j];
                        arr.push(financial[xKey])
                    }
                }
            }
            yData.push(arr);
        }
        return {
            yData,
            xData,
            meta:data.meta
        }
    }

    twoWayBraProcess(data){
        if(!data) return;
        let xData = [],
            lData = [],
            rData = [],
            rank  = [];
        for(let i=0;i<data.length;i++){
            let obj = data[i];
            xData.push(obj.type_name);
            rank.push(obj.sales_amount_rank);
            lData.push(-obj.sales_amount_com_prop);
            rData.push(obj.sales_amount_prop);
        }
        return{
            xData,
            lData,
            rData,
            rank
        }
    }
}

module.exports = EchartsProcess;