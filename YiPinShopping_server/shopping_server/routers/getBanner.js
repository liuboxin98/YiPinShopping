const express = require("express");
const router = express.Router();
const getConnection = require("../mssql.config.js");

console.log("in api/getBanner");

router.get("/getBanner", (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const sqltext = "SELECT TOP 5 A.ImageID, B.GoodsID, B.GoodsName, B.GoodsImage FROM dbo.tab_BannerImages AS a, dbo.GoodsTab AS b WHERE a.GoodsID = b.GoodsID ORDER BY a.ImageID DESC";
    getConnection(sqltext, function (data) {
        console.log(data)
        res.end(JSON.stringify(data.recordsets));
    });
});

module.exports = router;
