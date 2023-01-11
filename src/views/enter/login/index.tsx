import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { Input, Form, Button, message } from 'antd'
import CountDown from '@/components/CountDown/CountDown'
import { loginAsync } from '@/redux/userSliceUser'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  let content = null
  const Location = useLocation()
  const [messageApi, contextHolder] = message.useMessage()

  //取=后面的值
  let [query, setQuety] = useState('')
  useEffect(() => {
    let index = Location.search.lastIndexOf('=') //截取等号后的内容
    let query = Location.search.substring(index + 1, Location.search.length)
    setQuety(query)
  }, [Location])

  const [form] = Form.useForm()
  const [correct, setCorrect] = useState(true)
  const [status, setStatus] = useState(false)

  const [isFish, setIsFish] = useState(true)
  const onCheck = async (val: boolean) => {
    try {
      //发送请求判断是否正确 假如错了就变红
      if (val) {
        setCorrect(true)
        form.validateFields(['phoneloginId'])
      } else {
        setCorrect(false)
        form.validateFields(['phoneloginId'])
      }
      console.log('Success:')
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  //检测校验方法 子级点击发送验证码后的执行
  const handleKong = () => {
    //邮箱和手机两个都写上 反正不报错。
    form.validateFields(['phoneloginId', 'emailloginId'])
  }

  //进入redux登录-----------------------------------------------------------------------------
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values: {
    phoneloginId: string
    emailloginPwd: string
  }) => {
    let loginId = values.phoneloginId
    let loginPwd = values.emailloginPwd
    //完成提交数据并且区分何种登陆方式
    const res: any = await dispatch(loginAsync({ loginId, loginPwd }))
    messageApi.success(`${res.payload.msg}`)
    navigate(-1)

    // navigate('/home')
  }
  const onFinishFailed = (errorInfo: any) => {
    //验证不通过执行的方法
    //添加相应的类名 然后就删除
    setIsFish(false)
    setTimeout(() => {
      setIsFish(true)
    }, 500)
  }
  //------------------------------------------------------------------------------

  if (query === 'phone') {
    content = (
      <Form
        form={form}
        name="phoneLogin"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger="onChange"
        scrollToFirstError={true}
      >
        <Form.Item
          name="phoneloginId"
          className={styles.inp}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                //账号正则
                const loginIdReg = /^1[3456789]\d{9}$/
                if (loginIdReg.test(value)) {
                  setStatus(true)
                  return Promise.resolve()
                }
                setStatus(false)
                return Promise.reject(new Error('请输入正确的手机号'))
              }
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                //获取数据后 correct 等于200就是true就可以通过验证 说明手机没有注册过发送了验证码
                if (correct) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('已经注册过请直接登录'))
              }
            })
          ]}
        >
          <p className="animated bounceInRight">
            <Input
              size="large"
              placeholder="请输入手机号"
              prefix={<PhoneOutlined />}
            />
          </p>
        </Form.Item>
        <Form.Item
          name="phoneloginPwd"
          className={styles.inp2}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                //账号正则
                const yzmReg = /^[123456789]\d{5}$/
                if (yzmReg.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入正确的验证码'))
              }
            })
          ]}
        >
          <div
            className={[styles.yzminput, 'animated bounceInRight'].join(' ')}
          >
            <p className={styles.yzm}>
              <Input
                size="large"
                placeholder="请输入验证码"
                prefix={<LockOutlined />}
              />
            </p>
            {/* 倒计时 */}
            <CountDown
              status={status}
              startKong={handleKong}
              validate={onCheck}
              url="/"
              type="phone"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className={styles.enter}>
            <Button
              size="large"
              className={isFish ? '' : 'animated headShake'}
              htmlType="submit"
            >
              登 录
            </Button>
          </div>
        </Form.Item>
      </Form>
    )
  } else if (query === 'account') {
    content = (
      <Form
        name="accountLogin"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger="onChange"
        scrollToFirstError
      >
        <Form.Item
          name="accountloginId"
          className={styles.inp}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                //账号正则
                const loginIdReg = /^1[3456789]\d{9}$/
                const loginIdReg2 =
                  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if (loginIdReg.test(value) || loginIdReg2.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入正确的账号'))
              }
            })
          ]}
        >
          <p className="animated bounceInUp">
            <Input
              size="large"
              placeholder="请输入账号"
              prefix={<UserOutlined />}
            />
          </p>
        </Form.Item>
        <Form.Item
          name="accountloginPwd"
          className={styles.inp2}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                //账号正则
                if (value.length >= 6) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入正确的密码'))
              }
            })
          ]}
        >
          <div className={[styles.yzminput, 'animated bounceInUp'].join(' ')}>
            <Input.Password
              size="large"
              placeholder="请输入密码"
              prefix={<LockOutlined />}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className={styles.enter}>
            <Button
              size="large"
              className={isFish ? '' : 'animated headShake'}
              htmlType="submit"
            >
              登 录
            </Button>
          </div>
        </Form.Item>
      </Form>
    )
  } else if (query === 'email') {
    content = (
      <Form
        form={form}
        name="emailLogin"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateTrigger="onChange"
        scrollToFirstError
      >
        <Form.Item
          name="emailloginId"
          className={styles.inp}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                //账号正则
                const loginIdReg2 =
                  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if (loginIdReg2.test(value)) {
                  setStatus(true)
                  return Promise.resolve()
                }
                setStatus(false)
                return Promise.reject(new Error('请输入正确的邮箱'))
              }
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                //获取数据后 correct 等于200就是true就可以通过验证 说明手机没有注册过发送了验证码
                if (correct) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('已经注册过请直接登录'))
              }
            })
          ]}
          // rules={[
          //   {
          //     type: 'email',
          //     message: 'The input is not valid E-mail!'
          //   },
          //   {
          //     required: true,
          //     message: 'Please input your E-mail!'
          //   }
          // ]}
        >
          <p className="animated bounceInRight">
            <Input
              size="large"
              placeholder="请输入邮箱"
              prefix={<MailOutlined />}
            />
          </p>
        </Form.Item>
        <Form.Item
          name="emailloginPwd"
          className={styles.inp2}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                //账号正则
                const yzmReg = /^[123456789]\d{5}$/
                if (yzmReg.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入正确的验证码'))
              }
            })
          ]}
        >
          <div
            className={[styles.yzminput, 'animated bounceInRight'].join(' ')}
          >
            <p className={styles.yzm}>
              <Input
                size="large"
                placeholder="请输入验证码"
                prefix={<LockOutlined />}
              />
            </p>
            {/* 倒计时 */}
            <CountDown
              status={status}
              startKong={handleKong}
              validate={onCheck}
              url="/"
              type="phone"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <div className={styles.enter}>
            <Button
              size="large"
              className={isFish ? '' : 'animated headShake'}
              htmlType="submit"
            >
              登 录
            </Button>
          </div>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className={[styles.accountLogin, 'animated bounceInRight'].join(' ')}>
      <h1>登录</h1>
      <div className={styles['chang-nav']}>
        <p className={query === 'phone' ? styles.acitve : ''}>
          <NavLink to="/enter/login?type=phone">手机号登录</NavLink>
        </p>
        <p className={query === 'account' ? styles.acitve : ''}>
          <NavLink to="/enter/login?type=account">账号密码登录</NavLink>
        </p>
        <p className={query === 'email' ? styles.acitve : ''}>
          <NavLink to="/enter/login?type=email">邮箱登录</NavLink>
        </p>
      </div>
      <div className="animated bounceInRight">{content}</div>
      <div className={styles.note}>
        <p>
          还没有账号？
          <NavLink to="/enter/register?type=phone">立即注册</NavLink>
        </p>
        <p>
          <NavLink to="/enter/forget"> 忘记密码?</NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login
