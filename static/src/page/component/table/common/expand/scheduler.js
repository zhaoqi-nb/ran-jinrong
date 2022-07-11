import _ from 'lodash'
import {Subject, of, forkJoin, from, timer} from 'rxjs'
import {debounceTime, mergeMap, switchMap, filter, delay, concatMap, map, scan, startWith} from 'rxjs/operators'

export class QueryScheduler {
  action$ = new Subject();

  constructor() {
    // TODO 这里扩展减少state的操作
    this.on$ = this.action$.pipe(
      startWith(null),
      debounceTime(300),
      // pairwise(),
      // filter(([a, b]) => {
      //   return !_.isEqual(_.get(a, 'data.dataSource'), _.get(b, 'data.dataSource'))
      // }),
      // tap(props => {
      //   console.log('vvvvvvvvvvvv', props) // .data.dataSource tap, 
      // }),
    )
  }

  destory() {
    this.handle.unsubscribe()
  }

  emit(params) {
    this.action$.next(params)
  }

  run(...args) {
    this.handle = this.on$
      .subscribe(...args)
  }
}

// from([1,2,3,4])
//   .subscribe(res => {
//     console.log('test====', res)
//   })

export class LoopTableTask {
  static of(...args) {
    return new LoopTableTask(...args)
  }

  constructor({codes, params, loopKey, headerMapping, instantiationId, url}, Api) {
    const paramList = _.map(codes, code => {
        return {...params, [loopKey]: code, first_content_name:codes?codes[0]:""}
      })
      
    this.instantiationId = instantiationId;
    this.url = url;
    this.headerMapping = headerMapping;
    this.paramList = paramList;
    this.Api = Api;
    this.paramList$ = from(_.chunk(paramList, 3));
  }

  destory() {
    if(this.fetchDatas) {
      this.fetchDatas.unsubscribe()
    }
  }

  getDataByIndex({ pagination }, index) {
    const current = this.paramList[index]

    if(_.isNil(current)) return of(null)
    const _params = { ...current, currentPage: pagination.current, pageSize: pagination.pageSize }


    return from(this.Api.getLoopIndustryTableData({ 
      instantiationId: this.instantiationId, 
      params: JSON.stringify(_params),
      headerMapping: JSON.stringify(this.headerMapping),
      url: this.url
    }))
      .pipe(
        map(res => {
          this.paramList[index] = _params
          return {
            data: _.get(res, 'data[0]', {}),
            params: _params
          }
        })
      )
  }

  run(observer) {
    let count = 0;
    this.fetchDatas = this.paramList$.pipe(
      delay(() => {
        return timer(count === 0 ? 0 : 300)
      }),
      concatMap(data => {
        console.log("循环表格", this.url)
        const querys$ = _.map(data, params => {
          return from(this.Api.getLoopIndustryTableData({ 
            instantiationId: this.instantiationId, 
            params: JSON.stringify(params),
            headerMapping: JSON.stringify(this.headerMapping),
            url: this.url 
          }))
          .pipe(map(res => _.get(res, 'data')))
        })

        return forkJoin(querys$)
      }),
      scan((acc, current) => {
        count += 1
        return [...acc, ..._.flatten(current)]
      }, [])
    )
    .subscribe(observer);

    return this;
  }
}