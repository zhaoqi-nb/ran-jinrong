import React, { useCallback, useEffect, useRef, useState } from 'react';

import Api from './store/api';
import { getUserInfoData } from '@/page/component/page/util';

export default function useFetchList(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const userInfo = getUserInfoData();
  const userId = userInfo.sysUserId;

  const paramsRef = useRef(null);

  const getData = useCallback(() => {
    setLoading(true)
    if (_.isEqual(paramsRef.current, params)) return;
    paramsRef.current = params;
    Api.getViewpointList({
      createId: userId,
      ...params
    }).then((res) => {
      setLoading(false)
      if (res.code === 200) {
        const data = res.data;
        setData(_.get(data, 'rsList', []))
        setTotal(_.get(data, 'pages.totalCount', 0))
      }
    })
  }, [userId, params])

  useEffect(() => {
    getData()
  }, [getData])

  const updateViewpointCollectStatus = (record) => {
    Api.updateViewpointCollectStatus({
      userId,
      viewpointId: record.id,
      isCollect: record.isCollect == 0 ? 1 : 0
    }).then(() => {
      getData()
    })
  }

  return {
    data, loading, total, updateViewpointCollectStatus
  }
}
