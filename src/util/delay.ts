//小数变百分数的辅助方法
export function delay(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}
