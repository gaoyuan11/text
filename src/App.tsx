import { Layout, Spin } from 'antd'
import NavHeader from './components/NacHearder/NacHearder'
import PageFooter from './components/PageFooter'
import Router from '@/router'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { whoAmi } from '@/api/login'
import { whoAmiAsync, loginOutAsync } from '@/redux/userSliceUser'
import React, { useEffect, useState } from 'react'

const { Header, Footer, Content } = Layout

const App: React.FC = props => {
    //进入加载中登录-----------------------------------------------------------------
    const { loading } = useSelector((store: any) => store.user)
    //------------------------------------------------------------------------------

    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const [isShow, setIsShow] = useState(true)
    const { isLogin } = useSelector(
        (state: { user: { isLogin: boolean; userInfo: object } }) => state.user
    )

    useEffect(() => {
        //判断是否已经登陆
        async function fetchData() {
            const res: any = await whoAmi()
            if (res.data) {
                //说明token有效 存起来
                dispatch(whoAmiAsync(res.data))
            } else {
                //无效 清空sessionStorage 并且清除路由中需要权限的路由部分
                dispatch(loginOutAsync()) //清空token
            }
        }
        if (sessionStorage.getItem('token')) {
            //如果仓库也没有数据在重新加载一次 不然太慢了
            if (!isLogin) {
                fetchData()
            }
            //根据路由判断不显示那些界面组件等
            if (pathname.substring(0, 6) === '/enter') {
                //从哪来还会到哪里去
                Navigate(-1)
            } else {
                //不管放行 显示顶部底部的导航
                setIsShow(true)
            }
            //个人中心隐藏导航
            if (pathname.substring(0, 7) === '/center') {
                setIsShow(false)
            } else {
                setIsShow(true)
            }
        } else {
            //咩有token 清空路由中需要权限的路由部分
            if (
                pathname.substring(0, 6) === '/enter' ||
                pathname.substring(0, 7) === '/center'
            ) {
                setIsShow(false)
            } else {
                setIsShow(true)
            }
        }
    }, [pathname])

    return (
        <Spin spinning={loading} size="large">
            <div className="App">
                <Header style={{ display: isShow ? 'block' : 'none' }}>
                    <NavHeader />
                </Header>
                {/* 匹配路由界面 */}
                <Content>
                    <Router />
                </Content>
                {/* 底部界面 */}
                <Footer style={{ display: isShow ? 'block' : 'none' }}>
                    <PageFooter />
                </Footer>
            </div>
        </Spin>
    )
}

export default App
