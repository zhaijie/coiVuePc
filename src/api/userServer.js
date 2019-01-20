/**
 * Created by Administrator on 2018/11/13 0013.
 */
import http from './http';
import {getUserInfo, removeUserInfo} from '../utils/utils';

//获取总资产
export function getAssets(callback) {
  http.post('/app/setup/getTotalAssets', {}, function (data, err) {
    callback(data, err)
  })
}

//转出COI
export function turnOutCOI(params, callback) {
  http.post('/app/trading/trunOutCOI', params, function (data, err) {
    callback(data, err)
  })
}

//获取钱包地址
export function getWalletAddress(callback) {
  http.post('/app/balance/getAddress', {}, function (data, err) {
    callback(data, err)
  })
}

//获取线下众筹
export function customerService(callback) {
  http.post('/app/setup/getXxCustomerService', {}, function (data, err) {
    callback(data, err)
  })
}

//修改登录密码
export function updatePwd(params, callback) {
  http.post('/app/setup/updatePwd', params, function (data, err) {
    callback(data, err);
  })
}


//设置交易密码
export function setTradePwd(params, callback) {
  http.post('/app/setup/setTradePwd', params, function (data, err) {
    callback(data, err)
  })
}

//修改交易密码
export function updateTradePwd(params, callback) {
  http.post('/app/setup/updateTradePwd', params, function (data, err) {
    callback(err)
  })
}

//设置交易密码
export function forgetTradePwd(params, callback) {
  http.post('/app/setup/forgetTradePwd', params, function (data, err) {
    callback(err)
  })
}

//安全退出
export function logout(callback) {
  http.get('/app/user/logout', {}, function (data, err) {
    if (err) {
      alert(err);
      return
    }
    removeUserInfo();
    callback(err)
  })
}

//修改停机手机号码
export function updatePhone(params, callback) {
  http.post('/app/coit/updatePhonePC', params, function (data, err) {
    callback(err)
  })
}

//修改手机号码
export function changePhone(params, callback) {
  http.post('/app/setup/updatePhone', params, function (data, err) {
    callback(err)
  })
}

// 短信验证码校验
export function checkCode(params, callback) {
  http.post('/app/user/checkCode', params, function (data, err) {
    callback(err)
  })
}

//初级实名认证
export function authentication(params, callback) {
  http.post('/app/setup/authentication', params, function (data, err) {
    callback(err)
  })
}

// 高级实名
export function seniorReal(params, callback) {
  http.post('/pc/coit/authentication', params, function (data, err) {
    callback(err)
  })
}

//是否高级实名认证
export function isRealAuth(callback) {
  http.post('/app/setup/isRealAuth', {}, function (data) {
    callback(data)
  })
}

//实名认证详情
export function authDetail(callback) {
  http.post('/app/setup/authDetail', {}, function (data) {
    callback(data)
  })
}

//获取邀请好友信息
export function inviteInfo(callback) {
  http.post('/app/setup/getInvitationFriends', {}, function (data, err) {
    callback(data, err)
  })
}

//获取交易记录
export function getTradeCOIRecord(params, callback) {
  http.post('/pc/coit/getZrZcRecord', params, function (data, err) {
    data.item.forEach(function (item) {
      item.cost = item.cost ? parseFloat(item.cost).toFixed(4) : '0.0000';

      if (item.type === 1) {
        item.type = '转出';
        item.number = '-' + (parseFloat(item.number).toFixed(4));
        item.class = 'fall_count'
      } else {
        item.type = '转入';
        item.number = '+' + (parseFloat(item.number).toFixed(4));
        item.class = 'rise_count'
      }

      switch (item.status) {
        case 1:
          item.status = '处理中';
          break;
        case 2:
          item.status = '已到账';
          break;
        case 3:
          item.status = '转出失败';
          break;
        case 4:
          item.status = '审核通过';
          break;
        case 5:
          item.status = '审核失败';
          break;
      }
    });

    callback(data, err)
  })
}

//获取交易记录
export function getRewordRecord(params, callback) {
  http.post('/pc/coit/getXxzcRecord', params, function (data, err) {
    callback(data, err)
  })
}

