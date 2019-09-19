// pages/advertising/advertising.js
const images = require('../../utils/images.js')
const title = require('../../utils/title.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        miao: 5,
        time: '',
        title:'',
        images:'',
        height: "",
        nvabarData: {
            showCapsule: 0,
            title: '食典录',
        },
    },
    onShow() {
       
        this.setData({
            images: images[Math.floor(Math.random() * images.length)],
            title: title[Math.floor(Math.random() * title.length)]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 在页面中定义激励视频广告
        // let videoAd = null

        // // 在页面onLoad回调事件中创建激励视频广告实例
        // if (wx.createRewardedVideoAd) {
        //     videoAd = wx.createRewardedVideoAd({
        //         adUnitId: 'adunit-9a6ed008de2b5f55'
        //     })
        //     videoAd.onLoad(() => { 
        //         console.log('111')
        //     })
        //     videoAd.onError((err) => {
        //         console.log('222')
        //      })
        //     // 监听关闭
        //     videoAd.onClose((status) => {
        //         if (status && status.isEnded || status === undefined) {
        //             // 正常播放结束，下发奖励
        //             // continue you code
        //         } else {
        //             console.log('关闭广告')
        //             // 播放中途退出，进行提示
        //         }
        //     })
        // }

        // // 用户触发广告后，显示激励视频广告
        // if (videoAd) {
        //     videoAd.show().catch(() => {
        //         // 失败重试
        //         videoAd.load()
        //             .then(() => videoAd.show())
        //             .catch(err => {
        //                 console.log('激励视频 广告显示失败')
        //             })
        //     })
        // }
        var that = this;
        this.time = setInterval(function() {
            that.setData({
                miao: that.data.miao - 1
            })
            if (that.data.miao == 0) {
                clearInterval(this.time);
                wx.switchTab({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
                    url: "/pages/index/index"
                })
            }

        }, 1000)
        that.setData({
            height: app.globalData.height
        })
    },

    cliadv: function() {
        clearInterval(this.time)
        wx.switchTab({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
            url: "/pages/index/index"
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

   
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})