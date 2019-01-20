import * as types from './mutation-types';
import http from '../api/http';
import {getUserInfo} from '../utils/utils';

const actions = {

  [types.SET_SHOPPING_COUNT]({commit, state}) {

    //判断是否登录
    if (!getUserInfo().username) {
      return
    }
    // if (state.shoppingCount !== null) {
    //   return;
    // }
    http.post('/app/product/getShoppingCount', '', function (data) {
      commit(types.SET_SHOPPING_COUNT, data.amount);
    });
  },

  [types.RECOMMEND_PRODUCT]({commit, state}) {
    if (state.recommendProduct.length) {
      return;
    }

    http.post('/pc/coit/recommendedList', '', function (data) {
      commit(types.RECOMMEND_PRODUCT, data);
    });
  },

  [types.SET_PRODUCT_TYPE]({commit, state}, callback) {
    if (state.productType.length) {
      callback(state.productType);
      return;
    }

    http.post('/app/feedback/getIndexType', '', function (data) {
      data.item[0].zwm = '全部';
      commit(types.SET_PRODUCT_TYPE, data.item);
      callback(data.item);
    });
  },

  [types.DEAL_CONFIG]({commit, state}, callback) {
    if (state.dealConfig !== null) {
      callback(state.dealConfig);
      return;
    }

    http.post('/app/trading/getDealConfig', '', function (data) {
      commit(types.DEAL_CONFIG, data);
      callback(data);
    });
  }
};

export default actions
