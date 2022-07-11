import classNames from 'classnames';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom'
import _ from 'lodash'
import moment from 'moment'

import './Tooltip.less'

function Tooltip(props) {
  const { params, width, col, xAxis } = props;
  const { title, values } = params;
  let dateType = _.get(xAxis, "axisLabel.date_type")
  //周度增加详细日期
  let titleWeek = dateType && dateType.indexOf("week_yyyyww") != -1
    ? `${moment(title, "YYYY-WW周").startOf('week').format("YYYY-MM-DD")} ~ ${moment(title, "YYYY-WW周").endOf('week').format("YYYY-MM-DD")}`
    : null;
  const contentStyle = useMemo(() => {
    if (!width) {
      return {
        display: 'flex',
        flexDirection: 'column',
      }
    }
    return {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: 1000
    }
  }, [width, col])

  return (
    <div className='tooltip-wrapper'>
      <div className='title'>
        {title}
      </div>
      {
        titleWeek ? <div className='title no--border'>
          {titleWeek}
        </div> : null
      }
      <div className='content' style={contentStyle}>
        {
          _.map(values, ([marker, label, value, markColor], index) => {

            return <div className='item' key={index} style={{ maxWidth: width ? `${(100 / col).toFixed(2)}%` : 'auto' }}>
              <span className={classNames('item-marker', {
                'item-custom-marker': markColor
              })} dangerouslySetInnerHTML={{ __html: marker }}></span>
              <div className='inline'>
                <span className='item-label'>{label}</span>
                <span className='item-value'>{value}</span>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default (props) => {
  const container = document.createElement('div');
  container.classList.add('tooltip-container');
  ReactDOM.render(<Tooltip {...props} />, container);
  return container;
}
