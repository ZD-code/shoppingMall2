const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

router.get('/insertAllGoodsInfo', async ctx => {
    fs.readFile('./newGoods.json', 'utf8', (err, data) => {
        console.log(data)
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods'); //获取mongoose模版

        data.map((value, index) => {
            console.log(value);

            let newGoods = new Goods(value); //对循环的每一个数据封装成模版实例

            //存储实例数据
            newGoods.save().then(() => {
                saveCount++;
                console.log('成功' + saveCount)
            }).catch(err => {
                console.log('失败' + err)
            })
        })
    });

    ctx.body = '开始导入数据';
});

router.get('/insertCategoryInfo', async ctx => {
    fs.readFile('./category.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.map((value, index) => {
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                saveCount++;
                console.log('成功=' + saveCount)
            }).catch(err => {
                console.log(err)
            })
        })
    });
    ctx.body = '开始导入数据'
});

router.get('/insertCategorySub', async ctx => {
    fs.readFile('./categorySub.json', 'utf8', (err, data) => {
        // data = JSON.parse(data);
        // let saveCount = 0;
        // const CategorySub = mongoose.model('CategorySub');

        // data.map((value, index) => {
        //     let newCategorySub = new CategorySub(value);
        //     newCategorySub.save().then(() => {
        //         saveCount++;
        //         console.log('insert success' + saveCount);
        //     }).catch(err => {
        //         console.log('insert error' + err);
        //     })
        // })

        data = JSON > parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        data.map((value, index) => {

            try {
                let newCategorySub = new CategorySub(value);
                let result = newCategorySub.save();
                saveCount++;
                ctx.body = {
                    code: 200,
                    message: 'insert Success' + saveCount
                };
            } catch (error) {
                ctx.body = {
                    code: 500,
                    message: 'insert error' + error
                }
            }
        })

    });

    ctx.body = '开始导入数据'
});

router.post('/getDetailGoodsInfo', async(ctx) => {
    // let goodsId = ctx.request.body.goodsId;
    // const Goods = mongoose.model('Goods'); //获取模块

    // await Goods.findOne({ ID: goodsId }).exec() //模块内查询数据
    //     .then(async(result) => {
    //         ctx.body = {
    //             code: 200,
    //             message: result
    //         }
    //     })
    //     .catch(error => {
    //         ctx.body = {
    //             code: 500,
    //             message: error
    //         }
    //     })

    try {
        let goodsId = ctx.request.body.goodsId;
        let Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ ID: goodsId }).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})
module.exports = router;