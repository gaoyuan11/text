// import { useLocation, useNavigate } from 'react-router-dom'
// import { whoAmi } from '@/api/login'
// import { useDispatch, useSelector } from 'react-redux'
// import { whoAmiAsync, loginOutAsync } from '@/redux/userSliceUser'
// import React, { useEffect, useState } from 'react'
// import { filterRouter } from '@/router/filterRouter'

// const Route = () => {
//   const { pathname } = useLocation()
//   const dispatch = useDispatch()
//   const Navigate = useNavigate()
//   const [isShow, setIsShow] = useState(true)
//   const [route, setRoute] = useState([
//     {
//       path: '/',
//       redirect: '/home'
//     },
//     {
//       path: '/home',
//       component: () => import('@/views/home/home'),
//       meta: { auth: false, hidden: false, title: '首页' }
//     },
//     {
//       path: '/enter',
//       redirect: '/enter/login/accountLogin',
//       component: () => import('@/views/enter/index'),
//       meta: { auth: false, hidden: true, title: '登录注册' },
//       children: [
//         {
//           path: '/enter/login/accountLogin',
//           component: () => import('@/views/enter/login/index')
//         },
//         {
//           path: '/enter/login/phoneLogin',
//           component: () => import('@/views/enter/register/index')
//         },
//         {
//           path: '/enter/login/emailLogin',
//           component: () => import('@/views/enter/forget/index')
//         }
//       ]
//     },
//     {
//       path: '/center',
//       component: () => import('@/views/center/index'),
//       redirect: '/center/list1',
//       meta: { auth: true, hidden: false, title: '个人中心' },
//       children: [
//         {
//           path: '/center/list1',
//           component: () => import('@/views/center/page/list1/list1')
//         }
//         //   {
//         //     path: '/enter/login/phoneLogin',
//         //     component: EnterRegister
//         //   },
//         //   {
//         //     path: '/enter/login/emailLogin',
//         //     component: EnterForget
//         //   }
//       ]
//     },
//     {
//       path: '/needList',
//       component: () => import('@/views/needList/needList'),
//       meta: { auth: true, hidden: false, title: '需求列表' }
//     },
//     {
//       path: '/auction',
//       component: () => import('@/views/auction/auction'),
//       meta: { auth: true, hidden: false, title: '我的竞价' }
//     },
//     {
//       path: '*',
//       component: () => import('@/views/404'),
//       meta: {
//         meta: { auth: false, hidden: true, title: '404' }
//       }
//     }
//   ])

//   useEffect(() => {
//     //判断是否已经登陆
//     async function fetchData() {
//       const res: any = await whoAmi()
//       if (res.data) {
//         //说明token有效 存起来
//         dispatch(whoAmiAsync(res.data))
//       } else {
//         //无效 清空sessionStorage 并且清除路由中需要权限的路由部分
//         dispatch(loginOutAsync()) //清空token
//         let arr = filterRouter(route)
//         setRoute(arr)
//       }
//     }
//     if (sessionStorage.getItem('token')) {
//       fetchData()
//       //根据路由判断不显示那些界面组件等
//       if (pathname.substring(0, 6) === '/enter') {
//         //从哪来还会到哪里去
//         Navigate(-1)
//       } else {
//         //不管放行 显示顶部底部的导航
//         setIsShow(true)
//       }
//     } else {
//       //咩有token 清空路由中需要权限的路由部分
//       let arr = filterRouter(route)
//       setRoute(arr)
//       if (pathname.substring(0, 6) === '/enter') {
//         setIsShow(false)
//       } else {
//         setIsShow(true)
//       }
//     }
//   }, [pathname])

//   return route
// }

// export default Route

export const Routes: any = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/home'),
        meta: { auth: false, hidden: false, title: '首页' }
    },
    {
        path: '/quote',
        component: () => import('@/views/quote/quote'),
        meta: { auth: true, hidden: false, title: '报价' }
    },
    {
        path: '/grabbing',
        component: () => import('@/views/grabbing/grabbing'),
        meta: { auth: true, hidden: false, title: '抢单' }
    },
    {
        path: '/myOrder',
        component: () => import('@/views/myOrder/myOrder'),
        meta: { auth: true, hidden: false, title: '我的订单' }
    },
    {
        path: '/myRecord',
        component: () => import('@/views/myRecord/myRecord'),
        meta: { auth: true, hidden: false, title: '我的记录' }
    },
    {
        path: '/center',
        component: () => import('@/views/center/index'),
        meta: { auth: true, hidden: false, title: '个人中心' },
        children: [
            {
                path: '',
                redirect: '/center/banseInfo'
            },
            {
                path: '/center/banseInfo',
                component: () =>
                    import('@/views/center/page/banseInfo/banseInfo'),
                meta: { auth: true, hidden: false, title: '基本信息' }
            },
            {
                path: '/center/accountInfo',
                component: () =>
                    import('@/views/center/page/accountInfo/accountInfo'),
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
                component: () =>
                    import('@/views/center/page/feedback/feedback'),
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
    },
    {
        path: '/enter',
        component: () => import('@/views/enter/index'),
        meta: { auth: false, hidden: true, title: '登录注册' },
        children: [
            {
                path: '',
                redirect: '/enter/login/accountLogin?type=phone'
            },
            {
                path: '/enter/login/accountLogin',
                component: () => import('@/views/enter/login/index')
            },
            {
                path: '/enter/login/phoneLogin',
                component: () => import('@/views/enter/register/index')
            },
            {
                path: '/enter/login/emailLogin',
                component: () => import('@/views/enter/forget/index')
            }
        ]
    },
    {
        path: '*',
        component: () => import('@/views/404'),
        meta: {
            meta: { auth: false, hidden: true, title: '404' }
        }
    }
]
