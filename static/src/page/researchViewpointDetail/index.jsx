import React, { useEffect, useState, useCallback } from 'react';
import Left from './Left';
import Right from './Right';
import Api from './store/api'

import { getUserInfoData } from '@/page/component/page/util';
import getSearchParams from '@/utils/getSearchParams'

import './style.less';

export default function index(props) {

  const [detail, setDetail] = useState({});
  const [detailLoading, setDetailLoading] = useState(false);
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState([]);

  const { mainId, viewpointId } = getSearchParams(['mainId', 'viewpointId'])
  const userInfo = getUserInfoData();
  const userId = userInfo.sysUserId;
  const locale = i18n.getLocalLanguage();

  const getViewpointInfo = useCallback(
    () => {
      setDetailLoading(true)
      Api.getViewpointInfo({ mainId, userId })
        .then((res) => {
          setDetailLoading(false)
          if (res.code === 200) {
            setDetail(res.data)
          }
        })
    },
    [mainId, userId],
  )

  const updateViewpointCollectStatus = useCallback((params = {}) => {
    setDetailLoading(true)
    Api.updateViewpointCollectStatus({ userId, viewpointId, ...params })
      .then((res) => {
        if (res.code === 200) {
          getViewpointInfo()
        }
      })
  }, [userId, viewpointId, getViewpointInfo])

  const handleCollect = (record) => {
    updateViewpointCollectStatus({
      isCollect: record.isCollect == 0 ? 1 : 0
    })
  }

  useEffect(() => {
    updateViewpointCollectStatus({ isRead: 1 })
  }, [updateViewpointCollectStatus])

  useEffect(() => {
    setDetailLoading(true)
    Api.getRelevantViewpointList({ userId, viewpointId, pageSize: 5 })
      .then((res) => {
        setListLoading(false)
        if (res.code === 200) {
          setList(_.get(res, 'data.rsList', []))
        }
      })
  }, [userId, viewpointId])

  return (
    <div className='research-viewpoint-detail'>
      <div className='research-viewpoint-detail-wrap'>
        <Left
          detail={detail}
          loading={detailLoading}
          locale={locale}
          onCollect={handleCollect}
        />
        <Right
          data={list}
          loading={listLoading}
          locale={locale}
          history={props.history}
        />
      </div>
    </div>
  )
}
