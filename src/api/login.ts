import requset from './requset'
import { system } from './URL'
//验证码
export async function getCode(url: string, type: any) {
  //   const res = await requset.get(`${system}url`)
  const res = {
    code: 200,
    msg: 'success'
  }
  return res
}

//注册
export async function register({
  loginId,
  loginPwd
}: {
  loginId: string
  loginPwd: string
}) {
  //   const res = await requset.get(`${system}url`)
  const res = {
    code: 200,
    data: {
      user: 'admin',
      uid: 1,
      loginId,
      loginPwd
    },
    token: 'qwdoasidj[aoisjdaoijsdoiasjdo',
    msg: 'success'
  }
  return res
}

//登录
export async function login({
  loginId,
  loginPwd
}: {
  loginId: string
  loginPwd: string
}) {
  //   const res = await requset.get(`${system}url`)
  const res = {
    code: 200,
    data: {
      user: loginId,
      uid: 1
    },
    token: 'qwdoasidj[aoisjdaoijsdoiasjdo',
    msg: 'success'
  }
  sessionStorage.setItem('token', res.token)
  sessionStorage.setItem('user', JSON.stringify(res.data))
  return res
}

//退出登录
export async function loginOut() {
  //   const res = await requset.get(`${system}url`)
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
}

//恢复登录
export async function whoAmi() {
  //   const res = await requset.get(`${system}url`)
  const res = {
    code: 200,
    data: {
      user: 'admin',
      uid: 1
    },
    token: 'qwdoasidj[aoisjdaoijsdoiasjdo',
    msg: 'success'
  }
  sessionStorage.setItem('token', res.token)
  sessionStorage.setItem('user', JSON.stringify(res.data))
  return res
}
