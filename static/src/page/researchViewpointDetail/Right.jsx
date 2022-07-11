import React from 'react';
import { Spin } from 'antd';
import moment from 'moment';

export default function Right(props) {

  const { data, loading, locale, history } = props;

  const handleToDetail = (record) => () => {
    window.open(
      `/page/researchViewpointDetail?mainId=${record.mainId}&viewpointId=${record.id}`,
      '_blank'
    )
  }

  return (
    <Spin spinning={loading}>
      <div className='research-viewpoint-detail-right'>
        <header className='header'>
          {i18n.format('相关观点')}
        </header>
        <ul className='list'>
          {
            _.map(data, (item) => (
              <li key={item.id} className='item'>
                <span className='title' onClick={handleToDetail(item)}>
                  {locale === 'zh_CN' ? item.viewpointTitle : item.viewpointTitleEn}
                </span>
                <span className='time'>
                  {moment(item.releaseTime).format('YYYY-MM-DD')}
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </Spin>
  )
}
