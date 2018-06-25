/* 定义数据基本模型 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let ObjectId = Schema.Types.ObjectId;


//创建用户Schema
const userSchema = new Schema({
    userId: ObjectId, // mongodb 默认的唯一标识符，即：'__id'
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
});

// 使用 bcrypt 对密码 加密加盐处理
userSchema.pre('save', function(next) {
    const SALT_WORK_FACTORY = 10;
    const user = this;

    bcrypt.genSalt(SALT_WORK_FACTORY, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        })
    })
});

//在实例对象上绑定密码比较方法
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                console.log(isMatch)
                if (!err) resolve(isMatch);
                else reject(err);
            })
        })
    }
}

/* 发布模型 */
mongoose.model('User', userSchema);