import React from 'react';
import i18n from '../../plugin/i18n';

// i18n.addLocaleData({
//   cn: {
//     hellow: '哈喽!{name}'
//   },
//   en: {
//     hellow: (data) => `hellow!${data.name}`
//   }
// })

// i18n.useLocale('en')

export default ({id, ...outer}) => {

  return <>{i18n.formattedMessage(id, outer)}</>
}