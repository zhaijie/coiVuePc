/**
 * Created by Administrator on 2018/6/4 0004.
 */

import Vue from 'vue'
import vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(vuex);

export default new vuex.Store({//store对象
  state,
  getters,
  mutations,
  actions
});
