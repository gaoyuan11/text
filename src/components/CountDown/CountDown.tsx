import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import { getCode } from '@/api/login'

const CountDown = (props: { status: any; url: any; type: any; validate: (arg0: boolean) => void; startKong: () => void }) => {
  //倒计时点击等
  const [timeText, setTimeText] = useState(5)
  const [isStartCountdown, setIsStartCountdown] = useState(false)

  //点多的提示
  const [messageApi, contextHolder] = message.useMessage()

  //获取验证码
  const sendCode = async () => {
    //状态 true就说明手机或者邮箱有值并且通过了验证 初始值为false
    if (props.status) {
      if (!isStartCountdown) {
        //倒计时还没有开始
        let res = await getCode(props.url, props.type)
        if (res.code === 200) {
          props.validate(true)
          setIsStartCountdown(true)
        } else if (res.code === 400) {
          props.validate(false)
          setIsStartCountdown(false)
        }
        messageApi.success(`已发送!`)
      } else {
        messageApi.warning(`发送中请${timeText}s后重试!`)
      }
    } else {
      //给父级让他验证那个错了
      props.startKong()
    }
  }
  //点击后的倒计时
  useEffect(() => {
    if (isStartCountdown) {
      let tick = setInterval(() => {
        setTimeText(timeText - 1)
        if (timeText <= 0) {
          setIsStartCountdown(false)
          setTimeText(5)
        }
      }, 1000)
      return () => clearInterval(tick)
    }
  }, [timeText, isStartCountdown])
  return (
    <em
      style={{
        filter: isStartCountdown ? 'grayscale(100%)' : 'grayscale(0%)',
        pointerEvents: isStartCountdown ? 'none' : 'auto'
      }}
      onClick={sendCode}
    >
      {contextHolder}
      {isStartCountdown ? `${timeText}s后重新发送` : '发送验证码'}
    </em>
  )
}

export default CountDown
