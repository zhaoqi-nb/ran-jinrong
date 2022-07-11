import React from 'react'
import { withLatestFrom, map, filter } from 'rxjs/operators'
import { useEventCallback } from 'rxjs-hooks'
import classNames from 'classnames'
import RsIcon from '@/page/component/rsIcon/index';
import './style.less'

export default ({onClick, disabled, type, ...props}) => {
  const [handleClick] = useEventCallback((event$, state$, inputs$) => {
    return event$.pipe(
      withLatestFrom(inputs$),
      filter(([ev, [disabled, onClick]]) => typeof onClick === 'function' && !disabled),
      map(([ev, [disabled, onClick]]) => {
        onClick(ev)
        return false
      })
    )
  }, false, [disabled, onClick])

  return (
    <span 
      {...props}
      onClick={handleClick}
      className={classNames({
          'arrow-btn': true,
          'arrow-btn-default': !disabled
      })}
      disabled={disabled}
    >
        <RsIcon type={type} className="arrow" ></RsIcon>
    </span>
  )
}