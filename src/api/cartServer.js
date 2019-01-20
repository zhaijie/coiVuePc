/**
 * Created by Administrator on 2018/11/30 0030.
 */
import http from './http';

//加入购物车
export function addShopping(params, callback) {
  http.post('/app/product/addShopping', params, function (data, err) {
    callback(err)
  })
}

//删除购物车
export function delShopping(params, callback) {
  http.post('/app/product/delShopping', params, function (data, err) {
    callback(err)
  })
}

//修改购物车数量
export function changeShoppingCount(params, callback) {
  http.post('/pc/coit/addShoppingNum', params, function (data, err) {
    callback(err)
  })
}

//获取购物车列表
export function getShoppingList(callback) {
  http.post('/app/product/listShopping', {}, function (data, err) {

    let shoppingList = [];
    let loseList = [];

    data.item.forEach(function (v) {
      if (v.shelves === 'S') {
        shoppingList.push(v)
      } else {
        loseList.push(v)
      }
    });

    callback(shoppingList, loseList, err)
  })
}

//清除购物车失效商品
export function delFailure(params, callback) {
  http.post('/pc/coit/delFailure', params, function (data, err) {
    callback(err)
  })
}




