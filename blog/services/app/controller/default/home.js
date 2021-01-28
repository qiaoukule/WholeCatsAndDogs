'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let result = await this.app.mysql.get("blog_content",{})
    ctx.body = result;
  }

  //前端首页需要的接口
  async getArticleList() {
     let sql = 'SELECT article.id as id, '+
              'article.title as title, ' +
              'article.introduce as introduce, ' +
              'article.addTime as addTime, ' +
              'article.view_count as view_count,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id' 
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data:results
    }
  }

  async getArticleById() {
    //配置路由动态传值，然后再接受值
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id, '+
              'article.title as title, ' +
              'article.introduce as introduce, ' +
              'article.addTime as addTime, ' +
              'article.view_count as view_count, ' +
              'article.article_content as article_content, '+
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id '  +
              'WHERE article.id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async getTypeInfo() {//导航接口：暂时没用上
    const result = await this.app.mysql.select('type');
    this.ctx.body = {data:result} //对象
  }

  async getListById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id, '+
    'article.title as title, ' +
    'article.introduce as introduce, ' +
    'article.addTime as addTime, ' +
    'article.view_count as view_count, ' +
    'article.article_content as article_content, '+
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.id '  +
    'WHERE type_id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }
}

module.exports = HomeController;