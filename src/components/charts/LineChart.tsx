/*
 * File: LineChart.tsx
 * Description: 折线图的二次封装
 * Created: 2020-08-06 15:05:09
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Line} from "@ant-design/charts";

interface LineChartProps {

}

const LineChart: React.FunctionComponent<LineChartProps> = (props) => {
  const data = [
    {year: '1991', value: 3},
    {year: '1992', value: 4},
    {year: '1993', value: 3.5},
    {year: '1994', value: 5},
    {year: '1995', value: 4.9},
    {year: '1996', value: 6},
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
  };
  return <Line {...config} height={300} width={350}/>;
}

export default LineChart;