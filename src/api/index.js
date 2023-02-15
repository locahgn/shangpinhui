//统一管理项目接口的模块
//引入二次封装的axios(带有请求、拦截响应器)
import requests  from './request'
import mockRequests from './mockAjax'
//三级菜单的请求地址   /api/product/getBaseCategoryList   GET  没有任何参数
//对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求、获取三级菜单的数据。当前函数只需要把服务器的结果返回
export const reqCategoryList = ()=>requests({url:'/api/product/getBaseCategoryList',method:'get'})
//切记：当前函数执行需要把服务器结果返回

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')


//获取搜索模块数据   地址：/api/list    请求方式：post   参数：需要带参数
//当前这个接口 （获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params)=>requests({url:'api/list',method:'post',data:params})

//获取产品详情信息的接口
export const reqGoodsInfo = (skuId)=>requests({url:`/api/item/${skuId}`,method:'get'});

//将产品添加到购物车中（或者修改某一产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/api/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据
export const reqCartList = ()=>requests({url:'api/cart/cartList',method:'get'})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/api/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中的状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/api/cart/checkCart/${skuId}/${isChecked}`,method: 'get'})

//注册获取验证码
export const reqGetCode = (phone)=>requests({url:`/api/user/passport/sendCode/${phone}`,method:'get'})

//用户注册
export const reqUserRegister = (data)=>requests({url:'/api/user/passport/register',data,method:'post'})

//用户登录
export const reqUserLogin = (data)=>requests({url:'/api/user/passport/login',data,method:'post'})

//获取用户信息
export const reqUserInfo = ()=>requests({url:'/api/user/passport/auth/getUserInfo',method:'get'}) 

//退出登录
export const reqLogout = ()=>requests({url:'/api/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/api/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单
export const reqOrderInfo = ()=>requests({url:'/api/order/auth/trade',method:'get'})

//提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付状态
export const reqPayStatus = (orderId)=>requests({url:`/api/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/api/payment/weixin/createNative/${orderId}`,method:'get'})

//获取个人中心数据
export const reqMyOrderList = (page,limit)=>requests({url:`/api/order/auth/${page}/${limit}`,method:'get'})