var mssql = require("mssql");

var config = {
    user: "sa",
    password: "871018252",   //密码
    database: 'YiPinMarket',
    server: 'localhost',
    // options: {   //加密
    //     encrypt: true
    // }
}

function getSqlServerData(sqltext, callback) {

    console.log(sqltext);
    mssql.connect(config).then(() => {
        return mssql.query(sqltext)
    }).then(result => {
        //请求成功
        callback(result)
    }).catch(err => {
        console.log(err)
        //err 处理
    })
    mssql.on('error', err => {
        //error 处理
        console.log(err)
    })
}

// 导出getConnection
module.exports = getSqlServerData;