//获取表单信息
export function getUserForm(type) {
  type = type || 0;
  let userInfo = getUserInfo();
  let formObj = [
    [
      {title: '登录密码', name: 'password', type: 'password', placeholder: '请输入原登录密码', value: '', class: ''},
      {title: '新密码', name: 'password', type: 'password', placeholder: '请输入新登录密码', value: '', class: ''},
      {title: '重复密码', name: 'password', type: 'password', placeholder: '请重复新登录密码', value: '', class: ''},
    ],
    [
      {title: '交易密码', name: 'tradePassword', type: 'password', placeholder: '请输入原交易密码', value: '', class: ''},
      {title: '新密码', name: 'tradePassword', type: 'password', placeholder: '请输入新交易密码', value: '', class: ''},
      {title: '重复密码', name: 'tradePassword', type: 'password', placeholder: '请重复新交易密码', value: '', class: ''},
    ],
    [
      {title: '手机号码', name: 'phone', type: 'text', placeholder: '手机号码', value: userInfo.username, class: ''},
      {title: '验证码', name: 'code', type: 'text', placeholder: '验证码', value: '', class: 'user_code_input'},
    ],
    [
      {title: '手机号码', name: 'phone', type: 'text', placeholder: '手机号码', value: userInfo.username, class: ''},
      {title: '新密码', name: 'tradePassword', type: 'password', placeholder: '请输入新交易密码', value: '', class: ''},
      {title: '重复密码', name: 'tradePassword', type: 'password', placeholder: '请重复交易密码', value: '', class: ''},
      {title: '图形验证', name: 'imgCode', type: 'text', placeholder: '图形验证码', value: '', class: 'user_code_input'},
      {title: '验证码', name: 'code', type: 'text', placeholder: '验证码', value: '', class: 'user_code_input'},
    ],
    [
      {title: '注册名称', name: 'username', type: 'text', placeholder: '注册名称', value: '', class: ''},
      {title: '身份号码', name: 'userId', type: 'text', placeholder: '请输入身份证号码', value: '', class: ''},
      {title: '手机号码', name: 'phone', type: 'text', placeholder: '请设置新手机号码', value: '', class: ''},
      {title: '图形验证', name: 'imgCode', type: 'text', placeholder: '请输入图形验证码', value: '', class: 'user_code_input'},
      {title: '验证码', name: 'code', type: 'text', placeholder: '请输入手机号码', value: '', class: 'user_code_input'},
    ],
    [
      {title: '手机号码', name: 'phone', type: 'text', placeholder: '请设置新手机号码', value: '', class: ''},
      {title: '验证码', name: 'code', type: 'text', placeholder: '请输入验证码', value: '', class: 'user_code_input'},
    ],
    [
      {title: '交易密码', name: 'tradePassword', type: 'password', placeholder: '请输入交易密码', value: '', class: ''},
      {title: '重复密码', name: 'tradePassword', type: 'password', placeholder: '请输入重复交易密码', value: '', class: ''},
    ],
    [
      {title: '真实姓名', name: 'username', type: 'text', placeholder: '请填写真实姓名', value: '', class: ''},
      {title: '证件号码', name: 'userId', type: 'text', placeholder: '请输入证件号码', value: '', class: ''},
    ],
  ];

  return formObj[type]
}

//获取侧边栏
export function getMenu() {

  return [{
    id: 0,
    title: '我的资产',
    submenu: [
      {title: 'COI 资产', link: '/user/asset'},
      {title: '线下众筹', link: '/user/fundraising'},
      {title: '交易记录', link: '/user/record'},
      {title: '奖励记录', link: '/user/reward'},
      {title: '邀请好友', link: '/user/invite'},
    ]
  },
    {
      id: 1,
      title: '订单中心',
      submenu: [
        {title: '我的订单', link: '/user/order'},
        {title: '我的购物车', link: '/user/cart'},
        {title: '收货地址', link: '/user/address'},
      ]
    },
    {
      id: 2,
      title: '安全中心',
      submenu: [
        {title: '登录密码', link: '/user/userSafe/0'},
        {title: '交易密码', link: '/user/userSafe/1'},
        {title: '更换手机', link: '/user/userSafe/2'},
        {title: '实名认证', link: '/user/realSenior'},
        {id: 14, title: '安全退出', link: '/form/0'},
      ]
    },
  ];
}

export function getFormRemind(index, remindInfo) {
  index = index === '3' ? 1 : index;
  index = (index === '4' || index === '5') ? 2 : index;

  let formRemind = [{
    remindText: '登录密码必须设置为6~12位，可由数字、字母或符号组成。',
    remindImg: require('../assets/images/icon_lock.png'),
  }, {
    remindText: '交易密码必须设置为6位数字，不可含有字母或符号。',
    remindImg: require('../assets/images/icon_lock.png'),
  }, {
    remindText: '',
    remindImg: require('../assets/images/user_phone.png'),
  }, {
    remindText: '如果因个人使用不合法的、不正确的或盗用他人的身份证信息进行实名认证而造成的损失，将由用户本人自行承担',
    remindImg: require('../assets/images/user_real.png'),
  }
  ];

  if (remindInfo) {
    let temp = {
      remindText: '1、单笔转出最低数量<span class="remind_color">' + remindInfo.coiMinFunds + ' COI</span>，最高数量<span class="remind_color">' + remindInfo.coiMaxFunds + ' COI</span>。<br> ' +
      '2、转出手续为转出数量的费率<span class="remind_color">' + remindInfo.coiFv + '%</span>，最小转账手续费数量<span class="remind_color">' + parseFloat(remindInfo.coiMinFunds) * parseFloat(remindInfo.coiFv) + ' COI</span>。<br>' +
      '3、正常情况下1个工作日到账，最多不超过3个工作日，节假日顺延。',
      remindImg: require('../assets/images/coi_bg.png'),
    };
    formRemind.push(temp)
  }

  return formRemind[index]
}

