//index.js
//获取应用实例
const utils = require('../../utils/util.js')
const app = getApp()
Page({
    data: {
        page: 1,
        height:'',
        // list: [{ id: 1, name: '张三' }, { id: 2,name: '李四'}],
        //滚动部分变量
        act_addList: [],
        orientationList: [],
        toView: '',
        nvabarData: {
            showCapsule: 1,
            title: 'scroll_view锚链接',
        },

    },
    delitem(e) {
        let id = e.currentTarget.dataset.id,
            list = this.data.list;
        list.forEach((val, index, array) => {
            console.log(val)
            if (id == val.id) {
                list.splice(index, 1)
            }
        })
        this.setData({
            list: list
        })
    },
    onLoad(){
        this.setData({
            height: app.globalData.height
        })
        this.loadList()
    },
    //初始化数据
    loadList(){
        let param = new Object()
        let act_addList = this.data.act_addList,
        orientationList = this.data.orientationList
        param.organid = 14
        utils.showLonding('加载中', true)
        app.net.$Api.getdiseaselistList(param).then((res) => {
            console.log(res)
            for (let i in res.data.data) {
                //这里要处理一下数据
                act_addList.push({
                    region: i,
                    keys: res.data.data[i],
                })
            }
            this.setData({
                act_addList: act_addList,
            }, () => {
                utils.hideLonding();
            })
            console.log(this.data.act_addList)
        })

    },
    //锚链接点击事件
    scrollToViewFn(e){
        let that = this,
        id = e.target.dataset.id;
        wx.vibrateShort()
        wx.showToast({
            title: id,
            icon:'none',
            duration:1000,
            success:()=>{
                that.setData({
                    toView: 'toView' + id, //toViewG
                });
            }
        })
        console.log(this.data.toView)
    },
    onShareAppMessage(){
        return {
            title: "有来医生·权威健康科普平台",
            path: "pages/scroll_view/scroll_view?scene=1008"
        };
    }
})