'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        this.ctx.body = "hi,index";
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功，进行session缓存
            console.log("正确");
            let openId = new Date().getTime()//时间戳
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }
        } else {
            this.ctx.body = { data: '登陆失败' }
        }
    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')//获取type表
        this.ctx.body = { data: resType }
    }

    async addArticle() {
        let tempAriticle = this.ctx.request.body//接受post传过来的数据
        const result = await this.app.mysql.insert('article', tempAriticle)//插入数据
        console.log(result)
        const insertSuccess = result.affectedRows === 1;//改变的行数
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    async updateArticle() {
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tempArticle);
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    async getAriticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "DATE_FORMAT(article.addTime,'%Y-%c-%d')  as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' 


        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list : resList }
    }

    async deleteArticle(){
        let id = this.ctx.params.id
        const resList = await this.app.mysql.delete('article',{id:id})
        this.ctx.body = { list : resList}
    }

    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "article.addTime as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data:result}
    }
}

module.exports = MainController