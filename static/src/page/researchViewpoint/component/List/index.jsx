import React from 'react';
import _ from 'lodash';
import BraftEditor from 'braft-editor';
import classnames from 'classnames';
import { message, Pagination, Spin } from 'antd';
import Button from '@/components/Button'
import copy from 'copy-to-clipboard';
import RsIcon from '../../../component/rsIcon';
import { convert } from 'html-to-text'

import moment from 'moment';

import './style.less';

export default function List(props) {

  const { data, total = 0, pagination, loading } = props;

  const { onCopy, onCollect, scroll = {} } = props;

  const locale = i18n.getLocalLanguage();

  const handleCopy = (record) => () => {
    const title = locale === 'zh_CN' ? record.viewpointTitle : record.viewpointTitleEn;
    const content = locale === 'zh_CN' ? record.viewpointContent : record.viewpointContentEn;
    const contentHtml = BraftEditor.createEditorState(content).toHTML()
    const text = `${title}\n${contentHtml}`
    const _text = convert(text, {
      wordwrap: 130
    })
    if (copy(_text)) {
      message.success(i18n.format('复制成功'))
    }
  }

  const handleCollect = (record) => () => {
    onCollect && onCollect(record)
  }

  const handleToDetail = (record) => () => {
    window.open(`/page/researchViewpointDetail?mainId=${record.mainId}&viewpointId=${record.id}`)
  }

  const getIsNew = (record) => {
    const start = moment().format('YYYY-MM-DD');
    const end = moment(record.releaseTime).format('YYYY-MM-DD');
    const diff = moment(start).diff(end, 'days');
    return diff < 7
  }

  const renderEmpty = () => {
    return (
      <div className='list-inner list-empty-inner'>
        {
          i18n.format('暂无内容')
        }
      </div>
    )
  }

  const renderList = () => {
    return (
      <ul className='list-inner' style={{ maxHeight: scroll.y || 'auto' }}>
        {
          _.map(data, (item) => (
            <li key={item.id} className='list-item'>
              <div className='item-left'>
                <div className='header'>
                  <span className='title' onClick={handleToDetail(item)}>
                    {locale === 'zh_CN' ? item.viewpointTitle : item.viewpointTitleEn}
                  </span>
                  {
                    getIsNew(item) && <span className='tag'>NEW</span>
                  }
                  {
                    item.isRead === 0 ? <span className='unread'></span> : null
                  }
                </div>
                <div className='content'>
                  {locale === 'zh_CN' ? item.viewpointIntroduction : item.viewpointIntroductionEn}
                </div>
                <div className='time'>
                  {item.releaseTime ? moment(item.releaseTime).format('YYYY-MM-DD') : item.releaseTime}
                </div>
              </div>
              <div className='item-oprator'>
                <Button onClick={handleCopy(item)}>
                  <img
                    src={require('@/img/copy.svg')}
                    style={{ width: 16, height: 16, marginRight: 4 }}
                  />
                  {i18n.format('复制')}
                </Button>
                <Button
                  className={classnames('collect-btn', {
                    'no-collect-btn': item.isCollect !== 0
                  })}
                  onClick={handleCollect(item)}
                >
                  <RsIcon type='icon-weiguanzhu' style={{
                    fontSize: 16,
                    marginRight: 4,
                    color: item.isCollect === 0 ? '#0678FF' : '#595959'
                  }} />
                  <span style={{ color: item.isCollect === 0 ? '#0678FF' : '#595959' }}>
                    {item.isCollect === 0 ? i18n.format('收藏') : i18n.format('取消收藏')}
                  </span>
                </Button>
              </div>
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <div className='list-wrap'>
      <div className='list-header'>
        <span>{
          `${i18n.format('观点列表')} (${total})`
        }</span>
        <span>{i18n.format('操作')}</span>
      </div>
      <Spin spinning={loading}>
        {
          !_.size(data) ? renderEmpty() : renderList()
        }
      </Spin>
      {
        pagination ? <Pagination
          className='list-pagination'
          defaultCurrent={1}
          defaultPageSize={10}
          {...pagination}
        /> : null
      }

    </div>
  )
}
