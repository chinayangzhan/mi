import * as echarts from '../../components/ec-canvas/echarts';

const app = getApp();

function setPieChart(chart, isLabelOutside) {
  const option = {
    color: [
      '#3ea3d8',
      '#6de0e2',
      '#feda66',
      '#fd9f82',
      '#de65ad'
    ],
    grid: {
      left: 0,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    series: [{
      name: '缺陷實時分佈',
      type: 'pie',
      radius: ['55%', '77%'],
      label: {
        show: true,
        position: isLabelOutside ? 'outside' : 'inside',
        formatter: isLabelOutside ? '{b}\n{d}%' : '{d}%'
      },
      data: [{
        name: '人員衛生管理',
        value: 2
      }, {
        name: '環境衛生管理',
        value: 8
      }, {
        name: '設施設備衛生管理',
        value: 23
      }, {
        name: '切配打荷',
        value: 5
      }, {
        name: '爐灶上什',
        value: 12
      }]
    }]
  };

  if (!isLabelOutside) {
    option.series[0].center = ['33%', '50%'];
    option.legend = {
      right: '3%',
      top: '27%',
      orient: 'vertical'
    };
  }

  chart.setOption(option);
}

function setMonthScoreChart(chart) {
  const option = {
    title: {
      text: '月度初檢得分',
      x: 'center',
      textStyle: {
        fontSize: 12
      }
    },
    color: '#3ea3d8',
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisTick: {
        show: false
      },
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#b2b2b2'
        }
      }
    },
    grid: {
      left: 32,
      right: 62,
      bottom: 25,
      top: 40,
      containLabel: true
    },
    series: [{
      type: 'line',
      smooth: true,
      symbolSize: 7,
      data: [64, 73, 83, 62, 70, 76, 64],
      markLine: {
        silent: true,
        symbol: 'none',
        data: [{
          name: '平均值',
          type: 'average',
          label: {
            formatter: '平均值\n{c}'
          }
        }]
      }
    }]
  };

  chart.setOption(option);
}

Page({
  data: {
    ec: {
      lazyLoad: true
    }
  },

  onReady: function () {
    this.weaknessChart = this.selectComponent('#weaknessChart');
    this.reformChart = this.selectComponent('#reformChart');
    this.monthScoreChart = this.selectComponent('#monthScoreChart');

    setTimeout(() => {
      this.weaknessChart.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });

        setPieChart(chart, true);

        return chart;
      });

      this.reformChart.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });

        setPieChart(chart, false);

        return chart;
      });

      this.monthScoreChart.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });

        setMonthScoreChart(chart);

        return chart;
      });
    }, 500);
  },

  goReformRecheckList() {
    wx.navigateTo({
      url: '../reformRecheckList/reformRecheckList',
    })
  },

  goRecordList() {
    wx.navigateTo({
      url: '../recordList/recordList',
    })
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '巡檢報告［飲茶南...'
    });
  }
});