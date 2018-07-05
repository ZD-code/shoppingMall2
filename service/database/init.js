const mongoose = require('mongoose');
const db = 'mongodb://localhost/';
const glob = require('glob'); //获取匹配对应规则的文件
const { resolve } = require('path'); //将一系列路径或路径段转化为绝对路径

mongoose.Promise = global.Promise;

/* 使用glob.sync 同步引入所有的schema文件， forEach 循环使用require引入进来 */

//抛出 initSchema  模块
exports.initSchema = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}

/* 数据库的链接方法 */

//抛出 connect  模块
exports.connect = () => {
    // 链接数据库
    mongoose.connect(db);
    let maxConnectNum = 0; //允许重连的次数
    return new Promise((resolve, reject) => {

        /* 增加数据库链接监听事件 */
        mongoose.connection.on('disconnected', () => {
            if (maxConnectNum < 5) {
                maxConnectNum++;
                /* 断开 重连 */
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('数据库断开链接，请排查问题……');
            }

        });

        mongoose.connection.on('error', err => {
            if (maxConnectNum < 5) {
                /* 数据库出现错误  重连 */
                mongoose.connect(db);
                maxConnectNum++;
            } else {
                reject(err);
                throw new Error('数据库出现错误，请检查错误……')
            }

        });

        mongoose.connection.once('open', () => {
            /* 数据库链接成功, 打开数据库了 */
            console.log('mongoDB connected successfully !');

            //返回Promise，告知，打开数据库了，可以使用数据库了
            resolve();
        });

    });
}