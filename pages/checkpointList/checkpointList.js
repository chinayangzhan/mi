import {
  entityListData,
  checkpointListData
} from './checkpointListMockData';

const app = getApp();

Page({
  data: {

  },

  onLoad(options) {
    this.setData({
      pageType: options.type,
      data: Object.assign(app.globalData, this.data)
    });

    if (this.data.pageType === 'resource') {
      this.getEntityListData();
    } else if (this.data.pageType === 'checkpoint') {
      this.getCheckpointListData();
    }
  },

  getEntityListData() {
    this.setData({
      name: entityListData.data.name,
      totalCount: entityListData.data.entityTotalCount,
      checkedCount: entityListData.data.entityCheckedCount,
      uncheckedCount: entityListData.data.entityUncheckedCount,
      passedCount: entityListData.data.entityPassedCount,
      unpassedCount: entityListData.data.entityUnpassedCount,
      entityListData: entityListData.data.entityList
    });

    wx.setNavigationBarTitle({
      title: entityListData.data.resourceName
    });
  },

  getCheckpointListData() {
    this.setData({
      name: checkpointListData.data.entityName,
      totalCount: checkpointListData.data.checkpointTotalCount,
      checkedCount: checkpointListData.data.checkpointCheckedCount,
      uncheckedCount: checkpointListData.data.checkpointUncheckedCount,
      passedCount: checkpointListData.data.checkpointPassedCount,
      unpassedCount: checkpointListData.data.checkpointUnpassedCount,
      checkpointListData: checkpointListData.data.checkpointList
    });

    wx.setNavigationBarTitle({
      title: checkpointListData.data.entityName
    });
  },

  goCreateRecord() {
    wx.navigateTo({
      url: '../createRecord/createRecord',
    })
  },

  onShow() {

  }
});