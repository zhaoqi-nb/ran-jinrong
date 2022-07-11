'use strict';

import { Base64ToJson } from '../../util/format';

//获取表格需要模糊条件
function getFixData(privilegeDtoList){
    let fixDate_range    = null;
    if(privilegeDtoList && privilegeDtoList.length){
        let privilegeDto = privilegeDtoList.find(item=>item.privilegeName == "fixDate_range");
        if(privilegeDto && privilegeDto.property){
            fixDate_range = JSON.parse(privilegeDto.property)["data"];
        }
    }
    return fixDate_range;
}

//获取
export function getPrivilegeData(){
    const menu = getMenuData();
    let param = {};
    if(menu && menu.pageInfo){
        let pageInfo         = menu.pageInfo,
            resAttr          = pageInfo.resAttr,
            // transformMethods = resAttr&&resAttr.transformMethods?resAttr.transformMethods:"v1",
            privilegeDtoList = pageInfo.privilegeDtoList;
        let resAttrObj = {};
        try {
            resAttrObj = JSON.parse(resAttr)
        } catch (error) {
            resAttrObj = {};
        }

       const transformMethods = resAttrObj&&resAttrObj.transformMethods?resAttrObj.transformMethods:"v1";
       param["transformMethods"] = transformMethods;
            
        //模糊
        let fixDate_range = getFixData(privilegeDtoList);
        if(fixDate_range) param["fixDate_range"] = fixDate_range;

    }
    return param;
}


export function getMenuData(){
    return Base64ToJson(PAGEMIXDATA);
}