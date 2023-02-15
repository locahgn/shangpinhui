import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo, reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
//登录与注册的模块

const state = {
    code:'',
    token:getToken(),
    userInfo: {}
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清楚本地数据
    CLEAR(state){
        //把仓库中用户信息清空
        state.token = '';
        state.userInfo = {}
        //把本地存储的token清空
        removeToken();
    }
}

const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result =await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识符
        if(result.code==200){
            //用户已经成功登陆并获取到token
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            Promise.reject(new Error('faile'))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}