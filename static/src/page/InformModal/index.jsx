import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import moment from 'moment';
import RsIcon from '../component/rsIcon';

import { updateAllInformRead } from '@/redux/actions/inform';
import { getUserInfoData } from '@/page/component/page/util';

import './style.less';

const Modal = (props) => {
  const [visible, setVisible] = useState(false);

  const { onCancel, onOk } = props;

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  const handleClose = () => {
    setVisible(false);
  }

  return (
    <div className='inform-modal' style={{ display: visible ? 'block' : 'none' }}>
      <div className='inform-modal-wrap' style={{ ...props.wrapStyle }}>
        <div className='inform-modal-header'>
          <div className='inform-modal-title'>{props.title}</div>
          <div className='inform-modal-close' onClick={handleClose}>
            <RsIcon type='icon-guanbi' style={{ fontSize: 16, color: '#00000073' }} />
          </div>
        </div>
        <div className='inform-modal-body'>
          {props.children}
        </div>
        <div className='inform-modal-footer'>
          {props.footer || (
            <Button type='link' onClick={onCancel}>取消</Button>,
            <Button type='primary' onClick={onOk}>保存</Button>
          )}
        </div>
      </div>
    </div>
  )
}

const InformModal = (props) => {
  const { unReadInformList, dispatch, updateAllInformRead } = props;
  const locale = i18n.getLocalLanguage();
  const userInfo = getUserInfoData();
  const userId = userInfo.sysUserId;
  const visible = _.size(unReadInformList) !== 0;

  const current = _.head(unReadInformList);

  const isLocaleZH = locale === 'zh_CN';

  const handleRead = useCallback(
    () => {
      dispatch(updateAllInformRead({
        userId,
        informId: current.id
      }))
    },
    [dispatch, updateAllInformRead, userId, current],
  )

  if (!current) return null;

  const releaseTime = moment(current.releaseTime).format('YYYY-MM-DD')

  return ReactDOM.createPortal(
    <Modal
      title={i18n.format('系统通知')}
      visible={visible}
      wrapStyle={{ width: 288, minHeight: 219, maxHeight: 400, bottom: 35, right: 24 }}
      footer={[
        <Button
          type='primary'
          style={{ background: '#0678FF' }}
          onClick={handleRead}
        >知道了</Button>,
      ]}
    >
      <div className='inform-content'>
        <header>
          {isLocaleZH ? current.contentTitle : current.contentTitleEn}
        </header>
        <section>
          {isLocaleZH ? current.contentText : current.contentTextEn}
        </section>
        <footer>{releaseTime}</footer>
      </div>
    </Modal>
    , document.body)
}

function mapStateToProps(state) {
  return {
    unReadInformList: state.inform.unReadInformList
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch, updateAllInformRead }
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(InformModal);
