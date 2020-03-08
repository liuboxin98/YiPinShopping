const app = getApp();
Page({
    getUserInfo() {
        app.getUser(function (res) {
            //成功登录
            wx.switchTab({
                url: '/pages/Cart/Cart',
            });
            console.log("callback", res)
        });
    }
})