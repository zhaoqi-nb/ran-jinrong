import React, { useRef, useLayoutEffect, useCallback, useState, useEffect } from 'react';

import { getScrollParent } from './uitl';

export default function FilterResultSpace(props) {
  const spaceRef = useRef(null);
  const childrenRef = useRef(null);
  const handleRef = useRef(false); // 是否是手动点击的收起筛选
  const [scrollParent, setScrollParent] = useState(null);
  const [spaceVisibility, setSpaceVisibility] = useState(true);
  const [spaceStyle, setSpaceStyle] = useState({})

  const loopGetScrollParent = (node) => {
    const scrollParent = getScrollParent(node);
    if (!scrollParent) {
      setTimeout(() => {
        loopGetScrollParent(node)
      }, 1000)
    }
    setScrollParent(scrollParent)
  }

  useLayoutEffect(() => {
    const ele = spaceRef.current;
    loopGetScrollParent(ele);
  }, [])

  const { onExpand } = props;

  const handleExpand = useCallback(
    () => {
      onExpand && onExpand();
      handleRef.current = true;
      !spaceVisibility && (scrollParent.scrollTop = 0)
    },
    [onExpand, spaceVisibility, scrollParent]
  )

  const handleScrollExpand = useCallback(
    (visible) => {
      handleRef.current = false;
      onExpand && onExpand(visible)
    },
    [onExpand]
  )

  const handleChangeChildrenStyle = useCallback(
    (spaceVisibility) => {
      setSpaceVisibility(spaceVisibility)
      if (!spaceVisibility) {
        const ele = spaceRef.current;
        const { width, top } = ele.getBoundingClientRect();
        const childrenStyle = {
          position: 'fixed',
          top: top - ele.offsetTop + scrollParent.scrollTop,
          width: width,
          padding: '8px 0',
          zIndex: 3,
        }
        const { height } = childrenRef.current.getBoundingClientRect()
        setSpaceStyle({ width, height })
        childrenRef.current.setContainerStyle(childrenStyle)
        handleScrollExpand(false)
      } else {
        setSpaceStyle({})
        childrenRef.current.setContainerStyle({})
        handleRef.current === false && handleScrollExpand(true)
      }
    }, [scrollParent, handleScrollExpand]
  )

  useLayoutEffect(() => {
    if (!scrollParent) return;
    const handleScroll = () => {
      const ele = spaceRef.current;
      if (scrollParent.scrollTop >= ele.offsetTop) {
        handleChangeChildrenStyle(false)
      } else {
        handleChangeChildrenStyle(true)
      }
    }

    scrollParent.addEventListener('scroll', handleScroll)
    return () => {
      scrollParent.removeEventListener('scroll', handleScroll)
    }
  }, [scrollParent, handleChangeChildrenStyle])


  const children = React.cloneElement(props.children, {
    ref: childrenRef,
    onExpand: handleExpand
  }, [])

  return (
    <>
      <div className='filter-result-space' ref={spaceRef} style={spaceStyle}></div>
      {children}
    </>

  )
}
