const express = require("express");
const router = express.Router();
const getConnection = require("../mssql.config.js");

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


