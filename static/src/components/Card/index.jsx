import React from 'react';
import classNames from 'classnames';
import Item from './Item'
import './style.module.less'

const Card = (props) => {
  return (
    <div className={classNames('rs-card', props.className)}>
      {props.children}
    </div>
  )
}

Card.Item = Item

Card.Split = (props) => {
  return <span className="rs-card-split"></span>
}

export default Card