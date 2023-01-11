export function filterRouter(route: any) {
  let arr = [...route]
  arr = arr.filter(res => {
    if (!res.meta?.auth) {
      return res
    }
  })
  return arr
}
