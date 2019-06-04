import axios from 'axios';
//获取所有部门信息
export const getDepartment= () =>{
    return axios.request({
        url: '/OilTrack/ryzhb/showDepartmnet',
        method:'GET'
    });
}
//===============================用户管理================================
//通过部门id去查询这个部门下的用户信息
export const searchDepartmentById= (departmentId) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/searchByDepartmnet',
        method:'GET',
        data:{
            departmentId
        }
    });
}
//用户添加——部门的模糊查询
export const showDepartmentByLike= (params) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/showDepartmnetByLike',
        method:'GET',
        params:{
            params
        }
    });
}
//用户添加——获取角色
export const showRole= () =>{
    return axios.request({
        url: '/OilTrack/ryzhb/showRole',
        method:'GET',
       
    });
}
//用户添加——添加用户
export const insertUser= (data) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/insert',
        method:'POST',
        data
    });
}
//用户修改——通过用户的id去展示用户的信息
export const searchUserInfoById= (data) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/searchByRyzhId',
        method:'GET',
        data
    });
}
//用户修改——通过用户的id去修改用户的信息
export const updateUserInfoById= (data) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/update',
        method:'POST',
        data
    });
}
//通过用户的id列表去删除表中的数据 
export const deleteUserById= (data) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/delete',
        method:'POST',
        data
    });
}
//用户搜索——通过关键字去搜索
export const searchByKeywords= (data) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/searchByKeywords',
        method:'GET',
        data
    });
}
//用户展示——展示所有的用户
export const showUserInfo= (data) =>{
    return axios.request({
        url: '/OilTrack/ryzhb/show',
        method:'GET',
        data
    });
}
//=============================角色管理===============================================
//角色的添加——资源的树形展示
export const showResource= () =>{
    return axios.request({
        url: '/OilTrack/resource/showResource',
        method:'GET'
    });
}
//角色的添加
export const insertRole= (data) =>{
    return axios.request({
        url: '/OilTrack/jsb/insert',
        method:'GET',
        params:{
            data
        }
    });
}
//角色的修改
export const updateRole= (data) =>{
    return axios.request({
        url: '/OilTrack/jsb/update',
        method:'GET',
        data
    });
}
//角色之批量删除
export const deleteRole= (data) =>{
    return axios.request({
        url: '/OilTrack/jsb/delete',
        method:'POST',
        data
    });
}
//角色之分页展示
export const pageShowRole= (data) =>{
    return axios.request({
        url: '/OilTrack/jsb/show',
        method:'GET',
        data
    });
}
//=============================单位管理===============================================
//部门管理——部门添加，模糊查询负责人
export const searchInfoByName= (data) =>{
    return axios.request({
        url: '/OilTrack/department/searchName',
        method:'GET',
        data
    });
}
//部门管理——部门添加
export const insertDepartment= (data) =>{
    return axios.request({
        url: '/OilTrack/department/insert',
        method:'POST',
        data
    });
}
//部门管理——部门修改
export const updateDepartment= (data) =>{
    return axios.request({
        url: '/OilTrack/department/update',
        method:'POST',
        data
    });
}
//部门管理——部门批量删除
export const deleteDepartment= (data) =>{
    return axios.request({
        url: '/OilTrack/department/delete',
        method:'POST',
        data
    });
}
//部门管理——条件分页查询
export const searchDepartment= (data) =>{
    return axios.request({
        url: '/OilTrack/department/search',
        method:'GET',
        data
    });
}
//部门管理——分页查询
export const findPageDepartment= (data) =>{
    return axios.request({
        url: '/OilTrack/department/findPage',
        method:'GET',
        data
    });
}
//=============================日志管理===============================================
//日志管理——通过时间去删除这个时间段内的数据
export const deleteLog= (data) =>{
    return axios.request({
        url: '/OilTrack/log/delete',
        method:'GET',
        data
    });
}
//日志管理——日志的条件展示
export const showLog= (data) =>{
    return axios.request({
        url: '/OilTrack/log/showPage',
        method:'GET',
        data
    });
}