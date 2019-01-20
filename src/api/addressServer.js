/**
 * Created by Administrator on 2018/11/30 0030.
 */
import http from './http';

//获取省市区
export function getArea(params, callback) {
  http.post('/app/setup/getArea', params, function (data, err) {
    let area = [];
    data.item.forEach(function (val) {
      let temp = {};

      temp.value = val.areaName;
      temp.id = val.areaId;
      area.push(temp);
    });
    callback(area, err)
  })
}

//添加收货地址
export function addAddress(params, callback) {
  http.post('/app/setup/addReceivingAddress', params, function (data, err) {
    callback(data, err)
  })
}

//修改收地址
export function updateAddress(params, callback) {
  http.post('/app/setup/updateAddress', params, function (data, err) {
    callback(data, err)
  })
}

//查询收货地址
export function getAddressList(callback) {
  http.post('/app/setup/getReceivingAddressList', {}, function (data, err) {
    callback(data, err)
  })
}


//根据id查询收货地址
export function getAddressById(params, callback) {
  http.post('/app/setup/getAddressById', params, function (data, err) {
    callback(data, err)
  })
}

// 删除收货地址
export function delAddress(params, callback) {
  http.post('/app/setup/deleteReceivingAddress', params, function (data, err) {
    callback(err)
  })
}

export function getAddressForm() {
  return [
    {title: '收货姓名', name: 'username', type: 'type', placeholder: '请填写收货人姓名', value: '', class: 'address_input'},
    {title: '手机号码', name: 'phone', type: 'type', placeholder: '请填写手机号码', value: '', class: 'address_input'},
  ]
}







