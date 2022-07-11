import React, { forwardRef } from 'react';


const Head = forwardRef(({ colums, gridTemplateColumns }, ref) => {
  return (
    <div className='head' style={{ gridTemplateColumns }} ref={ref}>
      {
        _.map(colums, col => (
          <div key={col.dataKey} className='head-item' style={{ textAlign: col.align }}>
            {col.label}
          </div>
        ))
      }
    </div>
  )
})

export default Head
