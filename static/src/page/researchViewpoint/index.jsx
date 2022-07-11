import React, { useState } from 'react';
import { CustomTab, CustomTabPane } from '@tab/common';
import SecondMarketResearch from './SecondMarketResearch';
import FirstMarketResearch from './FirstMarketResearch';
import CollectResearch from './CollectResearch';

import './style.less';

const tabData = [
  { title: i18n.format("二级市场研究"), value: "1" },
  { title: i18n.format("一级市场研究"), value: "2" },
  { title: i18n.format("我的收藏"), value: "3" },
]

export default function ViewpointList() {

  const [tabKey, setTabKey] = useState("1");

  const handleTabChange = (tabKey) => {
    setTabKey(tabKey);
  }

  return (
    <div className="research-viewpoint-container">
      <CustomTab
        // id="报告入口"
        tabData={tabData}
        currSelect={tabKey}
        onChange={handleTabChange}
        type="button"
        hiddenBottomExplain={true}
      >
        <CustomTabPane>
        </CustomTabPane>
        <CustomTabPane>
        </CustomTabPane>
        <CustomTabPane>
        </CustomTabPane>
      </CustomTab>
      {tabKey == 1 ? <SecondMarketResearch /> : null}
      {tabKey == 2 ? <FirstMarketResearch /> : null}
      {tabKey == 3 ? <CollectResearch /> : null}
    </div>
  )
}
