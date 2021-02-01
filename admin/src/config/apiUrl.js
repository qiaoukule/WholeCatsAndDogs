let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin:ipUrl + 'checkLogin',//登录检测用户名和密码接口
    getTypeInfo:ipUrl + 'getTypeInfo' ,//获得文章类别信息
    addArticle:ipUrl + 'addArticle',//文章添加的接口
    updateArticle:ipUrl + 'updateArticle',//修改文章接口
    getAriticleList:ipUrl + 'getAriticleList',//文章列表接口
    deleteArticle:ipUrl + 'deleteArticle/'//删除文章接口，需接受参数
}

export default servicePath;