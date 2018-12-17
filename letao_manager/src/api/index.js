import axios from 'axios'
const baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = baseURL
// 允许axios传递cookie数据，因为默认情况下，axios并不会传递cookie
axios.defaults.withCredentials = true

// 实现登陆
export const login = (params) => {
  return axios.post('/employee/employeeLogin', params).then((res) => {
    return res.data
  })
}
// 用户查询
export const userLits = (pa) => {
  return axios.get('/user/queryUser', { params: pa }).then((res) => {
    return res.data
  })
}
// 用户禁用
export const updateUser = (pa) => {
  return axios.post('/user/updateUser', pa).then((res) => {
    return res.data
  })
}
// 分类一级查询
export const queryTopCategory = (pa) => {
  return axios.get('/category/queryTopCategoryPaging', { params: pa }).then((res) => {
    return res.data
  })
}
// 分类一级添加
export const addTopCategory = (pa) => {
  return axios.post('/category/addTopCategory', pa).then((res) => {
    return res.data
  })
}
// 分类二级查询
export const SecondCategory = (pa) => {
  return axios.get('/category/querySecondCategoryPaging', { params: pa }).then((res) => {
    return res.data
  })
}
// 分类二级添加
export const addSecondCategory = (pa) => {
  return axios.post('/category/addSecondCategory', pa).then((res) => {
    return res.data
  })
}
// 商品查询
export const ProductDetailList = (pa) => {
  return axios.get('/product/queryProductDetailList', { params: pa }).then((res) => {
    return res.data
  })
}
// 商品添加
export const addProduct = (pa) => {
  return axios.post('/product/addProduct', pa).then((res) => {
    return res.data
  })
}
