const express = require("express");
const router = express.Router();
const getConnection = require("../mssql.config.js");

router.get("/getShopCartTab", (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const sqltext = "select * from ShopCartTab";
    getConnection(sqltext, function (data) {
        console.log(data)
        res.end(JSON.stringify(data.recordsets));
    });
});

router.post("/getShopCartByName", (req, res) => {
    let { username } = req.body;
    console.log("cart post")
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const sqltext = `SELECT b.* FROM dbo.Users AS a,dbo.ShopCartTab AS b WHERE a.wxname='${username}' AND a.UserID=b.UserID`;
    getConnection(sqltext, function (data) {
        console.log(data)
        res.end(JSON.stringify(data.recordsets));
    });
});


router.post("/addGoodsToCart", (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    let { username, goodsid } = req.body;

    console.log(req.body)
    const text = `SELECT a.* FROM dbo.ShopCartTab as a,dbo.Users AS b WHERE a.goodsID = ${goodsid} AND b.wxname='${username}'`;

    getConnection(text, function (data) {

        var goods = data.recordsets[0];
        console.log(goods);

        //console.log(goods.length == 0)

        var sqltext;
        if (goods.length > 0) {
            let count = goods[0].goodsOrderCount;
            let goodsid = goods[0].goodsID;
            let userid = goods[0].UserID;

            sqltext = `UPDATE dbo.ShopCartTab SET goodsOrderCount = ${count + 1} WHERE goodsOrderCount = ${count} AND goodsID =${goodsid} AND UserID=${userid}`
            getConnection(sqltext, function (data) {
                let rowsAffected = data.rowsAffected[0];
                console.log(rowsAffected);
                if (rowsAffected > 0) {
                    res.send({
                        code: 200,
                        data: {
                            rowsAffected
                        }
                    });
                }

            })
        }
        else {

            sqltext = `SELECT a.*,b.UserID FROM dbo.GoodsTab as a,dbo.Users AS b WHERE goodsID = ${goodsid} AND b.wxname='${username}'`
            getConnection(sqltext, function (data) {

                console.log(data.recordsets[0][0]);

                let goods = data.recordsets[0][0];
                let title = goods.GoodsName;
                let image = goods.GoodsImage;
                let price = goods.GoodsPrice;
                // var count = goods.GoodsCount;
                let typeid = goods.GoodsTypeID;
                let userid = goods.UserID;

                sqltext = `INSERT INTO dbo.ShopCartTab VALUES('${title}', '${image}', ${price}, ${1}, null, ${userid}, ${goodsid}, ${typeid})`
                getConnection(sqltext, function (data) {
                    let rowsAffected = data.rowsAffected[0];

                    console.log(rowsAffected);
                    if (rowsAffected > 0) {
                        res.send({
                            code: 200,
                            data: {
                                rowsAffected
                            }
                        });
                    }
                });

            });
        }
    });
});

module.exports = router;
