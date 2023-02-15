import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//定义全局组件：在入口文件注册一次后，在任何组件中都可以使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//全局组件：第一个参数  组件名字    第二个参数：注册的组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.use(ElementUI);
//引入路由相关文件
import router from '@/router'
//引入仓库进行注册
import store from '@/store';


Vue.config.productionTip = false
//引入MockServer.js-----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'

//引入插件
//图片懒加载
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
///注册插件
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:atm
})
//统一接受api文件夹里面全部请求函数
import * as API from '@/api'
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  //配置全局事件总线$bus
  beforeCreate(){
   Vue.prototype.$bus = this
   Vue.prototype.$API = API
  },
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route（路由）：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  store
}).$mount('#app')
