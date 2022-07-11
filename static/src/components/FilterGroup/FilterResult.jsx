import React, { forwardRef, useImperativeHandle, useState, useRef, useMemo } from 'react';
import _ from 'lodash';
import FromItem from '../FormItem';
import Tag from './Tag';
import RsIcon from '@/page/component/rsIcon'

export default forwardRef((props, ref) => {

  const containerRef = useRef(null);
  const [containerStyle, setContainerStyle] = useState({})

  const { expand } = props;
  const { onExpand, onClear, onDelete } = props;

  useImperativeHandle(ref, () => {
    return {
      setContainerStyle,
      getBoundingClientRect: () => containerRef.current.getBoundingClientRect()
    }
  })

  const filterValueFlag = useMemo(() => {
    return _.chain(props.filterValue)
      .toPairs()
      .map(([key, value]) => value)
      .filter(item => {
        if (_.isNil(item)) return false
        if (_.isEmpty(item)) return false
        if (_.every(item, t => _.isNil(t) || t === '')) return false
        return true
      })
      .isEmpty()
      .value()
  }, [props.filterValue])

  return (
    <div className='filter-result'
      ref={containerRef}
      style={{ ...containerStyle }}
    >
      <div className='filter-result-inner'>
        {props.options.length ? <FromItem label={i18n.format('筛选结果')}>
          <div className='list'>
            {
              _.map(props.options, (item, idx) => (
                <Tag key={idx} item={item} onDelete={onDelete} />
              ))
            }
          </div>
        </FromItem> : null}
      </div>
      <div className='filter-result-oprator'>
        <span
          className='clear-btn'
          style={{
            cursor: filterValueFlag ? "not-allowed" : "pointer",
            color: filterValueFlag ? "#BFBFBF" : "#E2492F"
          }}
          onClick={filterValueFlag ? null : onClear}>
          {i18n.format('清空筛选')}
        </span>
        <span
          className='expand-btn'
          style={{ color: expand ? '#8c8c8c' : '#0678FF' }}
          onClick={onExpand}
        >
          {expand ? i18n.format('收起筛选') : i18n.format('展开筛选')}
          <RsIcon
            type={expand ? 'icon-jiantoushang' : 'icon-jiantouxia'}
            style={{ color: expand ? '#8c8c8c' : '#0678FF', marginLeft: 4 }}
          />
        </span>
      </div>
    </div>
  )
})
