import React from 'react';
import classNames from 'classnames';
import { useEventCallback } from 'rxjs-hooks'
import { withLatestFrom, filter, tap, map } from 'rxjs'
import RsIcon from '../../page/component/rsIcon/index';
import {tagColor} from '../Badge';

export default (props) => {
  const [handleClick] = useEventCallback(
    (event$, state$, inputs$) => event$
      .pipe(
        withLatestFrom(inputs$),
        filter(([, [disabled]]) => !disabled),
        tap(([ev, [, onClick]]) => {
          onClick && onClick(ev)
        }),
        map(() => null)
      ),
    null,
    [props.disabled, props.onClick]
  )

  return (
    <div
      className={classNames(
        'rs-card-item',
        props.className,
        {
          disabled: props.disabled
        }
      )}
      style={{ boxShadow: props.disabled ? "none" : "0px 2px 4px 0px rgba(0, 0, 0, 0.1)", display: props.isHidden ? "none" : "" }}
      onClick={handleClick}
    >
      {
        props.icon && <div className="rs-card-item__left">
          {props.icon}
        </div>
      }
      <div className="rs-card-item__inner">
        <span className="card-name">{props.name}</span>
        <span className="card-desc">{props.desc}{props.attendFlag && <RsIcon type="icon-guanzhu" className="card-guanzhu" style={{ fontSize: '16px', color: '#FFBA00' }} />}</span>

        {props.children}
      </div>
      {
        props.tagType && (
          <span
            className="rs-card-item__tag"
            style={{ background: `${tagColor[props.tagType]}` }}
          >
            {props.tagName}
          </span>
        )
      }

    </div>
  )
}