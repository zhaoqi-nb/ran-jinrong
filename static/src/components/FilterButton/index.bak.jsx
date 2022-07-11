import React, { useState, useCallback, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import './style.less';

export default function FilterButton(props) {
  return (
    <div
      className={classnames('filter-btn-wrapper', props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

function Group(props) {

  const { options, value, showAll } = props

  return <div className='filter-btn-group'>
    {
      props.isMultiple ? (
        <MultipleGroup
          options={props.options}
          activeKeys={props.value}
          showAll={props.showAll}
          onChange={props.onChange}
        />
      ) : (
        <SingleGroup
          options={props.options}
          value={props.value}
          showAll={props.showAll}
          onChange={props.onChange}
        />
      )
    }
  </div>
}

Group.defaultProps = {
  isMultiple: true
}

function SingleGroup(props) {
  const { showAll, onChange, options } = props;
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!showAll && _.isNil(props.value)) {
      setValue(_.get(_.head(options), 'value', null))
    } else {
      setValue(props.value)
    }
  }, [showAll, options, props.value])

  const handleAll = useCallback(() => {
    setValue(null)
    onChange && onChange(null)
  }, [onChange])

  const handleClick = useCallback(
    (item) => () => {
      if (item.disabled) return
      setValue(item.value)
      onChange && onChange(item.value)
    },
    [onChange],
  )

  return <>
    {
      showAll && (
        <FilterButton
          className={classnames("filter-btn-item", {
            'filter-btn-item-active': !value
          })}
          onClick={handleAll}
        >

          {i18n.format('全部')}
        </FilterButton>
      )
    }
    {
      _.map(props.options, (item) => {
        return (
          <FilterButton
            key={item.value}
            className={classnames("filter-btn-item", {
              'filter-btn-item-active': value === item.value,
              'filter-btn-item-disabled': item.disabled
            })}
            onClick={handleClick(item)}
          >
            {i18n.format(item.label)}
          </FilterButton>)
      })
    }
  </>

}

function MultipleGroup(props) {
  const { showAll, onChange, options } = props;
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    if (!showAll && !_.size(props.activeKeys)) {
      setActiveKeys(
        _.chain(options)
          .map(t => t.value)
          .slice(0, 1)
          .value()
      )
    } else {
      _.isArray(props.activeKeys) && setActiveKeys(props.activeKeys)
    }
  }, [showAll, options, props.activeKeys])

  const handleAll = useCallback(() => {
    setActiveKeys([])
    onChange && onChange([])
  }, [onChange])

  const handleClick = useCallback(
    (item) => () => {
      setActiveKeys((state) => {
        let _state = _.cloneDeep(state);
        if (!_.includes(state, item.value)) {
          _state = [...state, item.value]
        } else {
          _state = _.filter(state, t => t !== item.value)
        }
        onChange && onChange(_state)
        return _state
      })
    },
    [onChange],
  )

  return <>
    {
      showAll && (
        <FilterButton
          className={classnames("filter-btn-item", {
            'filter-btn-item-active': _.size(activeKeys) === 0
          })}
          onClick={handleAll}
        >
          {i18n.format('全部')}
        </FilterButton>
      )
    }
    {
      _.map(props.options, (item) => {
        return (
          <FilterButton
            key={item.value}
            className={classnames("filter-btn-item", {
              'filter-btn-item-active': _.includes(activeKeys, item.value)
            })}
            onClick={handleClick(item)}
          >
            {item.label}
          </FilterButton>)
      })
    }
  </>
}


FilterButton.Group = Group
