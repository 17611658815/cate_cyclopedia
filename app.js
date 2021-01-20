//app.js
const Api = require('API/API.js');
const updateManager = wx.getUpdateManager();
App({
    onLaunch: function (options) {
        console.log(options)
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        // 判断是否由分享进入小程序
        if (options.scene == 1007 || options.scene == 1008) {
            this.globalData.share = true
        } else {
            this.globalData.share = false
        };
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.statusBarHeight = res.statusBarHeight
                this.globalData.navBarHeight = 44 + res.statusBarHeight
            }, fail(err) {
                console.log(err);
            }
        })
        // 用户版本更新
        if (wx.canIUse("getUpdateManager")) {
            updateManager.onCheckForUpdate((res) => {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate);
            })
            updateManager.onUpdateReady(() => {
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: (res) => {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        } else if (res.cancel) {
                            return false;
                        }
                    }
                })
            })
            updateManager.onUpdateFailed(() => {
                // 新的版本下载失败
                wx.hideLoading();
                wx.showModal({
                    title: '升级失败',
                    content: '新版本下载失败，请检查网络！',
                    showCancel: false
                });
            });
        }
    },
    globalData: {
        userInfo: null,
        share: false,  // 分享默认为false
        navBarHeight:'',
        statusBarHeight:''
    },
    loadingShow() {
        wx.showLoading({
            title: '加载中',
        })
    },
    hideLoading(){
        wx.hideLoading()
    },
    //挂载全局app
    net: {
        $Api: Api.api,
    }
})