import axios from 'axios';
//获取油站列表
export const oilStation= () =>{
    return axios.request({
        url: '/OilTrack/oilstation/list',
        method:'POST',
      });
}
/*********************油品配置**************************/
//查询和加载油品
export const queryOil= (data) =>{
    return axios.request({
        url: '/OilTrack/oilsinfo/listByQueryPage',
        method:'POST',
        data
      });
}
//添加油品
export const addOil= (data) =>{
    return axios.request({
        url: '/OilTrack/oilsinfo/insert',
        method:'POST',
        data
      });
}
//修改油品
export const updateOil= (data) =>{
    return axios.request({
        url: '/OilTrack/oilsinfo/update',
        method:'POST',
        data
      });
}
//删除油品
export const deleteOil= (data) =>{
    return axios.request({
        url: '/OilTrack/oilsinfo/delete',
        method:'POST',
        data
    });
}
/*********************储罐配置**************************/
//储罐列表
export const cgList= (data) =>{
    return axios.request({
        url: '/OilTrack/storageTankInfo/list',
        method:'POST',
        data
      });
}
//修改储罐
export const updateCg= (data) =>{
    console.log(data)
    return axios.request({
        url: '/OilTrack/storageTankInfo/update',
        method:'POST',
        data
      });
}
//修改储罐的储罐原油的模糊查询
export const updateCgOil= () =>{
    console.log(data)
    return axios.request({
        url: '/OilTrack/oilsinfo/listlike',
        method:'POST',
    });
}
//
/*********************管线配置**************************/
//管线列表
export const gxList= (data) =>{
    return axios.request({
        url: '/OilTrack/pipelineCompositon/list',
        method:'POST',
        data
      });
}
//管线修改
export const updateGx= (data) =>{
    return axios.request({
        url: '/OilTrack/pipelineCompositon/update',
        method:'POST',
        data
      });
}
//分段列表
export const fdList= (data) =>{
    return axios.request({
        url: '/OilTrack/segmentlength/list',
        method:'POST',
        data
      });
}
//添加分段
export const addfd= (data) =>{
    return axios.request({
        url: '/OilTrack/segmentlength/insert',
        method:'POST',
       data
      });
}
//修改分段
export const updateFd= (data) =>{
    return axios.request({
        url: '/OilTrack/segmentlength/update',
        method:'POST',
       data
      });
}
//删除分段
export const deleteFd= (data) =>{
    return axios.request({
        url: '/OilTrack/segmentlength/delete',
        method:'POST',
        data
    });
}