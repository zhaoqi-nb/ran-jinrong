import React, { useCallback, useState } from 'react'
import RsIcon from '../component/rsIcon/index';
import i18n from '@/plugin/i18n'
import { FormattedMessage } from '@/components/FastIntl';

export default function Header() {

  const [language, setLanguage] = useState(i18n.getLocalLanguage());

  const handleChangeLanguage = useCallback(() => {
    setLanguage((state) => {
      if (state === 'en_US') {
        i18n.switchLanguage('')
        return ''
      }
      i18n.switchLanguage('en_US')
      return en_US
    })
  }, [])

  return (
    <div className='header'>
      <div className='left'>
        <div className='logo'>
          <a href="https://www.databurning.com/" className="logo-link"></a>
          <img src={require("../image/logo.png")} />
        </div>
      </div>
      <div className='right'>
        <div className='trial'>
          <FormattedMessage id="申请产品试用" />
        </div>
        <div className='language' onClick={handleChangeLanguage}>
          {
            language === 'en_US' ? (
              <>
                <RsIcon type="icon-zhongwen" style={{ fontSize: 20 }} />
                <FormattedMessage id="中文" />
              </>
            ) : (
              <>
                <RsIcon type="icon-fanyi" style={{ fontSize: 20 }} />
                English
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
