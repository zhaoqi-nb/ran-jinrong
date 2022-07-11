// import _ from 'lodash';
// import {from} from 'rxjs'
// import {filter, map} from 'rxjs/operators'
// import Server from '../../../plugin/Server';
// import { getAccessState } from '../../component/util/template';
// import {consumeCompareList, tmtCompareList} from '../config';
// import {ALL} from '../config'

// class Api extends Server {
//   async queryResDtoListByAttr( data = {}) {
//       return await this.Http({
//         url: '/api/common/queryResDtoListByAttr',
//         type: "GET",
//         data
//       })
//   }

//   queryResDtoListByAttr2( param = {}) {
//     return from(
//       this.Http({
//         url: '/api/common/queryResDtoListByAttr',
//         type: "GET",
//         data: param
//       })
//     ).pipe(
//       filter(res => res.code === 200),
//       map(res => _.get(res, 'data.data')),
//       map((data) => {

//         const result = _.chain(data)
//           .map(item => {
//             const accessState = getAccessState(item.privilegeDtoList) || {}
//             const disabled = !_.includes(['all', 'view'], _.get(accessState, 'code'))

//             return {
//               ...item,
//               disabled,
//               resObj: JSON.parse(item.resAttr) || {},
//               accessState: accessState
//             }
//           })
//           // .groupBy(item => item.resObj.industry)
//           // .reduce((acc, item) => {
//           //   const [head, last] = acc;

//           //   if(item.disabled) {
//           //     last.push(item)
//           //   } else {
//           //     head.push(item)
//           //   }

//           //   return acc;
//           // }, [[], []])
//           // .flatten()
//           .value()
//           console.log("result",result)

//         const industrys = _.chain(result)
//           .map(item => ({name: item.resObj.industry, code: item.resObj.industry}))
//           .uniqBy(item => item.name)
//           .value()

//            // 按指定的标签顺序排序
//            let orderIndustrys = [];
//            let industry_label = JSON.parse(param.resAttr).industry_label;
//            console.log(industry_label == "消费")
//            if(industry_label === "消费") {
//                consumeCompareList.map((item, index) => {
//                 let temp = _.find(industrys, item);
//                 if(temp){
//                  orderIndustrys.push(item)
//                 }
//             });
//            } else {
//             tmtCompareList.map((item, index) => {
//               let temp = _.find(industrys, item);
//               if(temp){
//                orderIndustrys.push(item)
//               }
//           });
//           }

//           let orderResult = [];
//           // 公司列表按行业标签顺序，同行业的排在一起
//           console.log("result",result)

//           orderIndustrys.map((industry ,i) => {

//             const filterList = _.filter(result, (item)=>{ return item.resObj.industry == industry.name});
//             console.log("filter",industry.name,filterList)
//             orderResult=[...orderResult, ...filterList]
//           })

//           let newResult = _.chain(orderResult).reduce((acc, item) => {
//               const [head, last] = acc;

//               if(item.attendFlag) {
//                 head.push(item)
//               } else {
//                 last.push(item)
//               }

//               return acc;
//             }, [[], []])
//             .flatten()
//             .reduce((acc, item) => {
//               const [head, last] = acc;

//               if(item.disabled) {
//                 last.push(item)
//               } else {
//                 head.push(item)
//               }
//               return acc;
//             }, [[], []])
//             .flatten()
//             .value()

//       console.log('industrys', newResult)

//         return {
//           dataList: newResult,
//           industrys: [ALL, ...orderIndustrys]
//         }
//       })
//     )
// }
// }

// export default new Api();

import _ from 'lodash';
import moment from 'moment';
import { from, forkJoin } from 'rxjs'
import { filter, map, switchMap, toArray, mergeMap, subscribe } from 'rxjs/operators'
import Server from '../../../plugin/Server';
import { getAccessState } from '../../component/util/template';
import { ALL, NOLIMIT, consumeCompareList, tmtCompareList } from '../config';

import i18n from '@/plugin/i18n'


class Api extends Server {
  async queryResDtoListByAttr(data = {}) {
    return await this.Http({
      url: '/api/common/queryResDtoListByAttr',
      type: "GET",
      data
    })
  }

  async getUserGuideRecord(data = {}) {
    return await this.Http({
      url: '/api/userbehavior/getUserGuideRecord',
      type: "GET",
      data
    })
  }
  async addUserGuideRecord(data = {}) {
    return await this.Http({
      url: '/api/userbehavior/addUserGuideRecord',
      type: "GET",
      data
    })
  }

