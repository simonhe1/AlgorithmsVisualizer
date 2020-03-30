import React, { useState } from 'react';
const Rectangle = props => {
    const {height,width} = props;
    const rectStyling = {
        width: `${width}px`,
        display: 'inline-block',
        margin: '0 1px',
        height: `${height}px`,
        backgroundColor: 'pink',
    }
    
    return (
        <div className="rectangle" style={rectStyling}>
        </div>
    );
}
export default Rectangle;