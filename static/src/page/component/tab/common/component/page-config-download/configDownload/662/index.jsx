import React, { useRef, useImperativeHandle, useState } from 'react';
import Panel from '../../../panel';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CustomCheckbox from '@checkbox/config';
import CustomFilterOption from '@filterOption/config';
import Filter from '@filter/config';
import RsIcon from '@/page/component/rsIcon/index';
import i18n from '@/plugin/i18n';
import MultiSelect from '../../../multi-select'


const industryList = [
    {
        key: 1,
        value: ['11402', '11403', '11404'],
    }, {
        key: 2,
        value: ['11405', '11406', '11407'],
    }, {
        key: 3,
        value: ['11408', '11409', '11410'],
    }, {
        key: 4,
        value: ['11411', '11412', '11413'],
    }, {
        key: 5,
        value: ['11414', '11415', '11416'],
    }
]

const Index = (props, ref) => {

    const { setBtnDisabled } = props;
    const filterRef = useRef();
    const valueRef = useRef();

    const onChange = (value) => {
        valueRef.current = value;
        setBtnDisabled(value.length < 1);
    }

    const getParams = () => {
        const [params, paramKey] = filterRef.current?.getFilterParams(industryList)
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
                    <CustomCheckbox id='11399' />
                </Panel.Vertical>
            </Panel>

            <Panel title='时间周期'>
                <Panel.Vertical title='周期'>
                    <Custom_Date id='11400' />
                </Panel.Vertical>
            </Panel>

            <Panel title='筛选条件'>
                <div>
                    <CustomSelect id='11401' />
                </div>
                <Panel.Vertical title='行业'>
                    <MultiSelect industryList={industryList} />
                </Panel.Vertical>
                <Panel.Vertical title='品牌类型'>
                    <CustomSelect id='11417' />
                </Panel.Vertical>
                {/* <div>
          <CustomSelect select_style={{width: 350}} id='11338' />
        </div>
        <div>
          <CustomSelect select_style={{width: 350}} id='11339' />
        </div>
        <div>
          <CustomSelect select_style={{width: 350}} id='11340' />
        </div> */}
            </Panel>
            <Panel title='指标选择'>
                <Panel.Vertical title='指标'>
                    <Filter id='11418' downloadChange={onChange} ref={filterRef} />
                </Panel.Vertical>
            </Panel>

        </div>
    );
}

export default React.forwardRef(Index);