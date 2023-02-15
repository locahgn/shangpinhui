//引入vue
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter);

let oringinPush = VueRouter.prototype.push;
let oringinReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype上的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        oringinPush.call(this, location, resolve, reject)
    } else {
        oringinPush.call(this, location, () => { }, () => { })
    }
}
//重写VueRouter.prototype上的replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        oringinReplace.call(this, location, resolve, reject)
    } else {
        oringinReplace.call(this, location, () => { }, () => { })
    }
}
//对外暴露vueRouter类的实例
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //y=0代表滚动条在最上方
        return { y: 0 }
    }
})

//全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
    //用户登录了才有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    //用户已经登陆了
    if (token) {
        //用户登陆了，想要跳转到login
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            //登陆了，想要跳转到其他页面
            //如果用户名已有
            if (name) {
                next();
            } else {
                //没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next();
                } catch (error) {
                    //token失效了获取不到用户信息，重新登陆
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login');
                }
            }
        }
    } else {
        //未登录：不能去交易、支付、个人中心等页面
        let toPath = to.path
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            alert("请先登录")
            next('/login?redirect='+toPath)
        } else {
            next();
        }
    }
})

export default router