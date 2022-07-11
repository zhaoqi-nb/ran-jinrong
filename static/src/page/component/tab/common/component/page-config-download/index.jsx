import React, { useState, useRef } from 'react';
import Title from '../title';
import Panel from '../panel';
import Footer from '../footer';
import { Checkbox, Button } from 'antd';
import Loadable from 'react-loadable';
import i18n from '@/plugin/i18n';

import P13 from './configDownload/13';
import P566 from './configDownload/566';
import P545 from './configDownload/545';
import P587 from './configDownload/587';
import P662 from './configDownload/662';

import { downloadBrandBackEnd } from '../../../../downExcel/utils/downUtil';



import './index.less';

const getExcelTitle = () => {
    const title = document.querySelector('.excel-title')?.textContent;
    return title;
}

const Loading = () => {
    return <div style={{ position: "absolute", left: "45%", top: "30%" }}>
        <Spin
            size="large"
            tip={`${i18n.format("加载中")}...`}
        />
    </div>
};


const PageConfigDownload = ({onClose, pageId}) => {

    const cRef = useRef();
    const [title, setTitle] = useState(getExcelTitle());
    const [btnDisabled, setBtnDisabled] = useState(false);

    const onDownload = () => {
       const params = cRef.current?.getParams();
       console.log('params->', params);
       downloadBrandBackEnd({...params, download_name: title})
       onClose && onClose();
    }

    const getAsyncComponents = (pageId) => {
        switch (pageId) {
            case 13:
                return <P13 setBtnDisabled={setBtnDisabled} ref={cRef} />
            case 566:
                return <P566 setBtnDisabled={setBtnDisabled} ref={cRef} />
            case 545:
                return <P545 setBtnDisabled={setBtnDisabled} ref={cRef} />
            case 587:
                return <P587 setBtnDisabled={setBtnDisabled} ref={cRef}/>
            case 662:
                return <P662 setBtnDisabled={setBtnDisabled} ref={cRef} />
        }
    }

    const onChangeTitle = (value) => {
        setTitle(value);
    }

    const language = i18n.getLocalLanguage();
    
    return (
        <div className={language ==='zh_CN' ? 'global-download-config-zh' : 'global-download-config'}>
            <Title readonly={true} title={title} onChange={onChangeTitle} />
            {getAsyncComponents(pageId)}
            <Footer disabled={btnDisabled} onClose={onClose} onDownload={onDownload} />
        </div>
    );
}


export default PageConfigDownload;