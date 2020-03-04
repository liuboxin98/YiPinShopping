// pages/Home/Home.js
import { getMultiData, getGoodsData, getRecomment, getBanner } from '../../service/home.js'

const types = ['dress', 'clothes', 'mural']
const BACK_TOP_POSITION = 1000;

Page({
  data: {
    banners: {},
    recommend: null,
    item: [],
    goods: {
      'clothes': { page: 0, list: [] },
      'dress': { page: 0, list: [] },
      'mural': { page: 0, list: [] }
    },
    currentType: 'dress',
    tabControlTop: 0,
    topPosition: 0,
    showBackTop: false,
    showTabControl: false,
    tabscrollTop: 0,
    islastpage: false  //是否是最后一页
  },
  onLoad: function (options) {
    this._getMultiData();

    this._getBanner();
    this._getRecomment();

    this._getGoodsData('clothes');
    this._getGoodsData('mural');
    this._getGoodsData('dress');
  },

  //------------------------- 数据请求 -----------------------------------

  //页面初始数据
  _getMultiData() {
  },
  //获取banner图片
  _getBanner() {
    var banner = [];

    getBanner().then(res => {

      var res = res.data[0]
      res.forEach(item => {
        banner.push({ image: item.GoodsImage, goodsid: item.GoodsID, goodstitle: item.GoodsName });
      });
      console.log(banner)
      this.setData({
        banners: banner
      })
    })

  },
  // 获取推荐数据
  _getRecomment() {
    var recommend = [];
    getRecomment().then(res => {
      var res = res.data[0]

      res.forEach(item => {
        recommend.push({ title: item.recommentName, image: item.image });
      });

      console.log(recommend)
      this.setData({
        recommend: recommend
      })
    })


  },
  //获取商品数据
  _getGoodsData(type) {
    wx.showLoading({
      title: '加载中...',
    });

    var typeid = null;

    if (type == 'clothes')
      typeid = 2
    if (type == 'mural')
      typeid = 3
    if (type == 'dress')
      typeid = 4

    const page = this.data.goods[type].page + 1;
    getGoodsData(typeid, page).then(res => {

      // 1.取出数据
      const data = res.data[0];

      // 判断最后一页
      if (data.length <= 0) {
        wx.showToast({
          title: '最后一页啦！',
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
        goods[type].list.push(item)
      });

      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })

      wx.hideLoading()
      //console.log(this.data.goods)
    });
  },
  //底部下拉获取数据
  loadMore() {
    console.log('下拉')

    //判断是否是最后一页
    if (this.data.islastpage) {
      wx.showToast({
        title: '最后一页啦！',
        icon: 'info',
        duration: 2000
      });

      return;
    }

    this._getGoodsData(this.data.currentType);
  },
  //-------------------------- 点击事件 ----------------------------------

  handletabclick(event) {

    const index = event.detail.index;
    this.setData({
      currentType: types[index],
      islastpage: false  // 当切换时改变是否是最后一页
    })
  },

  onBackTop() {
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },

  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;

    // 2.设置是否显示
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })

    const flag = position >= this.data.tabscrollTop;

    if (flag != this.data.showTabControl) {
      this.setData({
        showTabControl: flag
      })
    }
  },

  onImageLoad() {

    wx.createSelectorQuery().select('#tab_control').boundingClientRect((rect) => {
      console.log(rect)
      this.data.tabscrollTop = rect.top;
      // const show = rect.top > 0
      // this.setData({
      //   showTabControl: !show
      // })
    }).exec()
  }
})