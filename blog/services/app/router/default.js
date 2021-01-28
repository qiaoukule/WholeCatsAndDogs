//配置路由，一个async方法对应一个路径
module.exports = app => {
    const {router,controller} = app
    router.get("/default/index",controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList) //接口地址：http://127.0.0.1:7001/default/getArticleList
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
    router.get('/default/getListById',controller.default.home.getListById)
}