/**
 * Created by Administrator on 2018/5/22 0022.
 */
import axios from 'axios';
import {api} from './api';
import state from '../store/state'

import router from '../main'
import {showRemindAlert} from '../utils/utils'

// 请求时的拦截
axios.interceptors.request.use(function (config) {
  // 发送请求之前做一些处理
  return config;
}, function (error) {
  // 当请求异常时做一些处理
  console.log("请求异常处理：" + error);
  return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  // console.log('返回响应:' + JSON.stringify(response));
  return response;
}, function (error) {
  // 当响应异常时做一些处理
  console.log('当响应异常时:' + error);
  return Promise.reject(error);
});

//设置默认请求头
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.timeout = 30000;
let authorization;

export default {
  //get请求
  get (url, param, successCallBack) {
    let apiUrl = api + url;
    this.getHeader();
    let _this = this;
    axios.get(apiUrl, {params: param, headers: {'Authorization': authorization}}).then(res => {
      console.log(apiUrl + '返回结果: ');
      _this.resultHandle(res.data, successCallBack)
    }).catch(err => {
      console.log(err);
      console.log(apiUrl + '请求错误');
    })
  },

  //post请求
  post (url, param, successCallBack) {
    console.log('请求参数' + JSON.stringify(param));
    let apiUrl = api + url;
    this.getHeader();
    let sendData = {
      method: 'post', url: apiUrl, headers: {'Authorization': authorization}
    };
    if (url === '/login' || url === '/pc/coit/authentication') {
      sendData.data = param;
      //以防用户切换登录时记录上一个用户的token
      authorization = null;
    } else {
      sendData.params = param;
    }
    let _this = this;
    axios(sendData).then(res => {
      console.log(apiUrl + '返回结果: ');
      _this.resultHandle(res.data, successCallBack)
    }).catch(err => {
      console.log(err);
      console.log(apiUrl + '请求错误');
    })
  },

  getHeader(){
    if (!authorization) {
      let localUserInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')).tmd : '';
      let sessionStorage = window.sessionStorage.getItem('userInfo') ? JSON.parse(window.sessionStorage.getItem('userInfo')).tmd : '';
      authorization = localUserInfo || sessionStorage;
    }
  },

  //返回结果处理
  resultHandle(res, successCallBack){
    console.log(res);
    switch (res.retcode) {
      case 0:
        successCallBack(res.data);
        break;
      case 10003:
        state.loginState = false;
        window.localStorage.clear();
        router.push('/form/0');
        showRemindAlert('warning', '请先登录');
        successCallBack(false, res.msg);
        break;
      default:
        successCallBack(false, res.msg);
    }
  }


}
