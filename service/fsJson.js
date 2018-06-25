const fs = require('fs');

fs.readFile('./goods.json', 'utf8', function(err, data) {
    let newData = JSON.parse(data);
    let i = 0;
    let pushData = [];
    if (err) {
        throw err;
    } else {
        newData.RECORDS.map((value, index) => {
            if (value.IMAGE1 != null) {
                i++;
                pushData.push(value);
            }
        });

        fs.writeFile('./newGoods.json', JSON.stringify(pushData), err => {
            if (err) console.log('写文件失败')
            else console.log('写文件成功');
        })
    }

});