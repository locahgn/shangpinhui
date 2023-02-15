import { reqCartList,reqDeleteCartById,reqUpdateCheckedByid } from "@/api"
const state ={
    cartList:[]
}

const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改产品的状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        //获取购物车中全部的商品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    //修改全部选中商品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
}

export default {
    state,actions,mutations,getters
}