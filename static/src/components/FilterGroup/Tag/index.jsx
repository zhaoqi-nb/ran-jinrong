import React, { useCallback } from 'react';
import RsIcon from '@/page/component/rsIcon'

import './style.less';

export default function Tag(props) {
  const { item, onDelete } = props;

  const handleDel = useCallback(
    (item) => () => {
      onDelete && onDelete(item);
    },
    [onDelete],
  )

  return (
    <div className='filter-tag' key={item.value}>
      <span className='filter-tag-title'>
        {item.title || '所属一级行业'}
      </span>
      <span className='filter-tag-value'>
        {item.label}
      </span>
      <div className='filter-tag-close' onClick={handleDel(item)}>
        <RsIcon type="icon-guanbi" style={{ color: '#8C8C8C' }} />
      </div>
    </div>
  )
}