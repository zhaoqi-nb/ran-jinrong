import React, { Component, createRef } from 'react';
import _ from 'lodash';


function TableScrollWrap(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.ref = createRef(null);
      this.scrollWraps = [];
    }

    componentDidMount() {
      this.getScrollTableWraps();
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

    getScrollTableWraps = () => {
      const element = this.ref.current;
      const wraps = element.getElementsByClassName('ant-table-content');
      if (!_.size(wraps)) {
        setTimeout(() => {
          this.getScrollTableWraps()
        }, 1000)
        return
      }
      this.scrollTableWraps = wraps;
      _.each(this.scrollTableWraps, (scrollTableWrap) => {
        scrollTableWrap.addEventListener('scroll', this.handleScroll(scrollTableWrap))
      })
    }

    handleWrapScrollTo = (position) => {
      _.each(this.scrollTableWraps, (scrollTableWrap) => {
        if (position === 'toAfter') {
          scrollTableWrap.scrollLeft = 0;
          return
        }
        const scrollWidth = scrollTableWrap.scrollWidth;
        const clientWidth = scrollTableWrap.clientWidth;
        scrollTableWrap.scrollLeft = scrollWidth - clientWidth;
      })
    }
    render() {
      return (
        <div ref={this.ref} >
          <WrappedComponent {...this.props} onWrapScrollTo={this.handleWrapScrollTo} />
        </div>
      )
    }
  }
}

export default TableScrollWrap