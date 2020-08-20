/*
 * File: ColumnChart.tsx
 * Description: 柱状图的二次封装
 * Created: 2020-08-07 12:32:31
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Column, StackedColumn} from "@ant-design/charts";
import {DataItem, LegendPosition} from "@antv/g2plot/lib/interface/config";
import {StackedColumnConfig} from "@ant-design/charts/es/stackedColumn";
import {ColumnConfig} from "@ant-design/charts/es/column";


interface ColumnChartProps {
  data: DataItem[],
  xKey: string;
  yKey: string;
  xKeyDesc?: string;
  yKeyDesc?: string;
  height?: number;
  forceFit?: boolean;
  isStack?: boolean;
  stackField?: string;
  legendPosition?: LegendPosition;
}

const ColumnChart: React.FunctionComponent<ColumnChartProps> = (props) => {
  const config: StackedColumnConfig & ColumnConfig = {
    stackField: props.stackField || "",
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
    },
    legend: {
      visible: true,
      position: props.legendPosition,
      flipPage: true
    },
    label: {
      visible: true,
      position: "top",
      offsetX: 0,
      offsetY: 0,
      style: {
        fill: 'rgba(0, 0, 0, 0.65)',
        stroke: '#ffffff',
        lineWidth: 2,
      },
      adjustColor: true,
      adjustPosition: true
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
        autoHide: true
      },
      title: {
        visible: props.xKeyDesc !== undefined,
        offset: 12,
      },
    }
  };

  return (
    <div>
      {props.isStack ? <StackedColumn {...config}/> : <Column {...config}/>}
    </div>
  )
}

ColumnChart.defaultProps = {
  height: 300,
  forceFit: true,
  isStack: false,
  legendPosition: 'top-center'
}

export default ColumnChart;