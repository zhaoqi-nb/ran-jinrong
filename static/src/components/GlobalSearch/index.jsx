import React, { useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import _ from 'lodash';
import Input from './Input';
import HotList from './HotList';
import HistoryList from './HistoryList';
import SearchList from './SearchList';

import './style.less'
import classNames from 'classnames';

export default function index(props) {
  const containerRef = useRef(null);
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('blur');
  const [visible, setVisible] = useState(false);

  const { onSearch, onClickItem, onChange, onClearHistory } = props;

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    setChildrenVisible(props.childrenVisible)
  }, [props.childrenVisible])

  const handleSearch = useCallback(() => {
    onSearch && onSearch(value)
    setStatus('blur')
  }, [onSearch, value])

  const handleChange = useCallback(
    (e) => {
      setVisible(true)
      // setChildrenVisible(true)
      const value = e.target.value
      setValue(value)
      onChange && onChange(value)
    },
    [onChange],
  )

  const handleFocus = useCallback(
    () => {
      setStatus('focus')
    },
    []
  )

  useLayoutEffect(() => {
    const container = containerRef.current;
    const bodyCloseList = (e) => {
      if (container && !container.contains(e.target)) {
        console.log('asfsffaffffafafas',);
        setStatus('blur')
      }
    }
    document.addEventListener('mousedown', bodyCloseList)
    return () => {
      document.removeEventListener('mousedown', bodyCloseList)
    }
  }, [])

  const handleClickItem = useCallback((item) => {
    setStatus('blur')
    onClickItem && onClickItem(item)
  }, [onClickItem])

  const { hotList, historyList, searchList } = props

  const hotListVisible = !!_.size(hotList);
  const historyListVisible = !value && status === 'focus';
  const searchListVisible = useMemo(() => {
    if (value && status === 'focus') {
      return true
    }
    if (status === 'blur') {
      return false
    }
    return false
  }, [value, status])

  return (
    <>
      <div
        className={classNames('rc-search', {
          'rc-search-suffix': props.showSuffix
        })}
        style={props.style}
        ref={containerRef}
      >
        <Input
          placeholder={props.placeholder}
          value={value}
          status={status}
          showSuffix={props.showSuffix}
          onFocus={handleFocus}
          // onBlur={handleBlur}
          onChange={handleChange}
          onSearch={handleSearch}
        />
        {hotListVisible && (
          <HotList data={hotList} onClickItem={handleClickItem} />
        )}
        {(historyListVisible) && (
          <HistoryList
            data={historyList}
            onClickItem={handleClickItem}
            onClearHistory={onClearHistory}
          />
        )}
        {searchListVisible && (
          <SearchList
            style={{ display: searchListVisible ? 'block' : 'none' }}
            value={value}
            data={searchList}
            onClickItem={handleClickItem}
          />
        )}
      </div>
      <div style={{ opacity: childrenVisible ? 1 : 0, width: '100%' }}>
        {props.children}
      </div>
    </>
  )
}
