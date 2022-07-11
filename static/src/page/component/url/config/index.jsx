
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { of, Subscription } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import _ from 'lodash'
import Component from '../../util/component';
import { getComponentParam } from '../../util/template';
import Api from './store/api';
import replacePath from '@/utils/replacePath';
import { getLabel } from './utils'
import {FormattedMessage} from '@/components/FastIntl'
import './style.less'

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.clearImpact = new Subscription()
    }

    componentWillUnmount() {
        this.clearImpact.unsubscribe()
    }

    exportLoadDataFun = () => {
        this.queryWidgetConfig(this.props.id)
    }

    queryWidgetConfig(id) {
        this.clearImpact.add(
            of(this.getTemplateData(id))
                .pipe(map(({ instantiationId, templatePropertyValueJson }) => {
                    return { instantiationId, ...templatePropertyValueJson }
                }))
                .subscribe({
                    next: (state) => {
                        this.setState(state, () => {
                            this.getWidgetData()
                        })
                    },
                    error: err => {
                        console.error('dddddddd', err)
                    }
                })
        )
    }

    getWidgetData = async () => {
        let { instantiationId, controlledElement } = this.state;
        if (!instantiationId) return;
        //get 请求参数
        const params = getComponentParam(controlledElement);

        this.clearImpact.add(
            of(params)
                .pipe(
                    filter((params) => params),
                    switchMap((params) => {
                        return Api.getTemplateData({
                            instantiationId,
                            params: params == -1
                                ? {}
                                : JSON.stringify(params)
                        })
                    })
                )
                .subscribe(res => {
                    this.setState({ ...res, _params: params })
                })
        )
    }

    // console.log('dddddddd', this.state)

    render() {
        // console.log('name===', this.state)//stockName
        const { title } = this.state
        return (
            <div className="box">
                <span className="widget-label">{title && <><FormattedMessage id={title} /><span>:</span></>}</span>
                {
                    _.map(this.state.list, (item, idx) => {
                        return <a
                            key={idx}
                            className="widget-link"
                            href={replacePath(this.state.path, { ...(this.state._params || {}), ...item })}
                        >{getLabel(item, this.state)}</a>
                    })
                }
            </div>
        );
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

Index.defaultProps = {
    // id: `title_${gethashcode()}`
}

export default Index;