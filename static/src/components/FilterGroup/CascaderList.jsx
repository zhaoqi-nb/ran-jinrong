import React, { useCallback, useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import FromItem from '../FormItem';
import FilterButton from '../FilterButton';

import { parseCascaderData, resetCascaderValue, reestCascaderData } from './uitl';

//simplifyCascaderValue

export default function CascaderList(props) {

  const { simplifyCascaderValue } = props;

  const valueRef = useRef({});
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);
  const parseData = parseCascaderData(props.data);

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  useEffect(() => {
    const { resetValue, parseResetValue } = resetCascaderValue(parseData, props.value);
    const resetData = reestCascaderData(parseData, resetValue);
    setValue(parseResetValue)
    setData(resetData)
  }, [props.value])

  useEffect(() => {
    valueRef.current = value
  }, [value])

  const { onChange } = props;

  const handleChange = useCallback(
    (record) => (value) => {
      const _value = { ...valueRef.current, [record.key]: value };
      const { resetValue, parseResetValue } = resetCascaderValue(parseData, _value);
      const resetData = reestCascaderData(parseData, resetValue);
      setValue(parseResetValue)
      setData(resetData)
      onChange && onChange(parseResetValue);
      // onChange && onChange(!simplifyCascaderValue ? resetValue : );
    }, [parseData, onChange]
  )

  const getValue = useCallback(
    (record) => {
      if (record.isMultiple) {
        return _.get(value, `[${record.key}]`, [])
      }
      return _.get(value, `[${record.key}]`, null)
    },
    [value]
  )

  return _.map(data, item => (
    <div className='filter-item'>
      <FromItem key={item.key} label={i18n.format(item.title)} labelStyle={{ width: props.formLabelWidth }}>
        <FilterButton.Group
          isMultiple={item.isMultiple}
          value={getValue(item)}
          showAll={item.showAll}
          options={item.children}
          onChange={handleChange(item)}
        />
      </FromItem>
    </div>
  ))
}

CascaderList.defaultProps = {
  simplifyCascaderValue: true
}
