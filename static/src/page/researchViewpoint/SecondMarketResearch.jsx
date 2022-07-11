import React, { useMemo, useState, useCallback } from 'react';
import _ from 'lodash'
import moment from 'moment';
import { Row, Col, Input } from 'antd';
import FilterOption from '@filterOption/common';
import Custom_Date from "@date/common";
import List from './component/List';

import useFetchList from './hooks/useFetchList';

const { Search } = Input;

export default function SecondMarketResearch() {
  const [filterValue, setFilterValue] = useState({
    releaseStartTime: moment('20180101').format('YYYY-MM-DD'),
    releaseEndTime: moment().format('YYYY-MM-DD'),
  });
  const [{ page, pageSize }, setPageConf] = useState({
    page: 1,
    pageSize: 10
  })

  const params = useMemo(() => ({
    marketType: 2,
    currentPage: page,
    pageSize: pageSize,
    ...filterValue
  }), [filterValue, page, pageSize])

  const { data, loading, total, updateViewpointCollectStatus } = useFetchList(params)

  const handleChangeFilterValue = (key, value) => {
    setFilterValue(state => ({ ...state, [key]: value }))
  }

  const handleCollect = useCallback(
    (record) => {
      updateViewpointCollectStatus(record)
    },
    [],
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

  const handleFilterButtonChange = (key) => (record) => {
    const value = record.code === "0" ? '' : record.code;
    handleChangeFilterValue(key, value)
  }

  const handlePageChange = (page, pageSize) => {
    console.log('pagepagepagepage', page, pageSize)
    setPageConf({ page, pageSize })
  }

  const ViewpointTypeOptions = useMemo(() => (
    [
      { name: i18n.format('全部'), code: "0" },
      { name: i18n.format('财报回顾'), code: "1" },
      { name: i18n.format('财报前瞻'), code: "2" },
      { name: i18n.format('数据洞察'), code: "3" },
      { name: i18n.format('事件洞察'), code: "4" }
    ]
  ), [])

  return (
    <div className='research-wrap'>
      <div className='research-header'>
        <Search
          placeholder={i18n.format('请输入观点名称')}
          style={{ width: 400, height: 32 }}
          onSearch={handleSearch('viewpointContent')}
          enterButton={i18n.format("搜索")}
          allowClear
        />
        <Row style={{ marginTop: 12 }} align="middle">
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
          <Col span={12}>
            <FilterOption
              title={`${i18n.format("观点类型")}`}
              type="multiple"
              isMutualExcluion={true}
              data={ViewpointTypeOptions}
              selectId={'0'}
              onSelect={handleFilterButtonChange('viewpointType')}
            />
          </Col>
        </Row>
      </div>
      <div className='research-list'>
        <List
          data={data}
          loading={loading}
          total={total}
          onCollect={handleCollect}
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
