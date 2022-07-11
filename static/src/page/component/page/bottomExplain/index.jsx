
'use strict';
import React, { Component, Fragment } from 'react';
import { getDisClaimers } from './config'
import './index.less'
import i18n from '@/plugin/i18n';

class Index extends Component {

    constructor(props) {
        super(props);
    }

    renderBottomDisclaimers = () => {
        const data = getDisClaimers()
        return data.map((item, index) => {
            return <Fragment>
                {
                    !item.href
                        ? <span className="text">{i18n.format(item.text)}</span>
                        : <a href={item.href} style={{ color: '#595959' }} target="_blank" className="text">{i18n.format(item.text)}</a>
                }

                {
                    (index != data.length - 1) && <span className="divider"></span>
                }
            </Fragment>
        })
    }

    render() {
        return (
            <div className="bottom-box">
                {this.renderBottomDisclaimers()}
            </div>
        );
    }
}

export default Index;