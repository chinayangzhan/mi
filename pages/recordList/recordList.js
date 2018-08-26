import {
  recordListData,
  entityRecordListData,
  checkpointRecordListData
} from './recordListMockData';

const app = getApp();

let windowHeight;
wx.getSystemInfo({
  success(res) {
    windowHeight = res.windowHeight;
  }
});

Page({
  data: {
    selection: 'all',
    totalCount: 0,
    passedCount: 0,
    unpassedCount: 0,
    selectedIndex: null
  },

  onLoad: function(options) {
    this.setData({
      pageType: !options.type ? 'all' : options.type,
      data: Object.assign(app.globalData, this.data)
    });

    let navigationTitle = '檢查記錄';
    if (this.data.pageType === 'checkpoint') {
      navigationTitle = '檢查點現場記錄';
    } else if (this.data.pageType === 'entity') {
      navigationTitle = '實體現場記錄';
    }
    wx.setNavigationBarTitle({
      title: navigationTitle
    });
  },

  getAllRecordListData() {
    let passedRecordList = [],
      unpassedRecordList = [];
    for (const index in recordListData.data.recordList) {
      recordListData.data.recordList[index].index = Number(index) + 1;

      if (recordListData.data.recordList[index].status == 2) {
        passedRecordList.push(recordListData.data.recordList[index]);
      } else if (recordListData.data.recordList[index].status == 3) {
        unpassedRecordList.push(recordListData.data.recordList[index]);
      }
    }

    this.setData({
      recordListData: recordListData.data.recordList,
      recordListPassedData: passedRecordList,
      recordListUnpassedData: unpassedRecordList,
      totalCount: recordListData.data.recordList.length,
      passedCount: passedRecordList.length,
      unpassedCount: unpassedRecordList.length
    });
  },

  getCheckpointRecordListData() {
    let passedRecordList = [],
      unpassedRecordList = [];
    for (const index in checkpointRecordListData.data.recordList) {
      checkpointRecordListData.data.recordList[index].index = Number(index) + 1;

      if (checkpointRecordListData.data.recordList[index].status == 2) {
        passedRecordList.push(checkpointRecordListData.data.recordList[index]);
      } else if (checkpointRecordListData.data.recordList[index].status == 3) {
        unpassedRecordList.push(checkpointRecordListData.data.recordList[index]);
      }
    }

    this.setData({
      checkpointName: checkpointRecordListData.data.checkpointName,
      recordListData: checkpointRecordListData.data.recordList,
      recordListPassedData: passedRecordList,
      recordListUnpassedData: unpassedRecordList,
      totalCount: checkpointRecordListData.data.recordList.length,
      passedCount: passedRecordList.length,
      unpassedCount: unpassedRecordList.length
    }, () => {
      this.calculateListHeight();
    });
  },

  getEntityRecordListData() {
    let passedRecordList = [],
      unpassedRecordList = [];
    for (const index in entityRecordListData.data.recordList) {
      entityRecordListData.data.recordList[index].index = Number(index) + 1;

      if (entityRecordListData.data.recordList[index].status == 2) {
        passedRecordList.push(entityRecordListData.data.recordList[index]);
      } else if (entityRecordListData.data.recordList[index].status == 3) {
        unpassedRecordList.push(entityRecordListData.data.recordList[index]);
      }
    }

    this.setData({
      entityName: entityRecordListData.data.entityName,
      recordListData: entityRecordListData.data.recordList,
      recordListPassedData: passedRecordList,
      recordListUnpassedData: unpassedRecordList,
      totalCount: entityRecordListData.data.recordList.length,
      passedCount: passedRecordList.length,
      unpassedCount: unpassedRecordList.length
    }, () => {
      this.calculateListHeight();
    });
  },

  calculateListHeight() {
    let query = wx.createSelectorQuery();
    query.select('#pageHeader').fields({
        size: true
      },
      (res) => {
        this.setData({
          listHeight: (windowHeight - res.height) + 'px'
        })
      }
    );
    query.exec();
  },

  selectType(e) {
    this.setData({
      selection: e.currentTarget.dataset.selection
    });
  },

  selectItem(e) {
    this.setData({
      selectedIndex: this.data.selectedIndex == e.currentTarget.dataset.selectionId ? null : e.currentTarget.dataset.selectionId
    });
  },

  selectPassedItem(e) {
    this.setData({
      selectedPassedIndex: this.data.selectedPassedIndex == e.currentTarget.dataset.selectionId ? null : e.currentTarget.dataset.selectionId
    });
  },

  selectUnpassedItem(e) {
    this.setData({
      selectedUnpassedIndex: this.data.selectedUnpassedIndex == e.currentTarget.dataset.selectionId ? null : e.currentTarget.dataset.selectionId
    });
  },

  onShow: function() {
    switch (this.data.pageType) {
      case 'checkpoint':
        {
          this.getCheckpointRecordListData();
          break;
        }
      case 'entity':
        {
          this.getEntityRecordListData();
          break;
        }
      default:
        {
          this.calculateListHeight();
          this.getAllRecordListData();
          break;
        }
    }
  },

  goCheckDetail() {
    wx.navigateTo({
      url: '../createRecord/createRecord',
    })
  }
});