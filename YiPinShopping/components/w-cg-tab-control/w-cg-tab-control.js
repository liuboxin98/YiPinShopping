// components/w-cg-tab-control/w-cg-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: ['衣服', '裤子', '鞋子', '上衣', '包包', '个护', '裙子']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    items: {
      '衣服': ['冲锋衣', 'T恤', '毛衣', '风衣'],
      '裤子': ['短裤', '长裤', '牛仔裤', '休闲裤', '运动裤'],
      '鞋子': ['运动鞋', '板鞋', '拖鞋', '布鞋', '高跟鞋']
    },
    type_item: ['冲锋衣', 'T恤', '毛衣', '风衣']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click_item(e) {
      const index = e.currentTarget.dataset.index;
      // 1.设置最新的index   

      var title = this.properties.titles[index];
      var item = this.data.items[title];
      if (item == undefined)
        item = [];
      console.log(item)
      this.setData({
        currentIndex: index,
        type_item: item
      })

    }
  }
})
