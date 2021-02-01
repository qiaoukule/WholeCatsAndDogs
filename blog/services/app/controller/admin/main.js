'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
    async index(){
        this.ctx.body = "hi,index";
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                     "' AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql)
        console.log(res)
        console.log(res.length);
        if(res.length>0) {
            //登录成功，进行session缓存
            console.log("正确");
            let openId = new Date().getTime()//时间戳
            this.ctx.session.openId = {'openId':openId}
            this.ctx.body = {'data':'登录成功','openId':openId}
        } else {
            console.log("错误")
            this.ctx.body = {data:'登陆失败'}
        }  
    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')//获取type表
        this.ctx.body= { data: resType}
    }

    async addArticle() {
        let tempAriticle = this.ctx.request.body//接受post传过来的数据
        const result = await this.app.mysql.insert('article',tempAriticle)//插入数据
        console.log(result)
        const insertSuccess = result.affectedRows === 1;//改变的行数
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess : insertSuccess,
            insertId : insertId
        }
    }

    async updateArticle() {
        let tempArticle = await this.app.mysql.update('article',tempArticle);
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess:updateSuccess
        }
    }
}

module.exports = MainController