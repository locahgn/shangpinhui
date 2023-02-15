//对于axios进行二次封装
import axios from 'axios'
import nProgress from 'nprogress';
//在当前模块中引入store
import store from '@/store'
//进度条显示
import 'nprogress/nprogress.css'
//创建axios实例
const requests = axios.create({
    //基础路径
    baseURL:'/api',
    //请求不超过5s
    timeout: 5000,
})

requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nProgress.start();
    return config;
})

requests.interceptors.response.use((res)=>{
    nProgress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'))
})

export default requests