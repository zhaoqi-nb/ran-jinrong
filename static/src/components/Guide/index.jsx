import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Guide from 'byte-guide'
import Item from './Item';
import './style.less';

import Observer from '../../plugin/Observer';

export default function GuideWrapper(props) {

  const [steps, setSteps] = useState([]);

  useEffect(() => {
    Observer.listen('guideTips', (list) => {
      setSteps((state) => {
        if (_.isEqual(state) !== list) {
          return list
        }
        return state
      })
    })
  }, [])

  return (
    <Guide
      steps={steps}
      onClose={() => { /* do sth */ }}
      afterStepChange={(nextIndex, nextStep) => {
        if (nextIndex == 6) window.location.href = "/page/brandAnalysis"
      }}
      stepText={(stepIndex, stepCount) => `${stepIndex}/${stepCount}`}
      nextText="下一个"
      prevText="上一步"
      okText='我知道了'
    />
  )
}

GuideWrapper.Item = Item;


