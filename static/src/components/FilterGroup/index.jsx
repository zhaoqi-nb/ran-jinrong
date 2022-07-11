import React, { useEffect, useCallback, useState, useMemo } from 'react';
import _ from 'lodash';
import FilterHeader from './FilterHeader';
import FilterList from './FilterList';
import FilterResultSpace from './FilterResultSpace';
import FilterResult from './FilterResult';

import { getFilterResultList } from './uitl';

import './style.less';

export default function FilterGroup(props) {
  const [filterListExpand, setFilterListExpand] = useState(true);
  const [filterValue, setFilterValue] = useState({});

  useEffect(() => {
    setFilterValue(props.filterValue || {})
  }, [props.filterValue])


  const { showHeader, ifHideResult = false, headerValue, headerOption, groupOptions } = props;
  const { onHeaderChange, onGroupChange } = props;

  const handleChange = useCallback(
    (value) => {
      setFilterValue(value)
      onGroupChange && onGroupChange(value)
    }, [onGroupChange]
  )

  const handleExpand = useCallback((expand) => {
    if (expand !== undefined) {
      setFilterListExpand(expand)
      return
    }
    setFilterListExpand(state => !state)
  }, [])

  const handleClear = useCallback(() => {
    setFilterValue({})
    onGroupChange && onGroupChange({})
  }, [onGroupChange])

  const handleDel = useCallback((record) => {
    const getFilterValue = (state, record) => {
      const currentItem = record.currentItem;
      const type = currentItem.type;
      const key = currentItem.key;
      switch (type) {
        case 'cascader':
          const isMultiple = currentItem.isMultiple;
          const value = record.value;
          if (isMultiple) {
            return {
              ...state,
              [key]: _.filter(state[key], t => t !== value)
            }
          } else {
            return {
              ...state,
              [key]: undefined
            }
          }
        default:
          return {
            ...state,
            [key]: undefined
          }
      }
    }
    const value = getFilterValue(filterValue, record)
    handleChange(value)
  }, [filterValue, handleChange])

  const filterResultList = useMemo(() => {
    return getFilterResultList(groupOptions, filterValue) || []
  }, [groupOptions, filterValue])

  const showHeaderFlag = showHeader && headerOption;
  const showResultListFlag = !ifHideResult
  const hideListBackground = !showHeaderFlag && !showResultListFlag

  return (
    <div className='filter-group'>
      {(showHeaderFlag) && (
        <FilterHeader
          option={headerOption}
          onChange={onHeaderChange}
          headerValue={headerValue}
        />
      )}
      {
        _.size(groupOptions) ? (
          <>
            <FilterList
              options={groupOptions}
              value={filterValue}
              expand={filterListExpand}
              hideListBackground={hideListBackground}
              onChange={handleChange}
            />
            {showResultListFlag && <FilterResultSpace onExpand={handleExpand}>
              <FilterResult
                filterValue={filterValue}
                options={filterResultList}
                onExpand={handleExpand}
                expand={filterListExpand}
                onClear={handleClear}
                onDelete={handleDel}
              />
            </FilterResultSpace>}
          </>
        ) : null
      }
    </div>
  )
}
