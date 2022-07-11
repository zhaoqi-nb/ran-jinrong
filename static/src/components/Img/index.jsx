import React from 'react';
import { useEventCallback } from 'rxjs-hooks';
import defaultImg from '@/page/image/defaultProject.png'
import { map } from 'rxjs/operators';
import classNames from 'classnames';
import './style.less';

export default function Img(props) {

  const [handleImageErrored, src] = useEventCallback((event$, state$) => {
    return event$.pipe(
      map(() => defaultImg)
    )
  }, props.src)


  return (
    <img
      className={classNames('rs-img', props.className)}
      src={src}
      alt={props.alt || ''}
      style={props.style}
      onError={handleImageErrored}
    />
  )
}
