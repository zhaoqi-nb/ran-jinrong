import React from 'react'
import RsIcon from '@/page/component/rsIcon';
import classnames from 'classnames';

export default function Input(props) {

  const { value, status, showSuffix } = props;
  const { onFocus, onBlur, onChange, onSearch } = props;

  return (
    <div className={classnames('rc-input-wrapper', {
      'rc-input-focus': status === 'focus'
    })}>
      <input
        className='rc-input'
        type="text"
        value={value}
        placeholder={i18n.format('请输入品牌名称')}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      {
        showSuffix && (
          <span className='rc-input-suffix' onClick={onSearch}>
            <RsIcon type="icon-gb-sousuo" style={{ fontSize: 20, color: "#fff" }} />
          </span>
        )
      }

    </div>
  )
}
