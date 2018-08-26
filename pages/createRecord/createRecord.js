// pages/createRecord/createRecord.js
import {
  recordDetailData
} from './recordDetailMockData.js'

Page({
  data: {
    showAddDescInput: false,
    newCustomDesc: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加現場記錄'
    });
    this.setData({
      ...recordDetailData.data
    });
  },

  onShow: function () {
    console.log(this.data)
  },

  openScan() {
    wx.scanCode({

    });
  },

  choiceEntity() {
    wx.navigateTo({
      url: '../checkpointList/checkpointList?type=resource'
    });
  },

  choiceImage() {
    let _this = this;

    wx.chooseImage({
      success: function(e) {
        const images = _this.data.images.concat(e.tempFilePaths);

        _this.setData({
            images: images
        });
      }
    })
  },

  previewImage(e) {
    wx.previewImage({
      current: e.target.dataset.url,
      urls: this.data.images,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  removeImage(e) {
    let index = e.target.dataset.index;
   
    let newImages = this.data.images;
    newImages.splice(index, 1);

    this.setData({
      images: newImages
    });
  },

  bindKeyInput: function (e) {
    this.setData({
      newCustomDesc: e.detail.value
    })
  },

  addDesc(e) {
    let desc = e.target.dataset.desc,
        oldDescList = this.data.desc.slice(0),
        newDescList = [];

    oldDescList.push({
      checked: true,
      text: this.data.newCustomDesc,
      type: 'custom'
    });

    newDescList = oldDescList;

    this.setData({
      desc: newDescList
    });

    this.toggleAddDescInput();
  },

  toggleAddDescInput() {
    this.setData({
      showAddDescInput: !this.data.showAddDescInput
    })
  },

  checkboxChange(e) {
    let index = e.currentTarget.dataset.index,
        oldDescList = this.data.desc,
        newDescList = [];

    oldDescList[index].checked = !oldDescList[index].checked;
    newDescList = oldDescList.concat([]);

    this.setData({
      desc: newDescList
    })
  },

  showAction(e) {
    let eventSource = e.target.dataset.name;
    console.log(eventSource)

    switch (eventSource) {
      case 'abandon':
        wx.navigateBack({
          
        });
      break;
      case 'nopass':
        wx.showActionSheet({
          itemList: ['保存記錄', '繼續檢查此實體'],
          success: function (res) {
            if(res.tapIndex === 0) {
              wx.navigateBack({
                delta: 2
              });
            } else if (res.tapIndex === 1) {
              wx.redirectTo({
                url: '../checkpointList/checkpointList?type=checkpoint'
              });
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        });
        break;
      case 'pass':
        wx.showActionSheet({
          itemList: ['保存記錄', '繼續檢查此實體'],
          success: function (res) {
            if (res.tapIndex === 0) {
              wx.navigateBack({
                delta: 2
              });
            } else if (res.tapIndex === 1) {
              wx.redirectTo({
                url: '../checkpointList/checkpointList?type=checkpoint'
              });
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        });
        break;
    }
    
  },

  goStandardDesc() {
    wx.navigateTo({
      url: '../standardDesc/standardDesc',
    })
  }

})