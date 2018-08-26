// pages/checklist/checklist.js

import {
  res,
  entityData
} from './addRecordMockData';

const app = getApp();

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

    this.setData({
      data: Object.assign(app.globalData, this.data)
    });

    // if (this.data.pageType === 'checkpoint') {
    //   this.getChecklistData();
    // } else if (this.data.pageType === 'entity') {
    //   this.getEntityData();
    // }

    this.getChecklistData();
  },

  onShow() {
    
  },

  getChecklistData() {
    const _that = this,
          globalData = this.data.data;
          console.log(this.data.data)
    wx.showLoading({
      title: '加載中...',
      mask: true
    });

    wx.request({
      url: `${globalData.base_url}/inspection_item/list/1`,
      header: {
        token: globalData.token
      },
      success(res) {
        console.log(res)
        res = res.data
        let subListData = [],
          parentItemIndex,
          subItemIndex = 0;
        for (let parentItem in res.data) {
          parentItemIndex = parentItem;
          console.log(res.data)
          res.data[parentItem].romaIndex = romaNumMap[Number(parentItem) + 1];
          // res.data[parentItem].isAllChecked = true;
          res.data[parentItem].subItemIndex = subItemIndex;
          subItemIndex += res.data[parentItem].checkpoints.length;

          for (let subItem in res.data[parentItem].checkpoints) {
            res.data[parentItem].checkpoints[subItem].parentItemIndex = parentItemIndex;
            res.data[parentItem].checkpoints[subItem].checkedCount = res.data[parentItem].checkpoints[subItem].noPassNums + res.data[parentItem].checkpoints[subItem].passNums
            console.log("totalcount",res.data[parentItem].checkpoints[subItem].totalCount)
            // if (res.data[parentItem].checkpoints[subItem].totalCount > res.data[parentItem].checkpoints[subItem].checkedCount) {
            //   res.data[parentItem].isAllChecked = false;
            // }
          }

          subListData = subListData.concat(res.data[parentItem].checkpoints);
        }

        _that.setData({
          listData: res.data,
          subListData: subListData,
          selectedParentId: res.data[0].id,
          selectedSubId: null
        },
          () => {
            calTopArray = [];

            let query = wx.createSelectorQuery();
            for (let i = 0; i < _that.data.listData.length; i++) {
              query.select('#subItem' + _that.data.listData[i].subItemIndex).fields({
                dataset: true,
                rect: true
              },
                (res) => {
                  if(res){
                    calTopArray.push(res.top);
                  }
                }
              );
            }
            query.exec(() => {
              wx.hideLoading();
            });

            _that.calculateFilledHeight();
          }
        );
      }
    })

    // setTimeout(() => {
    //   let subListData = [],
    //     parentItemIndex,
    //     subItemIndex = 0;
    //   for (let parentItem in res.data) {
    //     parentItemIndex = parentItem;
    //     res.data[parentItem].romaIndex = romaNumMap[Number(parentItem) + 1];
    //     res.data[parentItem].isAllChecked = true;
    //     res.data[parentItem].subItemIndex = subItemIndex;
    //     subItemIndex += res.data[parentItem].items.length;

    //     for (let subItem in res.data[parentItem].items) {
    //       res.data[parentItem].items[subItem].parentItemIndex = parentItemIndex;
    //       if (res.data[parentItem].items[subItem].totalCount > res.data[parentItem].items[subItem].checkedCount) {
    //         res.data[parentItem].isAllChecked = false;
    //       }
    //     }

    //     subListData = subListData.concat(res.data[parentItem].items);
    //   }

    //   this.setData({
    //       listData: res.data,
    //       subListData: subListData,
    //       selectedParentId: res.data[0].id,
    //       selectedSubId: null
    //     },
    //     () => {
    //       calTopArray = [];

    //       let query = wx.createSelectorQuery();
    //       for (let i = 0; i < this.data.listData.length; i++) {
    //         query.select('#subItem' + this.data.listData[i].subItemIndex).fields({
    //             dataset: true,
    //             rect: true
    //           },
    //           (res) => {
    //             calTopArray.push(res.top);
    //           }
    //         );
    //       }
    //       query.exec(() => {
    //         wx.hideLoading();
    //       });

    //       this.calculateFilledHeight();
    //     }
    //   );
    // }, 500);
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
        // entityData.data[parentItem].isAllChecked = true;
        entityData.data[parentItem].subItemIndex = subItemIndex;
        subItemIndex += entityData.data[parentItem].items.length;

        for (let subItem in entityData.data[parentItem].items) {
          entityData.data[parentItem].items[subItem].parentItemIndex = parentItemIndex;
          if (entityData.data[parentItem].items[subItem].totalCount > entityData.data[parentItem].items[subItem].checkedCount) {
            // entityData.data[parentItem].isAllChecked = false;
          }
        }

        subListData = subListData.concat(entityData.data[parentItem].items);
      }

      this.setData({
          listData: entityData.data,
          subListData: subListData,
          selectedParentId: entityData.data[0].id,
          selectedSubId: null
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
                  if(res){
                    calTopArray.push(res.top + scrollRes.scrollTop);
                  }
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
    wx.navigateTo({
      url: '../checkpointList/checkpointList?type=resource'
    });
  },

  goCheckpointList() {
    wx.navigateTo({
      url: '../checkpointList/checkpointList?type=checkpoint'
    });
  },

  goRecords() {
    wx.navigateTo({
      url: '../recordList/recordList?type=' + this.data.pageType
    });
  },

  addRecords() {
    if(this.data.pageType === 'checkpoint'){
      wx.navigateTo({
        url: '../checkpointList/checkpointList?type=resource'
      });
    } else {
      wx.navigateTo({
        url: '../createRecord/createRecord'
      });
    }
  },

  finishCheck() {
    wx.showModal({
      title: '提醒',
      content: '系統檢測到：\r\n 未完成監測點：12 \r\n 未檢測資源實體：4 \r\n 是否仍然結束檢查',
      confirmText: '仍然結束',
      cancelText: '不結束',
      confirmColor: '#2fa0d4',
      success: function() {
        wx.navigateTo({
          url: '../checkResult/checkResult'
        });
      }
    })

   
  },

  calculateFilledHeight() {
    console.log('calculateFilledHeight',this.data)
    let query = wx.createSelectorQuery(),
      lastSubList = this.data.listData[this.data.listData.length - 1].checkpoints,
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