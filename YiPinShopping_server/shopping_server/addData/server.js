var http = require('http');
var sql = require("mssql");
var urlmodule = require('url');
var querystring = require("querystring");

var server = new http.Server();

var config = {
    user: "sa",
    password: "871018252",   //密码
    database: 'YiPinMarket',
    server: 'localhost'
}

server.on('request', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var { pathname: url, query } = urlmodule.parse(req.url, true);
    console.log(url)
    switch (url) {
        case '/api/getGoods':
            console.log(req.method)
            if (req.method.toUpperCase() == "POST") {
                var str = '';
                req.on("data", chunk => {     //监听缓冲区中的数据，不断从缓冲区中获取数据
                    str += chunk;
                })
                req.on("end", () => {          //监听数据是否获取完成
                    //const obj = querystring.parse(str.toString());
                    const obj = JSON.parse(str.toString());

                    const typeid = parseInt(obj.typeid);
                    const page = parseInt(obj.page);

                    var sqltext = "select top 10 * from GoodsTab WHERE GoodsID not IN (SELECT TOP (10*(" + page + "-1)) GoodsID FROM dbo.GoodsTab WHERE GoodsTypeID=" + typeid + " ORDER BY GoodsID desc) AND GoodsTypeID=" + typeid + " ORDER BY GoodsID DESC";

                    connectSQLServer(sqltext, function (data) {

                        // console.log(data.recordsets)
                        res.end(JSON.stringify(data.recordsets));
                    })

                })
            }
            else {
                res.end('该接口需要post参数！');
            }
            break;
        case '/api/ShopCartTab':
            connectSQLServer("select * from ShopCartTab", function (data) {
                res.end(JSON.stringify(data.recordsets));
            })
            break;
        case '/api/Users':
            connectSQLServer("select * from Users", function (data) {
                res.end(JSON.stringify(data.recordsets));
            })
            break;
        case '/api/getBanner':
            connectSQLServer("SELECT TOP 5 A.ImageID, B.GoodsID, B.GoodsName, B.GoodsImage FROM dbo.tab_BannerImages AS a, dbo.GoodsTab AS b WHERE a.GoodsID = b.GoodsID ORDER BY a.ImageID DESC", function (data) {
                //console.log(data)
                res.end(JSON.stringify(data.recordsets));
            })
            break;
        case '/api/getRecomment':
            connectSQLServer("SELECT TOP 4 recommentName,image FROM tab_recomment ORDER BY recommentID desc", function (data) {
                res.end(JSON.stringify(data.recordsets));
            })
            break;
        default:
            res.end('请检查的api地址是否正确！');
            break;
    }
});

function connectSQLServer(sqltext, callback) {

    sql.connect(config).then(() => {
        return sql.query(sqltext)
    }).then(result => {
        //请求成功
        callback(result)
    }).catch(err => {
        console.log(err)
        //err 处理
    })
    sql.on('error', err => {
        //error 处理
        console.log(err)
    })
}

server.listen(3000, function () {
    console.log("server has started at http://192.168.1.107:3000");
})