import React from 'react'
import { useSelector } from 'react-redux'
import { List, Popover, Avatar, Button } from 'antd'
import styles from './LoginAvater.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginOutAsync } from '@/redux/userSliceUser'

//用于显示用户头像 如果没有登录就显示登录注册按钮
const LoginAvater = (props: any) => {
  const { isLogin } = useSelector(
    (state: { user: { isLogin: boolean; userInfo: object } }) => state.user
  )

  const dataSource = [
    {
      title: '个人中心',
      path: '/center'
    },
    {
      title: '退出登录',
      path: '/home'
    }
  ]
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const toPath = (item: { title?: string; path: any }) => {
    if (item.path === '/home') {
      dispatch(loginOutAsync())
    } else {
      Navigate('/home')
    }
  }

  let loginStatus = null
  if (isLogin) {
    //已经登陆
    const content = (
      <List
        dataSource={dataSource}
        size="large"
        renderItem={item => (
          <List.Item style={{ cursor: 'pointer' }}>
            <span onClick={() => toPath(item)}>{item.title}</span>
          </List.Item>
        )}
      />
    )
    loginStatus = (
      <Popover content={content} trigger="hover" placement="bottom">
        <div className={styles.avaterContainer}>
          <Avatar src="" size="large" />
        </div>
      </Popover>
    )
  } else {
    //没有登陆
    loginStatus = (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        <NavLink
          to="/enter/login/accountLogin?type=phone"
          style={{ color: '#fff' }}
        >
          登录 / 注册
        </NavLink>
      </Button>
    )
  }

  return <div>{loginStatus}</div>
}

export default LoginAvater
