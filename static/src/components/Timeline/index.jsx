import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import './style.less';


function TimelineItem(props) {

  const { position } = props;

  const { year, day } = useMemo(() => {
    const year = moment(props.date).format('YYYY');
    const day = moment(props.date).format('MM-DD');
    return { year, day }
  }, [props.date])

  const title = i18n.format(_.get(props, 'title', ''));
  const text = i18n.format(_.get(props, 'text', ''));

  return (
    <div className={classnames('rs-timeline-item', props.className, {
      'rs-timeline-item-top': position === 'top',
      'rs-timeline-item-bottom': !position || position === 'bottom'
    })}>
      <div className='item-space'></div>
      <div className='item-inner'>
        <div className='item-dot'>
          <span>{year}</span>
          <span>{day}</span>
        </div>
        <div className='item-dot-line'></div>
        <div className='item-connect-line'></div>
        <div className='item-info'>
          <p className='info-title' title={title}>{title}</p>
          <p className='info-text' title={text}>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default function Timeline(props) {

  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [moveX, setMoveX] = useState(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();

    const startX = e.clientX + scrollLeftRef.current;

    const move = _.throttle((moveE) => {
      const moveX = startX - moveE.clientX;
      scrollLeftRef.current = moveX
      containerRef.current.scrollLeft = moveX;
    }, 30)

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move)
    })
  }, [])


  // const wrapperStyle = {
  //   display: 'flex',
  //   // transform: `translate(${moveX}px, 0px)`
  // }

  return (
    <div
      className='rs-timeline'
    >
      <div
        className='rs-timeline-wrapper'
        ref={containerRef}
      >
        <div
          // ref={timelineRef}
          // style={wrapperStyle}
          onMouseDown={handleMouseDown}
        >
          {
            _.map(props.data, (item, index) => (
              <TimelineItem
                key={index}
                {...item}
                position={index % 2 === 0 ? 'bottom' : 'top'}
                className={classnames('', {
                  'rs-timeline-first-item': _.size(props.data) === 1
                })}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
