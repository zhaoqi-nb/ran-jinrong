import { Base64ToJson } from '../../page/component/util/format';

let pageMixData = null;

function getMenuData() {
    if (pageMixData) {
        return pageMixData;
    }
    pageMixData = Base64ToJson(PAGEMIXDATA);
    return pageMixData;
}

//获取
export function getPrivilegeData(){
    const menu = getMenuData();
    console.log('menu', menu);
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
    

    }
    return param;
}