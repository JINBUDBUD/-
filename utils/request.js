import Request from 'luch-request'

const http = new Request();

http.setConfig((set) => {
  console.log(uni.getStorageSync("token"))
  /* set 为默认全局配置*/
  set.baseURL = 'https://slhkhsy.com:8082/'; // 域名
  set.timeout = 10000 //超时时间
  set.header = {
    // ...set.header,
    'Content-Type': 'application/json',
    'Authorization': uni.getStorageSync("token")
    // // #ifdef H5
    // // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    // withCredentials: true,
    // // #endif
    // // 'content-Type':'application/x-www-form-urlencoded'
    // 'content-Type': 'x-www-form-urlencoded',
  }
  console.log(set.heade)
  return set
})


//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  // uni.showLoading()
  // config.header = {
  //   ...config.header,
  //   a: 1 // 演示拦截器header加参
  // }
  // 演示custom 用处
  // if (config.custom.auth) {
  // config.header.token ='049d2ab41b8849198827c356d107fa7e'
  // 01b78b683ac94c2db6fe86f1d1584cbc
  // config.header.token ='9aa8d64665ad43fb9a04c836c5e2c1f7'
  // }
  config.header.Authorization = uni.getStorageSync("token")
  // uni.hideLoading()
  // if (config.custom.loading) { 
  //  uni.showLoading()
  // }
  return config
}, config => { // 可使用async await 做异步操作
  console.log(config, 'configconfig')
  return Promise.reject(config)
})

//响应拦截器
http.interceptors.response.use((response) => {
  uni.hideLoading()
  console.log("返回数据", response)
  // console.log(response.data.code);
  // if (response.data.code !== undefined) {
  // 	// 请求成功后将数据返回
  if (response.data.code == 401) {
    // if (response.data.message == "token已失效") {
    uni.showToast({
      title: '请先登陆',
      icon: 'none',
      duration: 2000
    });
    // uni.reLaunch({
    // 	url: `/pages/user/user`
    // })
    // }
  }
  return response
  // 	if (response.data.code == 1) {
  // 		if (response.data.message == "token已失效") {
  // 			uni.reLaunch({
  // 				url: `/pages/login/login`
  // 			})
  // 		}
  // 		return Promise.reject(response.data.message)
  // 	}
  // 	if (response.data.code == 2) {
  // 		uni.removeStorageSync('token');
  // 		uni.reLaunch({
  // 			url: `/pages/login/login`
  // 		})
  // 	}
  // }
}, (response) => {
  console.log(response, 'err')
  uni.hideLoading()
  if (response.errMsg.indexOf("timeout") != -1) {
    uni.showToast({
      title: '请求超时，请刷新页面后重试！',
      icon: 'none'
    })
  } else {
    uni.showToast({
      title: '网络或服务器异常, 请检查网络设置后刷新重试!',
      icon: 'none',
      duration: 1500,
    })
  }
  return Promise.reject(response)
})

export default http
