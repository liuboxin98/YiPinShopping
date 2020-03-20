//获取应用实例
const app = getApp()

Component({
  data: {
    num: 1,
    minusStatus: 'disable'
  },
  methods: {
    //事件处理函数
    /*点击减号*/
    bindMinus: function () {
      var num = this.data.num;
      if (num > 1) {
        num--;
      }
      var minusStatus = num > 1 ? 'normal' : 'disable';
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    },
    /*点击加号*/
    bindPlus: function () {
      var num = this.data.num;
      num++;
      var minusStatus = num > 1 ? 'normal' : 'disable';
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    },
    /*输入框事件*/
    bindManual: function (e) {
      var num = e.detail.value;
      var minusStatus = num > 1 ? 'normal' : 'disable';
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    }
  }
})