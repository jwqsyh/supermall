import Vue from 'vue'
// 1. 导入vuex
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";

// 2. 安装Vuex插件
Vue.use(Vuex)

// 3. 创建Vuex对象
const state = {
  //创建数组，用来保存购物车的商品
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

// 4. 导出store
export default store
