import React from 'react';
import RsIcon from '../rsIcon';
const Logo = ({icon}) => {
    return <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: 'linear-gradient(270deg, rgb(6, 151, 255) 0%, rgb(6, 120, 255) 100%)',
        margin: 'auto',
        boxShadow: 'rgb(6 120 255 / 16%) 0px 2px 4px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}><RsIcon type={icon} style={{ fontSize: 24, color: '#fff' }} /></div>
}


export default Logo;