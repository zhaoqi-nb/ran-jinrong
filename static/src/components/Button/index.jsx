import React from 'react';
import { Button, ConfigProvider } from 'antd'
import './style.less'

function DefaultButton(props) {

  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <Button {...props} />
    </ConfigProvider>
  )
}

function IconButton(props) {
  return (
    <DefaultButton className='icon-btn' {...props} type="default" />
  )
}

function IconTextButton(props) {
  const { icon, num, ...others } = props
  return (
    <DefaultButton className='icon-text-btn' {...others} type="default" >
      <span className='btn-icon'>
        {props.icon}
      </span>
      {props.children}
      <span className='btn-num'>
        {props.num}
      </span>
    </DefaultButton>
  )
}

export default DefaultButton

export {
  IconButton,
  IconTextButton
}


{/* <Button>{title}</Button>
  <Button disabled>{title}</Button>
  <Button type="link">{title}</Button>
  <Button type="link" disabled>{title}</Button>
  <Button type="primary">{title}</Button>
  <Button type="primary" disabled>{title}</Button>
  <IconButton> <RsIcon type="icon-shaixuan" /></IconButton>
  <IconButton disabled> <RsIcon type="icon-shaixuan" /></IconButton>
  <IconTextButton icon={<RsIcon type="icon-shaixuan" />} num="7/15">
      {title}
  </IconTextButton>
  <IconTextButton disabled icon={<RsIcon type="icon-shaixuan" />} num="7/15">
      {title}
  </IconTextButton> */}


