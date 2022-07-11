import React, { useCallback, useState, useEffect } from 'react';
import FromItem from '../FormItem';
import FilterButton from '../FilterButton';

export default function FilterHeader(props) {
  const { option, onChange } = props;

  const [headerValue, setHeaderValue] = useState(undefined);

  useEffect(() => {
    setHeaderValue(props.headerValue)
  }, [props.headerValue])

  const handleChange = useCallback((value) => {
    setHeaderValue(value)
    onChange && onChange(value)
  }, [onChange])

  return (
    <div className='filter-header'>
      <FromItem label={i18n.format(option.title)}>
        <FilterButton.Group
          value={headerValue}
          options={option.children}
          showAll={false}
          isMultiple={false}
          onChange={handleChange}
        />
      </FromItem>
    </div>
  )
}
