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
        //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
        //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
        //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
        //虽然最后解决了，但是花费了不少时间
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.height = res.statusBarHeight
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
        height: 0,
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