import requset from './requset'
import { system } from './URL'
//banner
export async function getBanners(type: number) {
  const res = await requset.get(`${system}/frontpage/getBanner`, {
    params: {
      type
    }
  })
  return res
}