  queryResDtoListByAttr2(param = {}) {
    // return from(
    //   this.Http({
    //     url: '/api/common/queryResDtoListByAttr',
    //     type: "GET",
    //     data: param
    //   })
    // )
    const queryResDtoListByAttr = from(
      this.Http({
        url: '/api/common/queryResDtoListByAttr',
        type: "GET",
        data: param
      })
    );
    const getStocksortList = from(
      this.Http({
        url: '/api/common/getStockSortList',
        type: "GET",
        data: {
          industry_label: JSON.parse(param.resAttr).industry_label,
        }
      })
    );
    const getTMTList = from(
      this.Http({
        url: '/api/common/queryResDtoListByAttr',
        type: "GET",
        data: {
          resAttr: JSON.stringify({ industry_label: "TMT" }),
        }
      })
    )

    return forkJoin([queryResDtoListByAttr, getStocksortList, getTMTList]).pipe(
      // filter(res => res.code === 200),
      // map(res => _.get(res, 'data.data')),
      map((res) => {

        let data = res[0]?.data?.data || [];
        let sortMap = res[1]?.data || [];
        let tmtData = res[2]?.data?.data;

        let tabData = [];
        if (!tmtData || !tmtData?.length) {
          tabData = [
            { title: i18n.format("消费"), value: "消费" },
          ]
        } else {
          tabData = [
            { title: i18n.format("消费"), value: "消费" },
            { title: "TMT", value: "TMT" }
          ]
        }

        // 数据分组
        let result = []
        result = _.chain(data)
          .map(item => {
            const accessState = getAccessState(item.privilegeDtoList) || {}
            const disabled = !_.includes(['all', 'view'], _.get(accessState, 'code'))
            const resObj = JSON.parse(item.resAttr) || {}

            resObj.industry = i18n.format(resObj.industry)

            const getNewTagFlag = () => {
              if (!resObj.endDate) {
                return _.get(resObj, 'ifNew')
              }
              const startTime = moment().format('YYYY-MM-DD')
              const endTime = moment(resObj.endDate).format('YYYY-MM-DD')
              const diff = moment(endTime).diff(moment(startTime), 'days');
              return diff >= 0 && _.get(resObj, 'ifNew')
            }

            const newTagFlag = getNewTagFlag();

            return {
              ...item,
              ...newTagFlag ? { newTag: { tagName: '新增', tagType: '新增' } } : {},
              disabled,
              img: `${process.env.ASSET_PATH}img/company/${_.get(resObj, 'img')}`,
              accessState: accessState,
              resName: i18n.format(item.resName),
              stock_code: resObj?.stock_code || null,
              resObj: {
                ...resObj,
                featureModule: resObj.featureModule || "",
                location: i18n.format(resObj.location),
                stock_code: i18n.format(resObj.stock_code)
              },
              accessState: accessState
            }
          })
          .groupBy(item => item.resObj.industry)
          .value()

        let industry_label = JSON.parse(param.resAttr).industry_label;

        console.log("分组", result)
        // 按照返回的数组进行分组排序
        for (let key in result) {

          let newResult = {}
          let remain = {};
          let newSortMap = {};
          if (sortMap) {
            Object.keys(sortMap).forEach(item => {
              newSortMap[i18n.format(item)] = sortMap[item];
            })
          }
          let sortArr = _.get(newSortMap, key)

          newResult[key] = _.chain(sortArr)
            .map((item) => {
              const targetObj = _.find(result[key], { "resName": i18n.format(item.stock_name), "stock_code": item.stock_code });
              // const targetObj = _.find(result[key], ["resName", i18n.format(item.stock_name)]);
              return targetObj;
            }).compact().value()

          remain[key] = _.difference(result[key], newResult[key])

          newResult[key] = _.uniqWith([...newResult[key], ...remain[key]], _.isEqual)

          result[key] = newResult[key]
        }

        let orderIndustrys = industry_label === "消费"
          ? consumeCompareList()
          : tmtCompareList()

        // 行业排序
        result = _.chain(orderIndustrys)
          .map(item => {
            return result[item.code]
          })
          .compact()
          .flatten()
          .value()

        orderIndustrys = _.chain(result)
          .uniqBy(item => item.resObj.industry)
          .map((item, index) => ({ name: item.resObj.industry, code: item.resObj.industry }))
          .value()


        // 数据组装
        result = _.chain(result).reduce((acc, item) => {
          const [head, middle, last] = acc;
          if (item && item.attendFlag) {
            head.push(item)
          } else if (item && !item.disabled) {
            middle.push(item)
          } else {
            last.push(item)
          }
          return acc;
        }, [[], [], []])
          .flatten()
          .sortBy((item) => {
            if (_.get(item, 'attendFlag') === "1") {
              return false
            }
            if (_.get(item, 'newTag')) {
              return false
            }
            return true
          })
          .value()

        // 聚合得到特色模块筛选项内容
        const features = _.chain(result)
          .map(item => {
            const featureArr = item?.resObj?.featureModule.split(",");
            if (!featureArr || !featureArr.length) return null;
            return featureArr.map((featureName, index) => {
              if (featureName) {
                return { name: featureName, code: featureName }
              }
            })
          }
          )
          .flatten()
          .compact()
          .uniqBy(item => item.name)
          .map(item => ({ name: i18n.format(item.name), code: item.code }))
          .value();


        console.log("排序输出", result)
        return {
          tabData: tabData,
          dataList: result,
          industrys: [ALL(), ...orderIndustrys],
          features: [NOLIMIT(), ...features]
        }
      })
    )
  }
}

export default new Api();