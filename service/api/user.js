const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose') //引入mongoose 操作Schema


router.get('/', async ctx => {
    ctx.body = '这是用户操作首页'
});


router.get('/register', async ctx => {
    ctx.body = '用户注册接口'
});

router.post('/register', async ctx => {
    console.log(ctx.request.body);
    // ctx.body = ctx.request.body;

    const User = mongoose.model('User'); //取得User Model
    let newUser = new User(ctx.request.body); //把从前端接收的数据封装成新的User对象

    //用mongoose的save方法保存数据
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: "注册成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
});

router.post('/login', async ctx => {
    let loginUser = ctx.request.body;
    console.log(loginUser)
    let userName = loginUser.userName;
    let password = loginUser.password; //由用户输入的密码

    const User = mongoose.model('User');

    //根据用户输入的用户名，在数据库中查询相匹配的信息
    await User.findOne({ userName: userName }).exec()
        .then(async result => {
            console.log(result); //数据库中存储的用户数据
            if (result) {
                let newUser = new User();

                await newUser.comparePassword(password, result.password)
                    .then(isMatch => {
                        ctx.body = {
                            code: 200,
                            message: isMatch
                        }

                        console.log(isMatch)
                    })
                    .catch(error => {
                        console.log(error);
                        ctx.body = {
                            code: 500,
                            message: error
                        }
                    })
            } else {
                ctx.body = {
                    code: 200,
                    message: '密码错误'
                }
            }
        })
        .catch(error => {
            ctx.body = {
                code: 500,
                message: error
            }
        })
})

module.exports = router;