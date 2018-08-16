//index.js
import {
  taskListData
} from './taskListMockData';

Page({
  data: {
    curTabIndex: 0,
    aboveList: [],
    belowList: []
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: 'OSM 巡檢任務'
    });
  },

  onShow() {
    this.getTaskList();
  },

  getTaskList() {
    wx.showLoading({
      title: '加載中...',
      mask: true
    });

    setTimeout(() => {
      let checkingList = [],
          needCheckList = [],
          recheckingList = [],
          rectifyingList = [],
          doneTaskList = [];
          
      for (let i = 0; i < taskListData.data.length; i++) {
          const taskItem = taskListData.data[i];
            
          switch (taskItem.state) {
                case 'checking':
                  checkingList.push(taskItem);
                  break;
                case 'needcheck':
                  needCheckList.push(taskItem);
                  break;
                case 'rechecking':
                  recheckingList.push(taskItem);
                  break;
                case 'rectifying':
                  rectifyingList.push(taskItem);
                  break;
                case 'done':
                  doneTaskList.push(taskItem);
                  break;
            }
          }

          this.setData({
            checkingList: checkingList,
            needCheckList: needCheckList,
            recheckingList: recheckingList,
            rectifyingList: rectifyingList,
            doneTaskList: doneTaskList
          });

          if(this.data.curTabIndex === 0) {
            this.setData({
              aboveList: checkingList,
              belowList: needCheckList
            });
          } else if (this.data.curTabIndex === 1) {
            this.setData({
              aboveList: recheckingList,
              belowList: rectifyingList
            });
          } else if (this.data.curTabIndex === 2) {
            this.setData({
              aboveList: doneTaskList,
              belowList: []
            });
          }

          wx.hideLoading();
    }, 500)
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

    switch (taskState) {
      case 'checking':
        wx.navigateTo({
          url: '../addRecord/addRecord'
        });
        break;
      case 'needcheck':
        wx.navigateTo({
          url: '../addRecord/addRecord'
        });
        break;
    }
  }
})