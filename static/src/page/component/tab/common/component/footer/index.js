import React from 'react';
import { Button } from 'antd';
import i18n from '@/plugin/i18n';

import './index.less';

const Footer = ({ onClose, disabled, onDownload }) => {


    const onClick = () => {
        onDownload && onDownload();
    }

    return (
        <div className="tab-download-footer">
            <span onClick={onClose} className='tab-download-footer-cancel'>{i18n.format('取消')}</span>
            <Button disabled={disabled} type="primary" onClick={onClick}>{i18n.format('下载')}</Button>
        </div>
    );
}


export default Footer;