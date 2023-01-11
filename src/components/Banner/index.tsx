import React from 'react'
import { Carousel } from 'antd'

const Banner = props => {
  let arr = props.contentStyle.img.map(item => {
    return (
      <div key={item.img}>
        <img style={props.contentStyle} src={item.img} alt="" />
      </div>
    )
  })
  return <Carousel autoplay>{arr}</Carousel>
}

export default Banner
