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
        const Goods = mongoose.model('Goods');

        data.map((value, index) => {
            console.log(value);

            let newGoods = new Goods(value);
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
})
module.exports = router;