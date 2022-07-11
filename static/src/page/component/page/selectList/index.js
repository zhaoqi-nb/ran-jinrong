import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dropdown, Input } from 'antd';
import RsIcon from '../../../component/rsIcon/index';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Button from '@/components/Button';
import classNames from 'classnames';
import i18n from '@/plugin/i18n';
import Observer from '@/plugin/Observer';
import Badge from '../../../../components/Badge';
import './index.less';

// this.setSurplusData = debounce(this.setSurplusData, 800);

function getSelectOption(companyList, inputValue, searchType) {
    console.log('=====>', companyList, inputValue, searchType)
    let selectOption = [];
    for (let i = 0, len = companyList.length; i < len; i++) {
        let obj = companyList[i];
        let resName = obj.globalPageDisplayName;

        if (resName.toLowerCase().indexOf(inputValue.toLowerCase()) != -1) {
            selectOption.push(obj);
            continue;
        }
        // if (searchType === 'stock_code' && obj.resAttrJSON && obj.resAttrJSON.stock_code) { // 公司可以搜索股票代码
        //     if (obj.resAttrJSON.stock_code.toLowerCase().indexOf(inputValue.toLowerCase()) != -1) {
        //         selectOption.push(obj)
        //     }
        // }
    }
    return selectOption;
}

const SelectList = ({ type, title, selectData, list, searchPlaceholder, searchType }) => {
    const [selectOption, setSelectOption] = useState(list || []);
    const [inputValue, setInputValue] = useState(undefined);
    const [select, setSelect] = useState();
    const selectIndex = useRef(0);
    const selectOptionRef = useRef(selectOption);
    const inputRef = useRef();
    const ulRef = useRef();
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        console.log('list=>', list);
        setSelectOption(list);
        selectOptionRef.current = list;
    }, [list])


    const debounceSelectOptions = useCallback(debounce((list, inputValue, setSelectOption) => {
        const selectOptions = getSelectOption(list, inputValue, searchType)
        setSelectOption(selectOptions);
        selectOptionRef.current = selectOptions;
        if (selectOptions.length > 0) {
            setSelect(selectOptions[0]);
            selectIndex.current = 0;
        }
    }, 800), [])

    const onSearchChange = (e) => {
        let inputValue = e.target ? e.target.value : "";
        setInputValue(inputValue);
        debounceSelectOptions(list, inputValue, setSelectOption);
    }

    const down = (direction) => {
        if (direction === 'up') {
            if (selectIndex.current === 0) {
                return;
            }
            selectIndex.current--;

        } else if (direction === 'down') {
            if (selectIndex.current === selectOptionRef.current.length - 1) {
                return;
            }
            selectIndex.current++;
        }
        // console.log('selectOption=>', selectOptionRef.current, selectIndex.current);

        const currHeight = (selectIndex.current + 1) * 32;
        const contentHeight = ulRef.current.clientHeight;
        if (currHeight > contentHeight) {
            ulRef.current.scrollTop = currHeight - contentHeight;
        } else {
            ulRef.current.scrollTop = 0;
        }

        const currSelect = selectOptionRef.current[selectIndex.current];
        if (currSelect) {
            setSelect(currSelect);
        }
    }

    const keydownEvent = useCallback((e) => {
        if (e.keyCode === 13) { //回车事件
            const currSelect = selectOptionRef.current[selectIndex.current];
            if (currSelect.disabled) {
                return;
            }
            window.open(currSelect.href)
        }

        if (e.keyCode === 40) { //下方向事件
            down('down')
            e.preventDefault();
        }

        if (e.keyCode === 38) { //上方向事件
            down('up');
            e.preventDefault();
        }
        e.stopPropagation();
    }, [])

    const onVisibleChange = (visible) => {
        setVisible(visible)
        if (visible) {
            // debugger;
            setTimeout(() => {
                inputRef && inputRef.current.focus();
                if (selectOption.length > 0) {
                    setSelect(selectOption[0]);
                    selectIndex.current = 0;
                }
                document.addEventListener('keydown', keydownEvent)
            }, 0);
        } else {
            document.removeEventListener('keydown', keydownEvent)
        }
    }

    useEffect(() => {
        Observer.loopPublish('切换公司', { onVisibleChange })
    }, [])

    const searchOverlay = <div className='uiSearchModal'>
        <p className='inputbox'>
            <Input
                // disabled
                ref={inputRef}
                value={inputValue}
                prefix={<RsIcon type="icon-gb-sousuo" style={{ color: "#999", fontSize: 16 }} />}
                placeholder={searchPlaceholder}
                onChange={onSearchChange}
                onClick={(e) => e.stopPropagation()}
            />
        </p>
        <ul ref={ulRef}>
            {
                selectOption.map((item, index) => item && <a onClick={() => {
                    if (item.disabled) return;
                    location.href = item.href
                }} key={item.resId}>
                    <li style={{ color: item.disabled ? 'rgba(0, 0, 0, 0.25)' : '#262626', cursor: `${item.disabled ? 'not-allowed' : 'pointer'}` }} className={
                        classNames({
                            active: item.resId === selectData.resId,
                            'active-hover': item.resId === select?.resId,
                        })
                    }>
                        <span style={{ flex: 1 }}>{i18n.format(item.resName)} {item.stock_code && `(${i18n.format(item.stock_code)})`}</span>
                        {item.disabled && <Badge style={{}} name={item?.accessState?.name} />}
                    </li>
                </a>)
            }
        </ul>
    </div>

    const hrefArr = window.location.href.split('?')[0].split('/')
    const show = type === 'company' || type === 'industry' || type === 'appAnalyze' && hrefArr[hrefArr.length - 1] == '9800' || type === 'dataSource';
    const content = <p style={{ marginTop: 0 }}>
        <Button
            className={`select-btn ${!show ? 'select-btn-none' : ''}`}
            style={{ width: '144px', background: 'transparent' }}
        >
            <RsIcon type="icon-qiehuan" style={{ fontSize: '14px', marginRight: '2px' }} />{title}
        </Button>
    </p>
    if (!show) {
        return content
    }

    return (
        <Dropdown trigger={['click']} visible={visible} onVisibleChange={onVisibleChange} overlay={searchOverlay}>
            {content}
        </Dropdown>
    );
}

SelectList.defaultProps = {
    /**
     * 标题
     */
    title: '切换',
    /**
     * 查询的placeholder
     */
    searchPlaceholder: '请搜索',
    /**
     * 列表数据
     */
    list: [],
    /**
     * 当前公司的数据
     */
    selectData: {},

    /**
     * 搜索类型
     * searchType
     * stock_code 股票代码
     */
    searchType: null,

}

export default SelectList;