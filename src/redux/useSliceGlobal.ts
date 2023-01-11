import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const changeNavStatus: any = createAsyncThunk(
  'global/changeNavStatus',
  async (data, thunkApi) => {
    thunkApi.dispatch(changeNavShow(data)) //
  }
)

export const useSliceGlobal = createSlice({
  name: 'global',
  initialState: {
    //上一个界面的路由
    isShowNav: []
  },
  reducers: {
    //登陆后用户数据
    changeNavShow: (state, { payload }) => {
      state.isShowNav = payload
    }
  }
})

export const { changeNavShow } = useSliceGlobal.actions
export default useSliceGlobal.reducer
