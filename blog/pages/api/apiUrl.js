let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList:ipUrl + 'getArticleList',//首页文章列表接口接口
    getArticleById:ipUrl + 'getArticleById/', //文章页面的内容接口，需要接受参数
    getTypeInfo: ipUrl + 'getTypeInfo/', //导航接口
    getListById: ipUrl + 'getListById', //不同文章的接口
}

export default servicePath;