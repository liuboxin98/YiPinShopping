// pages/cart/childCpns/bottom-bar/bottom-bar.js

const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    showEdit: {
      type: Boolean
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
    CheckAll() {
      this.triggerEvent('onSelectAll', {}, {})
    },
    handleEdit() {
      // 取反改变编辑状态
      var showedit = !this.properties.showEdit;
      this.triggerEvent('clickEdit', { showedit: showedit }, {})
    }
  }
})
