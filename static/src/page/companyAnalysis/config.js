// import { i18n } from '@/components/FastIntl';
import i18n from '@/plugin/i18n'

export const ALL = () => ({name: i18n.format("全部"), code: i18n.format('全部')})
export const NOLIMIT = () => ({name: i18n.format("不限"), code: i18n.format('不限')})
export const tabData = () => [
  { title: i18n.format("消费"), value: "消费" }
  // { title: "TMT", value: "TMT", disabled : true }
]

export const addressFilterList = () => ([
  ALL(), 
  { name: i18n.format("A股"),  code  : i18n.format("A股") }, 
  { name: i18n.format("港股"), code : i18n.format("港股") }, 
  { name: i18n.format("海外"), code: i18n.format("海外") },
  { name: i18n.format("未上市"), code: i18n.format("未上市") }
])

export const companyFollowList = () => ([
  ALL(), 
  { name: i18n.format("关注"),  code  : '1' }, //i18n.format("关注")
  { name: i18n.format("未关注"), code: '0' } // i18n.format("未关注")
])

export const consumeCompareList = () => ([
  // { name: i18n.format("全部"), code: i18n.format("全部")},
  { name: i18n.format("美妆个护"), code: i18n.format("美妆个护")},
  { name: i18n.format("纺织服装"), code: i18n.format("纺织服装")},
  { name: i18n.format("家用电器"), code: i18n.format("家用电器")},
  { name: i18n.format("3C数码"), code: i18n.format("3C数码")},
  { name: i18n.format("食品饮料"), code: i18n.format("食品饮料")},
  { name: i18n.format("轻工制造"), code: i18n.format("轻工制造")},
  { name: i18n.format("家具家装"), code: i18n.format("家具家装")},
  { name: i18n.format("医药保健"), code: i18n.format("医药保健")},
  { name: i18n.format("餐饮"), code: i18n.format("餐饮")},
  { name: i18n.format("酒店/旅游"), code: i18n.format("酒店/旅游")},
  { name: i18n.format("其他行业"), code: i18n.format("其他行业")}
])

export const tmtCompareList = () => ([
  // { name: i18n.format("全部"), code: i18n.format("全部")},
  { name: i18n.format("电商"), code: i18n.format("电商")},
  { name: i18n.format("外卖"), code: i18n.format("外卖")},
  { name: i18n.format("娱乐"), code: i18n.format("娱乐")},
  { name: i18n.format("房地产"), code: i18n.format("房地产")},
  { name: i18n.format("招聘"), code: i18n.format("招聘")},
  { name: i18n.format("汽车"), code: i18n.format("汽车")},
  { name: i18n.format("教育"), code: i18n.format("教育")}
])


