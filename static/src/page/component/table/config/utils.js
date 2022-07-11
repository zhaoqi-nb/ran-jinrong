// comparkeywordConfig
import { _ } from 'core-js'
import { getComponentParam } from '../../util/template.js'

export const getComparkeywordConfig = (controlledElement, props) => {
  const basicInfo = getComponentParam(controlledElement)
  const isComponentIdEqual = (props.instantiationId === Number(_.get(basicInfo, 'comparkeywordConfig.instantiationId'))) || (props.instantiationId == '9482')
  return isComponentIdEqual
    ? { comparkeyword: _.get(basicInfo, 'comparkeywordConfig.comparkeyword') }
    : {}
}