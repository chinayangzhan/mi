import {
  reformListData,
  recheckListData
} from './reformRecheckListMockData';

let windowHeight;
wx.getSystemInfo({
  success(res) {
    windowHeight = res.windowHeight;
  }
});

Page({
  data: {
    selection: 'record',
    selectEntityId: null
  },

  onLoad(options) {
    this.setData({
      pageType: 'reform'
      // pageType: 'recheck'
    });

    wx.setNavigationBarTitle({
      title: '整改清單'
    });

    if (this.data.pageType === 'reform') {
      this.getReformData();
    } else if (this.data.pageType === 'recheck') {
      this.getRecheckData();
    }
  },

  selectType(e) {
    this.setData({
      selection: e.currentTarget.dataset.selectionType
    });
  },

  getReformData() {
    for (const entityIndex in reformListData.data.entityList) {
      let undoCount = 0;
      for (const checkpointIndex in reformListData.data.entityList[entityIndex].checkpointList) {
        if (reformListData.data.entityList[entityIndex].checkpointList[checkpointIndex].status === 1) {
          undoCount++;
        }
      }
      reformListData.data.entityList[entityIndex].undoCount = undoCount;
      reformListData.data.entityList[entityIndex].totalCount = reformListData.data.entityList[entityIndex].checkpointList.length;
    }

    this.setData({
      name: reformListData.data.name,
      waitCount: reformListData.data.waitCount,
      alreadyCount: reformListData.data.alreadyCount,
      percent: parseInt(reformListData.data.alreadyCount / (reformListData.data.alreadyCount + reformListData.data.waitCount) * 100),
      waitEntityCount: reformListData.data.waitEntityCount,
      recordList: reformListData.data.recordList,
      entityList: reformListData.data.entityList
    }, () => {
      this.calculateListHeight();
    });
  },

  getRecheckData() {
    for (const entityIndex in recheckListData.data.entityList) {
      let undoCount = 0;
      for (const checkpointIndex in recheckListData.data.entityList[entityIndex].checkpointList) {
        if (recheckListData.data.entityList[entityIndex].checkpointList[checkpointIndex].status === 1) {
          undoCount++;
        }
      }
      recheckListData.data.entityList[entityIndex].undoCount = undoCount;
      recheckListData.data.entityList[entityIndex].totalCount = recheckListData.data.entityList[entityIndex].checkpointList.length;
    }

    this.setData({
      name: recheckListData.data.name,
      waitCount: recheckListData.data.waitCount,
      alreadyCount: recheckListData.data.alreadyCount,
      percent: parseInt(recheckListData.data.alreadyCount / (recheckListData.data.alreadyCount + recheckListData.data.waitCount) * 100),
      waitEntityCount: recheckListData.data.waitEntityCount,
      recordList: recheckListData.data.recordList,
      entityList: recheckListData.data.entityList
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

  selectEntityItem(e) {
    this.setData({
      selectEntityId: this.data.selectEntityId == e.currentTarget.dataset.selectId ? null : e.currentTarget.dataset.selectId
    });
  }
});