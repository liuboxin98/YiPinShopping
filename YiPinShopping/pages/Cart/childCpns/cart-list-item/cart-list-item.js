// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    },
    showEdit: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e) {
      // 1.查找到对应的商品
      const goods = app.globalData.cartList.find(item => item.id == this.properties.goods.id)
      goods.checked = !goods.checked

      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;

      // 3.回调
      console.log(index)
      app.changeGoodsState(index, goods)
    }
  }
})
