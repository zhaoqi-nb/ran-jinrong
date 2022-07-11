import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import _ from 'lodash';
import classnames from 'classnames';
import RsIcon from '@/page/component/rsIcon/index';
import elementResizeDetectorMaker from 'element-resize-detector'

import './style.less'

const erd = elementResizeDetectorMaker();

export default function Legend(props) {
  const contentRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const [pageVisible, setPageVisible] = useState(false);
  const [{ current, total }, setPageInfo] = useState({
    current: 1,
    total: 2
  })
  const [{ left }, setPosition] = useState({
    left: 0
  })

  const index = useRef(null);

  const { data, onSelect } = props;

  const selected = props.selected || _.reduce(data, (acc, item) => {
    acc[item.name] = true;
    return acc
  }, {})

  const containerRef = useCallback((node) => {
    if (node) {
      erd.listenTo(node, function (element) {
        setContainerW(element.offsetWidth)
      });
    }
  }, [])

  const handleClick = useCallback(
    (name) => () => {
      const _selected = {
        ...selected,
        [name]: !selected[name]
      }
      const res = _.chain(_selected)
        .toPairs()
        .filter(([, selected]) => selected)
        .map(([name]) => name)
        .value()
      onSelect && onSelect(res)
    }, [selected, onSelect])

  useLayoutEffect(() => {
    const box = contentRef.current;
    const { width } = box.getBoundingClientRect();
    if (width > containerW) {
      setPageVisible(true)
      setPageInfo((state) => ({
        ...state,
        total: Math.ceil(width / containerW)
      }))
    } else {
      setPageVisible(false)
    }
  }, [containerW])

  const getClientRect = useCallback((type) => {
    const box = contentRef.current;
    const parentW = box.parentNode.getBoundingClientRect().width;
    if (type === 'next') {
      return _.reduce(box.children, (acc, child, idx) => {
        if (child.offsetLeft < parentW + left) {
          acc = child.offsetLeft
          index.current = idx;
        }
        return acc
      }, 0)
    }
    const res = _.chain(box.children)
      .map((t) => t)
      .slice(0, index.current)
      .reverse()
      .reduce(([accW, ele], child, idx, arr) => {
        const { width } = child.getBoundingClientRect();
        if (accW + width < parentW) {
          accW += width;
          ele = child;
          index.current = arr.length - idx - 1
        }
        return [accW, ele]
      }, [0, ''])
      .value();
    return res[1].offsetLeft

  }, [left])

  const handlePageClick = useCallback(
    (type) => () => {
      setPageInfo((state) => {
        return {
          ...state,
          current: type === 'next' ? current + 1 : current - 1
        }
      })

      setPosition((state) => {
        return { left: getClientRect(type) }
      })
    }, [current, getClientRect]
  )

  return (
    <div className='chart-legend' >
      <div className='list-wrapper' ref={containerRef}>
        <div
          className='content'
          ref={contentRef}
          style={{ left: -left }}
        >
          {
            _.map(data, (item, idx) => {
              return (
                <div key={idx} className={classnames('item', {
                  selected: !selected[item.name]
                })} onClick={handleClick(item.name)}>
                  <span className="icon">
                    <RsIcon
                      type={item.type === 'line' ? 'icon-zhexian' : 'icon-zhuzhuang'}
                      style={{ color: item.color, fontSize: 20 }}
                    />
                  </span>
                  <span className="label">{item.name}</span>
                </div>
              )
            })
          }
        </div>
      </div>

      {
        pageVisible && (
          <div className='page-wrapper'>
            <span
              className={classnames('pre', {
                disabled: current === 1
              })}
              onClick={handlePageClick('pre')}
            >
              <RsIcon type="icon-tianchongxiajiantou" style={{}} />
            </span>
            <span className='count'>{current}/{total}</span>
            <span
              className={classnames('next', {
                disabled: current === total
              })}
              onClick={handlePageClick('next')}
            >
              <RsIcon type="icon-tianchongxiajiantou" style={{}} />
            </span>
          </div>
        )
      }

    </div>
  )
}
