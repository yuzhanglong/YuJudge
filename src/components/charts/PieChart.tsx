/*
 * File: PieChart.tsx
 * Description: 饼图的二次封装
 * Created: 2020-08-08 11:17:32
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Pie} from "@ant-design/charts";
import {DataItem} from "@antv/g2plot/lib/interface/config";
import {PieConfig} from "@ant-design/charts/es/pie";

interface PieChartProps {
  data: DataItem[];
  forceFit?: boolean;
  colorRender?: (e: string) => string;
  height?: number;
}

const PieChart: React.FunctionComponent<PieChartProps> = (props) => {
  const config: PieConfig = {
    forceFit: props.forceFit,
    radius: 0.8,
    data: props.data,
    angleField: 'value',
    colorField: 'type',
    color: (e: any) => props.colorRender ? props.colorRender(e) : undefined,
    label: {
      visible: false,
      type: 'inner',
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