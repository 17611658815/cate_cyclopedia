
/**
 * 返回精确的n位小数数值
 * @param data:number
 * @param type:string
 * 例：formatDate(1523440865000,yyyy-mm-dd) 得到 '2018-04-11'
 * 例：formatDate(1523440865000,yyyy-mm-dd hh:mm:ss) 得到 '2018-04-11 18:1:5'
*/
const formatTime = function (date, type) {
    if (typeof (date) == 'string') {
        return date;
    } else {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()

        if (type === 'YYYY-MM-DD') {
            return [year, month, day].map(formatNumber).join('-')
        } else {
            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
        }
    }
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const showLonding = function(text, mask) {
    wx.showLoading({
        title: text,
        mask: mask
    })
}
const hideLonding = function() {
    wx.hideLoading()
}
const Log = function(str) {
    this.isDebug = true;
    if (this.isDebug) {
        console.log(str)
    }
}
const showTost = function (text) {
    wx.showToast({
        title: text,
        icon: 'none',
        duration: 2000
    })
}
const isiPhoneX = function(){
    let isiphone = false
    wx.getSystemInfo({
        success: (res) => {
            if (res.model.search('iPhone X') != -1) {
                isiphone =  true 
            }
        }
    })
    return isiphone
}

module.exports = {
    formatTime: formatTime,
    showLonding: showLonding,
    hideLonding: hideLonding,
    Log: Log,
    showTost: showTost,
    isiPhoneX: isiPhoneX
}