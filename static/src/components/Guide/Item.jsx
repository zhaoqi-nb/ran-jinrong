import React, { useEffect, useRef } from 'react';
import Guide from '@/plugin/Guide';

export default function Item(props) {

  const ref = useRef(null)

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      ...child.props,
      ref,
    })
  });

  useEffect(() => {
    Guide.addItem({ ...props, children })
  }, [props, children])
  return (
    <>
      {children}
    </>
  )
}
