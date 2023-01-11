import React from 'react'
import { Outlet } from 'react-router-dom'
import loginBg from '@/assets/login_bg.png'
import styles from './index.module.scss'
import home from '../../assets/home-icon.png'
import returnJt from '../../assets/return_jt.png'
import { NavLink, useNavigate } from 'react-router-dom'

const Index = (props: any) => {
  //上一页面
  const Navigate = useNavigate()
  const prevPage = () => {
    Navigate(-1)
  }

  return (
    <div className={styles['login-out']}>
      <div className={styles.left}>
        <img src={loginBg} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.icons}>
          <NavLink to="/home">
            <img src={home} alt="" />
          </NavLink>
          <img onClick={prevPage} src={returnJt} alt="" />
        </div>
        <div className={styles.route}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Index
