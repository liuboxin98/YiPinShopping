// components/w-search/w-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handler_search() {
      console.log("in search")
      // wx.navigateTo({
      //   url: '/pages/search/search',
      // })
      wx.navigateTo({
        url: '/components/w-search/w-child-search/w-child-search',
      })
    }
  }
})
