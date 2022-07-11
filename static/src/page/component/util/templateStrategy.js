import _ from 'lodash';
import { getTemplateData as _getTemplateData } from './template';
import i18n from '@/plugin/i18n'

const run = (data, callback) => {
  if (_.isNil(data)) return data;
  if (i18n.getLocalLanguage() === 'zh_CN') return data;

  return callback(data)
}

const convertTitle = (title) => {
  if (title && (title.indexOf(':') != -1 || title.indexOf('：') != -1)) {
    const rTitle = title.replace(':', '').replace('：', '');
    return i18n.format(rTitle) + '：';
  } else {
    return i18n.format(title);
  }
}

/*
  根据模版ID写对应的翻译策略
*/
const templateStrategy = {
  ['1'](tempData) {
    // console.log('翻译: tempData 在这里写策略', tempData)
    // return tempData

    run(tempData.templatePropertyValueJson, (data) => {
      data.title = i18n.format(data.title)
    })

    return tempData
  },

  // 表格
  ['2'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        titleOption: _.map(data.titleOption, item => {
          if (item.type === 'fixedText') {
            i18n.batchFormat(item, ['value'])
          }
          return item
        })
      }
    })

    return tempData
  },

  ['26'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      // i18n.batchFormat(item, ['value', "text", "explain"])
      tempData.templatePropertyValueJson = {
        ...data,
        titleOption: _.map(data.titleOption, item => {
          if (item.type === 'fixedText') {
            i18n.batchFormat(item, ['value'])
          }
          return item
        })
      }
    })

    return tempData
  },

  // 更新数据日期
  ['22'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        title: i18n.format(data.title)
      }
    })

    return tempData
  },

  // filter
  ['44'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        title: i18n.format(data.title)
      }
    })

    return tempData
  },

  // checkbox
  ['45'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        plainOptions: _.map(data.plainOptions, item => {
          i18n.batchFormat(item, ['label'])
          return item
        })
      }
    })

    return tempData
  },

  // Tab 组件
  ['3'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        data: _.map(data.data, item => {
          i18n.batchFormat(item, ['title'])
          return item
        })
      }
    })

    return tempData
  },

  ['7'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        title: convertTitle(data.title),
        // ...(_.has(data, 'data')
        //   ? {
        //     data: _.map(data.data, item => {
        //       i18n.batchFormat(item, ['name'])
        //       return item
        //     })
        //   } : {}),
        ...(_.has(data, 'placeholder') ? { placeholder: i18n.format(data.placeholder) } : {})
      }
    })

    return tempData
  },

  ['9'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      tempData.templatePropertyValueJson = {
        ...data,
        title: i18n.format(data.title),
        // ...(_.has(data, 'data')
        //   ? {
        //     data: _.map(data.data, item => {
        //       i18n.batchFormat(item, ['name'])
        //       return item
        //     })
        //   } : {})
      }
    })

    return tempData
  },

  ['18'](tempData) {
    run(tempData.templatePropertyValueJson, (data) => {
      console.log('data ===', data)
      tempData.templatePropertyValueJson = {
        ...data,
        text: i18n.format(data.text),
      }
    })

    return tempData
  },
}

export const transformTemplateData = (tempData) => {
  const algorithm = _.get(tempData, 'templateId')
  if (!templateStrategy[algorithm]) return tempData;

  return templateStrategy[algorithm](tempData)
}

export const getTemplateData = _.flowRight(transformTemplateData, _getTemplateData)

