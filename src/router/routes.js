//路由配置信息
export default [
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        //路由元信息key:只能为meta
        meta: { show: true },
        redirect: '/center/myorder',
        //二级路由组件
        children: [
            {
                path: 'myorder',
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: ()=>import('@/pages/Center/groupOrder'),
            },
        ]
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        //路由元信息key:只能为meta
        meta: { show: true }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        //路由元信息key:只能为meta
        meta: { show: true },
        beforeEnter: (to,from,next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        //路由元信息key:只能为meta
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须从购物车而来
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        //路由元信息key:只能为meta
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        name: 'addcartsuccess',
        //路由元信息key:只能为meta
        meta: { show: true }
    },
    {
        path: '/detail/:skuId?',
        component: ()=>import('@/pages/Detail'),
        //路由元信息key:只能为meta
        meta: { show: true }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        //路由元信息key:只能为meta
        meta: { show: true }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        name: 'search',
    },
    {
        path: '/',
        redirect: "home",
    }
]