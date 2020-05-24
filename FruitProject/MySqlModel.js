let config ={
    database: 'fruit',           // 使用哪个数据库
    username: 'root',           // 用户名
    password: '123',    // 口令
    host: '139.9.158.85',          // 主机名
    port: 3306                  // 端口号，MySQL默认3306
}

const Sequelize = require('sequelize');
const Goods = require("./table/Goods");
const Infos = require("./table/Infos");
const Orders = require("./table/Orders");
const ShopCars = require("./table/ShopCars");

const MySqlModel = {

    getInstance(){
        return this._sequelize;
    },

    init(){
        let self = this;
        console.log("连接数据库初始化");
        this._sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 30000
            },
            define: {
                timestamps: false
            }
        });

        this._sequelize
            .authenticate()
            .then(() => {
                console.log("连接数据库成功");
                //读库
                Goods.init(self._sequelize);
                Infos.init(self._sequelize);
                Orders.init(self._sequelize);
                ShopCars.init(self._sequelize);
            })
            .catch(err => {
                console.error('无法连接数据库 err :', err)
            });


    },

};

module.exports = MySqlModel;