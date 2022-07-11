import React from 'react';
import classNames from 'classnames';
// import {Spin} from 'antd'
import './style.module.less';

const ScrollView = (props) => {
  return (
    <div className={classNames('rs-scroll-view', props.className)}>
      {/* <div className={classNames('rs-scroll-view__loading')}></div> */}
      <div 
        className={classNames(
          'rs-scroll-view__inner', 
          props.className,
          {
            x: props.x,
            y: props.y
          }
        )}
      >
        {props.children}
      </div>
    </div>
  )
}

ScrollView.defaultProps = {
  y: true
}

export default ScrollView