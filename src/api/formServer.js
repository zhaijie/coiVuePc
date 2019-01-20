/**
 * Created by Administrator on 2018/11/13 0013.
 */
import http from './http';

//登录
export function getCode(params, callback) {
  http.post('/app/user/getCode', params, function (data, err) {
    callback(data, err)
  })
}

//登录
export function login(params, isRemindName, callback) {
  http.post('/login', params, function (data, err) {
    if (data) {
      //储存用户信息
      data.username = data.account;
      //是否记住用户名
      if (isRemindName) {
        window.localStorage.setItem('phone', data.account);
      }
      window.localStorage.setItem('userInfo', JSON.stringify(data));
      // else {
      //   window.sessionStorage.setItem('userInfo', JSON.stringify(data));
      // }
    }
    callback(data, err)
  })
}

//注册
export function register(params, callback) {
  http.post('/app/user/register', params, function (data, err) {
    if (data) {
      data.username = data.account;
      window.localStorage.setItem('userInfo', JSON.stringify(data));
    }
    callback(data, err)
  })
}

//忘记登录密码
export function forgetPwd(params, callback) {
  http.post('/app/setup/forgetPwd', params, function (data, err) {
    callback(err)
  })
}

//获取表单信息
export function getFormInput(type) {
  type = type || 0;
  let phone = window.localStorage.getItem('phone');
  let formObj = [
    [
      {name: 'phone', type: 'tel', placeholder: '请输入手机号码', value: phone || '', class: ''},
      {name: 'password', type: 'password', placeholder: '请输入登录密码', value: '', class: ''},
      {name: 'imgCode', type: 'text', placeholder: '请输入图形验证码', value: '', class: 'code_input'},
    ],
    [
      {name: 'phone', type: 'type', placeholder: '手机号码', value: '', class: ''},
      {name: 'password', type: 'password', placeholder: '设置登录密码', value: '', class: ''},
      {name: 'repeatPassword', type: 'password', placeholder: '确定登录密码', value: '', class: ''},
      {name: 'invite', type: 'text', placeholder: '请输入邀请码(非必填)', value: '', class: ''},
      {name: 'imgCode', type: 'text', placeholder: '图形验证码', value: '', class: 'code_input'},
      {name: 'code', type: 'text', placeholder: '验证码', value: '', class: 'code_input'},
    ],
    [
      {name: 'phone', type: 'type', placeholder: '手机号码', value: '', class: ''},
      {name: 'password', type: 'password', placeholder: '重置登录密码', value: '', class: ''},
      {name: 'repeatPassword', type: 'password', placeholder: '确定登录密码', value: '', class: ''},
      {name: 'imgCode', type: 'text', placeholder: '图形验证码', value: '', class: 'code_input'},
      {name: 'code', type: 'text', placeholder: '验证码', value: '', class: 'code_input'},
    ]
  ];

  return formObj[type]
}





