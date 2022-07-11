'use strict';

let path = require('path');

console.log('----dirName', __dirname)
module.exports = {
    //第三方
    '@': path.resolve(__dirname, '../src'),
    '@echarts': path.resolve(__dirname, '../src/library/echarts/echarts-custom'),
    //common组件

    '@util': path.resolve(__dirname, '../src/utils/Util'),
    '@pageAccess': path.resolve(__dirname, '../../app/util/commonData'),
    '@less': path.resolve(__dirname, '../src/less'),

    //组件
    '@chart': path.resolve(__dirname, '../src/page/component/chart'),
    '@checkbox': path.resolve(__dirname, '../src/page/component/checkbox'),
    '@componentProps': path.resolve(__dirname, '../src/page/component/componentProps'),
    '@date': path.resolve(__dirname, '../src/page/component/date'),
    '@downExcel': path.resolve(__dirname, '../src/page/component/downExcel'),
    '@exhibition': path.resolve(__dirname, '../src/page/component/exhibition'),
    '@explain': path.resolve(__dirname, '../src/page/component/explain/index'),
    '@filter': path.resolve(__dirname, '../src/page/component/filter'),
    '@filterOption': path.resolve(__dirname, '../src/page/component/filterOption'),
    '@jump': path.resolve(__dirname, '../src/page/component/jump'),
    '@menuApplyPermissions': path.resolve(__dirname, '../src/page/component/menuApplyPermissions'),
    '@radio': path.resolve(__dirname, '../src/page/component/radio'),
    '@resAppPrivilege': path.resolve(__dirname, '../src/page/component/resAppPrivilege'),
    '@rsIcon': path.resolve(__dirname, '../src/page/component/rsIcon/index'),
    '@select': path.resolve(__dirname, '../src/page/component/select'),
    '@tab': path.resolve(__dirname, '../src/page/component/tab'),
    '@table': path.resolve(__dirname, '../src/page/component/table'),
    '@title': path.resolve(__dirname, '../src/page/component/title'),
    '@updateTime': path.resolve(__dirname, '../src/page/component/updateTime'),
    '@url': path.resolve(__dirname, '../src/page/component/url'),
    '@drawerChart': path.resolve(__dirname, '../src/page/component/drawerChart'),
    '@hide': path.resolve(__dirname, '../src/page/component/hide'),
    '@fixedParam': path.resolve(__dirname, '../src/page/component/fixedParam'),
    '@toolTip': path.resolve(__dirname, '../src/page/component/toolTip'),
    '@appCascaderInline': path.resolve(__dirname, '../src/page/component/appCascaderInline'),
    '@appComparison': path.resolve(__dirname, '../src/page/component/appComparison'),
    '@filterGroup': path.resolve(__dirname, '../src/page/component/filterGroup'),
    '@timeline': path.resolve(__dirname, '../src/page/component/timeline'),
    '@pmSearch': path.resolve(__dirname, '../src/page/component/pmSearch'),
    '@globalSearch': path.resolve(__dirname, '../src/page/component/globalSearch')
}