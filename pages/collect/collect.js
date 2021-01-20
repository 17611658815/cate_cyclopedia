// pages/collect/collect.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		CollectList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},
	delitem(e) {
		let that = this;
		let index = e.currentTarget.dataset.index;
		wx.showModal({
			title: '提示',
			content: '确认删除',
			success(res) {
				if (res.confirm) {
					that.data.CollectList.splice(index, 1);
					wx.setStorageSync("CollectList", that.data.CollectList);
					that.onShow()
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
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
		let CollectList = wx.getStorageSync('CollectList') || [];
		console.log(CollectList)
		this.setData({
			CollectList: CollectList
		})
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