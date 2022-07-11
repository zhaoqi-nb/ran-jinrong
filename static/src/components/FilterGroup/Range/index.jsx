import React, { memo, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import InputNumber from '@/components/InputNumber'

import './style.less';

export default memo((props) => {
  const { onChange } = props;
  const [value, setValue] = useState([undefined, undefined]);

  const filterValueRef = useRef([]);

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue])

  useEffect(() => {
    setValue(props.value || []);
    filterValueRef.current = props.value || [];
  }, [props.value])

  const handleChange = useCallback(
    (type) => _.debounce((value) => {
      setValue((state) => {
        let _state = [...state];
        if (type === 'min') {
          _state = [value, state[1]]
        } else {
          _state = [state[0], value]
        }
        return _state
      })
    }, 300),
    []
  )

  const clearDisabled = useMemo(() => {
    return _.chain(value)
      .filter(r => !_.isNil(r) && r !== '')
      .isEmpty()
      .value()
  }, [value])

  const submiteDisabled = useMemo(() => {
    const filter = _.filter(value, t => !_.isNil(t) && t !== '');
    const filterValueFilter = _.filter(filterValueRef.current, t => !_.isNil(t) && t !== '');
    if (_.size(filter) === 0 && _.size(filterValueFilter) === 0) {
      return true
    }
    if (_.size(filter) === 1) {
      return false
    }
    if (Number(filter[0]) <= Number(filter[1])) {
      return false
    }
    return true
  }, [value, filterValueRef.current])

  const handleOK = useCallback(() => {
    if (submiteDisabled) return;
    const _value = _.map(value, t => {
      if (t === '') {
        return undefined
      }
      return t
    })
    onChange && onChange(_value)
  }, [onChange, value, submiteDisabled])

  const handleClear = useCallback(() => {
    if (clearDisabled) return;
    const value = [];
    setValue(value);
    filterValueRef.current = [];
    onChange && onChange(value)
  }, [clearDisabled, onChange])

  const { addonBefore, addonAfter } = props;

  const renderAddonAfter = useCallback(
    (type) => {
      let _addonAfter = null;
      if (type === 'min') {
        _addonAfter = _.isArray(addonAfter) ? addonAfter[0] : addonAfter
      } else {
        _addonAfter = _.isArray(addonAfter) ? addonAfter[1] : addonAfter
      }
      return <div className='filter-range-input-addon-after'>
        {_addonAfter}
      </div>
    }, [addonAfter])

  return (
    <div className='filter-range'>
      <div className='filter-range-inner'>
        <div className='min' style={{ width: 160 }}>
          <InputNumber
            value={value[0]}
            format={props.format}
            onChange={handleChange('min')}
            addonBefore={_.isArray(addonBefore) ? addonBefore[0] : addonBefore}
            addonAfter={renderAddonAfter('min')}
          />
        </div>
        <span className='split'>~</span>
        <div className='max' style={{ width: 160 }}>
          <InputNumber
            value={value[1]}
            format={props.format}
            onChange={handleChange('max')}
            addonBefore={_.isArray(addonBefore) ? addonBefore[1] : addonBefore}
            addonAfter={renderAddonAfter('max')}
          />
        </div>
      </div>
      <div className='filter-range-suffix'>
        <span
          className={classNames('clear-btn', {
            'clear-btn-disabled': clearDisabled
          })}
          onClick={handleClear}
        >{i18n.format('清空')}</span>
        <span
          className={classNames('submite-btn', {
            'submite-btn-disabled': submiteDisabled
          })}
          onClick={handleOK}
        >{i18n.format('确定')}</span>
      </div>
    </div>
  )
})
