import React, { useMemo, useState, useCallback } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col, Input } from 'antd';
import Custom_Date from "@date/common";
import List from './component/List';

import useFetchList from './hooks/useFetchList';

const { Search } = Input;

export default function CollectResearch() {
  const [filterValue, setFilterValue] = useState({
    releaseStartTime: moment('20180101').format('YYYY-MM-DD'),
    releaseEndTime: moment().format('YYYY-MM-DD'),
  });
  const [{ page, pageSize }, setPageConf] = useState({
    page: 1,
    pageSize: 10
  })

  const params = useMemo(() => ({
    currentPage: 1,
    pageSize: 10,
    isCollect: 1,
    ...filterValue
  }), [filterValue])

  const { data, loading, total, updateViewpointCollectStatus } = useFetchList(params);

  const handleChangeFilterValue = (key, value) => {
    setFilterValue(state => ({ ...state, [key]: value }))
  }

  const handleCollect = useCallback(
    (record) => {
      updateViewpointCollectStatus(record)
    },
    [updateViewpointCollectStatus],
  )

  const handleSearch = (key) => (value) => {
    handleChangeFilterValue(key, value)
  }

  const handleRangeChange = (key) => (record) => {
    setFilterValue(state => ({
      ...state,
      releaseStartTime: moment(record.start_date).format('YYYY-MM-DD'),
      releaseEndTime: moment(record.end_date).format('YYYY-MM-DD'),
    }))
  }

  const handlePageChange = (page, pageSize) => {
    setPageConf({ page, pageSize })
  }

  return (
    <div className='research-wrap'>
      <div className='research-header'>
        <Search
          placeholder={i18n.format('请输入观点名称')}
          style={{ width: 400 }}
          onSearch={handleSearch('viewpointContent')}
          enterButton={i18n.format('搜索')}
          allowClear
        />
        <Row style={{ marginTop: 12 }}>
          <Col span={12}>
            <Custom_Date
              style={{ marginTop: 0 }}
              title={`${i18n.format("发布时间")}`}
              isCompleteOpen={true}
              date_type={"day"}
              type={"double"}
              onChange={handleRangeChange('releaseTime')}
            />
          </Col>
        </Row>
      </div>
      <div className='research-list'>
        <List
          data={data}
          loading={loading}
          onCollect={handleCollect}
          total={total}
          scroll={{ y: 600 }}
          pagination={{
            total,
            size: 'small',
            showQuickJumper: true,
            current: page,
            pageSize: pageSize,
            style: { textAlign: 'center' },
            onChange: handlePageChange
          }}
        />
      </div>
    </div>
  )
}
