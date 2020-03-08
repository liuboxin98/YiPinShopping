// pages/profile/childCpns/w-header/w-header.js
const app = getApp();

Component({
  properties: { },
  onLoad: function (options) {
    console.log(app);
    var userinfo = app.userInfo;
    that.setData({
      userAvatatrUrl: userinfo.avatarUrl,
      nickname: userinfo.nickName,
    })
  },
  data: {
    userAvatatrUrl: "/assets/images/profile/avatar.png",
    nickname: "登陆/注册"
  },
  methods: {
    login() {

      if (app.userInfo == null) {
        let that = this;
        app.getUser(function (res) {
          var userinfo = res.userInfo;

          that.setData({
            userAvatatrUrl: userinfo.avatarUrl,
            nickname: userinfo.nickName
          })
          console.log("callback", res)
        });
      }
      else {

      }
    }
  }
})
