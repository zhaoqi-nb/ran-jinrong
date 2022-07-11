import React, { useEffect, useRef, useState, useCallback } from 'react';
import FormItem from '@/components/FormItem';
import RsIcon from '../../rsIcon';
import { getScrollParent } from './uitl';

export default function CascaderFilter(props) {
  const { data, expand, onClear, onExpand, onDelete } = props;
  const spaceRef = useRef(null);
  const [scrollEle, setScrollEle] = useState(null)
  const [rect, setRect] = useState({
    width: 0
  })
  const [visibility, setVisibility] = useState(true);

  const handleRef = useRef(false); // true 手动点击展开折叠 false 滚动展开折叠

  const handleExpand = useCallback(
    () => {
      onExpand && onExpand();
      handleRef.current = true
    },
    [onExpand]
  )

  const handleScrollExpand = useCallback(
    (visible) => {
      onExpand && onExpand(visible)
    },
    [onExpand]
  )


  useEffect(() => {
    const ele = spaceRef.current;
    if (!ele) return;
    setScrollEle(getScrollParent(ele))
  }, [data])

  useEffect(() => {
    if (!scrollEle) return;
    const handleScroll = (e) => {
      const ele = spaceRef.current;
      const { top, width } = ele.getBoundingClientRect();
      if (scrollEle.scrollTop >= ele.offsetTop) {
        setVisibility(false)
        handleRef.current = false
        handleScrollExpand(false)
      } else {
        setVisibility(true)
        handleRef.current === false && handleScrollExpand(true)
      }
      setRect({ width, top: top - ele.offsetTop + scrollEle.scrollTop })
    }
    scrollEle.addEventListener('scroll', handleScroll)
    return () => {
      scrollEle.removeEventListener('scroll', handleScroll)
    }
  }, [scrollEle, handleScrollExpand])

  useEffect(() => {
    if (!scrollEle) return;
    if (expand && !visibility) {
      scrollEle.scrollTop = 0
    }
  }, [scrollEle, visibility, expand])

  const style = !visibility ? {
    position: 'fixed',
    top: rect.top,
    width: rect.width,
    border: 'none'
  } : {}

  return <>
    <div ref={spaceRef}></div>
    <div className='cascader-filter' style={style}>
      <FormItem label={i18n.format('筛选结果')}>
        <div className='filter-list'>
          {
            _.map(data, (item) => (
              <div className='filter-item' key={item.value}>
                <span className='filter-item-title'>
                  {item.title}
                </span>
                <span className='filter-item-value'>
                  {item.label}
                </span>
                <div className='filter-item-close' onClick={onDelete(item)}>
                  <RsIcon type="icon-guanbi" style={{ color: '#8C8C8C' }} />
                </div>
              </div>
            ))
          }
        </div>
        <div className='filter-oprator'>
          <span className='clear-btn' onClick={onClear}>
            {i18n.format('清空筛选')}
          </span>
          <span className='expand-btn' onClick={handleExpand}>
            {expand ? i18n.format('收起筛选') : i18n.format('展开筛选')}
            <RsIcon
              type={expand ? 'icon-jiantoushang' : 'icon-jiantouxia'}
              style={{ color: '#BFBFBF', marginLeft: 4 }}
            />
          </span>
        </div>
      </FormItem>
    </div>
  </>

}
