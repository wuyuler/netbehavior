import axios from 'axios';
let base = 'http://localhost:8082';
export const getUserdata=(url)=>{ return axios.get(`${base}/${url}`);};
export const getUserInfoByPage=params=>{ return axios.get(`${base}/users/getUserInfoByPage`, { params: params });};