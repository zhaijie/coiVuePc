/**
 * Created by Administrator on 2018/11/30 0030.
 */
import http from './http';

//立即购买商品详情
export function getOrderDetails(params, callback) {
  http.post('/app/product/getOrderDetails', params, function (data, err) {
    callback(data, err)
  })
}

//提交订单
export function addOrder(params, callback) {
  http.post('/app/product/addOrder', params, function (data, err) {
    callback(data, err)
  })
}

//立即付款
export function addPayment(params, callback) {
  http.post('/app/product/addPayment', params, function (data, err) {
    callback(data, err)
  })
}

//订单列表
export function getOrderList(params, callback) {
  http.post('/pc/coit/orderListPC', params, (data, err) => {
    timerFun(data);
    callback(data, err);
  })
}

//删除订单
export function delOrder(params, callback) {
  http.post('/app/product/delOrder', params, (data, err) => {
    callback(err);
  })
}

//确定收货
export function updateOrder(params, callback) {
  http.post('/app/product/updateOrder', params, (data, err) => {
    callback(err);
  })
}

//获取订单详情
export function getOrderDetailsById(params, callback) {
  http.post('/app/product/getOrderDetailsMap', params, (data, err) => {
    timerFun(data);
    if (data.paymentState) {
      data.item[0].paymentState = true;
    }
    callback(data.item[0], err);
  })
}

//是否已过期
export function timerFun(data) {
  let overdueTime = 30;

  let newTimestamp = new Date().getTime();
  if (data.item) {
    data.item.forEach(function (v) {
      if (v.status === '待支付') {
        handle(v)
      }
    });
  } else {
    handle(data)
  }

  function handle(v) {
    let timestamp = new Date(v.time).getTime();
    //获取秒数相差秒数
    let second = (newTimestamp - timestamp) / 1000;

    //判断是否过期
    if (second >= (overdueTime * 60) && second > 0) {
      v.status = '已过期'
    } else {
      data.paymentState = true;
      let minNum = (overdueTime - Math.floor(second / 60)) - 1;
      let secondNum = 60 - (Math.floor(second) % 60);

      v.minNum = (minNum < 10 ? '0' + minNum : minNum);
      v.secondNum = (secondNum < 10 ? '0' + secondNum : secondNum);
    }
  }

  return data
}


