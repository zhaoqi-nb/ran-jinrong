import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { Dropdown, Input } from 'antd';
import RsIcon from '@/page/component/rsIcon/index';
import Button from '../Button';

import Tag from './Tag';

import './style.less';

export default forwardRef(({
  onSearch,
  searchList,
  searchListVisible,
  onChange,
  ...props
}, ref) => {

  const [visible, setVisible] = useState(false);
  const [activeItems, setActiveItems] = useState([]);

  const inputFocusRef = useRef(false);

  useImperativeHandle(ref, () => ({
    onChangeVisible: () => {
      setVisible(true)
    }
  }));

  useEffect(() => {
    if (_.isArray(props.activeItems)) {
      setActiveItems(props.activeItems)
    }
  }, [props.activeItems])

  const handleChange = useCallback((items) => {
    const keys = _.map(items, t => t.value)
    onChange && onChange(keys, items)
  }, [onChange])

  const handleFocus = useCallback(() => {
    inputFocusRef.current = true;
  }, [])

  const handleBlur = useCallback(() => {
    inputFocusRef.current = false;
  }, [])

  const onVisibleChange = useCallback((visible) => {
    setTimeout(() => {
      setVisible(inputFocusRef.current ? true : visible);
    }, 60)
  }, [inputFocusRef.current])

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      onSearch && onSearch(value)
    },
    [onSearch]
  )

  const handleJump = useCallback(
    (record) => () => {
      props.onClickToDetail && props.onClickToDetail(record)
      // '/page/appAnalyze/15133/15134/9862?compareIds=110&industryName=社交通讯&type_level=2'
      // console.log('recordrecordrecordrecord', record);
    },
    [],
  )

  const handleAdd = useCallback(
    (record) => (e) => {
      e.stopPropagation();
      setActiveItems((state) => {
        const values = _.slice([record, ...state], 0, 10);
        handleChange(values)
        return values
      });
    },
    [handleChange]
  )

  const handleDel = useCallback(
    (key) => {
      setActiveItems((state) => {
        const values = _.filter([...state], t => t.value !== key)
        handleChange(values)
        return values
      });
    },
    [handleChange]
  )

  const handleClear = useCallback(() => {
    setActiveItems([])
    handleChange([])
  }, [handleChange])

  const handleCancel = useCallback(() => {
    setVisible(false)
  }, [])

  const { onCompare } = props;

  const handleOK = useCallback(() => {
    onCompare && onCompare()
  }, [onCompare])

  const overlay = (
    <div className='comparison-overlay'>
      {/* <div className='header'>
        <Input
          className='input'
          placeholder={i18n.format('搜索更多行业或添加至少2个行业对比')}
          onChange={handleSearch}
          prefix={<RsIcon type="icon-gb-sousuo" style={{ fontSize: 16, color: '#595959' }} />}
        />
      </div> */}
      <ul className='search-list'>
        {
          searchListVisible && _.map(searchList, item => {
            const flag = _.find(activeItems, t => t.value === item.value)
            return (
              <li className='item' onClick={handleJump(item)}>
                <span className='label'>{item.label}</span>
                <span
                  className='suffix'
                  onClick={handleAdd(item)}
                  style={{ color: flag ? '#979797' : '#277EFF', pointerEvents: flag ? 'none' : 'auto' }}
                >
                  {flag ? i18n.format('已添加') : i18n.format('添加对比')}
                </span>
              </li>
            )
          })
        }
      </ul>
      <div className='tags-list'>
        {
          _.map(activeItems, t => (
            <Tag value={t.value} onDelete={handleDel}>{t.label}</Tag>
          ))
        }
      </div>
      <div className='overlay-oprator'>
        <div className='left'>
          <Button
            type="link"
            style={{ padding: 0, color: '#979797' }}
            onClick={handleClear}
            disabled={_.isEmpty(activeItems)}
          >{i18n.format('清空已选')}</Button>
        </div>
        <div className='right'>
          <Button type="link" style={{ color: '#595959' }} onClick={handleCancel}>{i18n.format('取消')}</Button>
          <Button type="primary" onClick={handleOK} disabled={_.size(activeItems) < 2}>
            {i18n.format('对比')}
            {`${_.size(activeItems)}/${10}`}
          </Button>
        </div>
      </div>
    </div>
  )


  const placeholder = visible ? i18n.format('搜索更多行业或添加至少2个行业对比') : i18n.format('搜索/对比')

  return (
    <div className='comparison-component'>
      <Dropdown
        visible={visible}
        trigger={['click']}
        overlay={overlay}
        onVisibleChange={onVisibleChange}
      >
        <Input
          className={classnames('comparison-input', {
            'comparison-input-visible': visible
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          prefix={<RsIcon type="icon-gb-sousuo" style={{ fontSize: 16, color: '#595959' }} />}
          onChange={handleSearch}
        />
      </Dropdown>
    </div>
  )
})
