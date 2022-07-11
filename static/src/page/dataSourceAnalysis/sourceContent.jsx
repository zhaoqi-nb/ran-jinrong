'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RsIcon from '../component/rsIcon/index';
import './index.less';
import _ from 'lodash';
import { i18n } from '@/components/FastIntl';
import classNames from 'classnames';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            colorList: {
                "联系申请" : "linear-gradient(270deg, #0697FF 0%, #0678FF 100%)",
                "付费使用": "linear-gradient(270deg, #33C292 0%, #00B277 100%)",
                "敬请期待": "linear-gradient(270deg, #FF6C79 0%, #FF4757 100%)",
                "不能访问": "linear-gradient(270deg, #A4B6CC 0%, #90A5BF 100%)"
            }
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    renderContent = () => {
        const { contentList } = this.props;
        const { colorList } = this.state;
        
        return contentList && Array.isArray(contentList) && contentList.map((item, index) => {
            const disabled = !_.includes(['all', 'view'], _.get(item, 'accessState.code'))
            const isHidden = _.includes(['noView'], _.get(item, 'accessState.code')) ||  (!item?.accessState?.code) ? true : false
            let _className = disabled ? "content-item disabled":"content-item";


            return <a href={item.href} style={{display: isHidden ? "none" : ""}}>
                <div className={classNames(_className)} >
                    {disabled ? <span className="content-flag" style={{ background: `${colorList[item.accessState.name]} ` }}>{i18n.format(item.accessState.name)}</span> : null}
                    {disabled ? (
                        <React.Fragment>
                            <RsIcon type={`${item.resObj.icon}`} style={{ fontSize: '32px', color: '#8C8C8C' }} />
                            <div className="content-item-title" style={{ color: '#8C8C8C' }}>{i18n.format(item.resName)}</div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <RsIcon type={`${item.resObj.icon}`} style={{ fontSize: '32px', color: "#333333" }} />
                            <div className="content-item-title">{i18n.format(item.resName)}</div>
                        </React.Fragment>
                    )}
                </div>
            </a>
        })
    }

    render() {
        
        return (
            <div className="dataSource-content">
              {this.renderContent()}
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;