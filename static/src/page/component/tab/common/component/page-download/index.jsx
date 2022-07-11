import React, {useState, useEffect} from 'react';
import Title from '../title';
import Panel from '../panel';
import Footer from '../footer';
import { Checkbox, Button } from 'antd';
import { downloadBackEnd } from '../../../../downExcel/utils/downUtil';


const getExcelTitle = () => {
    const title = document.querySelector('.excel-title')?.textContent;
    return title;
}

const getTitle = (options) => {
    let title = getExcelTitle();
    options.forEach(item => {
        title = title.replace(item.value, '')
    })
    return title + '详情数据';
}

const PageDownload = ({ tabData, onClose }) => {


    const [value, setValue] = useState([]);
    const options = tabData?.map(item => {
        return {
            label: item.title,
            value: item.title
        }
    })

    useEffect(() => {
        const value = tabData.map(item => item.title);
        setValue(value);
    }, [tabData])

    const onChange = (checkedValues) => {
        setValue(checkedValues);
    }
    const title = getTitle(options);

    const onDownload =async () => {
        const data_params = await window.global_download_params();
        console.log('data_params: ', data_params);
        Object.keys(data_params).forEach((item) => {
            if (data_params[item] === undefined) {
                delete data_params[item];
            }
        })
        downloadBackEnd({
            tab_name_list: value.join(','),
            download_name: title,
            data_params,
            type: 'detail'
        })
        onClose && onClose();
    }
    return (
        <div>
            <Title readonly={true} title={title} />
            <Panel title='页面选择'>
                <Panel.Vertical title='页面'>
                    <Checkbox.Group
                        options={options}
                        value={value}
                        onChange={onChange}
                    />

                </Panel.Vertical>
            </Panel>

            <Footer disabled={value.length<2} onClose={onClose} onDownload={onDownload} />
        </div>
    );
}


export default PageDownload;