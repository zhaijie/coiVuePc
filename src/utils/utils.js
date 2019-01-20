/**
 * Created by Administrator on 2018/7/6 0006.
 */

import http from '../api/http'
import Alert from '../page/components/alert'

export default {}

//手机号码密文显示
export function cipherText(text) {
  let text1 = text.substring(0, 3);
  let text2 = text.substring(text.length - 4, text.length);
  return text1 + '*****' + text2
}

//获取验证码
export function getCode(params, callback) {
  http.post('/app/user/getCode', params, function (data, meg) {
    callback(data, meg)
  })
}

//获取用户信息
export function getUserInfo() {
  let userObj = window.localStorage.getItem('userInfo') || window.sessionStorage.getItem('userInfo');
  if (userObj) {
    return JSON.parse(userObj)
  }
  return {}
}

//修改用户信息
export function setUserInfo(userObj) {
  if (window.sessionStorage.getItem('userInfo')) {
    window.sessionStorage.setItem('userInfo', JSON.stringify(userObj))
  } else {
    window.localStorage.setItem('userInfo', JSON.stringify(userObj))
  }
}

//修改用户信息
export function removeUserInfo() {
  window.sessionStorage.removeItem('userInfo');
  window.localStorage.removeItem('userInfo')
}

//检测验证码长度
export function checkCode(code) {
  if (code.length === 0) {
    return '请输入验证码';
  }
  return false;
}

//显示错误提示框
export function showCheckTip(inputObj, checkText) {
  this.$set(inputObj, 'check', checkText);
  let timer = setTimeout(function () {
    inputObj.check = false;
    clearTimeout(timer)
  }, 3000);
}


//检测手机号码
export function checkPhone(phone) {
  let check_phone_number = /^1\d{10}$/;
  if (phone.length === 0) {
    return '手机号码不能为空';
  }

  if (phone.length !== 11) {
    return '请输入有效的手机号！';
  }

  if (!phone.match(check_phone_number)) {
    return '请输入有效的手机号';
  }

  return false;
}

export function checkLengthNull(value, text) {
  if (value.length === 0) {
    return text + '不能为空';
  }
  return false;
}

export function copy() {
  let url = document.querySelector('#copyObj');
  url.select(); // 选择对象
  document.execCommand("Copy");
  showRemindAlert('success', '复制成功')
}

export function showRemindAlert(type, remind) {
  let alertInfo = {
    alertText: remind,
    alertType: type,
    buttons: [{
      text: '我知道了'
    }]
  };
  Alert.create(alertInfo);
}

//显示提示框
export function showConfirmAlert(type, remind, handle) {
  let alertInfo = {
    alertText: remind,
    alertType: type,
    buttons: [{
      text: '确定', handle: handle
    }, {
      text: '取消'
    }]
  };
  Alert.create(alertInfo);
}

//对象深拷贝
export function objDeepCopy(dataMsg) {
  let sourceCopy = dataMsg instanceof Array ? [] : {};
  for (let item in dataMsg) {
    sourceCopy[item] = typeof dataMsg[item] === 'object' ? objDeepCopy(dataMsg[item]) : dataMsg[item];
  }
  return sourceCopy;
}


