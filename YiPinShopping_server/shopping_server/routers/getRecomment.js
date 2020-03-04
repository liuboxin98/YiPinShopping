const express = require("express");
const router = express.Router();
const getConnection = require("../mssql.config.js");

router.get("/getRecomment", (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const sqltext = "SELECT TOP 4 recommentName,image FROM tab_recomment ORDER BY recommentID desc";
    getConnection(sqltext, function (data) {
        console.log(data)
        res.end(JSON.stringify(data.recordsets));
    });
});

module.exports = router;
