import React, { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { getInputReg, getInputValue } from './util';

import RsIcon from '../../page/component/rsIcon';

import './style.less'

export default function RsInputNumber(props) {

  const { onChange, format } = props;
  const [inputValue, setInputValue] = useState(undefined)
  useEffect(() => {
    setInputValue(props.value || '')
  }, [props.value])

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    if (value === '') {
      setInputValue(value)
      onChange && onChange(value)
      return
    }
    const _value = getInputValue(format, value);
    if (!_.isNil(_value)) {
      setInputValue(_value)
    }
    const n = Number(_value)
    // console.log('_value_value_value_valueafas', _value);
    // if (/\.$/g.test(_value)) {
    //   return
    // }

    if (!_.isNaN(n)) {
      // const v = /^\.|\.$/g.test(_value) ? Number(_value) : _value
      onChange && onChange(_value)
    }
  }, [onChange, format])

  const { addonBefore, addonAfter } = props;

  return (
    <div className='rc-input-number-wrapper'>
      {
        addonBefore ? (
          <div className='rc-input-number-addon'>
            {addonBefore}
          </div>
        ) : null
      }
      <div className='rc-input-number-input'>
        <div className='rc-input-number-input-wrap'>
          <input value={inputValue} onChange={handleChange} />
        </div>
        {/* <div className='rc-input-number-handler-wrap'>
          <span>
            <RsIcon type="icon-jiantoushang" />
          </span>
          <span>
            <RsIcon type="icon-jiantouxia" />
          </span>
        </div> */}
      </div>
      {
        addonAfter ? (
          <div className='rc-input-number-addon'>
            {addonAfter}
          </div>
        ) : null
      }
    </div>
  )
}

RsInputNumber.defaultProps = {
  format: undefined
}
