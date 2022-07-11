import React from 'react';
import i18n from '@/plugin/i18n';

import './index.less';

const Panel = ({title, children}) => {
  return (
    <div className='tab-download-panel'>
      <div className='tab-download-panel-title'>
          {i18n.format(title)}
      </div>
      <div className='tab-download-panel-content'>
          {children}
      </div>
    </div>
  );
}


const PanelVertical = ({title, children}) => {
    return (
        <div className='tab-download-panel-vertical'>
          <div className='tab-download-panel-vertical-title'>
              <span>{i18n.format(title)}：</span>
          </div>
          <div className='tab-download-panel-vertical-content'>
              {children}
          </div>
        </div>
      );
}

Panel.Vertical = PanelVertical

export default Panel;