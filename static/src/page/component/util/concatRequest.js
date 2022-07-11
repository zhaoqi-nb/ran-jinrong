import {Subject, from} from 'rxjs'
import {filter, map, tap, scan, switchMap, debounceTime} from 'rxjs/operators'
import _ from 'lodash'
import uuid from 'uuid/v4';
import Api from './editTemplate/store/api'

export default class ConcatRequest {
  constructor() {
    this.reduce$ = new Subject()
    this.notice$ = new Subject()
    this.message = this.reduce$
      .pipe(
        scan(({store}, {type, ids, params}) => {
          if(type === 'add') {
            store[uuid().replace(/-/g, '')] = params;

            return {status: true, store};
          }

          _.each(ids, id => {
            delete store[id]
          })

          return {status: false, store}
        }, {status: false, store: {}}),
        debounceTime(100),
        filter(({status}) => status)
      )
      .pipe(
        map(({store}) => store),
        switchMap(store => {
          const values = _.values(store)
          this.reduce$.next({type: 'delete', ids: _.keys(store)})
          return from(Api.batchGetTemplateInfo({data: values}))
        }),
        tap(({data}) => {
          this.notice$.next(data)
        })
      )
      .subscribe()
  }

  emit(params, ...args) {
    this.reduce$.next({type: 'add', params, args})
  }

  on(observer) {
    return this.notice$
      .subscribe(observer)
  }

  // clear() {
  //   this.notice.unsubscribe()
  // }
}