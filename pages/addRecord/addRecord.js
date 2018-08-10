// pages/checklist/checklist.js

import {
  checklistData,
  entityData
} from './addRecordMockData';

let windowHeight;
wx.getSystemInfo({
  success(res) {
    windowHeight = res.windowHeight;
  }
});

const romaNumMap = {
  1: 'Ⅰ',
  2: 'Ⅱ',
  3: 'Ⅲ',
  4: 'Ⅳ',
  5: 'Ⅴ',
  6: 'Ⅵ',
  7: 'Ⅶ',
  8: 'Ⅷ',
  9: 'Ⅸ',
  10: 'Ⅹ',
  11: 'XI',
  12: 'XII',
  13: 'XIII',
  14: 'XIV',
  15: 'XV',
  16: 'XVI'
};

let calTopArray = [];

Page({
  data: {
    pageType: 'checkpoint'
  },
  openScan() {
    wx.scanCode({

    });
  },

  onLoad(options) {
    this.setData({
      pageType: 'checkpoint'
    });
    wx.setNavigationBarTitle({
      title: '检查项目'
    });
  },

  onShow() {
    if (this.data.pageType === 'checkpoint') {
      this.getChecklistData();
    } else if (this.data.pageType === 'entity') {
      this.getEntityData();
    }
  },

  getChecklistData() {
    wx.showLoading({
      title: '加載中...',
      mask: true
    });

    setTimeout(() => {
      let subListData = [],
        parentItemIndex,
        subItemIndex = 0;
      for (let parentItem in checklistData.data) {
        parentItemIndex = parentItem;
        checklistData.data[parentItem].romaIndex = romaNumMap[Number(parentItem) + 1];
        checklistData.data[parentItem].isAllChecked = true;
        checklistData.data[parentItem].subItemIndex = subItemIndex;
        subItemIndex += checklistData.data[parentItem].items.length;

        for (let subItem in checklistData.data[parentItem].items) {
          checklistData.data[parentItem].items[subItem].parentItemIndex = parentItemIndex;
          if (checklistData.data[parentItem].items[subItem].totalCount > checklistData.data[parentItem].items[subItem].checkedCount) {
            checklistData.data[parentItem].isAllChecked = false;
          }
        }

        subListData = subListData.concat(checklistData.data[parentItem].items);
      }

      this.setData({
          listData: checklistData.data,
          subListData: subListData,
          selectedParentId: checklistData.data[0].id
        },
        () => {
          calTopArray = [];

          let query = wx.createSelectorQuery();
          for (let i = 0; i < this.data.listData.length; i++) {
            query.select('#subItem' + this.data.listData[i].subItemIndex).fields({
                dataset: true,
                rect: true
              },
              (res) => {
                calTopArray.push(res.top);
              }
            );
          }
          query.exec(() => {
            wx.hideLoading();
          });

          this.calculateFilledHeight();
        }
      );
    }, 500);
  },

  getEntityData() {
    wx.showLoading({
      title: '加載中...',
      mask: true
    });

    setTimeout(() => {
      let subListData = [],
        parentItemIndex,
        subItemIndex = 0;
      for (let parentItem in entityData.data) {
        parentItemIndex = parentItem;
        entityData.data[parentItem].romaIndex = romaNumMap[Number(parentItem) + 1];
        entityData.data[parentItem].isAllChecked = true;
        entityData.data[parentItem].subItemIndex = subItemIndex;
        subItemIndex += entityData.data[parentItem].items.length;

        for (let subItem in entityData.data[parentItem].items) {
          entityData.data[parentItem].items[subItem].parentItemIndex = parentItemIndex;
          if (entityData.data[parentItem].items[subItem].totalCount > entityData.data[parentItem].items[subItem].checkedCount) {
            entityData.data[parentItem].isAllChecked = false;
          }
        }

        subListData = subListData.concat(entityData.data[parentItem].items);
      }

      this.setData({
          listData: entityData.data,
          subListData: subListData,
          selectedParentId: entityData.data[0].id
        },
        () => {
          calTopArray = [];

          let query = wx.createSelectorQuery();
          for (let i = 0; i < this.data.listData.length; i++) {
            query.select('#subItem' + this.data.listData[i].subItemIndex).fields({
                dataset: true,
                rect: true
              },
              (res) => {
                calTopArray.push(res.top);
              }
            );
          }
          query.exec(() => {
            wx.hideLoading();
          });

          this.calculateFilledHeight();
        }
      );
    }, 500);
  },

  chooseParentData(e) {
    this.setData({
      selectedParentId: this.data.listData[e.currentTarget.dataset.itemIndex].id,
      subToView: 'subItem' + this.data.listData[e.currentTarget.dataset.itemIndex].subItemIndex
    });
  },

  chooseSubData(e) {
    const tapId = this.data.subListData[e.currentTarget.dataset.itemIndex].id;

    this.setData({
        selectedSubId: this.data.selectedSubId == tapId ?
          null : this.data.subListData[e.currentTarget.dataset.itemIndex].id,
      },
      () => {
        calTopArray = [];
        let query1 = wx.createSelectorQuery(),
          query2 = wx.createSelectorQuery();

        query1.select('#subItemsList').fields({
            scrollOffset: true
          },
          (scrollRes) => {
            for (let i = 0; i < this.data.listData.length; i++) {
              query2.select('#subItem' + this.data.listData[i].subItemIndex).fields({
                  dataset: true,
                  rect: true
                },
                (res) => {
                  calTopArray.push(res.top + scrollRes.scrollTop);
                }
              );
            }

            query2.exec(() => {
              wx.hideLoading();
            });
          }
        );

        query1.exec();

        this.calculateFilledHeight();
      }
    );
  },

  subListScroll(e) {
    let toParentIndex = 0;

    for (let i = 0; i < calTopArray.length - 1; i++) {
      if (e.detail.scrollTop >= calTopArray[i] - 20 && e.detail.scrollTop < calTopArray[i + 1] - 20) {
        this.setData({
          selectedParentId: this.data.listData[i].id,
          parentToView: 'parentItem' + i
        });
      } else if (e.detail.scrollTop < calTopArray[0] - 20) {
        this.setData({
          selectedParentId: this.data.listData[0].id,
          parentToView: 'parentItem' + 0
        });
      } else if (e.detail.scrollTop >= calTopArray[calTopArray.length - 1] - 20) {
        this.setData({
          selectedParentId: this.data.listData[this.data.listData.length - 1].id,
          parentToView: 'parentItem' + (this.data.listData.length - 1)
        });
      }
    }
  },

  changeToCheckpoint() {
    this.setData({
      listData: [],
      subListData: [],
      pageType: 'checkpoint'
    });
    this.getChecklistData();

    wx.setNavigationBarTitle({
      title: '检查项目'
    });
  },

  changeToEntity() {
    this.setData({
      listData: [],
      subListData: [],
      pageType: 'entity'
    });
    this.getEntityData();

    wx.setNavigationBarTitle({
      title: '实体目录'
    });
  },

  goResourceList() {
    wx.showToast({
      title: '资源目录'
    });
  },

  goCheckpointList() {
    wx.showToast({
      title: '检查点'
    });
  },

  goRecords() {
    wx.showToast({
      title: '查看记录'
    });
  },

  addRecords() {
    wx.showToast({
      title: '添加记录'
    });
  },

  finishCheck() {
    wx.showToast({
      title: '巡检结束'
    });
  },

  calculateFilledHeight() {
    let query = wx.createSelectorQuery(),
      lastSubList = this.data.listData[this.data.listData.length - 1].items,
      lastSubListHeight = 15;
    for (let i = this.data.subListData.length - lastSubList.length; i < this.data.subListData.length; i++) {
      query.select('#subItem' + i).fields({
          size: true
        },
        (res) => {
          lastSubListHeight += res.height + 15;
        }
      );
    }
    query.exec(() => {
      if (windowHeight > lastSubListHeight) {
        this.setData({
          filledHeight: (windowHeight - lastSubListHeight + 20) + 'px'
        });
      }
    });
  }
});