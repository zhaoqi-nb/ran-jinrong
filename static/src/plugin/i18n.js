import _ from 'lodash';
import qs from 'qs';
import { ajax } from 'rxjs/ajax'
import { Subject, from, of } from 'rxjs'
import { scan, map, tap, filter, switchMap, debounceTime, mergeMap } from 'rxjs/operators'
import localforage from 'localforage'
import * as Cookies from 'js-cookie'

const EN_US = 'en_US'

const state = new WeakMap();

const LANGUAGE_PACKAGE = 'languagePackage';

const LOCAL_LANGUAGE = 'local_language';

const formattedMessage = (value, option) => {
  return value.replace(/\{(\w+)\}/g, (match, key) => {
    return option[key]
  })
}

const postData = (data) => from(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data)
  }, 300)
}))

class I18n {
  constructor() {
    state.set(this, {
      // localePkg: null
    })

    this.useLocalStore()

    this.monitor$ = new Subject()

    this.postNotFoundMsg()
  }

  init(observer) {
    this.getLanguagePackage(observer)
  }

  // 获取语言包
  getLanguagePackage(observer) {
    const enUSLocalLanguage$ = from(this.localeStore.getItem(LANGUAGE_PACKAGE))
      .pipe(switchMap(data => {
        return ajax({
          url: '/api/getLanguagePackage',
          method: 'get',
          queryParams: qs.stringify({
            stamp: _.get(data, 'update_time'),
            language: window.localStorage.getItem(LOCAL_LANGUAGE)
          })
        })
          .pipe(
            map(res => _.get(res, 'response.data')),
            tap(res => {
              if (res !== 1) {
                this.localeStore.setItem(LANGUAGE_PACKAGE, res)
              }
            }),
            map(res => {
              return res === 1 ? data : res
            }),
            tap(res => {
              this.addLocaleData(res.languagePack)
              // console.log('用户协议', this.format('暂无数据'))
            }),
          )
      }))

    of(this.getLocalLanguage())
      .pipe(switchMap(language => {
        return language !== 'zh_CN' ? enUSLocalLanguage$ : of(null)
      }))
      .subscribe(observer)
  }

  // 切换语言
  switchLanguage(locale) {
    window.localStorage.setItem(LOCAL_LANGUAGE, locale)
    window.location.reload()
  }

  // 获取本地语言
  getLocalLanguage() {
    return Cookies.get('local_language') || window.localStorage.getItem(LOCAL_LANGUAGE) || 'zh_CN'
  }

  // 未来扩展
  configure(config) {

  }

  useLocalStore() {
    this.localeStore = localforage.createInstance({
      driver: [
        localforage.WEBSQL,
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE
      ],
      name: 'localeStore'
    })
  }

  addLocaleData(localeData) {
    const data = state.get(this)

    data.localeData = localeData;
  }

  useLocale(locale) {
    const data = state.get(this)
    data.locale = locale;
  }

  format(...args) {
    return this.formattedMessage(...args)
  }

  batchFormat(data, keys, prefix) {
    return _.reduce(keys, (data, key) => {
      const newKey = _.compact([prefix, key]).join('_')

      if (_.has(data, key)) {
        _.set(data, newKey, this.format(_.get(data, key).trim()))
      }

      return data
    }, data)
  }

  formattedMessage(id, outer) {
    const data = state.get(this)

    const current = data.localeData
    const isCn = this.getLocalLanguage() === 'zh_CN'

    if (isCn) {
      return typeof id === 'string' ? formattedMessage(id, outer) : id
    }

    try {
      if (!_.has(current, id)) {
        throw Error('404')
      }
      const valueOrCallback = current[id]

      const value = formattedMessage(
        _.isFunction(valueOrCallback)
          ? valueOrCallback(outer)
          : valueOrCallback,
        outer
      )

      return value
    } catch (err) {
      if (err.message === '404') {
        if (typeof id === 'string') {
          const msg = {
            type: '404',
            value: { key: id, url: window.location.pathname, locale: data.locale }
          }
          this.loggerNotFound(msg)
          this.monitor$.next(msg)
        } else {
          console.error(`[i18n warn] 翻译内容不合法: `, id)
        }
      }

      return id
    }
  }

  loggerNotFound(data) {
    // console.log('[i18n logger]', data)
  }

  // 上报数据
  postNotFoundMsg() {
    const data$ = this.monitor$.pipe(
      filter(current => current.type === '404'),
      map(current => current.value),
      scan((acc, current) => {
        if (_.isEmpty(acc) || !_.some(acc, item => current.key === item.key)) {
          acc.push(current)
        }

        return acc
      }, []),
      debounceTime(1000),
      mergeMap((data) => {

        return postData(data)
      }),
      switchMap(res => {
        const local$ = from(this.localeStore.getItem('no_translate_list'))

        return local$.pipe(map(localList => {
          return _.uniqBy([...res, ..._.toArray(localList)], item => item.key)
        }))
      }),
      tap((res) => {
        this.localeStore.setItem('no_translate_list', res)
      })
    )


    data$.subscribe((res => {
      this.noList = res;
      console.log('[i18n logger post message]', res)
    }))
  }

  clearNoList() {
    this.localeStore.clear('no_translate_list')
  }

  // 获取未翻译的列表
  getNoList() {
    return _.filter(this.noList || [], item => {
      return typeof item.key === 'string';
    })
  }

  style(styles) {
    const key = this.getLanguagePackage()

    return _.get(styles, key)
  }

  className(classNames) {
    const key = this.getLanguagePackage()

    return _.get(classNames, key)
  }
}

export { I18n, EN_US }

const i18n = new I18n()

window.i18n = i18n;

export default i18n