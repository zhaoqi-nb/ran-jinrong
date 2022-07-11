import React from 'react';
import Img from '@/components/Img';
import Watermark from '../../../watermark/index';

import './style.less';

export const createPortal = (node) => {
  const container = document.createElement('div');
  // 调试
  // container.style.cssText = "position: absolute;top: 100px;left: 100px;width: 80%;background: #fff;z-index: 999;"
  // 上线
  container.style.cssText = "position: absolute; top: -100%; left: -100%; width: 100%;"
  document.body.appendChild(container);
  ReactDOM.render(node, container)
  // setTimeout(() => {
  //   document.body.removeChild(container)
  // }, 3000)
  return container;
}

export const deletePortal = (node) => {
  setTimeout(() => {
    document.body.removeChild(node)
  }, 1000)
}

export default (props) => {
  const { title, chartSrc, filters } = props;
  return (
    <Watermark>
      <div className='download-chart-wrap'>
        <span className='chart-title'>{title}</span>
        <ul className='chart-filter'>
          {
            _.map(filters, (item, idx) => (
              <>
                <li key={idx} className='item'>
                  <span className='title'>{item.title}:</span>
                  <span className='value'>{item.value}</span>
                </li>
                {idx !== _.size(filters) - 1 ? <li className='split'>|</li> : null}
              </>
            ))
          }
        </ul>
        <Img className="chart-img" src={chartSrc} style={{ height: '100%' }} />
        <span className='chart-origin'>{i18n.format('数据来源：燃数科技')}</span>
      </div>
    </Watermark>
  )
}
