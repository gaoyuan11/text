import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, loginOut, login } from '../api/login'
import { delay } from '@/util/delay'

export const registerAsync: any = createAsyncThunk(
  'user/registerAsync',
  async (
    {
      loginId,
      loginPwd
    }: {
      loginId: string
      loginPwd: string
    },
    thunkApi
  ) => {
    thunkApi.dispatch(changeLoading(true))
    //发送请求
    const res = await register({ loginId, loginPwd })
    await delay(2000) //延迟函数
    if (res.data) {
      thunkApi.dispatch(initUserInfo(res.data))
      thunkApi.dispatch(changIsLogin(true))
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('user', JSON.stringify(res.data))
      thunkApi.dispatch(changeLoading(false))
      return res
    }
    thunkApi.dispatch(changeLoading(false))
    return null
  }
)

export const loginAsync: any = createAsyncThunk(
  'user/loginAsync',
  async (
    {
      loginId,
      loginPwd
    }: {
      loginId: string
      loginPwd: string
    },
    thunkApi
  ) => {
    thunkApi.dispatch(changeLoading(true))
    //发送请求
    const res = await login({ loginId, loginPwd })
    await delay(2000) //延迟函数
    if (res.data) {
      thunkApi.dispatch(initUserInfo(res.data))
      thunkApi.dispatch(changIsLogin(true))
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('user', JSON.stringify(res.data))
      thunkApi.dispatch(changeLoading(false))
      return res
    }
    thunkApi.dispatch(changeLoading(false))
    return null
  }
)

export const whoAmiAsync: any = createAsyncThunk(
  'user/whoAmiAsync',
  async (data, thunkApi) => {
    thunkApi.dispatch(changeLoading(true)) //加载中
    await delay(2000) //延迟函数
    thunkApi.dispatch(initUserInfo(data)) //redux仓库加数据
    thunkApi.dispatch(changIsLogin(true)) //登录成功
    thunkApi.dispatch(changeLoading(false)) //加载中
  }
)

export const loginOutAsync: any = createAsyncThunk(
  'user/loginOutAsync',
  async (_, thunkApi) => {
    thunkApi.dispatch(changeLoading(true)) //加载中
    await loginOut()
    await delay(1000) //延迟函数
    // thunkApi.dispatch(initUserInfo({})) //redux仓库加数据
    thunkApi.dispatch(changIsLogin(false)) //登录成功
    thunkApi.dispatch(changeLoading(false)) //加载中
  }
)

export const userSliceUser = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {},
    loading: false
  },
  reducers: {
    //登陆后用户数据
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    //是否登录
    changIsLogin: (state, { payload }) => {
      state.isLogin = payload
    },
    //开启关闭加载中状态
    changeLoading: (state, { payload }) => {
      state.loading = payload
    }
  }
})

export const { initUserInfo, changIsLogin, changeLoading } =
  userSliceUser.actions
export default userSliceUser.reducer
