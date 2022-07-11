import React from 'react';
import { Select } from 'antd';
import RsIcon from '@/page/component/rsIcon/index';

import { getMaxItemWidth } from './util';

export default function BasicSelect(props) {

  const selectWidth = getMaxItemWidth(props.options);

  console.log('selectWidthselectWidth', selectWidth, props.options);

  return (
    <Select
      {...props}
      style={{ width: selectWidth, ...props.style }}
      suffixIcon={<RsIcon type="icon-tianchongxiajiantou" style={{ color: '#8C8C8C', fontSize: 12 }} />}
    />
  )
}
