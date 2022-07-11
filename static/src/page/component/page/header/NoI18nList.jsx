import React from 'react';
import {Dropdown, Input, Button} from 'antd';
import {useEventCallback, useObservable} from 'rxjs-hooks'
import {map, tap, catchError} from 'rxjs/operators'
import i18n from '@/plugin/i18n'
import './noi18n.less'
import _ from 'lodash'
import { EMPTY } from 'rxjs';

function saveJSON(data, filename) {
  data = JSON.stringify(data, undefined, 2);

  let blob = new Blob([data], { type: "text/json" }),
  a = document.createElement("a");
  a.download = filename;

  a.href = window.URL.createObjectURL(blob);

  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");

  // 添加鼠标事件
  let event = new MouseEvent("click", {});

  // 向一个指定的事件目标派发一个事件
  a.dispatchEvent(event);
}

export default (props) => {
  const [onVisibleChange, visible] = useEventCallback((event$) => event$, false)
  const [onSearch, search] = useEventCallback((event$) => event$.pipe(map(e => e.target.value)), '')
  const list = useObservable(
    (state$, inputs$) => inputs$
    .pipe(
      map(([visible, search]) => {
        if(!visible) return []
        const dataList = i18n.getNoList()
        return search ? _.filter(dataList, item => {
        
          return _.isString(item.key) ? item.key.indexOf(search) > -1 : false
        }) : dataList
      }),

      catchError(error => {
        return EMPTY
      })
  ), [], [visible, search])

  const overlay = (
    <div className="no-18n" 
      onClick={e => {e.stopPropagation()}} 
      onMouseDown={e => {e.stopPropagation()}}
      onMouseUp={e => {e.stopPropagation()}}
    >
      <Input placeholder='查找未翻译内容' onChange={onSearch} />
      <ul className="no-18n-inner">
        {
          _.map(list, (item, i) => {
            return <li key={i}>{item.key}</li>
          })
        }
      </ul>
      <div style={{textAlign: 'right', marginTop: -5, paddingTop: 5, borderTop: '1px solid #dcdcdc'}}>
        <Button 
            onClick={() => {
              i18n.clearNoList()
              window.setTimeout(() => window.location.reload(), 0)
            }}
            type="link"
            size="small"
        >清空</Button>
      
        <Button 
          onClick={() => saveJSON(_.map(i18n.getNoList(), item => item.key), '未翻译数据.json')}
          type="link"
          size="small"
        >导出</Button>
      </div>
    </div>
  )

  return (
    <Dropdown visible={visible} overlay={overlay} trigger={['click']} placement="bottomCenter" onVisibleChange={onVisibleChange}>
      <div>未翻译</div>
    </Dropdown>
  )
}