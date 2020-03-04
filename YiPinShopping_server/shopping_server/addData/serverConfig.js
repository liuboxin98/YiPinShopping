const fs = require('fs')
const path = require('path')


function getFileByPath(fpath, succCb, errCb) {
    fs.readFile(fpath, 'utf-8', (err, datastr) => {
        if (err) {
            errCb(err)
        }
        else {
            succCb(datastr)
        }
    });
}

getFileByPath(path.join(__dirname, '../service/data.json'),
    function (data) {
        var rep = data.replace(/PROMOTEPRICE/g, "PromotePrice").replace(/GOODSPRICE/g, "GoodsPrice").replace(/SELL/g, "GoodsSail").replace(/EURL/g, "GoodsUrl").replace(/TITLE/g, "GoodsName").replace(/TBGOODSLINK/g, "GoodsImage")
        var res1 = JSON.parse(rep)
        var str = "INSERT INTO dbo.GoodsTab values";
        var res = res1.result.item;
        console.log(res.length)
        for (let index = 0; index < res.length; index++) {
            str += "('" + res[index].GoodsName + "','" + res[index].GoodsPrice + "',4,'" + res[index].GoodsImage + "',600,'" + res[index].GoodsSail + "',1000,'2020-02-12 19:27:11.293','连衣裙',''),"
        }
 
        console.log(str);
    },
    function (err) {
        console.log(err.message)
    }
)
