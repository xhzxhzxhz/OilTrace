import axios from 'axios';
import Qs from 'qs'
//管线选择
export const line= () =>{
    return axios.request({
        url: '/OilTrack/line/lines',
        method:'POST'
    });
}
//物性跟踪接口
export const propertyTrack= (data) =>{
    return axios.request({
        url: '/OilTrack/asToczd/propertyTrack',
        method:'POST',
        data
    });
}
//日仪线
export const ryxInfo= () =>{
    return axios.request({
        url: '/OilTrack/ryx/lineInfo',
        method:'POST'
    });
}
//塘燕复线
export const tyLineInfo= () =>{
    return axios.request({
        url: '/OilTrack/tyfx/lineInfo',
        method:'POST'
    });
}
//东黄复线
export const dhfxLineInfo= () =>{
    return axios.request({
        url: '/OilTrack/dhfx/lineInfo',
        method:'POST'
    });
}
//东临复线
export const dlfxLineInfo= () =>{
    return axios.request({
        url: '/OilTrack/dlfx/lineInfo',
        method:'POST'
    });
}
//天石线
export const tsxInfo= () =>{
    return axios.request({
        url: '/OilTrack/tsx/lineInfo',
        method:'POST'
    });
}
//曹津线
export const cjInfo= () =>{
    return axios.request({
        url: '/OilTrack/cjx/lineInfo',
        method:'POST'
    });
}
//岙山输油站
export const asInfo= () =>{
    return axios.request({
        url: '/OilTrack/asx/lineInfo',
        method:'POST'
    });
}
//册子岛油库
export const czdInfo= () =>{
    return axios.request({
        url: '/OilTrack/czd/lineInfo',
        method:'POST'
    });
}
//大榭岛油库
export const dxdInfo= () =>{
    return axios.request({
        url: '/OilTrack/dxd/lineInfo',
        method:'POST'
    });
}
//岚山输油站
export const lsLineInfo= () =>{
    return axios.request({
        url: '/OilTrack/lbx/lineInfo',
        method:'POST'
    });
}
//石埠桥输油站
export const sbqInfo= () =>{
    return axios.request({
        url: '/OilTrack/sbq/lineInfo',
        method:'POST'
    });
}
//白沙湾输油站
export const bswInfo= () =>{
    return axios.request({
        url: '/OilTrack/bsw/lineInfo',
        method:'POST'
    });
}
//鲁宁线
export const lnxInfo= () =>{
    return axios.request({
        url: '/OilTrack/lnx/lineInfo',
        method:'POST'
    });
}
//仪长线
export const ycxInfo= () =>{
    return axios.request({
        url: '/OilTrack/ycx/lineInfo',
        method:'POST'
    });
}
//仪长复线
export const ycfxInfo= () =>{
    return axios.request({
        url: '/OilTrack/ycfx/lineInfo',
        method:'POST'
    });
}
//输油计划调整顺序
export const transportationPlanSort= (data) =>{
    return axios.request({
        url: '/OilTrack/transportationPlan/sort',
        method:'POST',
        data
    });
}
//输油计划列表
export const transportationPlanList= (data) =>{
    return axios.request({
        url: '/OilTrack/transportationPlan/list',
        method:'POST',
        data 
    });
}
//新建输油计划
export const transportationPlanInsert= (data) =>{
    return axios.request({
        url: '/OilTrack/transportationPlan/insert',
        method:'POST',
        data:Qs.stringify(data,{arrayFormat: 'repeat'})
        
    });
}
//修改输油计划
export const transportationPlanUpdate= (data) =>{
    return axios.request({
        url: '/OilTrack/transportationPlan/update',
        method:'POST',
        data
    });
}
//删除输油计划
export const transportationPlanDelete= (data) =>{
    return axios.request({
        url: '/OilTrack/transportationPlan/delete',
        method:'POST',
        data
    });
}
//卸油计划列表
export const transportationDidList= (data) =>{
    return axios.request({
        url: '/OilTrack/unloadingOilPlan/list',
        method:'POST',
        data
    });
}
//新建卸油计划
export const transportationDidInsert= (data) =>{
    return axios.request({
        url: '/OilTrack/unloadingOilPlan/insert',
        method:'POST',
        data
    });
}
//修改卸油计划
export const transportationDidUpdate= (data) =>{
    return axios.request({
        url: '/OilTrack/unloadingOilPlan/update',
        method:'POST',
        data
    });
}
//删除卸油计划
export const transportationDidDelete= (data) =>{
    return axios.request({
        url: '/OilTrack/unloadingOilPlan/delete',
        method:'POST',
        data
    });
}