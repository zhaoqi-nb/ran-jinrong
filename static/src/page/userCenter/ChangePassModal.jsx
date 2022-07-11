import React, { useCallback } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Button from '@/components/Button'

import Api from './store/api'
import LoginFormat from '@/utils/LoginFormat';

export default function ChangePassModal(props) {
  const [form] = Form.useForm();

  const { info } = props;

  // const handleSubmite = useCallback(
  //   () => {
  //     form
  //       .validateFields()
  //       .then(values => {
  //         Api.resetPassword({
  //           userId: info.userId,
  //           oldPassword: values.oldPassword,
  //           newPassword: values.newPassword
  //         }).then((res) => {
  //           if (res.code == 200) {
  //             form.resetFields();
  //             message.success('修改成功')
  //           } else {
  //             message.success('修改失败')
  //           }
  //         })
  //       })
  //       .catch(info => {
  //         console.log('Validate Failed:', info);
  //       });
  //   },
  //   [form, info],
  // )

  const handleSubmite = useCallback(
    (values) => {
      console.log('valuesvaluesvalues', values)
      Api.resetPassword({
        userId: info.userId,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        isEncoded: false
      }).then((res) => {
        if (res.code == 200) {
          form.resetFields();
          message.success(LoginFormat('修改成功'))
          props.onCancel && props.onCancel()
        }
      })
    },
    [form, info, props.onCancel],
  )

  const handleCancel = useCallback(() => {
    form.resetFields();
    props.onCancel && props.onCancel()
  }, [form, props.onCancel])

  return (
    <Modal
      className='changepass-modal'
      getContainer={false}
      width={368}
      centered
      title={LoginFormat("修改密码")}
      visible={props.visible}
      maskClosable={false}
      destroyOnClose={true}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        onFinish={handleSubmite}
      >
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: LoginFormat('请输入密码') }]}
        >
          <Input placeholder={LoginFormat('原密码')} />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: LoginFormat('请输入密码') }]}
        >
          <Input.Password placeholder={LoginFormat('新密码')} visibilityToggle={false} />
        </Form.Item>

        <Form.Item
          name="repeatPassword"
          dependencies={['oldPassword']}
          rules={[
            { required: true, message: LoginFormat('请输入密码') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(LoginFormat('两次密码不一致')));
              },
            })
          ]}
        >
          <Input.Password placeholder={LoginFormat('确认密码')} visibilityToggle={false} />
        </Form.Item>
        <Form.Item noStyle shouldUpdate >
          {
            () => (
              <div className='custom-footer'>
                <Button
                  type="link"
                  style={{ marginRight: 12, color: '#595959' }}
                  onClick={handleCancel}
                >{LoginFormat('取消')}</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 72 }}
                  disabled={
                    !form.isFieldsTouched(true)
                    || !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >{LoginFormat('提交')}</Button>
              </div>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  )
}
