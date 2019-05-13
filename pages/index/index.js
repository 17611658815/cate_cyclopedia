//index.js
//获取应用实例
const utils = require('../../utils/util.js')
const app = getApp()
let col1H = 0;
let col2H = 0;
Page({
    data: {
        page: 1,
        height: '',
        iphonex: false,
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        // 自定义导航参数
        nvabarData: {
            showCapsule: 0,
            title: '食典录',
        },
        pullDown: false,
        offset: 0

    },
    onLoad: function() {
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth,
                    wh = res.windowHeight,
                    imgWidth = ww * 0.48,
                    scrollH = wh;
                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth,
                    height: app.globalData.height,
                    // scrollH: ww / wh * 750-150 计算rem
                });
                this.loadImages();
            }
        })

    },
    // onImageLoad: function(e) {
    //     let imageId = e.currentTarget.id;
    //     let oImgW = e.detail.width; //图片原始宽度
    //     let oImgH = e.detail.height; //图片原始高度
    //     let imgWidth = this.data.imgWidth; //图片设置的宽度
    //     let scale = imgWidth / oImgW; /*比例计算*/
    //     let imgHeight = oImgH * scale; //自适应高度
    //     let images = this.data.images;
    //     let imageObj = null;

    //     for (let i = 0; i < images.length; i++) {
    //         let img = images[i];
    //         if (img.recipe.id === imageId) {
    //             imageObj = img;
    //             break;
    //         }
    //     }
    //     imageObj.height = imgHeight;

    //     let loadingCount = this.data.loadingCount - 1;
    //     let col1 = this.data.col1;
    //     let col2 = this.data.col2;

    //     if (col1H <= col2H) {
    //         col1H += imgHeight;
    //         col1.push(imageObj);
    //     } else {
    //         col2H += imgHeight;
    //         col2.push(imageObj);
    //     }

    //     let data = {
    //         loadingCount: loadingCount,
    //         col1: col1,
    //         col2: col2
    //     };

    //     if (!loadingCount) {
    //         data.images = [];
    //     }

    //     this.setData(data);
    // },
    loadImages: function() {
        let that = this,
            images = that.data.images,
            param = new Object();
            param.offset = that.data.offset,
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
                        off_on: false,
                        loadingCount: images.length,
                        images: images,
                        page: that.data.page
                    })
                    console.log(images)
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
                offset: that.data.offset += 20
            })
            that.loadImages()
        }
    },
    onReachBottom() {
        this.onscrollBotm()
    },
    onPullDownRefresh: function() {
        var that = this;
        that.setData({
            pullDown: true,
            images:[]
        })
        wx.vibrateShort()
        wx.showNavigationBarLoading() //在标题栏中显示加载
        that.onLoad()
        setTimeout(function() {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            that.setData({
                pullDown: false
            })
        }, 1500);
    },
    goDetaile(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/cateDetaile/cateDetaile?id='+id,
        })
        console.log(e)
    }
})