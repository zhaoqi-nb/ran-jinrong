'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import i18n from '@/plugin/i18n'
import './index.less'
import RsIcon from '@/page/component/rsIcon';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            style: {
                width: 256,
                backgroundColor: '##595959',
                borderRadius: 4,
                padding: '0 12px 12px 12px'
            }
        }
    }

    setTitle = (title, noExplain) => {
        if (title instanceof Object) {
            if (title.length) {
                let arr = title
                return <>
                    {!noExplain && <div className="tooltip-title">{i18n.format('说明：')}</div>}
                    {/* <div>{title.split('&&').map(item => <div className="tooltip-item">{i18n.format(item)}</div>)} </div> */}
                    <div style={{ paddingTop: noExplain ? "12px" : "" }}>
                        {
                            arr.map(itemTitle => {
                                let { text, icon } = itemTitle
                                let { type, style, textSpan } = icon
                                return text.split('&&').map((item, index) => {
                                    if (index === 0) {
                                        return <div className="tooltip-item" style={{ display: "flex", padding: "0" }}>
                                            {!textSpan ?
                                                <div><p className="iconSyle"><RsIcon type={type} style={{ verticalAlign: "bottom", ...style }} /></p></div>
                                                : <span style={style}>{textSpan}</span>}

                                            <p style={{ lineHeight: "18px", padding: "0", marginBottom: "0" }}>{i18n.format(item)}</p>
                                        </div>
                                    } else {
                                        return <div className="tooltip-item">{i18n.format(item)}</div>
                                    }
                                })
                            })
                        }

                    </div>
                </>
            } else {
                let { text, icon } = title
                let { type, style } = icon
                return <>
                    {!noExplain && <div className="tooltip-title">{i18n.format('说明：')}</div>}
                    {/* <div>{title.split('&&').map(item => <div className="tooltip-item">{i18n.format(item)}</div>)} </div> */}
                    <div style={{ paddingTop: noExplain ? "12px" : "" }}>
                        {text.split('&&').map((item, index) => {
                            if (index === 0) {
                                return <div className="tooltip-item"><RsIcon type={type} style={{ verticalAlign: "bottom", ...style }} />{i18n.format(item)}</div>
                            } else {
                                return <div className="tooltip-item">{i18n.format(item)}</div>
                            }
                        })}
                    </div>
                </>
            }

        } else {
            return <>
                {!noExplain && <div className="tooltip-title">{i18n.format('说明：')}</div>}
                <div style={{ paddingTop: noExplain ? "12px" : "" }}>
                    {title.split('&&').map(item => <div className="tooltip-item">{i18n.format(item)}</div>)} </div>
            </>
        }
    }

    render() {
        const { style } = this.state
        const { children, title, placement, overlayStyle, overlayInnerStyle, noExplain } = this.props;
        // const childrenWithProps = React.Children.map(children, child => child?React.cloneElement(child):null);
        let titleArr = this.setTitle(title, noExplain)
        return (
            <Tooltip title={titleArr} className="tooltipBox" placement={placement || 'top'} overlayStyle={overlayStyle} overlayInnerStyle={{ ...style, ...overlayInnerStyle }}>
                {children}
            </Tooltip>

        );
    }
}


Index.propTypes = {
    title: PropTypes.string,
    placement: PropTypes.string,
};

Index.defaultProps = {
}

export default Index;