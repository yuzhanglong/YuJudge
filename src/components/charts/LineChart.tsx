/*
 * File: LineChart.tsx
 * Description: 折线图的二次封装
 * Created: 2020-08-06 15:05:09
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Line} from '@ant-design/charts';
import {GuideLineConfig, ITitle} from '@antv/g2plot';
import {DEFAULT_DATE_TIME_FORMAT} from '../../config/config';
import {LineConfig as G2plotProps} from '@antv/g2plot';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  yDescription?: string;
  xDescription?: string;
  title?: string;
  isTime?: boolean;
  guideLine?: GuideLineConfig[];
  seriesField?: string;
  mask?: string;
}

const LineChart: React.FunctionComponent<LineChartProps> = (props) => {
  const config: G2plotProps = {
    data: props.data,
    forceFit: true,
    xField: props.xKey,
    yField: props.yKey,
    seriesField: props.seriesField,
    smooth: true,
    tooltip: {
      visible: true,
      shared: true,
      showCrosshairs: true,
      crosshairs: {
        type: 'y'
      },
      offset: 20,
      formatter: (key: any, value: number) => {
        return {
          name: props.yDescription || '',
          value: value
        }
      }
    },
    yAxis: {
      visible: true,
      grid: {
        visible: true,
      },
      line: {
        visible: false,
      },
      tickLine: {
        visible: false,
      },
      label: {
        visible: true,
        autoRotate: true,
        autoHide: true,
      },
      title: {
        visible: false,
        offset: 12,
        text: props.yDescription
      },
    },
    xAxis: {
      visible: true,
      grid: {
        visible: false,
      },
      line: {
        visible: true
      },
      tickLine: {
        visible: false,
      },
      label: {
        visible: true,
        autoRotate: true,
        autoHide: true,
      },
      title: {
        visible: false,
        offset: 12,
      },
      type: props.isTime ? 'time' : 'linear',
      mask: props.mask || (props.isTime ? DEFAULT_DATE_TIME_FORMAT : undefined)
    },
    guideLine: props.guideLine
  };

  const titleProps: ITitle = {
    visible: false,
    alignTo: 'left',
    text: props.title || '',
    style: {
      fontSize: 18,
      fill: 'black',
    }
  }
  return <Line {...config} height={300} width={350} title={titleProps}/>;
}

LineChart.defaultProps = {
  isTime: false,
  guideLine: []
}

export default LineChart;