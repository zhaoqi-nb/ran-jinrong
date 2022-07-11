import React, { useCallback, useState } from 'react';

function ListItem({ colums, itemData, itemIndex, rowIndex, gridTemplateColumns }) {

  const [expand, setExpand] = useState(false)

  const onExpand = useCallback(() => {
    setExpand((state) => {
      return !state
    })
  }, [])

  return (
    <div key={`${itemIndex}-${rowIndex}`} className='list-item' >
      {itemData.subTitle && <span className='list-item-title'>{i18n.format(itemData.subTitle)}</span>}
      {
        _.map(itemData.rows, (row, idx) => (
          <div
            key={`${itemIndex}-${rowIndex}-${idx}`}
            className='list-row'
            style={{ gridTemplateColumns }}
          >
            {
              _.map(colums, ({ dataKey, render, align }) => {
                const value = row[dataKey];
                return (
                  <span
                    key={`${itemIndex}-${rowIndex}-${idx}-${dataKey}`}
                    className="col-value"
                    style={{ textAlign: align }}
                  >
                    {render ? render(value, row) : i18n.format(value)}
                  </span>
                )
              })
            }
          </div>
        ))
      }
      {itemData.bottomExtra && (
        <div className='list-item-bottom'>
          {itemData.bottomExtra()}
        </div>
      )}
      {
        itemData.bottomExpandExtra && (
          <div className='list-item-bottom-expand'>
            {itemData.bottomExpandExtra({ expand, onExpand })}
          </div>
        )
      }
      {
        expand && _.map(itemData.others, (row, idx) => (
          <div
            key={`${itemIndex}-${rowIndex}-${idx}-others`}
            className='list-row'
            style={{ gridTemplateColumns }}
          >
            {
              _.map(colums, ({ dataKey, render, align }) => {
                const value = row[dataKey]
                return (
                  <span
                    key={`${itemIndex}-${rowIndex}-${idx}-${dataKey}`}
                    className="col-value"
                    style={{ textAlign: align }}
                  >
                    {render ? render(value, row) : i18n.format(value)}
                  </span>
                )
              })
            }
          </div>
        ))
      }
    </div>
  )
}

export default function Body({ colums, dataSource, gridTemplateColumns }) {

  return (
    <div className='body'>
      {
        _.map(dataSource, (item, itemIndex) => (
          <div key={itemIndex} className='body-item'>
            <div className='item-title'>{i18n.format(item.title)}</div>
            <div className='item-list'>
              {
                _.map(item.data, (itemData, rowIndex) => (
                  <ListItem
                    key={rowIndex}
                    colums={colums}
                    itemIndex={itemIndex}
                    rowIndex={rowIndex}
                    itemData={itemData}
                    gridTemplateColumns={gridTemplateColumns}
                  />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
