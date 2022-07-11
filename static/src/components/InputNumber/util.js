import _ from 'lodash';

export const getInputReg = (type) => {
  if (type === 'int') {
    return [/^(\-)?\d+$/g, /^(\-)?\d*$/g]
  }

  return [/^(\-|\.)?\d+(\.|\.\d*)?$/g, /^(\-|\.)?\d*(\.|\.\d*)?$/g]
}


export const getInputValue = (format, value) => {
  if (!format) return value;
  const { type, bitNumber } = format;

  switch (type) {
    case 'int':
      const reg = /^(\-?)(\d*)$/g
      if (reg.test(value)) {
        return value
      }
      break;
    default:
      if (!_.isNil(bitNumber)) {
        const reg = new RegExp(`^(\\-?)(\\d*)(.\\d{0,${bitNumber}})?$`, 'g')
        if (reg.test(value)) {
          return value
        }
      } else {
        return value
      }
  }

}