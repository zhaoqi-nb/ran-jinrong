import React from 'react';
import { Spin } from 'antd';
import i18n from '@/plugin/i18n';
import './index.less';

const SecondaryMarketApp = props => {
  return (
    <div id="appSMMicro" style={{ width: '100%', height: '100%', position: "relative" }}>
      {/* , display: "flex", alignItems: "center", justifyContent: "center"  */}
      <Spin style={{marginLeft: '45%', marginTop: '150px'}} tip={i18n.format("加载中，请稍后...")} />
    </div>
  );
}


export default SecondaryMarketApp;