const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    let config = {
        appid: "wx44f647a9febbeb77",
        secret: "5d6cce009b8850eb803875343f94dfe1",
        code: req.body.code
    }

    console.log(req)
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${config.code}&grant_type=authorization_code`;

    console.log(url)
    // 引入node https模块
    let https = require("https");
    https.get(url, function (data) {
        let str = "";
        data.on("data", function (chunk) {
            str += chunk; //监听数据响应，拼接数据片段
        })
        data.on("end", function () {
            let { openid, session_key } = JSON.parse(str.toString());
            console.log(str.toString())
            console.log("openid", openid, session_key);
            res.send({
                code: 200,
                data: {
                    username: openid,
                    session_key
                }
            });
        })
    })
});

module.exports = router;
