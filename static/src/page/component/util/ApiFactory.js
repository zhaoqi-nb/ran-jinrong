import {Subject, from} from 'rxjs'
import {filter, map, tap, scan, switchMap, debounceTime} from 'rxjs/operators'
import _ from 'lodash'
import uuid from 'uuid/v4';
import Server from '@/plugin/Server';

class Api extends Server { 
    // 通用表格请求
    async getTemplateData(data = {}) {
        return await this.Http({
            url: '/api/config/common/templateData',
            data
        })
    }

    async getDrawerChartData(data = {}) {
      return await this.Http({
          url: '/api/config/component/chart',
          data
      })
    }
}

// 打包消息
class BuildMessage {
  constructor() {
    this.message$ = new Subject()

    this.notice$ = this.message$
      .pipe(
        scan(({store}, {type, key, ids, params}) => {
          if(type === 'delete') {
            _.each(ids, id => {
              delete store[key][id]
            })
  
            return {status: false, store}
          }

          store[key][uuid().replace(/-/g, '')] = params;

          return {status: true, store};
        }, {status: false, store: {
          templateData: {},
          chart: {}
        }}),
        debounceTime(100),
        filter(({status}) => status)
      )
      // .pipe(
      //   // map(({store}) => store),
      //   // switchMap(store => {
      //   //   const values = _.values(store)
      //   //   this.reduce$.next({type: 'delete', ids: _.keys(store)})
      //   //   return from(Api.batchGetTemplateInfo({data: values}))
      //   // }),
      //   // tap(({data}) => {
      //   //   this.notice$.next(data)
      //   // })
      // )
      // .subscribe()
  }

  emit(params, key) {
    this.message$.next({type: 'add', key, params})
  }

  on() {
    return this.notice$
  }
}

class WidgetData {
  constructor() {
    this.buildMessage = new BuildMessage()

    this.buildMessage.on().subscribe(res => {
      console.log('reeeeee', res)
    })
  }

  emit(key, params) {
    this.buildMessage.emit({type: 'add', key, params})
  }
}


export default new WidgetData()