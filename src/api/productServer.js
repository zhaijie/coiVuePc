/**
 * Created by Administrator on 2018/11/13 0013.
 */
import http from './http';

//获取banner
export function getBannerList(params, callback) {
  http.post('/app/feedback/getBannerList', params, function (data, err) {
    callback(data, err)
  })
}

//获取一级类型
export function getIndexType(callback) {
  http.post('/app/feedback/getIndexType', {}, function (data, err) {
    data.item[0].zwm = '全部';
    callback(data, err)
  })
}

//获取大礼包
export function bigGiftBag(callback) {
  http.post('/app/product/bigGiftBag', {}, function (data, err) {
    callback(data, err)
  })
}

//新品速递
export function newProductList(callback) {
  http.post('/app/product/newProductList', {}, function (data, err) {
    callback(data, err)
  })
}

//获取首页商品列表
export function indexProduct(callback) {
  http.post('/pc/coit/productListPC', {}, function (data) {
    data.forEach(function (v1) {
      let temp = [];
      v1.productList = [];

      if (v1.products.length > 4 && v1.products.length < 9) {
        v1.products = v1.products.slice(0, 4);
      }

      v1.products.forEach(function (v2, i2) {
        temp.push(v2);
        if ((i2 + 1) % 5 === 0) {
          v1.productList.push(temp);
          temp = [];
        }
      });

      v1.productList.push(temp);
    });
    callback(data)
  })
}

//查询商品分类
export function listClassification(params, callback) {
  http.post('/pc/coit/listClassification', params, function (data) {
    data.forEach(function (v) {
      let temp = [];
      v.levelThree = [];
      v.fenlei.forEach(function (v2, i2) {
        temp.push(v2);
        if ((i2 + 1) % 5 === 0) {
          v.levelThree.push(temp);
          temp = [];
        }
      });
      v.levelThree.push(temp);
    });
    callback(data)
  })
}

//获取商品列表
export function getProductList(params, callback) {
  http.post('/pc/coit/categoryProductListPC', params, function (data, err) {
    callback(data, err)
  })
}

//获取商品详情
export function getProductDetail(params, callback) {
  http.post('/pc/coit/getProductInfoPC', params, function (data, err) {
    callback(data, err)
  })
}


//商品搜素
export function searchProduct(params, callback) {
  http.post('/pc/coit/searchProductPC', params, function (data, err) {
    callback(data, err)
  })
}











