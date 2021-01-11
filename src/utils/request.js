import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // 超时
    //timeout: 20000,
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    /*let user = getUserInfo();
    if (user != null && user['token'] !== null) {
        config.headers.common['Authorization'] = user['token'];
    }*/
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    /*if(response.data.code === '403'){
        removeUserInfo()
        router.replace({
            path: '/login',
            // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        })
    }*/
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service
