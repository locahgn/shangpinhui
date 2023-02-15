import { reqCategoryList, reqGetBannerList, reqFloorList} from "@/api"
//action|用户处理派发action的地方，可以书写异步语句、自己逻辑的地方
const actions = {
    //获取三级菜单的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
            commit('CATEGORTLIST', result.data.slice(0,16))
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
       let result = await reqGetBannerList();
       if(result.code === 200){
        commit('GETBANNERLIST', result.data)
       }
    },
    //获取floor的数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code === 200){
            commit('GETFLOORLIST', result.data)
        }
    }
}
//mutations是唯一修改state的地方
const mutations = {
    CATEGORTLIST(state, categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
//home模块的仓库，用于存储数据
const state = {
    //home仓库中存储三级菜单的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor的数据
    floorList:[]
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}