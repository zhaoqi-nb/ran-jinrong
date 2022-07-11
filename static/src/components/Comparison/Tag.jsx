import React from 'react'
import RsIcon from '@/page/component/rsIcon/index';

export default function Tag(props) {
  return (
    <div className='tag'>
      <span className='tag-label'>{props.children}</span>
      <span className='tag-close' onClick={() => props.onDelete(props.value)} style={{ marginLeft: 6, cursor: 'pointer' }}>
        <RsIcon type="icon-guanbi" style={{ fontSize: 14, color: '#595959' }} />
      </span>
    </div>
  )
}
