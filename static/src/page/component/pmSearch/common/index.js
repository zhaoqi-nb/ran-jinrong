import React, { useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import debounce from 'lodash/debounce'
import RsIcon from '../../rsIcon'
import './index.less'

const { Option } = Select;

export default function search(props) {
    const [value, setValue] = useState()

    useEffect(() => {
        if (props.ifClear) {
            setValue()
            props.resetClear && props.resetClear()
        }
    }, [props.ifClear])

    const handleSearch = (val) => {
        setValue(val)
        props.searchCallBack && props.searchCallBack(val)
    }

    const handleClear = () => {
        setValue()
        props.resetClear && props.resetClear()
    }

    const debounceFnSearch = useCallback(debounce(handleSearch, 1000))


    const handleChange = (val) => {
        props.changeCallBack && props.changeCallBack(val)
    }

    const handleSelect = (val, record) => {
        setValue(val)
        props.selectCallBack && props.selectCallBack(val, record)
    }

    const onKeyUp = ({ keyCode }) => {
        if (keyCode === 13) {
            if (!props.options || !props.options.length) return null
            return props.options[0]
        }
    }

    const renderOptions = () => {
        if (!props.options || !props.options.length) return null
        return props.options.map(item => {
            return <Option key={item.code} value={item.code}>
                {item.displayName || item.name}
            </Option>
        })
    }

    return (
        <div className="pm-search">
            <div className="pm-search-icon">
                <RsIcon type="icon-gb-sousuo" style={{ fontSize: '16px' }} />
            </div>
            <Select
                // className='global-search'
                className='pm-search-select'
                allowClear={true}
                showSearch
                value={value}
                placeholder={props.placeholder || '请输入'}
                style={props.style}
                defaultActiveFirstOption={true}
                showArrow={false}
                filterOption={false}
                onSearch={debounceFnSearch}
                onChange={handleChange}
                onSelect={handleSelect}
                onClear={handleClear}
                notFoundContent={null}
            // onKeyUp={onKeyUp}
            >
                {renderOptions()}
            </Select>
        </div>
    )
}
