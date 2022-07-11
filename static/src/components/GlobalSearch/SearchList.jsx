import React, { useCallback } from 'react';
import _ from 'lodash';
import SearchEmpty from './Empty';

export default function SearchList(props) {

  const { value, onClickItem } = props;

  const handleClick = useCallback(
    (record) => (e) => {
      e.stopPropagation();
      onClickItem && onClickItem(record)
    },
    [onClickItem]
  )

  if (!_.size(props.data)) {
    return <div className='rc-search-list' style={props.style}>
      <SearchEmpty />
    </div>

  }

  const getLabel = (label) => {
    return _.chain(label)
      .split(value)
      .reduce((acc, item, idx) => {
        if (idx === 0) {
          acc = [...acc, item]
        } else {
          acc = [...acc, value, item]
        }
        return acc
      }, [])
      .map((item, idx) => {
        if (item === value) {
          return <span key={idx} className='active'>{value}</span>
        }
        return item
      })
      .value()
  }

  return (
    <div className='rc-search-list' style={props.style}>
      <ul className='rc-search-list-inner'>
        {
          _.map(props.data, (item, idx) => {
            return (
              <li
                className='item'
                key={item.value || idx}
                onClick={handleClick(item)}
              >{getLabel(item.label)}</li>
            )
          })
        }
      </ul>
    </div>
  )
}
