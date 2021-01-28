/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611494056885_7277';

  // add your middleware config here
  config.middleware = [];

//没强制只让http://localhost:3000来进行接口方案
  config.security = {
    　　　　csrf: {
    　　　　　　enable: false
    　　　　},
    　　　　domainWhiteList: [ '*' ]
    　　};
     config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };

  //数据库配置
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '47.93.204.138',
      // port
      port: '3306',
      // username
      user: 'blog',
      // password
      password: '123456',
      // database
      database: 'blog',    
    },


    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
