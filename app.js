require('babel-core/register');
//入口文件app.js中不能写es6,像import class 这种关键字都不行
var express = require('express');
var chalk = require('chalk'); //改变命令行字体颜色
var config = require('config-lite')('config'); //config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。
var history = require('connect-history-api-fallback'); //去掉URL中的‘#’
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); 
var router = require('./routes/index') 
require('./mongodb/db')	//导入数据库连接

const app = express();

app.use(cookieParser()); //用于读取cookie
app.use(session({
	name: config.session.name,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: config.session.cookie,
	store: new MongoStore({ //session存到mongodb
		url: config.url
	})
}))

router(app);
app.use(history());
app.use(express.static('public'));  //配置静态文件路径
// app.use('/eleme', express.static('./eleme'))
// app.use('/admin', express.static('./admin'))
app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port + ',' + Date()}`)
	)
});