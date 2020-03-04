const express = require("express");
const router = express.Router();
const getConnection = require("../mssql.config.js");

router.get("/getUsers", (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const sqltext = "select * from Users";
    getConnection(sqltext, function (data) {
        console.log(data)
        res.end(JSON.stringify(data.recordsets));
    });
});

module.exports = router;
