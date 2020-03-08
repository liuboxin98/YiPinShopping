//app.js
import { baseURL } from "./service/config"

App({
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.id === obj.id)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    console.log(this.globalData.cartList)

    // 2.购物车回调
    // if (this.addCartCallback) {
    //   this.addCartCallback()
    // }
  },
  Login(e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code, baseURL)
          // 获取临时登录凭证
          // 将code传入后台获取用户的openid/session_key
          wx.request({
            url: `${baseURL}/api/login`,
            method: 'post',
            data: {
              code: res.code
            },
            success: function (res) {
              // 记录登录用户
              e.globalData.loginUser = res.data.data;
              // 获取购物车数据
              wx.request({
                url: `${baseURL}/api/getShopCartByName`,
                method: 'POST',
                data: {
                  username: res.data.data.username
                },
                success: function (res) {
                  var data = res.data[0];
                  // 赋值购物车数据
                  data.forEach(item => {
                    var cart = {}
                    cart.checked = true;
                    cart.count = item.goodsOrderCount;
                    cart.id = item.goodsID;
                    cart.imageURL = item.goodsImg;
                    cart.price = item.goodsPrice;
                    cart.title = item.goodsMsg;
                    e.globalData.cartList.push(cart)
                  });
                  console.log(e.globalData.cartList)
                  wx.hideLoading();
                }
              })
            },
          })
        } else {
          console.log("登录失败", res.errMsg);
        }
      }
    })
  },
  getUser: function (callback) {
    //查看是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              callback(res)
              this.globalData.userInfo = res.userInfo;

              this.Login(this);
              console.log(this)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      }
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 判断是否授权
    wx.getSetting({
      success: (res) => {
        // 没有授权
        if (!res.authSetting["scope.userInfo"]) {
          // 跳转至授权页
          wx.showModal({
            title: '温馨提示',
            content: '需要您的授权！',
            showCancel: false,
            confirmText: '去授权',
            success: function () {
              wx.navigateTo({
                url: '/pages/auth/auth'
              });
            }
          })
        } else {
          this.Login(this);
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    cartList: []
  }
})