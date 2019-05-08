// pages/cateList/cateList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height:"",
        query:'',
        offset:0,
        nvabarData: {
            showCapsule: 1,
            title: '菜谱列表',
        },
        cateList:[],
        currentTab:0,
        title:'',
        off_on:false,
        contType: ['', '-score','-n_dishes'],
        scroTop:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.q)
        let that = this;
        that.setData({
            height: app.globalData.height,
            query: options.q
        });
        that.loadList()
        
    },
    switcherTab(e){
        let that = this;
        app.loadingShow()
        that.setData({
            cateList:[],
            offset:0,
            currentTab: e.currentTarget.dataset.tab,
        },()=>{
            that.loadList()
        })
    },
    loadList(){
        let that = this,
        param = new Object();
        param.is_weapp = 1;
        param.weapp_src = 'xcf';
        param.q = that.data.query;
        param.offset = that.data.offset;
        param.order_by = that.data.contType[that.data.currentTab]
        app.net.$Api.searchDetaile(param).then((res) => {
            app.hideLoading()
            if (res.data.content.content.length>0){
                res.data.content.content.forEach(val=>{
                    that.data.cateList.push(val)
                    that.data.off_on = false;
                })
            }else{
                that.data.off_on = true;
            }
            
            that.setData({
                cateList: that.data.cateList,
                off_on: that.data.off_on
            })
            console.log(that.data.cateList)
        })
    },
    onPageScroll(e){
        this.setData({
            scroTop: e.scrollTop
        })
    },
    goDetaile(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/cateDetaile/cateDetaile?id=' + id,
        })
        console.log(e)
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