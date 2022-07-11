import React from 'react'
import RsIcon from '@/page/component/rsIcon/index';
import './style.less'

export default ({ expanded, onExpand, record }) => {
  if (!record.children) return null
  return (
    <button className="table-expand" style={{ transform: `rotate(${expanded ? 0 : -90}deg)` }} onClick={e => onExpand(record, e)}>
      <RsIcon
        type="icon-tianchongxiajiantou"
        className="table-expand-icon"
      />
    </button>
  )
}
