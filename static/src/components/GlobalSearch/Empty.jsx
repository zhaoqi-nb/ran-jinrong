import React from 'react';
import Img from '../Img';

export default function Empty() {
  return (
    <div className='rc-search-list-empty'>
      <div className='empty-icon'></div>
      <div className='empty-text'>
        <span>抱歉，暂无结果</span>
        <span>请确认输入品牌名称是否正确，如需帮助，请联系商务。</span>
      </div>
    </div>
  )
}
