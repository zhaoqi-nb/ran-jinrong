'use strict';
import { Base64ToJson } from '../../util/format';
import { transTableDateType } from '../../util/format/number';


function getType(obj){
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
       '[object Boolean]'  : 'boolean', 
       '[object Number]'   : 'number', 
       '[object String]'   : 'string', 
       '[object Function]' : 'function', 
       '[object Array]'    : 'array', 
       '[object Date]'     : 'date', 
       '[object RegExp]'   : 'regExp', 
       '[object Undefined]': 'undefined',
       '[object Null]'     : 'null', 
       '[object Object]'   : 'object'
   };
   if(obj instanceof Element) {
        return 'element';
   }
   return map[toString.call(obj)];
}


export function deepClone(data){
    var type = getType(data);
    var obj;
    if(type === 'array'){
        obj = [];
    } else if(type === 'object'){
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if(type === 'array'){
        for(var i = 0, len = data.length; i < len; i++){
            obj.push(deepClone(data[i]));
        }
    } else if(type === 'object'){
        for(var key in data){
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}

//获取表格需要模糊条件
function getNoViewData(privilegeDtoList){
    let noView = null;
    if(privilegeDtoList && privilegeDtoList.length){
        let privilegeDto = privilegeDtoList.find(item=>item.privilegeName == "noView");
        if(privilegeDto && privilegeDto.property){
            noView = JSON.parse(privilegeDto.property);
        }
    }
    return noView;
}

//获取
export function getPrivilegeData(){
    const menu = Base64ToJson(PAGEMIXDATA);
    let param = {};
    if(menu){
        let pageInfo         = menu.pageInfo,
            resAttr          = pageInfo.resAttr,
            privilegeDtoList = pageInfo.privilegeDtoList;
            
        //模糊
        let noView = getNoViewData(privilegeDtoList);
        if(noView) param["noView"] = noView;

    }
    return param;
}


//格式化表格数据
export function formatData(operate, value){
    if(!operate) return value;
    let  format    = operate && operate.format?operate.format        : null,
        divide     = operate && operate.divide?operate.divide        : null,
        bit_number = operate && operate.bit_number?operate.bit_number: 2,
        param      = null;
        
     //单位近位
     if(divide) value = transTableDateType(value, {divide, bit_number});

    if(format == "long") param = {type:"int",thousands:true};
    else if(format == "double") param = {type:"float",bit_number};
    else if(format == "percent") param = {type:"percent",bit_number};
    else if(format == "string") param = {type:"string"};

    if(param) value = transTableDateType(value, param);

    return value;
}