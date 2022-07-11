import React, { useState, useRef } from 'react';
import RsIcon from '@/page/component/rsIcon/index';
import { Input, message } from 'antd';
import editImg from '../../../../../../img/tmp/edit.svg';
import editHoverImg from '../../../../../../img/tmp/edit-hover.svg';
import i18n from '@/plugin/i18n';

import './index.less';

const Title = ({ title, onChange, type, readonly }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);
  const [editSrc , setEditSrc]= useState(editImg);
  const [editVisible , setEditVisible] = useState(type != 'list')

  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  
  }

  const handleBlur = () => {
    if (value.length === 0) {
      message.info(i18n.format('名称不能为空!'))
      return;
    }
    setIsEdit(false);
    onChange && onChange(value);
  }

  const onMouseEnterImg = () => {
    setEditSrc(editHoverImg)
  }

  const onMouseLeaveImg = () => {
    setEditSrc(editImg)
  }

  const onInputChange = (e) => {
    // console.log('e=>', e.target.value);
    setValue(e.target.value);
  }

  const onMouseEnter = () => {
    if (type == 'list') {
      setEditVisible(true);
    }
  }

  const onMouseLeave = () => {
    if (type == 'list') {
      setEditVisible(false);
    }
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={type == 'list'? 'tab-download-title-list' : `tab-download-title`}>
      {
        !isEdit ? <div className='tab-download-title-display'>
          <span> {value}</span>
          {
            !readonly && <img style={{visibility: editVisible ? 'visible' : 'hidden'}} className={'tab-download-title-edit'} onClick={handleEdit} onMouseEnter={onMouseEnterImg} onMouseLeave={onMouseLeaveImg} src={editSrc} />
          }
         
        </div> : <div>
          <Input ref={inputRef} placeholder={i18n.format('请输入文件名称')} value={value} onBlur={handleBlur} onChange={onInputChange} />

        </div>
      }


    </div>
  );
}


export default Title;