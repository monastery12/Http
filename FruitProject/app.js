
const HttpManager = require("./HttpManager");
const MySqlModel = require("./MySqlModel");

//连接数据库
MySqlModel.init();

//
//开启http
HttpManager.init();