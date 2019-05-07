export default class Url {
    static PATH = "https://www.xiachufang.com/juno/api/v2"

    //主页热门
    static getHomeListUrl(data) {
        return Url.PATH + '/recipes/popular_v3.json?weapp_src=xcf&is_weapp=1&limit=20&offset=' + data.offset
    };
    //分类
    static classitemUrl(data) {
        return Url.PATH + '/categories/tree_plus.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf
    }; 
    //菜品详情
    static detailsUrl(data) {
        return Url.PATH + '/recipes/show_v2.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf + "&&mode=full" + "&id=" + data.id
    }; 
    //菜品详情
    static searchSelectUrl(data) {
        return Url.PATH + '/search/prefix_keyword_suggester.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf + "&&mode=full" + "&q=" + data.q
    }; 

}