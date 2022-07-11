import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Button, Spin, message } from 'antd';
import copy from 'copy-to-clipboard';
import RsIcon from '../component/rsIcon';
import BraftEditor from 'braft-editor';
import BraftEditorView from '@/components/BraftEditorView'
import { convert } from 'html-to-text'

export default function Left(props) {

  const { detail = {}, loading, locale, onCollect } = props;

  const getIsNew = () => {
    const start = moment();
    const end = moment(detail.releaseTime);
    const diff = moment(start).diff(end, 'days');
    return diff <= 7
  }

  const handleCollect = () => {
    onCollect && onCollect(detail)
  }

  const handleCopy = () => {
    const title = locale === 'zh_CN' ? detail.viewpointTitle : detail.viewpointTitleEn;
    const content = locale === 'zh_CN' ? detail.viewpointContent : detail.viewpointContentEn;
    const contentHtml = BraftEditor.createEditorState(content).toHTML()
    const text = `${title}\n${contentHtml}`
    const _text = convert(text, {
      wordwrap: 130
    })
    if (copy(_text)) {
      message.success(i18n.format('复制成功'))
    }
  }

  const editorValue = locale === 'zh_CN' ? detail.viewpointContent : detail.viewpointContentEn;
  const editorState = BraftEditor.createEditorState(editorValue || '')

  return (

    <div className='research-viewpoint-detail-left'>
      <Spin spinning={loading}></Spin>
      <header className='header'>
        <span className='title'>
          {locale === 'zh_CN' ? detail.viewpointTitle : detail.viewpointTitleEn}
        </span>
        {
          getIsNew() && <span className='tag'>NEW</span>
        }
      </header>
      <section className='center'>
        <span className='time'>
          {detail.releaseTime ? moment(detail.releaseTime).format('YYYY-MM-DD') : detail.releaseTime}
        </span>
        <div className='oprator'>
          <Button onClick={handleCopy}>
            <img
              src={require('@/img/copy.svg')}
              style={{ width: 16, height: 16, marginRight: 4 }}
            />
            {i18n.format('复制')}
          </Button>
          <Button
            className={classnames('collect-btn', {
              'no-collect-btn': detail.isCollect !== 0
            })}
            onClick={handleCollect}
          >
            <RsIcon type='icon-weiguanzhu' style={{
              fontSize: 16,
              marginRight: 4,
              color: detail.isCollect === 0 ? '#0678FF' : '#595959'
            }} />
            <span style={{ color: detail.isCollect === 0 ? '#0678FF' : '#595959' }}>
              {detail.isCollect === 0 ? i18n.format('收藏') : i18n.format('取消收藏')}
            </span>
          </Button>
        </div>
      </section>
      <section
        className='content'
      >
        <BraftEditorView
          editorState={editorState}
          style={{ minHeight: 200, border: 'none', padding: 0 }}
        />
        {/* <BraftEditor
          value={editorState}
          controls={[]}
          contentStyle={{ height: 'auto' }}
        /> */}
      </section>
    </div>

  )
}
