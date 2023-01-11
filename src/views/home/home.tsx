import React, { useState, useEffect } from 'react'
import Banner from '@/components/Banner'
import { getBanners } from '@/api/home'
import styles from './home.module.scss'

const Home = (props: any) => {
  const [contentStyle, serContentStyle] = useState({
    height: '500px',
    textAlign: 'center',
    img: []
  })

  useEffect(() => {
    getBanners(0).then((res:any) => {
      serContentStyle({ ...contentStyle, img: res.list })
    })
  }, [])

  return (
    <div className={styles.homeContainer}>
      <div className={styles.banner}>
        <Banner contentStyle={contentStyle}></Banner>
      </div>
    </div>
  )
}

export default Home
