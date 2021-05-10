import {
  ADD_COUNT,
  ADD_PUSH_CART
} from './mutations-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每一个方法尽可能完成的事件比较单一
  // addCart(state, payload) {
  //   //1. 查看数组中是否存在当前添加的商品
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //
  //   //2. 判断oldProduce
  //   if (oldProduct) {
  //     // 如果为true就为存在的商品count值+1
  //     oldProduct.count += 1
  //   } else {
  //     // 如果为false,就为当前添加的商品添加count属性，值为1
  //     // 并添加到cartList数组中
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_PUSH_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
