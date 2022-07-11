'use strict';

import React, { useCallback, useState, useRef, useMemo } from 'react'
import _ from 'lodash'
import { CustomTab, CustomTabPane } from '../component/tab/common';
import RsIcon from '@/page/component/rsIcon/index';
import Head from './Head';
import Body from './Body';
import Img from '@/components/Img';
import CardDrawer from './CardDrawer';

import { CardData } from './util';

import './style.less'

function ServicePackage(props) {

  const headRef = useRef(null);
  const [activeKey, setActiveKey] = useState('1');
  const [cardRecord, setCardRecord] = useState({});
  const [cardVisible, setCardVisible] = useState(false);

  const lan = i18n.getLocalLanguage();

  const __CardData = useMemo(() => {
    return _.chain(CardData)
      .toPairs()
      .map(([key, value]) => {
        const getCards = (cards) => {
          return _.map(cards, item => ({
            ...item,
            title: i18n.format(item.title),
            subTitle: i18n.format(item.subTitle),
            tags: _.map(item.tags, t => (i18n.format(t)))
          }))
        }

        const getChildren = (children) => {
          return _.map(children, item => ({
            ...item,
            topTitle: i18n.format(item.topTitle),
            cards: getCards(item.cards)
          }))
        }
        return [
          key,
          {
            ...value,
            title: i18n.format(value.title),
            data: _.map(value.data, (item) => {
              return item.children ? (
                {
                  ...item,
                  title: i18n.format(item.title),
                  desc: i18n.format(item.desc),
                  children: getChildren(item.children)
                }
              ) : (
                {
                  ...item,
                  title: i18n.format(item.title),
                  desc: i18n.format(item.desc),
                  cards: getCards(item.cards)
                }
              )
            })
          }
        ]
      })
      .fromPairs()
      .value()
  }, [])

  const handleOpenDrawer = useCallback(
    (record) => () => {
      if (record.drawer.type === 'card') {
        setCardVisible(true);
        setCardRecord(__CardData[record.drawer.title])
      }
    }, [__CardData])

  const customRender = useCallback((record, row) => {
    if (_.isBoolean(record)) {
      return record
        ? <RsIcon type="icon-duihao" style={{ fontSize: 20, color: '#46C93A' }} />
        : <RsIcon type="icon-guanbi" style={{ fontSize: 20, color: '#8C8C8C' }} />
    }

    if (_.isObject(record)) {
      const style = record.link ? {
        color: '#0678FF',
        cursor: 'pointer'
      } : {
        color: '#595959'
      }
      return <span style={style} onClick={handleOpenDrawer(record)}>{i18n.format(record.label)}</span>
    }
    return <span style={{ color: '#595959' }}>{i18n.format(record)}</span>
  }, [])

  const getImage = useCallback((type) => {
    const lan = i18n.getLocalLanguage();
    if (lan === 'zh_CN') {
      return require(`./images/${type}.png`)
    }
    return require(`./images/${type}_en.png`)
  }, [])

  const tabData = [
    {
      title: i18n.format("二级市场服务包"),
      value: '1',
      tabPane: {
        colums: [{
          label: '',
          dataKey: 'label',
          align: 'left',
          render: (value, row) => {
            return <span style={{ fontWeight: 500, color: '#262626' }}>{i18n.format(value)}</span>
          }
        }, {
          label: <Img src={getImage('base')} style={{ height: 56 }} />,
          dataKey: 'base',
          render: customRender
        }, {
          label: <Img src={getImage('standard')} style={{ height: 56 }} />,
          dataKey: 'standard',
          render: customRender
        }, {
          label: <Img src={getImage('senior')} style={{ height: 56 }} />,
          dataKey: 'senior',
          render: customRender
        }, {
          label: <Img src={getImage('full')} style={{ height: 56 }} />,
          dataKey: 'full',
          render: customRender
        }],
        dataSource: [{
          title: '消费包',
          data: [{
            rows: [{
              label: '更新频率',
              base: '月',
              standard: '月、周',
              senior: '月、周',
              full: '月、周'
            }]
          }, {
            rows: [{
              label: '是否融合抖音数据',
              base: false,
              standard: false,
              senior: true,
              full: true
            }]
          }, {
            rows: [{
              label: '综合看板',
              base: '仅公司排行',
              standard: '仅公司排行',
              senior: true,
              full: true
            }]
          }, {
            subTitle: '行业分析',
            rows: [{
              label: '行业数量',
              base: false,
              standard: {
                label: '8个消费行业',
                link: false
              },
              senior: '8个消费行业/自由选择行业',
              full: '8个消费行业'
            }, {
              label: '特色行业',
              base: false,
              standard: true,
              senior: true,
              full: '全量'
            }]
          }, {
            subTitle: '公司分析',
            rows: [{
              label: '公司上市地点',
              base: 'A股、港股',
              standard: 'A股、港股、海外',
              senior: 'A股、港股、海外',
              full: 'A股、港股、海外'
            }, {
              label: '公司数量',
              base: {
                label: '250+家',
                link: false
              },
              standard: {
                label: '400+家',
                link: false
              },
              senior: {
                label: '400+家/自由选择公司/按行业选择公司',
                link: false
              },
              full: {
                label: '400+家',
                link: false
              }
            }],
            others: [{
              label: '公司整体数据',
              base: true,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '品牌分布',
              base: true,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '品类分布',
              base: true,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '渠道分布',
              base: true,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '品牌优惠率',
              base: true,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '市占率分析',
              base: true,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '品牌购物中心分析',
              base: false,
              standard: true,
              senior: true,
              full: true
            }, {
              label: '产品系列',
              base: false,
              standard: false,
              senior: true,
              full: true
            }, {
              label: '品类竞争格局',
              base: false,
              standard: false,
              senior: true,
              full: true
            }, {
              label: '商品分析',
              base: false,
              standard: false,
              senior: true,
              full: true
            }, {
              label: '线下门店',
              base: false,
              standard: false,
              senior: true,
              full: true
            }, {
              label: '小红书舆情',
              base: false,
              standard: false,
              senior: true,
              full: true
            }],
            bottomExpandExtra: ({ expand, onExpand }) => {
              return <span
                style={{ color: '#0678FF', cursor: 'pointer' }}
                onClick={onExpand}
              >{expand ? i18n.format('折叠分析维度对比') : i18n.format('展开分析维度对比')}</span>
            }
          }, {
            subTitle: '品牌分析',
            rows: [{
              label: '覆盖行业',
              base: false,
              standard: false,
              senior: {
                label: '8个消费行业/自由选择行业',
                link: false
              },
              full: {
                label: '8个消费行业',
                link: false
              }
            }]
          }, {
            subTitle: '餐饮行业公司',
            rows: [{
              label: '公司数量',
              base: '按需购买',
              standard: '按需购买',
              senior: '按需购买',
              full: {
                label: '全量',
                link: false
              }
            }, {
              label: '分析模块',
              base: '每个公司不同',
              standard: '每个公司不同',
              senior: '每个公司不同',
              full: {
                label: '分析维度整体介绍',
                link: true,
                drawer: {
                  title: '餐饮行业公司',
                  type: 'card'
                }
              }
            }]
          }]
        }, {
          title: 'TMT包',
          data: [{
            subTitle: '公司分析',
            rows: [{
              label: '公司数量',
              base: '按需购买',
              standard: '按需购买',
              senior: '按需购买',
              full: {
                link: false,
                label: '全量'
              }
            }, {
              label: '分析维度',
              base: '每个公司不同',
              standard: '每个公司不同',
              senior: '每个公司不同',
              full: {
                link: true,
                label: '分析维度整体介绍',
                drawer: {
                  title: '分析维度整体介绍',
                  type: 'card'
                }
              }
            }]
          }]
        }, {
          title: '其他数据源',
          data: [{
            subTitle: 'APP分析',
            rows: [{
              label: '分析模块',
              base: '按需购买',
              standard: '按需购买',
              senior: '按需购买',
              full: {
                link: true,
                label: '全量',
                drawer: {
                  title: 'APP分析',
                  type: 'card'
                }
              }
            }]
          }]
        }],
        explain: {
          title: '服务包订阅说明',
          text: '基础版、标准版、高级版可按需求独立/组合订阅消费包、TMT、其他数据源；全量包包含所有内容'
        }
      }
    },
    {
      title: i18n.format("一级市场服务包"),
      value: '2',
      tabPane: {
        gridTemplateColumns: '192px 400px 400px',
        colums: [{
          label: '',
          dataKey: 'label',
          align: 'left',
          render: (value, row) => {
            return <span style={{ fontWeight: 500, color: '#262626' }}>{i18n.format(value)}</span>
          }
        }, {
          label: <Img src={getImage('pe')} style={{ height: 56 }} />,
          dataKey: 'pe',
          render: customRender
        }, {
          label: <Img src={getImage('vc')} style={{ height: 56 }} />,
          dataKey: 'vc',
          render: customRender
        }],
        dataSource: [{
          title: '消费包',
          data: [{
            subTitle: '消费品牌分析引擎',
            rows: [{
              label: '覆盖行业数量',
              pe: {
                link: false,
                label: '16个消费行业'
              },
              vc: {
                link: false,
                label: '16个消费行业'
              }
            }, {
              label: '品牌榜单',
              pe: '头部',
              vc: '头部、腰部、新锐'
            }, {
              label: 'TOP品牌数量',
              pe: '100个／行业',
              vc: '300个／行业'
            }],
            bottomExtra: () => {
              const params = {
                drawer: {
                  title: '消费品牌分析引擎',
                  type: 'card'
                }
              }
              return <span
                style={{ color: '#0678FF', cursor: 'pointer' }}
                onClick={handleOpenDrawer(params)}
              >{i18n.format('查看分析维度')}</span>
            }
          }, {
            subTitle: '消费赛道分析引擎',
            rows: [{
              label: '覆盖行业数量',
              pe: {
                link: false,
                label: '16个消费行业'
              },
              vc: {
                link: false,
                label: '16个消费行业'
              }
            }, {
              label: '赛道评估特色指标',
              pe: '头部上榜品牌数量',
              vc: '头部/腰部/新锐上榜品牌数量'
            }, {
              label: '赛道详情页品牌数量',
              pe: '20个／行业',
              vc: '50个／行业'
            }, {
              label: '赛道详情页店铺数量',
              pe: '20个／行业',
              vc: '50个／行业'
            }, {
              label: '赛道详情页商品数量',
              pe: '20个／行业',
              vc: '50个／行业'
            }],
            bottomExtra: () => {
              const params = {
                drawer: {
                  title: '消费赛道分析引擎',
                  type: 'card'
                }
              }
              return <span
                style={{ color: '#0678FF', cursor: 'pointer' }}
                onClick={handleOpenDrawer(params)}
              >{i18n.format('查看分析维度')}</span>
            }
          }, {
            subTitle: '消费概念分析引擎',
            rows: [{
              label: '覆盖行业数量',
              pe: {
                link: false,
                label: '16个消费行业'
              },
              vc: {
                link: false,
                label: '16个消费行业'
              }
            }],
            bottomExtra: () => {
              const params = {
                drawer: {
                  title: '消费概念分析引擎',
                  type: 'card'
                }
              }
              return <span
                style={{ color: '#0678FF', cursor: 'pointer' }}
                onClick={handleOpenDrawer(params)}
              >{i18n.format('查看分析维度')}</span>
            }
          }, {
            subTitle: '抖音电商深度洞察',
            rows: [{
              label: '覆盖行业数量',
              pe: {
                link: false,
                label: '16个消费行业'
              },
              vc: {
                link: false,
                label: '16个消费行业'
              }
            }],
            bottomExtra: () => {
              const params = {
                drawer: {
                  title: '抖音电商深度洞察',
                  type: 'card'
                }
              }
              return <span
                style={{ color: '#0678FF', cursor: 'pointer' }}
                onClick={handleOpenDrawer(params)}
              >{i18n.format('查看分析维度')}</span>
            }
          }],
        }, {
          title: '其他数据源',
          data: [{
            subTitle: '线下门店洞察',
            rows: [{
              label: '分析模块',
              pe: '按需购买',
              vc: '按需购买'
            }],
            bottomExtra: () => {
              const params = {
                drawer: {
                  title: '线下门店洞察',
                  type: 'card'
                }
              }
              return <span
                style={{ color: '#0678FF', cursor: 'pointer' }}
                onClick={handleOpenDrawer(params)}
              >{i18n.format('查看分析维度')}</span>
            }
          }, {
            subTitle: '小红书舆情分析',
            rows: [{
              label: '分析模块',
              pe: '按需购买',
              vc: '按需购买'
            }]
          }]
        }],
        explain: {
          title: '服务包订阅说明',
          text: 'PE版、VC版可按需求独立/组合订阅消费包、其他数据源；'
        }
      }
    }
  ]

  const handleScroll = useCallback(() => {
    const headEle = headRef.current;
    const parentEle = headEle.parentElement;
    const { top } = parentEle.getBoundingClientRect();
    if (top <= 56) {
      headEle.style.position = 'fixed';
      headEle.style.top = '56px';
    } else {
      headEle.style.position = 'absolute';
      headEle.style.top = 0;
    }
  }, [])

  const handleChange = useCallback((key) => {
    setActiveKey(key)
  }, [])

  return (
    <div className='service-package-wrapper' onScroll={handleScroll}>
      <CustomTab
        tabData={tabData}
        type="line"
        currSelect={activeKey}
        onChange={handleChange}
      >
        {
          _.map(tabData, (item) => {
            const tabPane = item.tabPane;
            return <CustomTabPane key={item.value} style={{ width: 1040 }}>
              <div className='explain'>
                <span className='title'>{i18n.format(tabPane.explain.title)}</span>
                <span className='text'>{i18n.format(tabPane.explain.text)}</span>
              </div>
              <div className='grid-wrapper'>
                <Head
                  ref={headRef}
                  colums={tabPane.colums}
                  gridTemplateColumns={tabPane.gridTemplateColumns}
                />
                <Body
                  colums={tabPane.colums}
                  dataSource={tabPane.dataSource}
                  gridTemplateColumns={tabPane.gridTemplateColumns}
                />
              </div>
            </CustomTabPane>
          })
        }
      </CustomTab>
      <CardDrawer
        visible={cardVisible}
        record={cardRecord}
        onClose={useCallback(() => {
          setCardVisible(false)
        }, [])}
      />
    </div>
  )
}

ServicePackage.propTypes = {}

export default ServicePackage
