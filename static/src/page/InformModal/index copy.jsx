import React from 'react';
import { Button, Modal } from 'antd';

export default function InformModal() {


  return (
    <Modal
      title={i18n.format('系统通知')}
      visible={true}
      width={288}
      style={{ minHeight: 219, top: 20, left: 24 }}
      mask={false}
      footer={[
        <Button type='link'>上一条 (2/2)</Button>,
        <Button type='primary'>知道了</Button>,
      ]}
    >
      <div>
        <header>
          数据更新提醒
        </header>
        <section>
          尊敬的客户您好，消费公司2022年2月数据已更新，您可以在二级市场研究-公司分析-消费页面下查看相关数据。
        </section>
        <footer>
          2022-03-23
        </footer>
      </div>
    </Modal>
  )
}
