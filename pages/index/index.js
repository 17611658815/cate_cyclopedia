//index.js
//获取应用实例
const utils = require('../../utils/util.js')
const title = require('../../utils/title.js')
const app = getApp()
let col1H = 0;
let col2H = 0;
Page({
	data: {
		page: 1,
		scrollH: 0,
		imgWidth: 0,
		loadingCount: 0,
		images: [],
		col1: [],
		col2: [],
		pullDown: false,
		offset: 0,
		limit: 10,
		is_weapp: 1,
		loading: false,
		title: "",
		isGoTop: false,
		off_on: false
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
				isGoTop: true
			})
		} else {
			this.setData({
				isGoTop: false
			})
		}
	},
	onShow() {
		this.setData({
			title: title[Math.floor(Math.random() * title.length)]
		})
	},
	onLoad: function () {
		app.globalData.share = false;
		let that = this;
		wx.getSystemInfo({
			success: (res) => {
				let ww = res.windowWidth,
					wh = res.windowHeight,
					imgWidth = ww * 0.48,
					scrollH = wh;
				that.setData({
					scrollH: scrollH,
					imgWidth: imgWidth,
				});
				that.loadImages();
			}
		})
	},
	onImageLoad: function (e) {
		let imageId = e.currentTarget.id;
		let oImgW = e.detail.width; //图片原始宽度
		let oImgH = e.detail.height; //图片原始高度
		let imgWidth = this.data.imgWidth; //图片设置的宽度
		let scale = imgWidth / oImgW; /*比例计算*/
		let imgHeight = oImgH * scale; //自适应高度
		let images = this.data.images;
		let imageObj = null;
		for (let i = 0; i < images.length; i++) {
			let img = images[i];
			if (img.recipe.id === imageId) {
				imageObj = img;
				break;
			}
		}
		imageObj.height = imgHeight;

		let loadingCount = this.data.loadingCount - 1;
		let col1 = this.data.col1;
		let col2 = this.data.col2;
		if (col1H <= col2H) {
			col1H += imgHeight;
			col1.push(imageObj);
		} else {
			col2H += imgHeight;
			col2.push(imageObj);
		}

		let data = {
			loadingCount: loadingCount,
			col1: col1,
			col2: col2
		};

		if (!loadingCount) {
			data.images = [];
		}

		this.setData(data);
	},
	loadImages: function () {
		let that = this,
			images = [],
			param = new Object();
		   param.offset = that.data.offset,
			param.limit = that.data.limit,
			param.is_weapp = that.data.is_weapp;
		app.net.$Api.getHomeList(param).then((res) => {
			if (res.data.content.recipes.length > 0) {
				for (var i = 0; i < res.data.content.recipes.length; i++) {
					images.push(res.data.content.recipes[i])
				}
				let baseId = "img-" + (+new Date());
				for (let i = 0; i < images.length; i++) {
					images[i].recipe.author.id = baseId + "-" + i;
				}
				that.setData({
					loadingCount: images.length,
					images: images,
					page: that.data.page,
				})
			} else {
				that.setData({
					off_on: true
				})
			}
		})
	},
	onscrollBotm() {
		let that = this;
		if (!that.data.off_on) {
			that.setData({
				offset: that.data.offset += 20,
			})
			that.loadImages()
		}
	},
	onReachBottom() {
		this.onscrollBotm()
	},
	onPullDownRefresh: function () {
		var that = this;
		that.setData({
			pullDown: true,
		})
		wx.vibrateShort()
		// wx.showNavigationBarLoading() //在标题栏中显示加载

		setTimeout(function () {
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
			that.setData({
				pullDown: false,
				images: [],
				col1: [],
				col2: []
			})
			that.onLoad()
		}, 1500);
	},
	goDetaile(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/cateDetaile/cateDetaile?id=' + id,
		})
	},
	onShareAppMessage: function () {
		var that = this;
		return {
			title: "今天想吃点什么？",
			path: '/pages/index/index',
		}
	},
})