import { useMemo } from 'react'
import _ from 'lodash'

export default function useGetFilterOptions(filterOptions) {
  return useMemo(() => {
    return _.map(filterOptions, item => {
      return {
        ...item,
        children: item.showAll
          ? [{ label: i18n.format('全部'), value: 'all' }, ...item.children]
          : item.children
      }
    })
  }, [filterOptions])
}
