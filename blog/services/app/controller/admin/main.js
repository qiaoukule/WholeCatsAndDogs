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
}

module.exports = MainController