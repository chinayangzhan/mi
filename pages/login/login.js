const app = getApp();
const BASE_URL = app.globalData.base_url;


Page({
  data: {
    username: '',
    password: ''
  },

  onLoad() {
    wx.hideTabBar({

    })
    wx.showLoading({
      title: '登錄中...',
      mask: true
    })
    wx.request({
      url: `${BASE_URL}/login/login`,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "username": "root",
        "password": "admin"
      },
      success: function (data) {
        // 这里修改成跳转的页面 
        wx.showToast({
          title: '登錄成功',
          icon: 'success',
          duration: 2000
        })
        console.log('data', data)
        app.globalData.token = data.data.access_token;
        console.log(getApp().globalData)
        wx.switchTab({
          url: '../index/index',
        })

      },
      fail: function () {
        wx.showToast({
          title: '登錄失敗請重試',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },

  // 获取输入账号 
  userInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '登錄中...',
        mask: true
      })
      wx.request({
        url: `${BASE_URL}/login/login`,
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        data: {
          "username": "root",
          "password": "admin"
        },
        success: function(data) {
          // 这里修改成跳转的页面 
          wx.showToast({
            title: '登錄成功',
            icon: 'success',
            duration: 2000
          })
          console.log('data',data)
          getApp().globalData.token = data.access_token;
          wx.switchTab({
            url: '../index/index',
          })
          
        },
        fail: function() {
          wx.showToast({
            title: '登錄失敗請重試',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function() {
          wx.hideLoading();
        }
      })
    }
  }
})