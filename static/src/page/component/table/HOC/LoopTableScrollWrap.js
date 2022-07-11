import React, { createRef } from 'react';
import _ from 'lodash';
import { TableWrapCommon } from './TableScrollWrap';

function LoopTableScrollWrap(WrappedComponent) {

  return class extends TableWrapCommon {
    constructor(props) {
      super(props)
      this.scrollTableWraps = [];
      this.wrappedComponentRef = createRef(null);
      this.tableComponents = [];
    }

    componentWillUnmount() {
      _.each(this.scrollTableWraps, (scrollTableWrap) => {
        scrollTableWrap.removeEventListener('scroll', this.handleScroll(scrollTableWrap))
      })
    }

    handleScroll = (element) => {
      return () => {
        const scrollLeft = element.scrollLeft;
        _.each(this.scrollTableWraps, ele => {
          ele.scrollLeft = scrollLeft;
        })
      }
    }

    addLoopScrollTableWrap = (wraps) => {
      this.scrollTableWraps.push(...wraps);
      _.each(this.scrollTableWraps, (scrollTableWrap) => {
        scrollTableWrap.removeEventListener('scroll', this.handleScroll(scrollTableWrap))
        scrollTableWrap.addEventListener('scroll', this.handleScroll(scrollTableWrap))
      })
    }

    addLoopTableComponent = (component) => {
      this.tableComponents.push(component)
    }

    handleLoopEvent = (eventName, param) => {
      console.log('fsafsafsafasfas', this.tableComponents)
      _.forEach(this.tableComponents, (component) => {
        const event = component[eventName];
        event && event(param)
      })
    }

    getQueryTableData = () => {
      return this.wrappedComponentRef.current.getQueryTableData();
    }

    render() {
      return (
        <div ref={this.loopRef} >
          <WrappedComponent
            ref={this.wrappedComponentRef}
            {...this.props}
            onAddLoopScrollTableWrap={this.addLoopScrollTableWrap}
            onAddLoopTableComponent={this.addLoopTableComponent}
            onLoopEvent={this.handleLoopEvent}
          />
        </div>
      )
    }
  }
}

export default LoopTableScrollWrap