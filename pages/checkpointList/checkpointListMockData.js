//status: 1＝待檢測, 2=通過, 3=未通過

let entityListData = {
  code: '0',
  msg: '',
  data: {
    resourceName: '雪櫃',
    name: '雪櫃溫度的符合性',
    entityTotalCount: 10,
    entityCheckedCount: 6,
    entityUncheckedCount: 4,
    entityPassedCount: 3,
    entityUnpassedCount: 3,
    entityList: [{
      id: 1,
      name: '雪櫃1',
      status: 1
    }, {
      id: 2,
      name: '雪櫃2',
      status: 2
    }, {
      id: 3,
      name: '雪櫃3',
      status: 2
    }, {
      id: 4,
      name: '雪櫃4',
      status: 3
    }, {
      id: 5,
      name: '雪櫃5',
      status: 1
    }, {
      id: 6,
      name: '雪櫃6',
      status: 3
    }, {
      id: 7,
      name: '雪櫃7',
      status: 3
    }, {
      id: 8,
      name: '雪櫃8',
      status: 2
    }, {
      id: 9,
      name: '雪櫃9',
      status: 1
    }, {
      id: 10,
      name: '雪櫃10',
      status: 1
    }]
  }
};

let checkpointListData = {
  code: '0',
  msg: '',
  data: {
    entityName: '廚房冰櫃1',
    checkpointTotalCount: 7,
    checkpointCheckedCount: 4,
    checkpointUncheckedCount: 3,
    checkpointPassedCount: 3,
    checkpointUnpassedCount: 1,
    checkpointList: [{
      checkpointCategory: 'Ⅲ 貯存設施',
      subCheckpointList: [{
        id: 1,
        name: '雪櫃溫度的符合性',
        status: 2
      }, {
        id: 2,
        name: '貯存設施的衛生狀況',
        status: 3
      }]
    }, {
      checkpointCategory: 'Ⅳ 貯存管理',
      subCheckpointList: [{
        id: 3,
        name: '標籤標識管理情況',
        status: 2
      }, {
        id: 4,
        name: '食品的貯存條件',
        status: 1
      }, {
        id: 4,
        name: '食品的分類貯存',
        status: 1
      }, {
        id: 4,
        name: '食品的防護情況',
        status: 2
      }, {
        id: 4,
        name: '食品的先進先出及保質期管理情況',
        status: 1
      }]
    }]
  }
};

export {
  entityListData,
  checkpointListData
};