import React, { useState, useEffect } from 'react'
import styles from './NacHearder.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import LoginAvater from '../LoginAvater/LoginAvater'
import { Routes } from '@/router/route'
import { filterRouter } from '@/router/filterRouter'
import { useSelector } from 'react-redux'

const NacHearder = () => {
  let [route, setRoute] = useState([])
  const { isLogin } = useSelector(
    (state: { user: { isLogin: boolean; userInfo: object } }) => state.user
  )

  //其实这里还需要判断一下界面是否需要权限才能进入但是这里直接吧需要的和不需要的用字段auth分开然后过滤了 就不用在意其他
  useEffect(() => {
    if (!isLogin) {
      let arr: any = filterRouter(Routes)
      setRoute(arr)
    } else {
      setRoute(Routes)
    }
  }, [isLogin])

  let List = route.map((item: any, index: number) => {
    // if (!item.meta?.auth && item.meta?.title && !item.meta?.hidden) {
    if (!item.meta?.hidden) {
      return (
        <NavLink to={item.path} key={index}>
          {item.meta?.title}
          {/* <p>{item.meta?.etitle}</p> */}
        </NavLink>
      )
    }
    // }
    //  else {
    //   return null
    // }
  })

  const navigate = useNavigate() //将useHistory()钩子赋值给history方便使用
  const toHome = () => {
    navigate('/') //点击按钮后
  }

  return (
    <div className={[styles['nav-container'], 'main'].join(' ')}>
      <div className={styles.logo}>
        <img src={logo} alt="" onClick={toHome} />
      </div>
      <div className={styles.nav}>
        {List}
        <span className={styles.actives}>
          <img src="" alt="" title="" />
        </span>
      </div>
      <div className={styles['tops-right']}>
        <LoginAvater />
      </div>
    </div>
  )
}

export default NacHearder
