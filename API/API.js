const Promise = require('HttpRequest.js')
const Url = require('URl.js')

/**
 * 接口请求
 */
export const api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */

    /**
     * 主页视频列表
     */
    getHomeVideoList: function(paramObj) {
        return Promise.get(Url.default.getHomeListUrl, paramObj);
    },
    /**
     * 测试接口数据
     */
    getdiseaselistList: function (paramObj) {
        return Promise.get(Url.default.getdiseaselistUrl, paramObj);
    },
}