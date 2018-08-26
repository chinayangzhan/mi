//index.js
//default is 0 未开始， 5 执行中， 10 复审中 15 整改中 20完成
import {
  taskListData
} from './taskListMockData';

const app = getApp();

Page({
  data: {
    curTabIndex: 0,
    aboveList: [],
    belowList: []
  },
  onLoad(options) {
    wx.showTabBar({});
    wx.setNavigationBarTitle({
      title: 'OSM 巡檢任務'
    });
  },

  onShow() {
    this.setData({
      data: Object.assign(app.globalData, this.data)
    })
    this.getTaskList();
  },

  getTaskList() {
    const globalData = this.data.data,
      that = this;
    wx.showLoading({
      title: '加載中...',
      mask: true
    });
    wx.request({
      url: `${globalData.base_url}/inspection/list`,
      header: {
        token: globalData.token
      },
      success: function(res) {
        console.log(res)
        const taskListData = res.data

        let checkingList = [],
          needCheckList = [],
          recheckingList = [],
          rectifyingList = [],
          doneTaskList = [];

        for (let i = 0; i < taskListData.data.length; i++) {
          const taskItem = taskListData.data[i];
          const date = new Date(taskItem.dueDay * 1000)
          let dueDay = date.getMonth() + 1 + "月" + date.getDate() + "日"
          let doneTime = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()
          // if ((new Date() / 1000 - taskItem.dueDay) / (3600 * 24)>1){
          //   taskItem.dueDay = "<1天"
          // } else {
          taskItem.dueDay = dueDay
          taskItem.doneTime = doneTime
          // }


          switch (taskItem.state) {
            case 5:
              checkingList.push(taskItem);
              break;
            case 0:
              needCheckList.push(taskItem);
              break;
            case 10:
              recheckingList.push(taskItem);
              break;
            case 15:
              rectifyingList.push(taskItem);
              break;
            case 20:
              doneTaskList.push(taskItem);
              break;
          }
        }

        that.setData({
          checkingList: checkingList,
          needCheckList: needCheckList,
          recheckingList: recheckingList,
          rectifyingList: rectifyingList,
          doneTaskList: doneTaskList
        });

        if (that.data.curTabIndex === 0) {
          that.setData({
            aboveList: checkingList,
            belowList: needCheckList
          });
        } else if (that.data.curTabIndex === 1) {
          that.setData({
            aboveList: recheckingList,
            belowList: rectifyingList
          });
        } else if (that.data.curTabIndex === 2) {
          that.setData({
            aboveList: doneTaskList,
            belowList: []
          });
        }
      },
      fail() {
        wx.showToast({
          title: '加载失败请重试',
        })
      },
      complete() {
        wx.hideLoading();
      }
    })

  },

  tabSwitch(e) {
    let tabIndex = e.target.dataset.index;

    switch (tabIndex) {
      case '0':
        this.setData({
          aboveList: this.data.checkingList,
          belowList: this.data.needCheckList,
          curTabIndex: tabIndex
        });
        break;
      case '1':
        this.setData({
          aboveList: this.data.recheckingList,
          belowList: this.data.rectifyingList,
          curTabIndex: tabIndex
        });
        break;
      case '2':
        this.setData({
          aboveList: this.data.doneTaskList,
          belowList: [],
          curTabIndex: tabIndex
        });
        break;
    }
  },

  goTask(e) {
    let taskState = e.currentTarget.dataset.state;
    console.log(taskState)

    switch (taskState) {
      case 5:
        wx.navigateTo({
          url: '../addRecord/addRecord'
        });
        break;
      case 0:
        wx.navigateTo({
          url: '../addRecord/addRecord'
        });
        break;
      case 20:
        wx.navigateTo({
          url: '../report/report'
        });
        break;
      case 10:
        wx.navigateTo({
          url: '../reformRecheckList/reformRecheckList?type=recheck',
        })
      case 15:
        wx.navigateTo({
          url: '../reformRecheckList/reformRecheckList?type=reform',
        })
    }
  }
})