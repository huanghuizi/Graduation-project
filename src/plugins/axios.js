import axios from 'axios'

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: '/api', // 设置统一的请求前缀
    timeout: 5000, // 设置统一的超时时长
  });

  return service(axiosConfig)
}
export default myAxios;
