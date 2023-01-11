import { configureStore } from '@reduxjs/toolkit'
import userSliceUser from './userSliceUser'
import useSliceGlobal from './useSliceGlobal'

export default configureStore({
  reducer: {
    user: userSliceUser,
    route: useSliceGlobal
  }
})
