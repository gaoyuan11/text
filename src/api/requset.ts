import axios from 'axios'

//这里是返回数据的拦截
const ins = axios.create({
  // 设置请求接口的基地址
  timeout: 5000 // 几秒后会提示报错
})

// 添加响应拦截器
ins.interceptors.response.use(
  function (resp) {
    // 对响应数据做点什么
    if (resp.data.code === 0 || resp.data.code === 200) {
      return resp.data
    } else if (resp.data.code === 15002 || resp.data.code === 15005) {
      //清空token的内容
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      return null
    } else {
      console.log(resp.data)
      return null
    }
  },
  function (error) {
    return Promise.resolve(error)
  }
)

ins.interceptors.request.use(
  (config: any) => {
    // 拿到token，添加到请求头中
    const token = sessionStorage.getItem('token') //仓库中存放的token 或者其他地方的
    // if (token) config.headers.Authorization = `Bearer ${token}`
    if (token) config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default ins //吧修改后的实例返回
