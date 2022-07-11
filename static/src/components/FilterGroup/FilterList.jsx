import React, { useState, useCallback, useMemo, useEffect } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import FromItem from '../FormItem';

import CascaderList from './CascaderList';
import FilterButton from '../FilterButton';
import Range from './Range';

import { getFormLabelWidth } from './uitl'


export default function FilterList(props) {

  const { expand, options: data, hideListBackground } = props;
  const { onChange } = props;
  const [value, setValue] = useState({});

  useEffect(() => {
    setValue(props.value || {});
  }, [props.value])

  const { cascaderData, otherData } = useMemo(() => {
    return {
      cascaderData: _.filter(data, t => t.type === 'cascader'),
      otherData: _.filter(data, t => t.type !== 'cascader'),
    }
  }, [data])

  const { cascaderValue, otherValue } = useMemo(() => {
    const cascaderValue = _.chain(cascaderData)
      .map((t) => ([t.key, t.isMultiple]))
      .reduce((acc, [key, isMultiple]) => {
        if (isMultiple) {
          acc[key] = value[key] || []
        } else {
          acc[key] = value[key]
        }
        return acc
      }, {})
      .value()
    const otherValue = _.chain(otherData)
      .map((t) => t.key)
      .reduce((acc, key) => {
        if (value[key] !== undefined) {
          acc[key] = value[key]
        }
        return acc
      }, {})
      .value()
    return {
      cascaderValue,
      otherValue
    }
  }, [cascaderData, otherData, value])

  const handleChange = useCallback(
    (record) => (value) => {
      setValue((state) => {
        const _value = { ...state, [record.key]: value };
        onChange && onChange(_value)
        return _value;
      })
    },
    [onChange]
  )
  const handleCascaderChange = useCallback(
    (value) => {
      const _value = { ...otherValue, ...value };
      setValue(_value);
      onChange && onChange(_value)
    }, [onChange, otherValue]
  )

  const renderContent = useCallback(
    (record) => {
      const { type, key } = record;
      switch (type) {
        case 'range':
          return <Range
            onChange={handleChange(record)}
            value={otherValue[key]}
            {...record}
          />
        case 'filterButtonGroup':
          return <FilterButton.Group
            isMultiple={record.isMultiple}
            value={otherValue[key]}
            showAll={record.showAll}
            options={record.children}
            onChange={handleChange(record)}
          />
        default:
          return null
      }
    },
    [otherValue, handleChange],
  )

  const formLabelWidth = getFormLabelWidth(data);

  return (
    <div className={classnames('filter-list', {
      collapse: !expand,
      'hide-background': hideListBackground
    })}>
      <div className='filter-list-inner'>
        <CascaderList
          value={cascaderValue}
          formLabelWidth={formLabelWidth}
          data={cascaderData}
          onChange={handleCascaderChange}
        />
        {
          _.map(otherData, (item, idx) => (
            <div key={idx} className='filter-item'>
              <FromItem key={item.key} label={item.title} labelStyle={{ width: formLabelWidth }}>
                {renderContent(item)}
              </FromItem>
            </div>
          ))
        }
      </div>
    </div>
  )
}
