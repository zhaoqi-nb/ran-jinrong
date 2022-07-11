import React, { useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import RsIcon from '../../../rsIcon';

function Item(props) {
  const locale = i18n.getLocalLanguage();
  const isLocaleZH = locale === 'zh_CN';
  const title = isLocaleZH ? props.contentTitle : props.contentTitleEn;
  const content = isLocaleZH ? props.contentText : props.contentTextEn;
  const time = moment(props.releaseTime).format('YYYY-MM-DD')

  const [contentExpand, setContentExpand] = useState(false);

  const handleExpandContent = () => {
    setContentExpand(state => !state)
  }

  return (
    <li>
      <header>
        <span className='title'>{title}</span>
        <RsIcon
          type={contentExpand ? "icon-jiantoushang" : "icon-jiantouxia"}
          style={{ fontSize: 12, color: '#8c8c8c', cursor: "pointer" }}
          onClick={handleExpandContent}
        />
      </header>
      <section style={{ height: contentExpand ? 'auto' : 0 }}>
        <span>{content}</span>
      </section>
      <footer>
        <span>{time}</span>
      </footer>
    </li>
  )
}

export default function List(props) {
  const { data } = props
  return (
    <ul className='list-wrap'>
      {
        _.map(data, (item, idx) => (
          <Item key={idx} {...item} />
        ))
      }
    </ul>
  )
}
