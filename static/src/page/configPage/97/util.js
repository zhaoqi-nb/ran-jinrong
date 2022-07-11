import Observer from '@/plugin/Observer';

export const getChartReady = () => {
  return new Promise((resolve) => {
    Observer.listen('图表', (params) => {
      setTimeout(() => {
        resolve(params)
      }, 300)
    })
  })
}