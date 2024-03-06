import axios from 'axios';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencodedcharset=UTF-8';

// 不加载loading的Api
const loadingHideApi = ['web/maps/addressByLngLat', 'web/approval-out-option'];
// 不显示toast的Api
const toastHideApi = [];

// api 配置
const options = {
  baseURL: 'https://dg-api-dev.shouyinongye.com/',
  timeout: 30000, // 超时时间
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(options);

// 请求数据拦截
_axios.interceptors.request.use(
  config => {
    if (!loadingHideApi.includes(options.url)) {
      // Toast.loading({
      //   duration: 0, // 持续展示
      //   message: "加载中...",
      //   forbidClick: true,
      //   loadingType: "spinner"
      // }); // loading显示
    }
    const token = AsyncStorage.getItem('token');
    if (token) {
      config.headers = {Authorization: token};
    } else {
      AsyncStorage.removeItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应数据拦截
_axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.statusCode !== 0) {
        if (JSON.stringify(toastHideApi).indexOf(response.config.url) == -1) {
          response.data.message &&
            ToastAndroid(
              response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        }
        return Promise.reject(response);
      } else {
        // Toast.clear();
        return Promise.resolve(response.data.data);
      }
    } else {
      // Toast.clear(); // loading隐藏
      return Promise.reject(response);
    }
  },
  error => {
    console.log('_axios error', error);
    // Toast.clear(); // loading隐藏
    const {data, status} = error && error.response;
    if (error && data && status) {
      switch (status) {
        case 500:
          ToastAndroid(
            '[500]: 服务器错误~',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          break;
        case 401:
          console.log('status 401');
          // AsyncStorage.removeItem('token');
          break;
        case 404:
          ToastAndroid(
            '[404]: 资源不存在~',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          break;
        default:
          ToastAndroid(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
          break;
      }
    } else {
      ToastAndroid(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    return Promise.reject(error);
  },
);

export default _axios;
