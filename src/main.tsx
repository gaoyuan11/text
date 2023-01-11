import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'dayjs/locale/zh-cn'
import '@/style/global.scss'
import './util/them'
import store from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
