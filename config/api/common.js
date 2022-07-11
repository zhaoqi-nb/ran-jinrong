/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-12-25 22:29:14 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:51:17
 */

'use strict';

//接口api地址
module.exports = {
    ADDATTENTION: "/userbehavior/addAttention",
    DELUSERATTENTION: "/userbehavior/delUserAttention",
    GETUSERATTENTION: "/userbehavior/getUserAttention",
    COMMON_GETCONFIGDATA: "/userbehavior/getSystemConfig",
    COMMON_SETCONFIGDATA: "/userbehavior/configSystem",
    COMMON_DOWNLOADOPERATION: "/trackAnalysis/downloadOperation",
    COMMON_GETENGLISHDICT: "/translate/getEnglishDict",
    COMMON_SAVETEMPLATEBEHAVIOR: "/usertemplate/saveTemplateBehavior",
    COMMON_GETTEMPLATEBEHAVIOR: "/usertemplate/getTemplateBehavior",
    COMMON_DELTEMPLATEBEHAVIOR: "/usertemplate/delTemplateBehavior",
    COMMON_GETRESDTOTREE: "/api/outer/getResDtoTree",
    COMMON_QUERYRESDTOLISTBYATTR: "/usermanager/queryResDtoListByAttr",
    COMMON_GETSTOCKSORTLIST: "/companyBoard/getStockSortList",
    COMMON_GETSEARCHMAPPINGLIST: "/commonSearch/getSearchMappingList ",
    COMMON_QUERYINDUSTRYDTOLISTBYATTR: "/usermanager/queryIndustryDtoListByAttr",
    COMMON_ADDATTENTION: "/userbehavior/addAttention",
    COMMON_DELUSERATTENTION: "/userbehavior/delUserAttention",
    COMMON_QUERYRESDTOTREE: "/usermanager/queryResDtoTree",
    COMMON_QUERYPARENTANDSUBRESDTOTREEONLYPAGEACCESSINFO: "/usermanager/queryParentAndSubResDtoTreeOnlyPageAccessInfo",
    COMMON_GETALLSYSTEMANDVERSION: "/usermanager/getAllSystemAndVersion",
    COMMON_GETPERMISSIONSCACHE: "/api/outer/getPermissionsCache",
    COMMON_UPDATEFRONTTEMPLATE: "/usertemplate/updateFrontTemplate",
    COMMON_QUERYPARENTANDSUBRESDTOTREEFORSEARCH: "/usermanager/queryParentAndSubResDtoTreeForSearch",
    LANGUAGE_PACKAGE: "/languageInfo/getLanguagePackage",
    GETUSERGUIDERECORD: "/userbehavior/getUserGuideRecord",
    ADDUSERGUIDERECORD: "/userbehavior/addUserGuideRecord",
    REMOVEUSERGUIDERECORD: "/userbehavior/delUserGuideRecord",
    GETDATAOPENTIME: "/offlineBrandCommon/getDataOpenTime",
    GETDATACYCLE: "/offlineBrandCommon/getDataCycle",
    GETSUMMARYWORDINFO: "/summaryBrand/getSummaryWordInfo",
    GETDEINDUSTRYSIDEBAR: "/trackAnalysis/getDEIndustrySidebar",
    GETBOARDBRANDDETAIL: "/trackAnalysis/getBoardBrandDetail",
    GETOFFLINEBRANDDETAIL: "/offlineBrand/getOfflineBrandDetail",
    GETINDUSTRYDETAIL: "/offlineIndustry/getIndustryDetail",
    GETTOPBRANDTAG: "/trackAnalysis/getTopBrandTag",
    GETREDINDUSTRYDETAIL: "/redBook/getIndustryDetail",
    GETREDBRANDDETAIL: "/redBook/getBrandDetail",
    GETREDCONCEPTDETAIL: "/redBook/getConceptDetail",
    QUERYSMTMTLIST: '/usermanager/queryResDtoListBySecondaryTMT',


}