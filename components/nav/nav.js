const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    isWhite: { //默认不是白色自定义返回
      type: Boolean,
      value: false
    },
    backgroundColor: {
      type: String,
      value: 'rgba(0,0,0,0)'
    },
    titleColor: {
      type: String,
      value: 'rgba(0,0,0,1)'
    },
    borderColor: {
      type: String,
      value: 'rgba(0,0,0,1)'
    },
    navTitle: {
      type: String,
      value: ''
    },
    seat: {
      type: Boolean,
      value: true
    },
    isBack: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: false
    },
    pageNum: {
      type: Number,
      value: 1
    }
  },
  data: {
    capsule: {}
  },
  ready() {
    const {
      statusBarHeight,
      navBarHeight
    } = app.globalData

    this.setData({
      statusBarHeight,
      navBarHeight,
      left: app.globalData.windowWidth - app.globalData.capsule.right, //胶囊据右边距离
      capsule: app.globalData.capsule
    })
    console.log(this.data.capsule, 51)
  },
  methods: {
    back(e) {
      wx.navigateBack({
        delta: e.currentTarget.dataset.num
      })
    },
    toIndex() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})
