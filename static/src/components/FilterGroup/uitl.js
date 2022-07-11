import _ from "lodash";
import { IS_MULTIPLE, SHOW_FILTER_RESULT } from './constant';

export function getFormLabelWidth(data, fontSize = 12) {
  const text = _.chain(data)
    .map((item) => [item.title.length, `${item.title}：`])
    .maxBy(item => item[0])
    .value()[1]
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = `normal ${fontSize}px sans-serif`;
  let metrics = context.measureText(text);
  return Math.ceil(metrics.width)
}

export function getScrollParent(node) {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}

export function loopGetScrollParent(node) {
  const scrollParent = getScrollParent(node);

  if (!scrollParent) {
    loopGetScrollParent(node)
  }
  return scrollParent
}


export function parseCascaderData(data, record, value) {
  let cascaderData = _.chain(data)
    .map(item => {
      if (item.children) {
        return {
          ...item,
          children: _.map(item.children, (child) => {
            return {
              ...child,
              level: item.key
            }
          })
        }
      }
      return item
    })
    .value();
  const cascaderFlattenData = _.chain(cascaderData)
    .map((item) => item.children || [])
    .flatten()
    .value()
  const levelGroup = _.groupBy(cascaderFlattenData, t => t.level);
  const parentGroup = _.groupBy(cascaderFlattenData, t => t.parentId || 'root')

  const cascaderGroup = _.reduce(cascaderData, (acc, item) => {
    acc[item.key] = item;
    return acc
  }, {})

  return {
    levelGroup,
    parentGroup,
    cascaderGroup
  }
}

export function resetCascaderValue(parseData, value) {
  const { parentGroup, cascaderGroup } = parseData;
  console.log('valuevaluevaluevalue', value)
  let preValue = null;
  const resetValue = _.chain(value)
    .toPairs()
    .map(([level, value]) => {
      if (_.isArray(value)) {
        return [level, value]
      }
      if (_.isNil(value)) {
        return [level, []]
      }
      return [level, [value]];
    })
    // .filter(([level, value]) => _.size(value))
    .reduce((acc, [level, value], idx) => {
      if (idx === 0) {
        preValue = value
        // acc[level] = value;
        acc.push([level, value])
        return acc
      }
      if (!preValue) {
        acc.push([level, preValue])
      } else {
        preValue = value;
        acc.push([level, value])
      }
      return acc
    }, [])
    .reduce((acc, [level, value], idx, arr) => {
      if (idx === 0) {
        preValue = null;
      }
      if (!preValue) {
        preValue = value;
        acc[level] = value;
        return acc
      }
      const preChildrenKeys = _.reduce(preValue, (acc, preItem) => {
        acc.push(..._.map(parentGroup[preItem], t => t.value))
        return acc
      }, [])
      const _value = _.filter(value, t => _.includes(preChildrenKeys, t));
      preValue = _value;
      acc[level] = _value
      return acc;
    }, {})
    .value()
  const parseResetValue = _.chain(resetValue)
    .toPairs()
    .reduce((acc, [level, value]) => {
      const isMultiple = _.get(cascaderGroup, `[${level}].isMultiple`, IS_MULTIPLE);
      if (isMultiple) {
        acc[level] = value
      } else {
        acc[level] = _.head(value)
      }
      return acc
    }, {})
    .value()
  return { resetValue, parseResetValue }
}

export function reestCascaderData(parseData, filterValue) {
  const { cascaderGroup, parentGroup, levelGroup } = parseData;
  // console.log('filterValuefilterValue', cascaderGroup, parentGroup, filterValue)
  let preValue = null;
  return _.chain(levelGroup)
    .keys()
    .reduce((acc, level) => {
      if (!preValue) {
        acc.push(cascaderGroup[level])
      } else if (!_.size(preValue)) {
        // acc.push(cascaderGroup[level])
        acc.push({
          ...cascaderGroup[level],
          children: []
        })
      } else {
        const children = _.chain(preValue)
          .map(key => parentGroup[key] || [])
          .flatten()
          .value();
        acc.push({
          ...cascaderGroup[level],
          children
        })
      }
      preValue = _.get(filterValue, `[${level}]`, []);
      return acc
    }, [])
    .value()
}

// export function simplifyCascaderValueFun(filterValue) {
//   const everyALL = _.chain(filterValue )
//     .values()
//     .flatten()
//     .every(item => item === "all")
//     .value()
//   if (everyALL) {
//     return 'root'
//   }

//   const lastALL = _.chain(value)
//     .values()
//     .last()
//     .value()
//   const parentKeys = _.chain(value)
//     .values()
//     .head()
//     .value()
//   if (lastALL === 'all') {
//     return parentKeys
//   }
//   return lastALL
// }



export function getFilterResultList(data, filterValue) {
  if (!_.size(data)) {
    return []
  }
  const keyGroup = _.reduce(data, (acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {})
  return _.chain(filterValue)
    .toPairs()
    .reduce((acc, [key, value]) => {
      if (_.isNil(value)) return acc;
      const current = keyGroup[key];
      if (!current) return acc
      if (current.type === 'cascader') {
        acc.push(...getFilterResulCascadertOptions(current, value))
        return acc;
      }
      if (_.get(current, 'showFilterResult', SHOW_FILTER_RESULT)) {
        const label = getFilterResultOption(current, value);
        if (label !== false) {
          acc.push({
            title: current.title,
            label: label,
            currentItem: current
          })
        }
      }
      return acc
    }, [])
    .value()
}

function getFilterResulCascadertOptions(current, value) {
  if (!current.children || !_.size(current.children)) {
    return []
  }
  const childrenValueGroup = _.reduce(current.children, (acc, item) => {
    acc[item.value] = item;
    return acc;
  }, {})
  const isMultiple = _.get(current, 'isMultiple', IS_MULTIPLE);
  const _value = isMultiple ? value : [value];
  return _.map(_value, (key) => {
    return {
      title: current.title,
      label: _.get(childrenValueGroup[key], 'label', ''),
      value: key,
      currentItem: current,
    }
  })
}

function getFilterResultOption(current, value) {
  const type = current.type;
  console.log('currentcurrentcurrent', current, value)

  switch (type) {
    case 'range':
      const addonAfter = _.isArray(current.addonAfter) ? current.addonAfter : new Array(_.size(value)).fill(current.addonAfter);
      const min = value[0];
      const minAddon = i18n.format(addonAfter[0]);
      const max = value[1];
      const maxAddon = i18n.format(addonAfter[1]);
      let _value = '';
      if (_.every(value, t => _.isNil(t) || t === '')) return false;
      if (_.isNil(max) || max === '') {
        return `>=${min}${minAddon}`
      }
      if (_.isNil(min) || min === '') {
        return `<=${max}${maxAddon}`
      }
      if (min === max) {
        return `${max}${maxAddon}`
      }
      return `${min}${minAddon}~${max}${maxAddon}`

    case 'filterButtonGroup':
      const children = current.children;
      return _.get(
        _.find(children, t => t.value === value),
        'label',
        ''
      )
    default: return null
  }
}