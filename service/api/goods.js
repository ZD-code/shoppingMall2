const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

/**
 * 向数据库中导入商品信息
 */
router.get('/insertAllGoodsInfo', async ctx => {
    //使用FS 读取文件
    fs.readFile('./newGoods.json', 'utf8', (err, data) => {

        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods'); //获取mongoose模版

        data.map((value, index) => {
            let newGoods = new Goods(value); //对循环的每一个数据封装成模版实例

            //存储实例数据到数据库
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

/**
 * 向数据库中导入目录
 */
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

/**
 * 向数据库中插入子目录
 */
router.get('/insertCategorySub', async ctx => {
    fs.readFile('./categorySub.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');

        data.map((value, index) => {
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(() => {
                saveCount++;
                console.log('insert success' + saveCount);
            }).catch(err => {
                console.log('insert error' + err);
            })
        })

    });

    ctx.body = '开始导入数据'
});

/**
 * 获取商品详情——路由设置
 */
router.post('/getDetailGoodsInfo', async ctx => {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods'); //获取模块

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
});

module.exports = router;

/**
 * 获取目录列表——路由设置
 */
router.get('/getCategoryList', async ctx => {
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
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

/**
 * 子目录的获取——后台数据库查询
 */
router.get('/getCategorySubList', async ctx => {
    try {
        let categorySubId = '1';
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({
            'MALL_CATEGORY_ID': categorySubId
        }).exec();
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

/**
 * 后台数据库查询
 * 根据子目录ID获取目录
 */
router.get('/getGoodsListByCategorySubId', async ctx => {
    try {
        // let categorySubId = ctx.request.body.categoryId;
        let categorySubId = '2c9f6c946016ea9b016016f79c8e0000';
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({ SUB_ID: categorySubId }).exec();
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
});