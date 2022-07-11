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
    GETSHOWREPORTLIST                                   : "/crm/report/getShowReportList",
    GETSHOWREPORTLISTFORSAAS                            : "/crm/report/getShowReportListForSaas",
    GETRELATESHOWREPORTLISTFORSAAS                      : "/crm/report/getRelateShowReportListForSaas",
    COLLECTGUESTREPORT                                  : "/crm/report/collectGuestReport",
    ADDGUESTREPORTJOB                                   : "/crm/report/addGuestReportJob",
    GETREPORTINFOFORGUEST                               : "/crm/report/getReportInfoForGuest",
    UPDATEREPORTAPPLYINFO                               : "/crm/report/updateReportApplyInfo",
    REPORT_TRANSITIONPDF                                : "/crm/report/PDF",
    REPORT_DOWNLOAD                                     : "/crm/file/reportDownload"

}