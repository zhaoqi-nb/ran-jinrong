import React, { useCallback } from 'react';
import _ from 'lodash';
import FormItem from '../FormItem';

const colors = ['#009B77', '#E2492F', '#0454B3', '#5F4B8B', '#955251']

export default function TipList(props) {
  const { onClickItem } = props;

  const handleClick = useCallback(
    (record) => () => {
      onClickItem && onClickItem(record)
    },
    [onClickItem]
  )

  return (
    <div className='rc-hot-list'>
      <FormItem label={i18n.format('搜索推荐')} >
        <ul className='list-inner'>
          {
            _.map(props.data, (item, idx) => (
              <li
                key={item.id || idx}
                onClick={handleClick(item)}
                style={{ color: colors[idx % _.size(colors)] }}
              >
                {item.label}
              </li>
            ))
          }
        </ul>
      </FormItem>
    </div>
  )
}
