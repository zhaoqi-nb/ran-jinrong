'use strict';

import React from 'react';
import { getChildren } from '../util';
import './index.less';

const Layout = ({ style, children }) => {
    return <div className="rs-layout" style={{ ...styles, ...style }}>
        {getChildren(children)}
    </div>
}

const styles = {}

export default Layout;