// const guideTips = [];
// window.guideTips = guideTips;
import _ from "lodash";

import Observer from './Observer';

class Guide {
  constructor() {
    // const local = localStorage.getItem('guideTips')
    this.tips = []
  }


  addItem(params) {
    const { guideStep, guideTip, children, element } = params;
    const node = element || _.get(children, '[0].ref.current');
    if (node) {
      this.addTip({
        selector: node,
        guideStep: Number(guideStep),
        guideTip,
        content: guideTip
      })
    }
  }

  addTip(item) {
    const tips = _.sortBy([...this.tips, item], (o) => {
      return o.guideStep
    })
    this.tips = tips;
    Observer.publish('guideTips', tips)
    console.log('tipstipstipstips', _.toString(tips))
    localStorage.setItem('guideTips', _.toString(tips))

  }

  getTips() {
    return this.tips
  }

  getCurrentTip(current) {
    return _.get(this.tips, `[${current}]`)
  }

  clear() {
    this.tips = []
  }

}

const guide = new Guide()

window.guide = guide;

export default guide