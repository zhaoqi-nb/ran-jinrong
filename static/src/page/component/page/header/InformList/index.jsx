import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateAllInformRead } from '@/redux/actions/inform';
import { Button } from 'antd'
import { CustomTab, CustomTabPane } from '@/page/component/tab/common';
import { getUserInfoData } from '@/page/component/page/util';

import List from './List';

import './style.less';

const InformList = (props) => {
  const userInfo = getUserInfoData();
  const userId = 1311;//userInfo.sysUserId;

  const { dispatch, updateAllInformRead, informList, unReadInformList } = props;

  const [currSelect, setCurrSelect] = useState("1")

  const handleTabChange = (key) => {
    setCurrSelect(key)
  }

  const handleAllRead = () => {
    dispatch(updateAllInformRead({
      userId,
      informId: _.chain(unReadInformList)
        .map(t => t.id)
        .join(',')
        .value()
    }))
  }

  const tabData = [{
    title: i18n.format("全部通知"), value: "1",
  }, {
    title: `${i18n.format("未读")}(${_.size(unReadInformList)})`, value: "2",
  }]

  return (
    <div className='inform-list'>
      <CustomTab
        currSelect={currSelect}
        tabData={tabData}
        type={'line'}
        hiddenBottomExplain
        onChange={handleTabChange}
      >
        <CustomTabPane>
          <List data={informList} />
        </CustomTabPane>
        <CustomTabPane>
          <List data={unReadInformList} />
        </CustomTabPane>
      </CustomTab>
      <Button
        type="link"
        className="top-btn"
        onClick={handleAllRead}
        disabled={_.size(unReadInformList) ? false : true}
      >{i18n.format('标记全部已读')}</Button>
    </div>
  )
}

function mapStateToProps(state) {
  return { ...state.inform }
}

function mapDispatchToProps(dispatch) {
  return { dispatch, updateAllInformRead }
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(InformList); 
