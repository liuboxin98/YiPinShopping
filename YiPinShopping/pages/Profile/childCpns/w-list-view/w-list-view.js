// pages/profile/childCpns/w-list-view/w-list-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCart(e) {
      console.log("in handleCart")
      wx.switchTab({
        url: '/pages/Cart/Cart',
      });
    },

    handleDownlandApp(e) {
      console.log("in handleDownlandApp")
    }
  }
})
