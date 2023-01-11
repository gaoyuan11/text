import { useRoutes, Navigate } from 'react-router-dom'
import Guard from './guard'
import { Routes } from './route'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
/**
 * @description: 全局路由拦截
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时，就返回一个该页的path路径，或返回resolve该路径的promise对象
 */
const handleRouteBefore = ({
    pathname,
    meta
}: {
    pathname: string
    meta: { auth: boolean; title: string; hidden: boolean }
}) => {
    // 动态修改页面title
    if (meta.title !== undefined) {
        document.title = meta.title
    }
    // 判断未登录跳转登录页
    if (meta.auth && !sessionStorage.getItem('token')) {
        return '/enter/login/accountLogin?type=phone' //这里可以去一个中转界面提醒去登陆 或者404 在活着其他界面
    }
}

// 路由懒加载
function lazyLoad(
    importFn: () => Promise<{ default: React.ComponentType<any> }>,
    meta: {}
) {
    meta = meta || {}
    const Element = React.lazy(importFn)
    const lazyElement = (
        <React.Suspense fallback={<div></div>}>
            <Element _meta={meta} />
        </React.Suspense>
    )
    return (
        <Guard
            element={lazyElement}
            meta={meta}
            handleRouteBefore={handleRouteBefore}
        />
    )
}

// 路由配置列表数据转换
function transformRoutes(routes: any[]) {
    const list: any = []
    routes.forEach(route => {
        const obj = { ...route }
        if (obj.redirect) {
            obj.element = <Navigate to={obj.redirect} replace={true} />
        } else if (obj.component) {
            obj.element = lazyLoad(obj.component, obj.meta)
        }

        delete obj.redirect
        delete obj.component
        delete obj.meta
        if (obj.children) {
            obj.children = transformRoutes(obj.children)
        }
        list.push(obj)
    })
    return list
}

function Router() {
    const { isLogin } = useSelector(
        (state: { user: { isLogin: boolean; userInfo: object } }) => state.user
    )

    return useRoutes(transformRoutes(Routes))
}

export default Router
