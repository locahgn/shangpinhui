import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
//封装游客身份模块uuid
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}

const actions = {
    //获取产品信息
    async getGoodInfo({commit},skuId){
        let result =  await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的解构
        //加入购物车以后发请求，前台将参数带给服务器
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //代表加入购物车成功
        if(result.code==200){
            return 'ok'
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
//简化数据
const getters = {
    //路径导航简化的数据
    categoryView(state){
        //state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        return state.goodInfo.categoryView||{}
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}

export default {
    state,mutations,actions,getters
}