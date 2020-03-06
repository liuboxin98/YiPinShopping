const express = require("express");
const router = express.Router();
const getConnection = require("../mssql.config.js");


//根据条件查询
router.post("/searchGoods", (req, res) => {
    let { gname, page } = req.body;
    console.log(req.body)
    const sqltext = `select top 10 * from GoodsTab WHERE GoodsID not IN(SELECT TOP (10*(${page}-1)) GoodsID FROM dbo.GoodsTab WHERE GoodsName LIKE '%${gname}%' ORDER BY GoodsID desc) AND GoodsName LIKE '%${gname}%' ORDER BY GoodsID DESC`;

    console.log(sqltext);
    getConnection(sqltext, function (data) {

        // console.log(data.recordsets)
        res.end(JSON.stringify(data.recordsets));
    })
});

//获取商品数据
router.post("/getGoods", (req, res) => {
    let { typeid, page } = req.body;

    console.log(typeid, page);

    const sqltext = "select top 10 * from GoodsTab WHERE GoodsID not IN (SELECT TOP (10*(" + page + "-1)) GoodsID FROM dbo.GoodsTab WHERE GoodsTypeID=" + typeid + " ORDER BY GoodsID desc) AND GoodsTypeID=" + typeid + " ORDER BY GoodsID DESC";

    console.log(sqltext);
    getConnection(sqltext, function (data) {

        // console.log(data.recordsets)
        res.end(JSON.stringify(data.recordsets));
    })

});

module.exports = router;


