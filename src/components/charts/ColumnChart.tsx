/*
 * File: ColumnChart.tsx
 * Description: 柱状图的二次封装
 * Created: 2020-08-07 12:32:31
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Column} from "@ant-design/charts";
import {ColumnConfig} from "@ant-design/charts/es/column";
import {DataItem} from "@antv/g2plot/lib/interface/config";


interface ColumnChartProps {
  data: DataItem[],
  xKey: string;
  yKey: string;
  xKeyDesc: string;
  yKeyDesc: string;
  height?: number;
  forceFit?: boolean;
}

const ColumnChart: React.FunctionComponent<ColumnChartProps> = (props) => {
  const config: ColumnConfig = {
    data: props.data,
    forceFit: props.forceFit,
    height: props.height,
    xField: props.xKey,
    yField: props.yKey,
    meta: {
      [props.xKey]: {
        alias: props.xKeyDesc,
      },
      [props.yKey]: {
        alias: props.yKeyDesc,
      },
    },
    yAxis: {
      visible: true,
      title: {
        visible: false
      }
    }
  };
  return (
    <Column {...config}/>
  )
}

ColumnChart.defaultProps = {
  height: 300,
  forceFit: true
}

export default ColumnChart;