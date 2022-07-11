import React from 'react';
import { Spin } from 'antd';
import i18n from '@/plugin/i18n';
import './appAnalyze.less';

const AppAnalyze = props => {
    console.log('props=>change=>', props);
  return (
    <div id="appAnalyzeMicro"style={{ width: '100%', height: '100%', position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin tip={i18n.format("加载中，请稍后...")} />
    </div>
  );
}


export default AppAnalyze;