import React, {useCallback, useEffect, useState} from 'react';
import { Button, message, Modal  } from 'antd';
import copy from 'copy-to-clipboard';

import AceEdit from '@/components/AceEdit';

export default ({data, visible, onCancel, onOk}) => {
  const [editJsonValue, setEditJson] = useState('')

  useEffect(() => {
    if(!data) return;

    const {templatePropertyValue, rootInstantiationId, parentInstantiationId, templateId} = data
    const backendPropertyOption = templatePropertyValue ? JSON.parse(templatePropertyValue) : templatePropertyValue
                                  
    setEditJson(JSON.stringify({
        rootInstantiationId, 
        parentInstantiationId, 
        templateId, 
        templatePropertyValue: backendPropertyOption 
    }, null, 2))
  }, [data])

  const handleOk = useCallback(() => {
    const {templatePropertyValue, backendPropertyValue, ...outer} = JSON.parse(editJsonValue)
      return onOk && onOk({
        templatePropertyValue: templatePropertyValue ? 
          JSON.stringify(templatePropertyValue) : 
            templatePropertyValue,
        instantiationId: data.instantiationId, 
        ...(backendPropertyValue ? {backendPropertyValue : JSON.stringify(backendPropertyValue)} : {}),
        ...outer
      })
    }, [editJsonValue])

  return (
    <Modal 
      visible={visible} 
      width={650} 
      title="修改配置信息" 
      onCancel={onCancel}
      footer={(
        <>
          <Button  type="primary" onClick={() => {
            if(copy(editJsonValue)) {
              message.success('复制成功')
            }
          }}>复制</Button>
          <Button type="primary" onClick={handleOk}>应用</Button>
          <Button type="primary" onClick={() => {
            handleOk()
              .then(res => {
                onCancel && onCancel()
              })
          }}>确认</Button>
        </>
      )}
    >
      <AceEdit value={editJsonValue} onChange={setEditJson}></AceEdit>
    </Modal>
  )
}