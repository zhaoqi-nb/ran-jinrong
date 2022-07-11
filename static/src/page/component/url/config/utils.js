import _ from 'lodash'

export const getLabel = (data, state) => {
  // console.log('name===', data)
  if(!_.get(state, 'keybind.name')) return data.stockName

  return data[_.get(state, 'keybind.name')]
}