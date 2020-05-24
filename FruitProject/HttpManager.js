
'use strict';

// 导入http模块:
var http = require('http');
var querystring = require("querystring");
var ResponseManager = require("./ResponseManager");

const PORT = 8081;

let HttpManager = {

    init(){
        console.log("初始化httpServer");
        let self = this;

        // 创建http server，并传入回调函数:
        const server = http.createServer(function (request, response) {

            //response.writeHead(200, {'Content-Type': 'text/html'});       // 将HTTP响应200写入response, 同时设置Content-Type: text/html:

            response.setHeader('Access-Control-Allow-Origin', '*');         //处理跨域问题

            let url = request.url;                                          //客户端请求的url  xxx/api/index?xiao = a && shuai = b
            self.answerResquest(response,url);

        });

        console.log("初始化httpServer成功")

        // 让服务器监听80端口:
        server.listen(PORT);
        console.log(`Server is running at http://127.0.0.1:${PORT}/`);
    },

    answerResquest(response,url){

        let res = querystring.parse(url.split('?')[1]);       //获取请求

        ResponseManager.checkType(res,response);             //负责响应请求问题并返回数据 msg:

        //response.end(); // 将HTTP响应的HTML内容写入response:
    },
};
module.exports = HttpManager;

