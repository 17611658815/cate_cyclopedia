// pages/cateList/cateList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: '',
        offset: 0,
        cateList: [],
        currentTab: 0,
        off_on: false,
        contType: ['', '-score', '-n_dishes'],
        scroTop: 0,
        cursor: '',
        loading: false,
        isGoTop: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            query: options.q
        });
        that.loadList()
    },
    switcherTab(e) {
        let that = this;
        that.setData({
            cateList: [],
            offset: 0,
            currentTab: e.currentTarget.dataset.tab,
        }, () => {
            that.loadList()
        })
    },
    loadList() {
        let that = this,
            param = new Object();
        param.is_weapp = 1;
        param.size = 10
        param.weapp_src = 'xcf';
        param.q = that.data.query;
        param.cursor = that.data.cursor;
        param.order_by = that.data.contType[that.data.currentTab]
        that.data.loading = true
        app.net.$Api.searchDetaile(param).then((res) => {
            that.data.loading = false
            that.data.cursor = res.data.content.cursor.next
            if (res.data.content.cursor.has_next) {
                that.setData({
                    cateList: that.data.cateList.concat(res.data.content.content)
                })
            } else {
                that.data.off_on = true;
            }
        })
    },
    // 点击置顶
    goTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
        this.setData({
            isGoTop: false
        });
    },
    onPageScroll: function (e) {
        if (e.scrollTop > 500) {
            this.setData({
                isGoTop: true,
                scroTop: e.scrollTop
            })
        } else {
            this.setData({
                isGoTop: false,
                scroTop: e.scrollTop
            })
        }
    },
    goDetaile(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/cateDetaile/cateDetaile?id=' + id,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
        let that = this;
        if (!that.data.off_on) {
            that.setData({
                offset: that.data.offset += 20
            })
            that.loadList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})