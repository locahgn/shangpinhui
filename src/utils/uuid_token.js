import {v4 as uuidv4} from 'uuid'
export const getUUID = ()=>{
    //先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if(!uuid_token){
        //生成游客临时身份
        uuid_token = uuidv4()
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}