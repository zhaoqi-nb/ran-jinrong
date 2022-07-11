import React, { Component } from 'react'
import { Tooltip } from 'antd'
import { fromEvent, interval } from "rxjs";
import { concatMap, tap, startWith, filter, takeUntil, throttleTime } from "rxjs/operators";
import { FormattedMessage } from '@/components/FastIntl';
import _ from 'lodash'

import RsIcon from '@/page/component/rsIcon/index';
import './style.less'

const arrowMap = {
  left: 'icon-jiantouzuo',
  right: 'icon-jiantouyou'
}

class Test extends Component {
  static defaultProps = {
    speed: 300,
    disabled: false,
    direction: 'left'
  }

  element = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }

  componentDidMount() {
    this.registSlideAction()
  }

  componentWillUnmount() {
    if (this.longPress) {
      this.longPress.unsubscribe()
    }
  }

  registSlideAction = () => {
    const onMouseDown$ = fromEvent(this.element.current, 'mousedown')
      .pipe(
        tap(e => {
          e.stopPropagation()
        })
      )
    const onMouseUp$ = fromEvent(document, 'mouseup')
    const task$ = interval(this.props.speed)

    this.longPress = onMouseDown$.pipe(
      concatMap(() => task$.pipe(startWith(1), takeUntil(onMouseUp$))),
      throttleTime(100),
      filter(() => !this.props.disabled)
    )
      .subscribe((e) => {
        const { onLongPress } = this.props

        onLongPress && onLongPress(e)
      })
  }

  render() {
    const { disabled } = this.props;
    const klass = _.chain(['arrow-btn', !disabled ? 'arrow-btn-default' : null])
      .compact()
      .join(' ')
      .value()

    return (
      <span
        ref={this.element}
        className={klass}
        disabled={disabled}
      >
        <Tooltip title={<FormattedMessage id="点击切换时间，长按连续切换" />}>
          <RsIcon
            type={arrowMap[this.props.direction]}
            className="arrow"
          />
        </Tooltip>
        {this.props.children}
      </span>
    )
  }
}

export default Test
