import axios from 'axios';
//管线选择
export const line= () =>{
    return axios.request({
        url: '/OilTrack/line/lines',
        method:'POST'
    });
}
//历史作业
export const listhistory= (data) =>{
    return axios.request({
        url: '/OilTrack/planhistory/listhistory',
        method:'POST',
        data
    });
}