'use strict'

let { pageAccessInfo } = require("../util/commonData"),
          _            = require("lodash");

//获取应用权限对应关系
function getAccessState(data){
    let temp_privilege = [];
    for(let i=0,len=data.length;i<len;i++){
        let obj = data[i],
            privilegeName = obj.privilegeName,
            privilegeType = obj.privilegeType,
            property      = obj.property;
        if(privilegeType == "APP" && privilegeName=="pageAccessInfo" && property){
            try {
                property = JSON.parse(property);
                let accessState = property.accessState,
                    weight      = property.weight,
                    temp_obj    = pageAccessInfo.find(item => (item.code).toLocaleLowerCase() == accessState.toLocaleLowerCase()),
                    accessInfo  = copyObj(temp_obj);
                    
                if(weight == undefined){
                    if(accessInfo.weight) obj["property"] = JSON.stringify(accessInfo);
                    else obj["property"] = null;
                }else {
                    if(accessState == "noView"){
                        obj.weight = weight;
                        obj["property"] = null;
                    }
                    else {
                        accessInfo["weight"] = weight
                        obj["property"] = JSON.stringify(accessInfo);
                    }
                }
            } catch (error) {
                console.log("获取菜单权限格式化出错");
            }
        }
        temp_privilege.push(obj);
    }

    //获取应用权限
    return getData("pageAccessInfo", temp_privilege);
}

//set adjust the order
function setAdjustOrder(key, data){
    if(!key || !data || !data.length) return null;
    let temp   = [],
        ifSort = false;
    try {
        for(let i=0,len=data.length;i<len;i++){
            let obj=data[i],
                privilegeType = obj.privilegeType,
                privilegeName = obj.privilegeName,
                property      = JSON.parse(obj.property),
                weight        = obj.weight?obj.weight:(property&&property.weight?property.weight:0);

            if(!ifSort && weight) ifSort = true;
            obj["weight"] = weight;
            if(privilegeType == "APP" && privilegeName == key && Number(weight)>=0) temp.push(obj);
        }

        if(ifSort) temp.sort((a,b)=>b.weight-a.weight);
    } catch (error) {
        console.log(error);
    }

    return temp&&temp.length?temp[0]:null;
}


//获取数据
function getData(key, privilegeDtoList){
    let value = null;
    if(privilegeDtoList && privilegeDtoList.length){
        let privilegeDto = setAdjustOrder(key,privilegeDtoList);
        if(privilegeDto && privilegeDto.property){
            value = JSON.parse(privilegeDto.property);
        }
    }
    return value;
}

function copyObj(obj){
    let temp = {};
    if(!obj) temp;
    for(let key in obj){
        temp[key] = obj[key];
    }
    return temp
}

//判断是否为空
function isEmpty(obj) {
    let type = typeof obj;
    if(type == "string" || type == "number" || type == "boolean"){
        if(obj)  return false;
        else return true;
    }else if(type == "object"){
        if(obj instanceof Array){
            let arr = _.filter(obj, item=>item);
            //数组
            if(arr.length) return false;
            else return true;
        }else if(Object.prototype.toString.call(obj) === '[object Object]'){ //对象
            if(JSON.stringify(obj) == "{}") return true;
            else return false;
        }
    }
    //other
    if(obj) return false;
    else return true;
}

module.exports = { getAccessState, isEmpty };