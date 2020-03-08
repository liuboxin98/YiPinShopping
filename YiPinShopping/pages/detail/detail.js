// pages/detail/detail.js
const app = getApp();
import { getGoodsData } from "../../service/cart"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    image: null,
    item: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var data = JSON.parse(options.item);
    console.log(data)
    // 1.获取传入的iid
    this.setData({
      id: options.id,
      image: [{ "image": data.GoodsImage }],
      item: data
    })
  },
  onAddCart() {
    wx.showLoading({
      title: '正在加入购物车...',
    });
    console.log(app.globalData.loginUser);

    // 1.获取商品对象
    const obj = {}
    obj.id = this.data.item.GoodsID;
    obj.imageURL = this.data.item.GoodsImage;
    obj.title = this.data.item.GoodsName;
    obj.price = this.data.item.GoodsPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)
    var username = app.globalData.loginUser.username;
    getGoodsData(username, obj.id).then(res => {
      console.log(res)
      if (res.data.data.rowsAffected > 0) {
        // 3.加入成功提示
        wx.showToast({
          title: '加入购物车成功',
        })
      }
    });
  }
})