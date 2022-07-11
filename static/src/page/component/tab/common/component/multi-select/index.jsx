
import React, { useRef, useImperativeHandle, useState } from 'react';
import RsIcon from '@/page/component/rsIcon/index';
import i18n from '@/plugin/i18n';
import CustomSelect from '@select/config';
import addImg from '../../../../../../img/tmp/add.svg';
import './index.less';

const MultiSelect = ({ industryList }) => {

    // const [count, setCount] = useStates([0]);

    const [list, setList] = useState([industryList[0]]);


    const add = () => {
        industryList.forEach(item => {

            if (!list.find(f => f.key == item.key)) {
                const newList = [...list, item];
                setList(newList);
            }
        })
        //    industryList.find(f => list.)

        // const newCount = [...count, ]
        // setCount();
        // setCount()
    }

    const deleteItem = (index) => {
        console.log('index=>', index);
        if (list.length <= 1) {
            return;
        }
        console.log('index=>', JSON.stringify(list))
        list.splice(index, 1);
        console.log('index=>123', JSON.stringify([...list]))
        setList([...list]);
    }
    return (<div className='download-multiple-select'>
        {list.map((item, index) => {
            return <div key={item.key}>
                {item?.value?.map(child => {
                    return <CustomSelect select_style={{ width: 120 }} key={child.id} id={child} />
                })}
                <span className='download-multiple-select-del' onClick={() => deleteItem(index)}>
                    <RsIcon type="icon-shanchu" style={{ fontSize: 14, color: '#595959' }} />
                </span>
            </div>
        })}

        <div className='download-multiple-select-add' onClick={add}>
            {/* <RsIcon type="icon-tianjia" /> */}
            <img src={addImg} style={{ width: '14px', height: '14px',marginRight: '3px' }}/>
            <span>
                {i18n.format('添加行业')}
            </span>
        </div>

    </div>)
}


export default MultiSelect;