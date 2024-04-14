import { useEffect, useRef } from 'react'

import * as echarts from 'echarts'

export const ClassEchartsLine = () => {
  const main = useRef(null)
  useEffect(() => {
    const option = {
      title: {
        text: '最近5次考试成绩',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['平均成绩', '个人成绩'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        //位置布局等等
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['前5次考试', '前4次考试', '前3次考试', '前2次考试', '前1次考试'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '平均成绩',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [67, 58, 68, 62, 70],
        },
        {
          name: '个人成绩',
          type: 'line',
          stack: 'Personal',
          itemStyle: {
            color: '#8fd5e3',
          },
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [55, 63, 62, 54, 58],
        },
      ],
    }
    const myCharts = echarts.init(main.current)
    myCharts.setOption(option)
    return () => {
      myCharts.dispose()
    }
  }, [])
  return (
    <>
      <div ref={main} style={{ width: '100%', height: '400px' }}></div>
    </>
  )
}
