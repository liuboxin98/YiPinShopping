// pages/Home/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isload: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageLoad() {
      if (!this.data.isload) {

        this.triggerEvent('imageLoad', {}, {})
        this.data.isload = true
      }
    }
  }
})
