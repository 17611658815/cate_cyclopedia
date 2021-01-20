const utils = require('../../utils/util.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classlits: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadList()
        // 在页面中定义插屏广告
        let interstitialAd = null

        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-55fea3ae5546fb3a'
            })
            interstitialAd.onLoad(() => {})
            interstitialAd.onError((err) => {})
            interstitialAd.onClose(() => {})
        }

        // 在适合的场景显示插屏广告
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }

    },
    loadList() {
        let that = this,
            param = new Object();
        param.is_weapp = 1,
            param.weapp_src = 'xcf'
        app.loadingShow()
        app.net.$Api.getclassList(param).then((res) => {
            app.hideLoading()
            that.setData({
                classlits: res.data.content
            })

        })
    },
    gocateList(e) {
        let that = this;
        let q = e.currentTarget.dataset.q;
        wx.navigateTo({
            url: '/pages/cateList/cateList?q=' + q,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})