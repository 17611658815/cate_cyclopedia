const app = getApp()
Component({
    options: {
        multipleSlots: true
    },
    properties: {
        backgroundColor:{
            type: String,
            value: 'rgba(0,0,0,0)'
        },
        titleColor:{
            type: String,
            value: 'rgba(0,0,0,1)'
        },
        borderColor:{
            type: String,
            value: 'rgba(0,0,0,1)'
        },
        navTitle:{
            type: String,
            value: ''
        },
        seat:{
            type:Boolean,
            value:true
        },
        isBack:{
            type:Boolean,
            value:true
        },
        home:{
            type:Boolean,
            value:false
        }
    },
    data: {},
    ready() {
        let {
            statusBarHeight,
            navBarHeight
        } = app.globalData;

        this.setData({
            statusBarHeight,
            navBarHeight
        })
    },
    methods: {
        back() {
            console.log('back')
            wx.navigateBack({
                delta:1
            })
        },
        toIndex() {
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
    }
})
