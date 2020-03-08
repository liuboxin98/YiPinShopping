// pages/profile/profile.js
var app = getApp();
Page({
  data: {
    orderList: [
      { icon: 'message.png', info: '我的消息' },
      { icon: 'pointer.png', info: '积分商城' },
      { icon: 'vip.png', info: '会员卡' },
    ],
    serviceList: [
      { icon: 'cart.png', info: '我的购物车', event: "handleCart" },
      { icon: 'app.png', info: '下载购物APP', event: "handleDownlandApp" },
    ]
  },
  onLoad: function (options) {
    if (app.userInfo != null) {
      
    }
  },
})