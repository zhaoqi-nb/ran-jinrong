export default function getSearchParams(keys, searchStr) {
  return _.chain(searchStr ? searchStr.split('?') : window.location.search.split('?'))
    .last()
    .split('&')
    .map((item) => item.split('='))
    .filter(([key]) => _.includes(keys, key))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc;
    }, {})
    .value()
}