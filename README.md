# origin
forked from yangfuhe/power, to implement a simple data processor util site

### 介绍
> koa+mysql+redis+vue 实现权限控制
> 前端使用vue2，后端使用koa2，数据库使用mysql，用redis做session持久化。

### 快速使用

服务端：

服务端代码在app目录下，首先您需要安装mysql与redis，配置在app/config目录，dev.js为开发环境，pro.js为生产环境，修改mysql与redis参数配置，并把基础数据导入mysql数据库（基础数据sql为app/docs/base.sql），然后执行以下命令（注：windows环境需在执行命令前把app/package.json中`export NODE_ENV='dev' && nodemon app.js`改为`set NODE_ENV='dev' && nodemon app.js`）

```bash
cd app
npm i
npm start
```
客户端：
```bash
cd front
npm i
npm start
```
此时打开localhost:8080

`初始账号：admin`

`初始密码：qweqwe`

目前完成的模块有：个人主页、资源配置、角色管理、用户管理、系统日志。

### mysql说明
对mysql的封装逻辑在app/helpers/DB.js文件中，里面逻辑相信大家一目了然，这里需要特殊说明一点：当使用db.beginTransaction()开启事务后，操作数据库（包括增删改，当然查询就无所谓了）需要使用db.run()，因为开启事务和run函数里用到的mysql连接是同一个

### Contribute

如有任何疑问欢迎一起交流，微信：yangfuhe036，有任何不足之处也欢迎大家提出，一起进步

欢迎提交issue。

欢迎提交pr，请fork dev分支，并在其上编写代码。

喜欢或对你有帮助，欢迎右上角 star

非常感谢！

### 致谢

