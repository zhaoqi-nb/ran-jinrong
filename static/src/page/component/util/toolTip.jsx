'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import RsIcon from '../rsIcon/index';
import { transformText } from '../locales/index';
import i18n from '@/plugin/i18n';
class Tool_Tip extends Component {
    constructor(props) {
        super(props);
        this.getText = this.getText.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
    }

    getText = ()=>{
        const { title } = this.props;
        if(!title) return "";
        let contentArr = title.split("&&");
        return  <div>
                    {contentArr.map(item=><p key={`qq${Math.random()}`}>{i18n.format(item)}</p>)}
                </div>;
    }

    render() {
        const { placement, style } = this.props;
        let _style = Object.assign({},{marginLeft: "5px"},style)
        return (
            <Tooltip overlayStyle={{maxWidth:550}} placement={placement} title={this.getText()}>
                <RsIcon type="icon-question-circle" style={_style}/>
            </Tooltip>
        );
    }
}

Tool_Tip.propTypes = {
    style    : PropTypes.object,
    title    : PropTypes.string,
    placement: PropTypes.string
};

export default Tool_Tip;