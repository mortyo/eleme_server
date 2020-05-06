'use strict';

import chalk from 'chalk';
var config = require('config-lite')('config'); //config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.url ,{ useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})

db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
