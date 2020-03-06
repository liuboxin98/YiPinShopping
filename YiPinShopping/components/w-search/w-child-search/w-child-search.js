import { getGoodsData } from '../../../service/search'

const BACK_TOP_POSITION = 1000;
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
    value: '',
    goods: {
      page: 0, list: []
    },
    islastpage: false,  //是否是最后一页
    showBackTop: false,  //回到顶部图标
    topPosition: 0,  //顶部高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //----------------------------- 数据请求 --------------------------------
    //获取商品数据
    _getGoodsData(gname) {
      wx.showLoading({
        title: '加载中...',
      });
      const page = this.data.goods.page + 1;
      getGoodsData(gname, page).then(res => {
        // 1.取出数据
        const data = res.data[0];
        // 判断最后一页
        if (data.length <= 0) {
          wx.showToast({
            title: '没有数据啦！',
            icon: 'info',
            duration: 2000
          })
          this.setData({
            islastpage: true
          });
          return;
        }
        // 2.将数据临时获取
        const goods = this.data.goods;
        //console.log(data);
        data.forEach(item => {
          goods.list.push(item)
        });
        goods.page += 1;

        // 3.最新的goods设置到goods中
        this.setData({
          goods: goods
        })
        wx.hideLoading()
      });
    },
    //底部下拉获取数据
    loadMore() {
      console.log('下拉')

      //判断是否是最后一页
      if (this.data.islastpage) {
        wx.showToast({
          title: '没有数据啦！',
          icon: 'info',
          duration: 2000
        });
        return;
      }
      let gname = this.data.value;
      this._getGoodsData(gname);
    },

    //----------------------------事件--------------------------------

    //获取用户输入的用户名
    getInputValue: function (e) {
      this.setData({
        value: e.detail.value
      })
    },

    //根据关键词查询商品数据
    handleSearch() {
      this.setData({
        goods: { page: 0, list: [] },
        islastpage: false  // 当切换时改变是否是最后一页
      })
      let gname = this.data.value;
      this._getGoodsData(gname);
    },

    //scroll 滚动事件
    scrollPosition(e) {
      // 1.获取滚动的顶部
      const position = e.detail.scrollTop;
      console.log(position)
      // 2.是否显示h回到顶部图标
      this.setData({
        showBackTop: position > BACK_TOP_POSITION,
      })
    },

    //回到顶部
    onBackTop() {
      this.setData({
        showBackTop: false,
        topPosition: 0,
      })
    }



  }
})
