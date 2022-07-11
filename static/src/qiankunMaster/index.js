import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import i18n from '@/plugin/i18n';
import { ConfigProvider, Tooltip as BasicTooltip } from 'antd';
import Server from '@/plugin/Server';
import EditTemplate from '../page/component/util/editTemplate';
import Custom_Date from "@date/config";
import ComponentProps from '@componentProps/config'
import CompanyTitle from '@title/config';
import CustomSelect from '@select/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import Chart from '@chart/config'
import Table from '@table/config';
import FixedParam from '@fixedParam'
import DrawerChart from '@drawerChart/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CascaderInline from '@appCascaderInline/config'
import Comparison from '@appComparison/config'
import FilterGroup from '@filterGroup'
import Timeline from '@timeline'
import PmSearch from '@pmSearch/config'
import FilterOption from '@filterOption/config'
import Radio from '@radio/config'
import GlobalSearch from '@globalSearch'
import Explain from '@explain';
import RsIcon from '@rsIcon';
import Exhibition from '@exhibition/config';
import Img from '@/components/Img';
import BottomExplain from '../page/component/page/bottomExplain';
import Tooltip from '@toolTip';


// basic
import FilterButton from '@/components/FilterButton';
import FormItem from '@/components/FormItem';
import {
  CustomTab as CustomTabCommon,
  CustomTabPane as CustomTabPaneCommon
} from '@tab/common';
import PmSearchCommon from '@pmSearch/common'
import BasicSelect from '@/components/BasicSelect'
import CustomSelectCommon from '@select/common';
import boardApi from '@/page/comprehensiveBoard/store/api.js'

// logic
import { getTemplateData } from '../page/component/util/templateStrategy';
import { getPrivilegeData } from './utils';
import { getKeyPrivilege, getAccessState } from '../page/component/util/template'
import { GetQueryString, getUrlPath, GetDecodeURIComponent } from '@util';
import { getUserInfoData, getPageData } from '@/page/component/page/util';
import { getPrimaryMarketFocusOptions, getMenuPathByKeys } from '@/utils/primaryMarketUtil'
import replacePath from '@/utils/replacePath'
import { formaDate } from '../page/component/util/format/date.js'


class DateComponentForPM extends Custom_Date {
  constructor() {
    super();
    this.state = { ...this.state, isPM: true };
  }
}

class UpdateTimeForPM extends UpdateTime {
  constructor() {
    super();
    this.state = { ...this.state, isPM: true };
  }
}

console.log('processprocess', process.env)

const customProps = {
  shareMainApp: {
    ConfigProvider,
    i18n,
    Server,
    EditTemplate,
    Custom_Date: DateComponentForPM,
    ComponentProps,
    CompanyTitle,
    CustomSelect,
    CustomTab,
    CustomTabPane,
    CascaderInline,
    Comparison,
    UpdateTime: UpdateTimeForPM,
    Filter,
    Table,
    Chart,
    FixedParam,
    DrawerChart,
    FilterGroup,
    Timeline,
    PmSearch,
    FilterOption,
    Radio,
    GlobalSearch,
    Explain,
    RsIcon,
    Exhibition,
    Img,
    BottomExplain,
    Tooltip,
    boardApi
  },
  shareBasicApp: {
    FilterButton,
    FormItem,
    CustomTabCommon,
    CustomTabPaneCommon,
    PmSearchCommon,
    BasicSelect,
    CustomSelectCommon,
    BasicTooltip
  },
  shareLogicFun: {
    getTemplateData,
    getPrivilegeData,
    getKeyPrivilege,
    GetQueryString,
    getUserInfoData,
    getPrimaryMarketFocusOptions,
    getMenuPathByKeys,
    replacePath,
    GetDecodeURIComponent,
    getPageData,
    getAccessState,
    formatDate: formaDate
  },
  shareProcessEnv: _.cloneDeep(process.env)
}

registerMicroApps([
  {
    name: 'appPrimaryMarket', // 一级市场
    entry: process.env.MiCRO_PM_URL,
    container: '#appPMMicro',
    activeRule: '/page/appPM',
    props: {
      base: '/page/appPM',
      ...customProps
    },
  },
  {
    name: 'appSecondaryMarket', // 二级市场618
    entry: process.env.MiCRO_SM_URL,
    container: '#appSMMicro',
    activeRule: '/page/appSM',
    props: {
      base: '/page/appSM',
      ...customProps
    },
  },
  {
    name: 'appAnalyze', // app name registered
    entry: process.env.MiCRO_APP_URL,
    container: '#appAnalyzeMicro',
    activeRule: '/page/appAnalyze',
    props: {
      // routerBase: '/page/appAnalyze/15105/15106', // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
      base: '/page/appAnalyze',
      ...customProps
    },
  },

]);



export const init = () => {
  // setDefaultMountApp('/page/appAnalyze');
  start();
}