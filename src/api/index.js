import Axios from 'axios'
import { message } from 'antd';
// 这个是第一种用法
// export const getArticleList = (page,pageSize) => {
//   var url = `http://localhost:3000/data?_page=${page}&_limit=${pageSize}`

//   return Axios({
//     method: 'get',
//     url,
//   })
// }

// 第二种用法

// process.env.NODE_ENV 是nodejs运行的环境，用来标示我们是在开发模式还是线上模式
const isDev=process.env.NODE_ENV ==='development';

// 配置基准地址

const service=Axios.create(
  {
    baseURL:isDev ? 'http://localhost:3000/article':'http://rap2api.taobao.org/app/mock/232481/api/v1/article'
  }
)

// 可以使用API进行网络请求的拦截

service.interceptors.request.use((config) =>{
  // config代表是要发给服务器的信息，可以自己填充，在写入token可以在这里写
  console.log('拦截请求',config);
  
  return config;
  
})
service.interceptors.response.use((response) =>{
  // config代表是要发给服务器的信息，可以自己填充，在写入token可以在这里写
  
  if(response.status === 200){
    return response.data
  }
  else{
    message.error('系统繁忙中，稍后在试一试....');
  }
  console.log('拦截响应',response);
  
})
// 获取全部数据操作
export const getAllArticleList = () =>{
  return service.get()
}
// 分页操作
export const getArticleList = (page,pageSize) =>{
  return service.get(`?_page=${page}&_limit=${pageSize}`)
}
// 删除操作
export const delArticle = (id) =>{
  return service.delete(`/${id}`)
}
// 根据ID查找对应的记录
export const findArticle = (id) =>{
  return service.get(`/${id}`)
}
// 根据ID修改对应的记录
export const editArticle = (id,options) =>{
  return service.put(`/${id}`,options)
}