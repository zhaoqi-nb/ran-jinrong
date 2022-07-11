/*
 * @FileDescription    : 文件描述  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-09-26 15:56:56 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2020-08-01 17:43:13
 */
 
'use strict';

const   Service      = require('egg').Service,
        formatNumber = require("../formatNumber"),
        formatDate   = require("../formatDate");

class BaseProcess extends Service {

    logErr(msg,err){
        this.ctx.logger.error("-------------------------");
        this.ctx.logger.error(`异常报错 - ${msg} --- ${err}`);
        this.ctx.logger.error("-------------------------");
    }

    //process table page
    processTablePage(data, pagination){
        if(!data || !data.length) return null;
        const   count       = data.length,
                currentPage = pagination.currentPage || 1,
                pageSize    = pagination.pageSize || 10,
                start       = (currentPage-1)*pageSize,
                end         = currentPage*pageSize;
        
        let     list        = null;

        if(count<=start) list = data;
        else if(count>start && count<=end) list = data.slice(start,count);
        else if(count>start && count>end) list = data.slice(start,end);

        return {
            pages:{
                current:currentPage,
                total:count
            },
            list:list
        }
    }

    //为表格增加序号 ，不支持分页
    processForTableAddIndex(data = [], format = {}){
        const formatData = (item) =>{
            for(let key in format){
                let value = item[key];
                if(item[key]) item[key] = this.transTableDateType(value,format[key])
            }
            return item;
        }
        try {
            data.map((item, index) => {
                item["index"] = (index + 1)
                item = formatData(item);
                return item;
            });
        } catch (error) {
            this.logErr('解析 processForTableAddIndex方法出错 解析错误',error)
        }

        return data
    }

    /**
     * 曲线图转换，适合单条曲线
     * @param {*} data 
     * 
     * 适用例子
     * { 
            sales_count: {
                厨卫大电: 0.65,
                个护健康: 0.53,
                家电服务: 0.52,
                商用电器: 0.35
            }
        }
     */
	processChartData(data){
        if(!data) return;
        let series = [];
        try {
            let keysArr = Object.getOwnPropertyNames(data);
            for(let i=0,len=keysArr.length;i<len;i++){
                let  xAxis = keysArr[i],
                     yAxis = data[xAxis];
                series.push([ xAxis, yAxis]);
            }
        } catch (error) {
            this.logErr('转化图表数据出错',error)
        }

        return series;
    }


    //转换表格数据
    transTableDateType(value, opt, language) {
        if(!value) return value;
        let type = opt.type;
        if(type == "string") return value;
        else if(type == "date") return formatDate(value, opt, language);
        else return formatNumber(value, opt);
    }
}

module.exports = BaseProcess;