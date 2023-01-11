import React, { useState } from 'react'
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
// import { Routes } from '@/router/route'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

//返回一个对象
function getItem(
    label: React.ReactNode, //名字
    key: React.Key, // 路径
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}

//数组
const route = [
    {
        path: '/center/banseInfo',
        component: () => import('@/views/center/page/banseInfo/banseInfo'),
        meta: { auth: true, hidden: false, title: '基本信息' }
    },
    {
        path: '/center/accountInfo',
        component: () => import('@/views/center/page/accountInfo/accountInfo'),
        meta: { auth: true, hidden: false, title: '账户信息' }
    },
    {
        path: '/center/reconciliation',
        component: () =>
            import('@/views/center/page/reconciliation/reconciliation'),
        meta: { auth: true, hidden: false, title: '对账结算' }
    },
    {
        path: '/center/feedback',
        component: () => import('@/views/center/page/feedback/feedback'),
        meta: { auth: true, hidden: false, title: '反馈信息' }
    },
    {
        path: '/center/authentication',
        component: () =>
            import('@/views/center/page/authentication/authentication'),
        meta: { auth: true, hidden: false, title: '认证信息' }
    },
    {
        path: '/center/messageReply',
        component: () =>
            import('@/views/center/page/messageReply/messageReply'),
        meta: { auth: true, hidden: false, title: '信息反馈' }
    }
]

const items: any = []
route.forEach((element: any) => {
    items.push(getItem(element.meta.title, element.path, <MailOutlined />))
})

const handleMenu = evt => {}

const App: React.FC = () => {
    const Navigate = useNavigate()
    const toPath = ({ item, key, keyPath, domEvent }) => {
        Navigate(key)
        console.log(item, key, keyPath, domEvent, 123)
    }

    return (
        <Menu
            defaultSelectedKeys={keyPath}
            defaultOpenKeys={keyPath}
            mode="inline"
            onClick={handleMenu}
            inlineCollapsed={collapsed}
            items={menuTree}
        />
    )
}

export default App
