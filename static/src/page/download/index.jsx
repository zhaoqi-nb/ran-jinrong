import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CustomTab, CustomTabPane } from '@tab/common';
import { Table, Input, Button, Tooltip } from 'antd';
import Api from './store/api';
import RsIcon from '@/page/component/rsIcon/index';
import Custom_Date from "@date/common";
import _ from 'lodash';
import moment from 'moment';
import { getUserInfoData } from '@/page/component/page/util';
import i18n from '@/plugin/i18n';
import useInterval from '../../hooks/useInterval';
import Title from '../../page/component/tab/common/component/title';
import RefreshImg from '../../img/tmp/refresh.svg';
import RefreshDisabledImg from '../../img/tmp/refresh-disabled.svg';
// import SecondMarketResearch from './SecondMarketResearch';
// import FirstMarketResearch from './FirstMarketResearch';
// import CollectResearch from './CollectResearch';

import './style.less';

const tabData = [
  { title: i18n.format("二级市场研究"), value: "2" },
  { title: i18n.format("一级市场研究"), value: "1" },
]

function getUseId() {
  const userInfo = getUserInfoData();
  const userId = userInfo.sysUserId;
  return userId;
}

function download(url) {
  const a = document.createElement('a');
  // a. = 'demo.xlsx';
  a.href = url;
  a.click();
}

function EditTitle({ fileRecordId, fileName, reload }) {

  const [value, setValue] = useState(fileName);
  const onChangeTitle = (v) => {
    // setValue(v);
    Api.upDownloadFileName({
      fileRecordId,
      fileName: v,
      operatorId: getUseId()
    }).then(res => {
      reload && reload()
    })
    // 调用后台接口
  }

  return <Title type='list' title={value} onChange={onChangeTitle} />
}

export default function ViewpointList() {

  const [tabKey, setTabKey] = useState("2");
  const [page, setPage] = useState({
    currentPage: 1, pageSize: 10,
  });

  const isLoad = useRef(false);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState({
    startDate: moment('20180101').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    searchFileName: '',
  })

  const [data, setData] = useState([]);

  // const [page] = useState({});


  const handleTabChange = (tabKey) => {
    setPage((state) => {
      return { ...state, currentPage: 1 };
    })
    setTabKey(tabKey);
  }

  const reload = () => {
    setSearch(state => {
      return {
        ...state,
      }
    })
  }

  // useInterval(() => {
  //   reload();
  // }, 500)

  useEffect(async () => {
    console.log('load')
    const params = {
      ...search,
      ...page,
      downloadType: tabKey,
      operatorId: getUseId()
    }
    const result = await Api.getDownloadList(params);
    if (result.data && result.data.result && result.data.result.list) {
      setData(result.data.result.list);
      setTotal(result.data.result.pages.totalCount)
    }

    isLoad.current = true;
    // console.log('result: =>', result)
  }, [page, search, tabKey])


  const handleSearchChange = useCallback(_.debounce((e) => {
    console.log('value=>', e.target.value);
    setSearch(state => {
      return {
        ...state,
        searchFileName: e.target.value,
      }
    })
  }, 400), [])

  const handleRangeChange = (record) => {
    if (isLoad.current) {
      setSearch(state => ({
        ...state,
        startDate: moment(record.start_date).format('YYYY-MM-DD'),
        endDate: moment(record.end_date).format('YYYY-MM-DD'),
      }))
    }
  }

  const matchNewestData = (record) => {
    Api.matchNewestData({
      downloadType: record.downloadType,
      params: record.params,

    }).then(res => {
      setSearch(state => {
        return {
          ...state,
        }
      })
    });
    // let url = `/api/batchDownload/matchNewestData?downloadType=${record.downloadType}&params=${record.params}`;
    // download(encodeURI(url));
  }

  const reDownload = (record) => {
    const paramsStr = `fileName=${encodeURIComponent(record.fileName)}&filePath=${encodeURIComponent(record.filePath)}`;
    let url = `/api/batchDownload/reDownload?` + paramsStr;
    download(url);
  }

  const columns = [{
    title: i18n.format('序号'),
    dataIndex: 'xh',
    key: 'xh',
  }, {
    title: i18n.format('数据文件名称'),
    dataIndex: 'fileName',
    key: 'fileName',
    render: (value, record) => {
      return <EditTitle {...record} reload={reload} />
    }
  }, {
    title: i18n.format('文件生成时间'),
    dataIndex: 'fileCreateTime',
    key: 'fileCreateTime',
  }, {
    title: i18n.format('状态'),
    dataIndex: 'generateStatus',
    key: 'generateStatus',
    render: (key) => {
      switch (key) {
        case 1:
          return i18n.format('生成中')
        case 2:
          return i18n.format('生成成功')
        case 3:
          return i18n.format('生成失败')
      }
    }
  }, {
    title: i18n.format('操作'),
    dataIndex: 'operation',
    key: 'operation',
    render: (key, record) => {
      const isDisabled = record.isNewestData == 1;
      return <div style={{ display: 'flex' }}>
        <Button style={{ marginRight: 8, display: 'flex', alignItems: 'center' }} onClick={() => { reDownload(record) }} ghost type="primary" icon={<RsIcon style={{ fontSize: 16 }} type="icon-xiazai" />}>
          {i18n.format('下载')}
        </Button>
        {isDisabled ? <Tooltip title="当前已是最新月份数据">
          <Button disabled={isDisabled} onClick={() => { matchNewestData(record) }} ghost type="primary" icon={<img src={isDisabled ? RefreshDisabledImg : RefreshImg} style={{ width: 16, height: 16, marginRight: 8, marginTop: '-2px' }} />}>
            {i18n.format('匹配最新数据')}
          </Button>
        </Tooltip>
          : <Button disabled={isDisabled} onClick={() => { matchNewestData(record) }} ghost type="primary" icon={<img src={isDisabled ? RefreshDisabledImg : RefreshImg} style={{ width: 16, height: 16, marginRight: 8, marginTop: '-2px' }} />}>
            {i18n.format('匹配最新数据')}
          </Button>}
      </div>
    }
  }];

  const handleTableChange = (pagination) => {
    // console.log('pagination', pagination);
    setPage(page => {
      return {
        ...page,
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  }

  return (
    <div className="download-viewpoint-container">
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
      </CustomTab>
      <div>
        <div className="download-viewpoint-container-search">
          <Input
            style={{ width: '180px', marginRight: 24 }}
            placeholder={i18n.format('请输入文件名称')}
            onChange={handleSearchChange}
            suffix={<RsIcon type="icon-gb-sousuo" style={{ color: '#8C8C8C', fontSize: 12 }} />}
          />
          <Custom_Date
            style={{ marginTop: 0 }}
            title={`${i18n.format("文件生成时间")}`}
            isCompleteOpen={true}
            date_type={"day"}
            type={"double"}
            onChange={handleRangeChange}
          />

        </div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleTableChange}
          rowKey={(recode) => {
            return recode.filePath;
          }}
          pagination={{
            total: total,
            pageSizeOptions: [10, 20, 50],
            showSizeChanger: true,
          }}
        />

      </div>
    </div>
  )
}
