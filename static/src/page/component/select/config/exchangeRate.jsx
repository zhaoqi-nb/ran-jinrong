import React, { Component } from 'react';
import Common from '../common'
import RsIcon from '@rsIcon'
import './index.less'

const iconStyle = { fontSize: 16, color: "#262626" }

class ExchangeRate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.suffixIconRender = this.suffixIconRender.bind(this)
    }

    initSelectValue(value, options) {
        const currentExchangeRate = window.localStorage.currentExchangeRate
        let _value = value
        const index = options.findIndex(item => item.code === currentExchangeRate)
        if (index > -1 && currentExchangeRate && currentExchangeRate !== _value) {
            _value = currentExchangeRate
        }
        window.localStorage.setItem('currentExchangeRate', _value)
        return _value
    }

    setSelectValue(value, options) {
        const currentExchangeRate = window.localStorage.currentExchangeRate
        let _value = value
        if (currentExchangeRate !== _value) {
            window.localStorage.setItem('currentExchangeRate', _value)
        }
        return _value
    }

    suffixIconRender(openState) {
        let _iconStyle = {}
        if (openState) {
            _iconStyle = {
                ...iconStyle,
                color: "#0678FF"
            }
        } else {
            _iconStyle = iconStyle
        }
        return <RsIcon type="icon-huishuai" style={_iconStyle} />
    }

    render() {
        const icon = <RsIcon type="icon-qiehuan" style={iconStyle} />
        const { param, getSelectValue } = this.props
        // showArrow={false}
        return <Common
            {...param}
            className="exchange-rate-select"
            suffixIcon={icon}
            suffixIconRender={this.suffixIconRender}
            showSearch={false}
            getSelectValue={getSelectValue}
            setSelectValue={this.setSelectValue}
            initSelectValue={this.initSelectValue}
        />
    }
}

export default ExchangeRate;