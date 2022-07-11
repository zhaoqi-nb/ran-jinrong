import _ from 'lodash';

export const getExcelData = (params) => {
  const { headerOption, headerValue, showHeader, groupOptions, filterValue } = params;
  const headerData = getHeaderData({ showHeader, headerOption, headerValue })
  const groupData = getGroupData({ groupOptions, filterValue })
  return [...headerData, ...groupData]
}

const getHeaderData = ({ showHeader, headerOption, headerValue }) => {
  if (!showHeader) return []
  const children = _.get(headerOption, 'children', []);
  const value = _.get(
    _.find(children, t => t.value === headerValue),
    'label',
    ''
  )
  const title = _.get(headerOption, 'title', undefined);
  if (!title) {
    return []
  }
  return [{ title, value: i18n.format(value) }]
}

const getGroupData = ({ groupOptions, filterValue }) => {
  return _.reduce(groupOptions, (acc, item) => {
    const type = item.type;
    const key = item.key;
    const value = filterValue[key]
    if (type === "cascader" || type === 'filterButtonGroup') {
      acc.push(getCascaderData(item, value))
    } else {
      const obj = getOtherData(item, value)
      obj && (acc.push(obj))
    }
    return acc
  }, [])
}

const getCascaderData = (current, value) => {
  const title = current.title;
  if (value === undefined) {
    return { title, value: i18n.format('全部') }
  }
  const isMultiple = _.get(current, 'isMultiple', true);
  const _value = isMultiple ? value : [value];
  return {
    title,
    value: _.chain(current.children || [])
      .filter(t => _.includes(_value, t.value))
      .map((t) => i18n.format(t.label))
      .join(',')
      .value()
  }
}

const getOtherData = (current, value) => {
  const type = current.type;
  const title = current.title;
  switch (type) {
    case 'range':
      if (!value) {
        return { title, value: i18n.format('无') }
      }
      const addonAfter = _.isArray(current.addonAfter) ? current.addonAfter : new Array(_.size(value)).fill(current.addonAfter);
      const min = value[0];
      const minAddon = i18n.format(addonAfter[0]);
      const max = value[1];
      const maxAddon = i18n.format(addonAfter[1]);
      let _value = '';
      if (_.every(value, t => t !== undefined)) {
        _value = `${min}${minAddon}~${max}${maxAddon}`
      }
      if (max === undefined) {
        _value = `>=${min}${minAddon}`
      }
      if (min === undefined) {
        _value = `<=${max}${maxAddon}`
      }
      return { title, value: _value }
    default:
      return undefined
  }
}