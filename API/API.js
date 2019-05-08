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
     * 热门菜谱
     */
    getHomeList: function(paramObj) {
        return Promise.get(Url.default.getHomeListUrl(paramObj), paramObj);
    },
    /**
     * 菜谱分类
     */
    getclassList: function (paramObj) {
        return Promise.get(Url.default.classitemUrl(paramObj), paramObj);
    },
    /**
     * 菜谱详情
     */
    getCatedetaile: function (paramObj) {
        return Promise.get(Url.default.detailsUrl(paramObj), paramObj);
    },
    /**
     * 搜索联想
     */
    searchSelect: function (paramObj) {
        return Promise.get(Url.default.searchSelectUrl(paramObj), paramObj);
    },
    /**
     * 热门搜索
     */
    getHotListItem: function (paramObj) {
        return Promise.get(Url.default.hotSearchUrl(paramObj), paramObj);
    },
    /**
     * 搜索详情
     */
    searchDetaile: function (paramObj) {
        return Promise.get(Url.default.searchDetaileUrl(paramObj), paramObj);
    },
}