'use strict';

import _ from 'lodash';
import AMapLoader from '@amap/amap-jsapi-loader';
import BaseComponent from '../baseComponent';
import PropTypes from 'prop-types';
import { numberFormatter, parseChartData } from './util';
import Tooltip from '../Tooltip';

class Index extends BaseComponent {
  renderChart = (props) => {
    const { id } = props;
    const { echarts, chartData } = this.state;
    let ele_id = document.getElementById(id);
    if (!ele_id || !chartData || !echarts) return null;

    let mapChart = echarts.getInstanceByDom(ele_id);
    if (!mapChart) mapChart = echarts.init(ele_id);

    AMapLoader.load({ //首次调用 load
      key: '73e9f6e21ecf8bbac0f517afb49e875a',//首次load key为必填
      version: '2.0',
      AMapUI: {
        version: '1.1',
      }
    }).then(() => {
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(100000, function (error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          let mapJson = {};
          mapJson.type = 'FeatureCollection';
          mapJson.features = areaNode.getSubFeatures();
          echarts.registerMap('china', mapJson);
          const chartData = parseChartData(props.data, mapJson);
          const series = chartData.series;
          const format = [{
            bit_number: null,
            divide: 10000,
            format: "long",
            unit: "万"
          }]
          const values = _.chain(series)
            .map(t => t.data)
            .flatten()
            .map(t => t.value)
            .value()
          const min = _.min(values)
          const max = _.max(values)
          const _option = {
            visualMap: [{
              type: 'continuous',
              show: true,
              showLabel: true,
              min: min,
              max: max,
              // ...getDirection(_.get(visualMap, 'position')),
              calculable: true,
              // text: text, // 文本，默认为数值文本
              // textStyle: {
              //   color: _.get(visualMap, 'fontStyle.color'),
              //   fontFamily: _.get(visualMap, 'fontStyle.family'),
              //   fontSize: _.get(visualMap, 'fontStyle.size')
              // },
              outOfRange: {
                color: '#E1E8F0'
              },
              inRange: {
                color: ['#B4D6FF', '#0454B3']
              },
              formatter: (value) => {
                return numberFormatter(value, format[0])
              }
            }],
            geo: {
              map: "china",
              // zoom: 1.1,
              // show: true,
              // // roam: true,
              // center: [109.844902, 19.0392],
              layoutCenter: ['50%', '60%'],
              layoutSize: '100%',
              itemStyle: {
                areaColor: '#E1E8F0',
                borderColor: '#ffffff'
              },
              // emphasis,
              // label
            },
            series: _.map(series, (item) => {
              return {
                name: item.name,
                type: 'map',
                geoIndex: 0,
                data: item.data
              }
            }),
            tooltip: {
              confine: true,
              padding: 0,
              borderWidth: 0,
              formatter: (params) => {
                if (!params.value) {
                  return null
                }
                const value = numberFormatter(params.value, format[0], false)
                return Tooltip({
                  params: {
                    title: params.name,
                    values: [[params.marker, params.seriesName, value]]
                  }
                })
              }
            }
          }
          console.log('_option_option_option', _option)
          //render chart
          mapChart.clear()
          mapChart.setOption(_option, true);
        });
      });
    })

    // //定制化更改数据
    // if (optionRender) {
    //   currOption = optionRender(currOption, chartData);
    // }

    // 设置标题
    // setChartTitle && setChartTitle(_.get(currOption, 'title.text'))

    // console.log('fasfasfasfasfas', JSON.stringify(currOption, null, 2));
    // console.log('fasfasfasfasfas', currOption);

    //add listener
    window.addEventListener("resize", () => {
      if (mapChart) {
        mapChart.resize();
      }
    });
  }
}

Index.propTypes = {
  optionRender: PropTypes.func
};

export default Index;