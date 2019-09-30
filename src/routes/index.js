// 私有，共有路由
import {
    Setting,
    Dashboard,
    Login,
    NotFound,
    Article,
    Notify,
    EditArticle
    } from '../views'

    
const commonRoutes=[
    {
        pathname:'/login',
        component: Login,
        icon:'login'
    },
    {
        pathname:'/404',
        component: NotFound
    },
]
const privateRoutes=[
   
    {
        pathname:'/admin/dashboard',
        component: Dashboard,
        icon:'compass',
        title:'仪表盘',
        isTop:true

    },
    {
        pathname:'/admin/article',
        component: Article,
        icon:'read',
        title:'文章管理',
        isTop:true,
        exact:true
    },
    {
        pathname:'/admin/setting',
        component: Setting,
        icon:'setting',
        title:'系统设置',
        isTop:true  //代表该菜单是否是一级菜单
    },
    {
        pathname:'/admin/notify',
        component: Notify,
        icon:'notification',
        title:'消息通知',
        isTop:false  //代表该菜单是否是一级菜单
    },
    {
        //路由动态传参
        pathname: '/admin/article/edit/:id',
        component: EditArticle,
        title: '文章编辑',
        icon: 'edit',
        isTop: false,
    }
]
export {commonRoutes ,privateRoutes}

