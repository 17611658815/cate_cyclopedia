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
                    height: app.globalData.height
                });
                this.loadImages();
            }
        })

    },
    onImageLoad: function(e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; /*比例计算*/
        console.log(imgWidth / oImgW)
        let imgHeight = oImgH * scale; //自适应高度

        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }
        console.log(imageObj)
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
        var that = this,
            images = [];
        wx.request({
            url: 'https://qqgr.866691.com/category.json?num=10&page=' + that.data.page,
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
                if (res.data.data.length > 0) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        images.push(res.data.data[i])
                    }
                    let baseId = "img-" + (+new Date());
                    for (let i = 0; i < images.length; i++) {
                        images[i].id = baseId + "-" + i;
                    }
                    that.setData({
                        off_on: false,
                        loadingCount: images.length,
                        images: images,
                        page: that.data.page
                    })
                } else {
                    that.setData({
                        off_on: true
                    })
                }
            }
        })
    },
    onscrollBotm(){
        let that = this;
        if (!that.data.off_on){
            that.data.page++;
            that.loadImages()
        }
    }
})