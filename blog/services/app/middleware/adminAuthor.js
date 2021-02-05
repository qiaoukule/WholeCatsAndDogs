//中间件形式路由守卫
module.exports = options => {
    return async function adminAuthor(ctx,next) {
        console.log(ctx.session.openId);
        if(ctx.session.openId) {
            //有session才是正确登录，才能用下面的接口
            await next()
        } if (ctx.request.url === '/') {
            await next();
          } else {
            ctx.body = {data:'请登录'}
        }
    }
}