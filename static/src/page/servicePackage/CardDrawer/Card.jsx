import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';

function Card(props) {
  const { title, subTitle, tags } = props;

  return (
    <div className='card-item'>
      <div className='title'>{title}</div>
      <div className='content'>
        <span className='subTitle'>{subTitle}</span>
        <div className="tag-container">
          {
            _.map(tags, (item, idx) => (
              <span key={idx} className='tag'>{item}</span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default function CardList({ gutter, span, ...props }) {
  return (
    <div className='card-list'>
      <Row gutter={gutter}>
        {
          _.map(props.data, (item, idx) => {
            return <Col span={_.isArray(span) ? span[idx] : span} style={{ minWidth: props.itemMinWidth }}>
              <Card
                key={idx}
                title={item.title}
                subTitle={item.subTitle}
                tags={item.tags}
              />
            </Col>
          })
        }
      </Row>
    </div>
  )
}
