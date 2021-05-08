import {
  ADD_COUNT,
  ADD_PUSH_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    //1. 查看数组中是否存在当前添加的商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //2. 判断oldProduce
    if (oldProduct) {
      // 如果为true就为存在的商品count值+1
      // oldProduct.count += 1
      context.commit(ADD_COUNT, oldProduct)
    } else {
      // 如果为false,就为当前添加的商品添加count属性，值为1
      // 并添加到cartList数组中
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_PUSH_CART, payload)
    }
  }
}
