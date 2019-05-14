// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputVal:'',//文本框val
        height:'',
        history:[],
        hotList:[],
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
            history: wx.getStorageSync('searchRecord') || [],//若无储存则为空
        })
        that.hotSearchList()
    },
    //热门搜索
    hotSearchList(){
        let that = this,
        param = new Object();
        param.is_weapp = 1,
        param.weapp_src = 'xcf',
        app.net.$Api.getHotListItem(param).then((res) => {
            console.log(res)
            that.setData({
                hotList: res.data.content.keywords.slice(0,20)
            })
        })
    },
    //搜索下拉
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
                    return {
                        key: e.detail.value,
                        name: res,
                        id: i
                    }
                })
                that.setData({
                    searchData: searchData.slice(0, 10),
                    searchResultDatas: res.data.content.keywords
                })
            })
        } else if (e.detail.value == 0) { //如果val为空 清空列表
            this.setData({
                searchResultDatas: []
            })
        }
        
    },
    //清空下拉
    delSelect(){
        this.setData({
            searchResultDatas: []
        })
    },
    //跳转搜索详情
    gosearchMsg(e){
        let that = this;
        let q = e.currentTarget.dataset.val || that.data.inputVal
        that.searchHistory(q)
        wx.navigateTo({
            url: '/pages/cateList/cateList?q='+q,
        })
    },
    //取消搜索
    cancelBack(){
        this.setData({
            inputVal:'',
            searchResultDatas: []
        },()=>{
            wx.navigateBack({
                delta: 1
            })
        })
    },
    //历史记录
    searchHistory(query) {
        let that = this
        let searchRecord = wx.getStorageSync('searchRecord') || []
        if (query == '') {
            return
        }
        else {
            //将搜索值放入历史记录中,只能放前五条
            console.log(searchRecord.length)
            if (searchRecord.length < 10 && searchRecord.indexOf(query) == -1) {
                searchRecord.unshift(
                    query,
                )
            }
            else if (searchRecord.length == 10) {
                searchRecord.pop()//删掉旧的时间最早的第一条
                searchRecord.unshift(
                    query,
                )
            }
            wx.setStorageSync('searchRecord', searchRecord)
        }
    },
    //清空历史记录
    delHistory(){
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确认清除历史记录吗?',
            success(res) {
                if (res.confirm) {
                    wx.removeStorage({
                        key: 'searchRecord',
                        success(res) {
                            that.setData({
                                history: []
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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
        this.setData({
            inputVal: '',
            searchResultDatas: []
        })
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