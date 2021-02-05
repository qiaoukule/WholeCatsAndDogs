//后端路由配置
module.exports = app => {
    const {router,controller} = app
    let adminAuthor = app.middleware.adminAuthor()//加上就自动路由守卫了,也可以写高阶组件实现路由守卫
    router.get("/admin/index",controller.admin.main.index)
    router.post("/admin/checkLogin",controller.admin.main.checkLogin)
    router.get("/admin/getTypeInfo",controller.admin.main.getTypeInfo)//想实现路由守卫，但是却失败了，一直重复跳转啊，得了解一下路由守卫去
    router.post("/admin/addArticle",controller.admin.main.addArticle)
    router.post("/admin/updateArticle",controller.admin.main.updateArticle)
    router.get("/admin/getAriticleList",controller.admin.main.getAriticleList)
    router.get("/admin/deleteArticle/:id",controller.admin.main.deleteArticle)
    router.get("/admin/getArticleById/:id",controller.admin.main.getArticleById)
}