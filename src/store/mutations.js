import * as types from './mutation-types'

const mutations = {
  [types.SET_FOOTER_SHOW](state, footerState) {
    state.footerShow = footerState
  },

  [types.SET_LOGIN_STATE](state, loginState) {
    state.loginState = loginState
  },

  [types.SET_SHOPPING_COUNT](state, data) {
    state.shoppingCount = data;
  },

  [types.RECOMMEND_PRODUCT](state, data) {
    state.recommendProduct = data;
  },

  [types.SET_PRODUCT_TYPE](state, data) {
    state.productType = data;
  },

  [types.DEAL_CONFIG](state, data) {
    state.dealConfig = data;
  },
};

export default mutations
