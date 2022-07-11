export const CardData = {
  '餐饮行业公司': {
    title: '餐饮行业公司',
    data: [{
      title: '线下餐饮',
      icon: 'icon-xianxiacanyin',
      desc: '覆盖公司：海底捞、九毛九、奈雪的茶、星巴克等。',
      cards: [{
        title: '门店分析',
        subTitle: '核心指标',
        tags: ['门店数', '覆盖城市数']
      }, {
        title: '价格分析',
        subTitle: '核心指标',
        tags: ['价格指数']
      }, {
        title: '客流量分析',
        subTitle: '核心指标',
        tags: ['排队指数']
      }],
      span: 8,
      gutter: [16, 8],
      itemMinWidth: 336
    }]
  },
  '分析维度整体介绍': {
    title: '分析维度整体介绍',
    data: [{
      title: '电商平台',
      icon: 'icon-dianshangpingtai',
      desc: '天猫、京东、Shopee（特有地域维度）等。',
      cards: [{
        title: '整体概况',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价']
      }, {
        title: '行业分布',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '原价优惠幅度', '满减优惠幅度']
      }, {
        title: '价格区间分布',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价']
      }, {
        title: 'APP分析',
        subTitle: '核心指标',
        tags: ['活跃用户数', '使用时长', '活跃用户留存率', '活跃沉默率']
      }],
      span: 6,
      gutter: [16, 8],
      itemMinWidth: 248
    }, {
      title: '外卖平台',
      icon: 'icon-waimaipingtai',
      desc: '美团、饿了么等。',
      cards: [{
        title: '整体概况',
        subTitle: '核心指标',
        tags: ['交易额', '订单量', '客单价', '用户端配送费', '满减优惠幅度']
      }, {
        title: '城市级别分布',
        subTitle: '核心指标',
        tags: ['交易额', '订单量', '客单价', '用户端配送费', '满减优惠幅度']
      }, {
        title: '品类分布',
        subTitle: '核心指标',
        tags: ['交易额']
      }, {
        title: '配送费分布',
        subTitle: '核心指标',
        tags: ['用户端配送费']
      }, {
        title: '满减分布',
        subTitle: '核心指标',
        tags: ['满减优惠幅度']
      }, {
        title: 'APP分析',
        subTitle: '核心指标',
        tags: ['活跃用户数', '使用时长', '活跃用户留存率', '活跃沉默率']
      }],
      span: 4,
      gutter: [16, 8],
      itemMinWidth: 160
    }, {
      title: '直播平台',
      icon: 'icon-zhibopingtai',
      desc: '虎牙、斗鱼、哔哩哔哩、YY、Bigo、映客、酷狗音乐、酷我音乐、全民K歌、网易云音乐等。',
      cards: [{
        title: '整体概况',
        subTitle: '核心指标',
        tags: ['礼物打赏收入', '活跃主播数']
      }, {
        title: '主播数量分析',
        subTitle: '核心指标',
        tags: ['活跃主播数']
      }, {
        title: '主播收入分析',
        subTitle: '核心指标',
        tags: ['礼物打赏收入']
      }, {
        title: '榜单分析',
        subTitle: '核心指标',
        tags: ['主播排行榜']
      }, {
        title: 'APP分析',
        subTitle: '核心指标',
        tags: ['活跃用户数', '使用时长', '活跃用户留存率', '活跃沉默率']
      }],
      span: [6, 4, 4, 4, 6],
      gutter: [16, 8],
      itemMinWidth: 160
    }, {
      title: '视频平台',
      icon: 'icon-shipinpingtai',
      desc: '爱奇艺、优酷、芒果TV、腾讯视频、哔哩哔哩等。',
      cards: [{
        title: '整体概况',
        subTitle: '核心指标',
        tags: ['视频数', '视频热度指数']
      }, {
        title: '视频数量分析',
        subTitle: '核心指标',
        tags: ['视频数', 'VIP视频数', '自制视频数', '独播视频数']
      }, {
        title: '视频热度分析',
        subTitle: '核心指标',
        tags: ['视频热度指数', 'VIP视频热度指数', '自制视频热度指数', '独播视频热度指数']
      }, {
        title: '节目榜单',
        subTitle: '核心指标',
        tags: ['播放指数']
      }, {
        title: 'APP分析',
        subTitle: '核心指标',
        tags: ['活跃用户数', '使用时长', '活跃用户留存率', '活跃沉默率']
      }],
      span: [4, 4, 6, 4, 6],
      gutter: [16, 8],
      itemMinWidth: 160
    }]
  },
  'APP分析': {
    title: 'APP分析',
    data: [{
      title: 'App特色分析',
      icon: 'icon-APPtesefenxi',
      desc: '电商、生活服务、社交、娱乐等',
      children: [{
        topTitle: '用户规模分析',
        cards: [{
          title: '用户规模概览',
          subTitle: '核心指标',
          tags: ['活跃用户数', '日均活跃用户数', '活跃用户全网渗透率']
        }, {
          title: '规模趋势分析',
          subTitle: '核心指标',
          tags: ['活跃用户数', '日均活跃用户数', '活跃用户全网渗透率']
        }, {
          title: '使用时长趋势分析',
          subTitle: '核心指标',
          tags: ['使用总时长', '日均使用时长', '人均使用时长', '人均单日使用时长']
        }, {
          title: '启动次数趋势分析',
          subTitle: '核心指标',
          tags: ['启动次数', '日均启动次数', '人均启动次数', '人均单日启动次数']
        }, {
          title: '用户粘性趋势分析',
          subTitle: '核心指标',
          tags: ['人均单日启动次数', '人均单日使用时长', '人均使用天数', '用户活跃度']
        }, {
          title: '用户分时分析',
          subTitle: '核心指标',
          tags: ['分时活跃用户数', '分时启动次数', '分时使用时长', '人均启动次数', '人均启动次数']
        }],
        span: 4,
        gutter: [16, 8],
        itemMinWidth: 160
      },
      {
        topTitle: '用户画像与分布',
        cards: [{
          title: '用户属性分布',
          subTitle: '核心指标',
          tags: ['性别', '年龄', '消费等级']
        }, {
          title: '用户地域分布',
          subTitle: '核心指标',
          tags: ['城市级别分布', '省份分布']
        }, {
          title: '用户行为分布',
          subTitle: '核心指标',
          tags: ['使用次数分布', '使用时长分布', '使用间隔分布']
        }],
        span: 6,
        gutter: [16, 8],
        itemMinWidth: 248
      }, {
        topTitle: '用户质量分析',
        cards: [{
          title: '用户留存分析',
          subTitle: '核心指标',
          tags: ['活跃用户留存', '活跃用户沉默']
        }],
        span: 6,
        gutter: [16, 8],
        itemMinWidth: 248
      }]
    }]
  },
  '抖音电商深度洞察': {
    title: '抖音电商深度洞察',
    data: [{
      title: '赛道分析',
      icon: 'icon-saidaofenxi',
      desc: '',
      cards: [{
        title: '赛道概览',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量']
      }, {
        title: '赛道趋势',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量']
      }],
      span: 12,
      gutter: [16, 8],
      itemMinWidth: 512
    }, {
      title: '品牌分析',
      icon: 'icon-pinpaifenxi',
      desc: '',
      cards: [{
        title: 'TOP品牌',
        subTitle: '核心指标',
        tags: ['线上销售额', '市占率']
      }, {
        title: '品牌搜索',
        subTitle: '核心指标',
        tags: ['线上销售额', '市占率']
      }],
      span: 12,
      gutter: [16, 8],
      itemMinWidth: 512
    }]
  },
  '线下门店洞察': {
    title: '线下门店洞察',
    data: [{
      title: '赛道分析',
      icon: 'icon-saidaofenxi',
      desc: '',
      cards: [{
        title: '赛道概览',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }, {
        title: '赛道详情',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }, {
        title: '赛道竞争格局',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }, {
        title: '购物中心',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }],
      span: 6,
      gutter: [16, 8],
      itemMinWidth: 248
    }, {
      title: '品牌分析',
      icon: 'icon-pinpaifenxi',
      desc: '',
      cards: [{
        title: 'TOP品牌',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }, {
        title: '融资品牌',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }, {
        title: '品牌搜索',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }, {
        title: '购物中心',
        subTitle: '核心指标',
        tags: ['门店数', '新增门店数', '流失门店数']
      }],
      span: 6,
      gutter: [16, 8],
      itemMinWidth: 248
    }]
  },
  '消费概念分析引擎': {
    title: '消费概念分析引擎',
    data: [{
      title: '概念分析',
      icon: 'icon-gainianfenxi',
      desc: '',
      cards: [{
        title: '整体概览',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '概念热度']
      }, {
        title: '品牌排行',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '概念热度']
      }, {
        title: '爆品分析',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '概念热度']
      }],
      span: 8,
      gutter: [16, 8],
      itemMinWidth: 336
    }]
  },
  '消费品牌分析引擎': {
    title: '消费品牌分析引擎',
    data: [{
      title: '品牌分析',
      icon: 'icon-pinpaifenxi',
      desc: '',
      cards: [{
        title: '新消费品牌榜单',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '市占率']
      }, {
        title: 'TOP品牌',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '市占率']
      }, {
        title: '融资品牌',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '市占率']
      }, {
        title: '品牌搜索',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价', '市占率']
      }],
      span: 6,
      gutter: [16, 8],
      itemMinWidth: 248
    }]
  },
  '消费赛道分析引擎': {
    title: '消费赛道分析引擎',
    data: [{
      title: '赛道分析',
      icon: 'icon-saidaofenxi',
      desc: '',
      cards: [{
        title: '赛道概览',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价']
      }, {
        title: '赛道详情',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价']
      }, {
        title: '赛道竞争格局',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价']
      }, {
        title: '商品排行',
        subTitle: '核心指标',
        tags: ['线上销售额', '线上销售量', '线上商品均价']
      }],
      span: 6,
      gutter: [16, 8],
      itemMinWidth: 248
    }]
  }
}