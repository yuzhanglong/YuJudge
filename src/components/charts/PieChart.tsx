/*
 * File: PieChart.tsx
 * Description: 饼图的二次封装
 * Created: 2020-08-08 11:17:32
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Pie} from "@ant-design/charts";
import {PieConfig} from "@ant-design/charts/es/pie";

interface PieChartProps {
  data: any[];
  forceFit?: boolean;
  colorRender?: string | string[] | {};
  height?: number;
  colorField?: string;
  angleField?: string;
}

const PieChart: React.FunctionComponent<PieChartProps> = (props) => {
  const config: PieConfig = {
    forceFit: props.forceFit,
    pixelRatio: 1,
    data: props.data,
    angleField: props.angleField || "key",
    colorField: props.colorField || "value",
    color: props.colorRender,
    radius:1.0,
    label: {
      visible: false,
      type: 'inner',
    },
    legend: {
      visible: true,
      offsetX:10
    },
    height: props.height
  }

  return (
    <Pie {...config}></Pie>
  )
}

PieChart.defaultProps = {
  forceFit: true,
  height: 300
}

export default PieChart;