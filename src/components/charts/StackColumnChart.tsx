/*
 * File: StackColumnChart.tsx
 * Description: 层叠柱状图封装
 * Created: 2020-08-07 15:02:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {StackedColumn} from "@ant-design/charts";
import {StackedColumnConfig as G2plotProps} from "@antv/g2plot/lib/plots/stacked-column";

interface StackColumnChartProps {

}

const StackColumnChart: React.FunctionComponent<StackColumnChartProps> = (props) => {
  const data = [
    {
      year: '1991',
      value: 3,
      type: 'Lon',
    },
    {
      year: '1992',
      value: 4,
      type: 'Lon',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Lon',
    },
    {
      year: '1994',
      value: 5,
      type: 'Lon',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Lon',
    },
    {
      year: '1996',
      value: 6,
      type: 'Lon',
    },
    {
      year: '1997',
      value: 7,
      type: 'Lon',
    },
    {
      year: '1998',
      value: 9,
      type: 'Lon',
    },
    {
      year: '1999',
      value: 13,
      type: 'Lon',
    },
    {
      year: '1991',
      value: 3,
      type: 'Bor',
    },
    {
      year: '1992',
      value: 4,
      type: 'Bor',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Bor',
    },
    {
      year: '1994',
      value: 5,
      type: 'Bor',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Bor',
    },
    {
      year: '1996',
      value: 6,
      type: 'Bor',
    },
    {
      year: '1997',
      value: 7,
      type: 'Bor',
    },
    {
      year: '1998',
      value: 9,
      type: 'Bor',
    },
    {
      year: '1999',
      value: 13,
      type: 'Bor',
    },
  ];
  const config: G2plotProps = {
    title: {
      visible: true,
      text: '堆叠柱状图',
    },
    forceFit: true,
    padding: 'auto',
    data: data,

    xField: 'year',
    yField: 'sales',

    yAxis: {
      min: 0,
    },
    stackField: 'type',
  }
  return (
    <StackedColumn {...config}></StackedColumn>
  )
}

export default StackColumnChart;