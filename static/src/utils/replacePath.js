import _ from 'lodash'

const EncodeArr = [
  "type_name",
  "summary_word",
  "type_name",
  "first_type_name",
  "second_type_name",
  "third_type_name",
  "brandName",
  "brand_name",
  "industry_name",
  "industryName"
]

export const checkAuth = (str, obj) => {
  return !_.chain(str.split('/'))
    .filter(item => _.startsWith(item, ':'))
    .map(item => {
      const key = _.replace(item, ':', '')

      return obj[key]
    })
    .filter(d => !(_.isNil(d) || d === '-'))
    .isEmpty()
    .value()
}

export default (str, obj) => {
  let newStr = _.toString(str).replace(/\{(\w+)\}/g, (match, key) => {
    return EncodeArr.indexOf(key) > -1 && obj[key] ? encodeURIComponent(obj[key]) : obj[key]
  })

  const [before, after] = newStr.split('?')// ? : search
  const link = _.chain(before.split('/'))
    .map(item => {
      if (!_.startsWith(item, ':')) return item;

      const key = _.replace(item, ':', '')

      return obj[key]
    })
    .filter(item => !_.isNil(item))
    .join('/')

    .value()

  return _.chain([link, after])
    .concat()
    .compact()
    .join('?')
    .value()
}