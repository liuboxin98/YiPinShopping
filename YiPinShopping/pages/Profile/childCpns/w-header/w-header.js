// pages/profile/childCpns/w-header/w-header.js
const app = getApp();

Component({
  properties: {

  },
  data: {
    userAvatatrUrl: "/assets/images/profile/avatar.png",
    nickname: "登陆/注册",
    login: false   //判断是否登录了
  },
  methods: {
    login() {
      console.log("login");

      if (!this.data.login) {
        let that = this;
        app.getUser(function (res) {
          var userinfo = res.userInfo;

          that.setData({
            userAvatatrUrl: userinfo.avatarUrl,
            nickname: userinfo.nickName,
            login: true
          })
          console.log("callback", res)
        });
      }
    }
  }
})
