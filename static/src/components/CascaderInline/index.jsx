import React, { useEffect, useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import _ from 'lodash';

import FormItem from '../FormItem';
import FilterButton from './FilterButton';
import RsIcon from '../../page/component/rsIcon';

import useGetFilterOptions from './useGetFilterOptions';

import './style.less'
import classNames from 'classnames';

export default forwardRef(({
  headerValue,
  headerOption,
  filterValue,
  onHeaderChange,
  onChange,
  filterOptions,
  ...props
}, ref) => {

  const [filter, setFilter] = useState({})
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    setFilter(filterValue)
  }, [filterValue])


  const handleHeaderChange = useCallback(
    (key) => {
      onHeaderChange && onHeaderChange(key)
    }, [onHeaderChange])

  const handleChange = useCallback(
    (item) => (list) => {

      setFilter(state => {
        const _state = { ...state, [item.key]: list };

        onChange && onChange(_state)
        return _state
      })
    },
    [onChange]
  )

  const handleExpand = useCallback((visible) => {
    console.log('visiblevisiblevisible', visible)
    if (visible !== undefined) {
      setExpand(visible)
      return
    }
    setExpand(state => !state)
  }, [])

  useImperativeHandle(ref, () => ({
    onExpand: handleExpand
  }))

  const contentStyle = !expand ? {
    height: 1,
    background: "#E1E8F0"
  } : {
    height: 'auto'
  }

  return (
    <div className='cascader-inline' style={{ ...props.style }}>
      <div className='header'>
        <div className='filter-list'>
          <FormItem label={headerOption.title}>
            <FilterButton.Group value={headerValue} options={headerOption.children} onChange={handleHeaderChange} />
          </FormItem>
        </div>
        {/* {
          !!_.size(filterOptions) && (
            <div className='expand' onClick={handleExpand}>
              {expand ? i18n.format('收起筛选') : i18n.format('展开筛选')}
              <RsIcon
                type={expand ? 'icon-jiantoushang' : 'icon-jiantouxia'}
                style={{ color: '#BFBFBF', marginLeft: 4 }}
              />
            </div>
          )
        } */}
      </div>
      <div
        style={{ ...contentStyle, overflow: 'hidden' }}
      >
        {
          !!_.size(filterOptions) && (
            <div className='filter-option' >
              {
                _.map(filterOptions, (item, idx) => {
                  const multiple = _.get(item, 'isMultiple', true)
                  const value = multiple ? {
                    values: _.isArray(filter[item.key]) ? filter[item.key] : [filter[item.key]]
                  } : {
                    value: filter[item.key]
                  }
                  return <div className='item' key={idx} >
                    <FormItem label={item.title}>
                      <FilterButton.Group
                        multiple={multiple}
                        {...value}
                        options={item.children}
                        onChange={handleChange(item)}
                      />
                    </FormItem>
                  </div>
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
})
