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
