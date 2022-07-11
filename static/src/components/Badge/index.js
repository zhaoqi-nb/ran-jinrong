import React from 'react';
import i18n from '../../plugin/i18n';
import './index.less';
export const tagColor = {
  "联系申请": "linear-gradient(270deg, #0697FF 0%, #0678FF 100%)",
  "付费使用": "linear-gradient(270deg, #33C292 0%, #00B277 100%)",
  "敬请期待": "linear-gradient(270deg, #009B77 0%, #00875F 100%)",
  "不能访问": "linear-gradient(270deg, #A4B6CC 0%, #90A5BF 100%)",
  "新增": "linear-gradient(270deg, #FF6C79 0%, #FF4757 100%)",
}

const Badge = ({ name, size }) => {
  return (
    <span className="badge-flag" style={{ background: `${tagColor[name]}` }}>{i18n.format(name)}</span>
  );
}


export default Badge;