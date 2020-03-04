// components/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    items: {
      type: Object,
      value: []
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
    itemClick(e) {
      const data = this.data.items;
      console.log(data);
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + data.GoodsID + "&item=" + JSON.stringify(data),
      })
    }
  }
})
