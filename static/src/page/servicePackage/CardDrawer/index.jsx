import React from 'react';
import _ from 'lodash';
import { Drawer } from 'antd';
import CardList from './Card';
import RsIcon from '@/page/component/rsIcon/index';
import Button from '@/components/Button';

import './style.less'

export default function CardDrawer({ visible, record, ...props }) {

  const { title, img, data } = record;

  return (
    <Drawer
      className="custom-drawer"
      placement='bottom'
      title={title}
      height={640}
      onClose={props.onClose}
      visible={visible}
      extra={
        <div className='drawer-extra'>
          <span className='btn close' onClick={props.onClose}>
            <RsIcon type="icon-guanbi" style={{ fontSize: 16, color: '#8C8C8C' }} />
          </span>
        </div>
      }
    >
      <div className='drawer-wrapper'>
        {
          _.map(data, (item, idx) => (
            <div key={idx} className='item'>
              <div className='header'>
                <div className='icon'>
                  <RsIcon type={item.icon} style={{ fontSize: 32, color: '#fff' }} />
                </div>
                <div className='right'>
                  <span className='title'>{item.title}</span>
                  <span className='desc'>{item.desc}</span>
                </div>
              </div>
              <div className='card-wrapper'>
                {
                  item.children ? (
                    _.map(item.children, (child, childIndex) => (
                      <div key={`${idx}-${childIndex}`} className="card-child">
                        <div className='card-top-title'>{child.topTitle}</div>
                        <CardList
                          data={child.cards}
                          span={child.span}
                          gutter={child.gutter}
                          itemMinWidth={child.itemMinWidth}
                        />
                      </div>
                    ))
                  ) : (
                    <CardList
                      data={item.cards}
                      span={item.span}
                      gutter={item.gutter}
                      itemMinWidth={item.itemMinWidth}
                    />
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
    </Drawer>
  )
}
