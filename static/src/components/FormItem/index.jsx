import React from 'react';

import './style.less'

export default function FormItem(props) {
  return (
    <div className='form-item'>
      <div className='label' style={{ ...props.labelStyle }}>{props.label}：</div>
      <div className='value'>{props.children}</div>
    </div>
  )
}

