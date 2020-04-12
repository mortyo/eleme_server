require('babel-core/register');
//入口文件app.js中不能写es6,像import class 这种关键字都不行
var express = require('express');
var chalk = require('chalk'); //改变命令行字体颜色
var config = require('config-lite'); //config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。
var history = require('connect-history-api-fallback'); //去掉URL中的‘#’
var connectMongo = require('connect-mongo'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = require('./routes/index') 
require('./mongodb/db')	//导入数据库连接

const app = express();

// app.all('*', (req, res, next) => {
// 	const { origin, Origin, referer, Referer } = req.headers;
// 	const allowOrigin = origin || Origin || referer || Referer || '*';
// 	res.header("Access-Control-Allow-Origin", allowOrigin);
// 	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
// 	res.header("X-Powered-By", 'Express');
// 	if (req.method == 'OPTIONS') {
// 	res.sendStatus(200);
// 	} else {
// 	next();
// 	}
// });

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	name: config.session.name,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: config.session.cookie,
	store: new MongoStore({
		url: config.url
	})
}))

router(app);
app.use(history());
app.use(express.static('./public'));  //配置静态文件路径
app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port + ',' + Date()}`)
	)
});