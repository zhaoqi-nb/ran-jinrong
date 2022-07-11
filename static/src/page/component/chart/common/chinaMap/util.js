import _ from 'lodash';

export const parseChartData = (data, mapJson) => {
  const codeGroup = _.reduce(mapJson.features, (acc, item) => {
    const { adcode, name } = item.properties
    acc[adcode] = name;
    return acc;
  }, {})

  const { series, zbNames } = data;
  return {
    ...data,
    series: _.map(series, (item, idx) => {
      return {
        name: zbNames[idx],
        data: _.map(item, ([code, value]) => {
          return {
            name: codeGroup[code] || '',
            value
          }
        })
      }
    })
  }
}

export const numberFormatter = (value, format, isShowUnit = true) => {
  const { format: type, divide = 1, bit_number = 0, unit } = format;
  const _value = Math.ceil((value / divide).toFixed(bit_number));

  if (type === 'prcent') {
    return `${_value}%`
  }
  if (!isShowUnit) {
    return _value
  }
  return `${_value}${unit}`
}