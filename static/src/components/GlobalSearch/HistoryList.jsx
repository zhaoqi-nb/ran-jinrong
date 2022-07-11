import React, { useCallback } from 'react';
import RsIcon from '@/page/component/rsIcon';

export default function HistoryList(props) {
  const { onClickItem, onClearHistory } = props;

  const handleClick = useCallback(
    (record) => () => {
      onClickItem && onClickItem(record)
    },
    [onClickItem]
  )

  return (
    <div className='rc-history-list'>
      <div className='header'>
        <div className='left'>
          <span>{i18n.format('搜索历史')}</span>
        </div>
        <div className='right' onClick={onClearHistory}>
          <RsIcon type="icon-shanchu" style={{ fontSize: 16, cursor: 'pointer' }} />
        </div>
      </div>
      <ul className='list-inner'>
        {
          _.map(props.data, (item, idx) => (
            <li key={item.id || idx} onClick={handleClick(item)}>{item.label}</li>
          ))
        }
      </ul>
    </div>
  )
}
