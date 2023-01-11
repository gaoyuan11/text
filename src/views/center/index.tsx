import React from 'react'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons'
import { Layout, theme, Avatar } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import Menu from './layout/letf'
import styles from './index.module.scss'

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    return (
        <div className={styles.center}>
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0
                    }}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken)
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type)
                    }}
                >
                    <div className={styles.ava}>
                        <Avatar
                            size={120}
                            src="https://createcn01-1304145024.cos.ap-shanghai.myqcloud.com/lkzztest/avatarfile/20220802/2TUI_middle_img_v2_0664bfeb-c046-40c1-9b81-ec67bea36f4g.png"
                        />
                    </div>
                    <Menu></Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{ padding: 0, background: colorBgContainer }}
                    />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default App
