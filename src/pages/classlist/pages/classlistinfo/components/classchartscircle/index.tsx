import { useEffect, useRef } from 'react'

import * as echarts from 'echarts'

export const ClassEchartsCircle = () => {
  const main = useRef(null)
  useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: '学生成绩占比',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 12, name: '90 ~ 100' },
            { value: 27, name: '80 ~ 89' },
            { value: 46, name: '70 ~ 79' },
            { value: 28, name: '60 ~ 69' },
            { value: 16, name: '0 ~ 59' },
          ],
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
