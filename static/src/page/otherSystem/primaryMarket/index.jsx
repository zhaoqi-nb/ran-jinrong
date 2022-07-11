import React from 'react';
import { Spin } from 'antd';
import i18n from '@/plugin/i18n';
import './index.less';

const PrimaryMarketApp = props => {
  return (
    <div id="appPMMicro" style={{ width: '100%', height: '100%', position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spin tip={i18n.format("加载中，请稍后...")} />
    </div>
  );
}


export default PrimaryMarketApp;