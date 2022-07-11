import React, { useCallback, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';
import classnames from 'classnames';

export default function FilterButton(props) {
  return (
    <div
      className={classnames('filter-btn-wrapper', props.className)}
      onClick={props.onClick}>
      {props.children}
    </div>
  )
}

const Group = (props) => {

  const { multiple, onChange } = props;
  const [values, setValues] = useState([]);

  const handleClick = useCallback(
    (record) => () => {
      // if (_.includes(values, record.value)) {
      //   return
      // }
      if (!multiple || record.isMultiple === false) {
        setValues([record.value])
        onChange && onChange(record.value)
        return
      }
      const filterNotAllOptions = _.filter(props.options, t => t.value !== 'all');

      console.log('props.optionsprops.options', props.options);
      setValues((state) => {
        let values = [...state]
        if (_.includes(values, 'all')) {
          values = _.pull([...values, record.value], 'all')
        } else {
          values = !_.includes(values, record.value) ? [...values, record.value] : _.pull([...values], record.value)
        }
        if (_.size(values) === _.size(filterNotAllOptions)) {
          onChange && onChange('all')
          return ['all']
        }
        onChange && onChange(values)
        return values
      })
    },
    [multiple, onChange, props.options]
  )

  useEffect(() => {
    setValues(!multiple ? (props.value ? [props.value] : []) : props.values || [])
  }, [multiple, props.value, props.values])

  return <div className='filter-btn-gourp'>
    {
      _.map(props.options, (item) => {
        return (
          <FilterButton
            className={classnames("filter-btn-item", {
              'filter-btn-item-active': _.includes(values, item.value)
            })}
            onClick={handleClick(item)}
          >
            {item.label}
          </FilterButton>)
      })
    }
  </div>
}

Group.prototype = {
  options: PropTypes.array,
  multiple: PropTypes.bool,
}

Group.defaultProps = {
  multiple: false
}

FilterButton.Group = Group

