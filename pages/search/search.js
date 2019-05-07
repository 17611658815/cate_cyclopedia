// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputVal:'',
        height:'',
        nvabarData: {
            showCapsule: 1,
            title: '寻味美食',
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            height: app.globalData.height,
        })
    },
    inputSearch(e){
        console.log(e)
        let that = this,
        param = new Object();
        param.is_weapp = 1,
        param.weapp_src = 'xcf',
        param.q = e.detail.value;
        that.setData({
            inputVal: e.detail.value
        })
        if (e.detail.value.length > 0) {
            app.net.$Api.searchSelect(param).then((res) => {
                console.log(res)
                let searchData = res.data.content.keywords.map(function (res,i) {
                    console.log(res,i)
                    return {
                        key: e.detail.value,
                        name: res,
                        id: i
                    }
                })
                that.setData({
                    searchData,
                    searchResultDatas: res.data.content.keywords
                })
                console.log(that.data.searchResultDatas)
            })
        } else if (e.detail.value == 0) { //如果val为空 清空列表
            this.setData({
                searchResultDatas: []
            })
        }
        
    },
    delSelect(){
        this.setData({
            searchResultDatas: []
        })
    },
    gosearchMsg(e){
        let that = this;
        let q = e.currentTarget.dataset.val || that.data.inputVal
        console.log(e)
        wx.navigateTo({
            url: '/pages/cateList/cateList?q='+q,
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})