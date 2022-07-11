import React, {useRef, useImperativeHandle} from 'react';
import Panel from '../../../panel';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CustomCheckbox from '@checkbox/config';
import CustomFilterOption from '@filterOption/config';
import Filter from '@filter/config'


const Index = (props, ref) => {

  const {setBtnDisabled} = props;
  const filterRef = useRef();
  const valueRef = useRef();

  const onChange = (value) => {
    valueRef.current = value;
    setBtnDisabled(value.length<1);
  }

  const getParams = () => {
    const [params, paramKey] = filterRef.current?.getFilterParams()
    return {
      ...params,
      [paramKey]: valueRef.current
    }
  }

  useImperativeHandle(ref, () => ({
    getParams: getParams,
  }));

  return (
    <div>
      <Panel title='下载内容'>
        <Panel.Vertical title='类型'>
          <CustomCheckbox id='11335' />
        </Panel.Vertical>
      </Panel>
      

      <Panel title='时间周期'>
        <Panel.Vertical title='周期'>
          <Custom_Date id='11336' />
        </Panel.Vertical>
      </Panel>

      <Panel title='筛选条件'>
        <div>
          <CustomSelect id='11337' />
        </div>
        <div>
          <CustomSelect select_style={{width: 350}} id='11338' />
        </div>
        <div>
          <CustomSelect select_style={{width: 350}} id='11339' />
        </div>
        <div>
          <CustomSelect select_style={{width: 350}} id='11340' />
        </div>
      </Panel>
      <Panel title='指标选择'>
        <Panel.Vertical title='指标'>
          <Filter id='11341' downloadChange={onChange} ref={filterRef} />
        </Panel.Vertical>
      </Panel>

    </div>
  );
}

export default React.forwardRef(Index);