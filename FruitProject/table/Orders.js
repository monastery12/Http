/*
订单表
 */
const Sequelize = require('sequelize');

let Orders = {

    _ordersTable:null,

    init(sequelize){
        this._ordersTable = sequelize.define("DSOrders", {

            orderUserAccount:Sequelize.STRING,
            orderPhone:Sequelize.STRING,
            orderGoodsName:Sequelize.STRING,
            orderGoodsId:Sequelize.INTEGER,
            orderGoodsNum:Sequelize.FLOAT,
            orderPost:Sequelize.STRING,
            orderComplete:Sequelize.INTEGER,
            orderUserName:Sequelize.STRING,
            orderDes:Sequelize.STRING,
            orderTime:Sequelize.STRING,
            orderGoodsUrl:Sequelize.STRING,
        });
    },

    //通过手机号查询订单
    findData(orderPhone,response){
        let self = this;

        let table = this._ordersTable;
        let tableInfoInfoArr = [];
        let limitObj = {};

        limitObj.orderPhone = orderPhone;

        (async () => {
            let tableInfo = await table.findAll({
                where: limitObj,
            });

            for(let i = 0 ; i < tableInfo.length ; i++){
                tableInfoInfoArr.push(tableInfo[i].dataValues);
                console.log("配置表数据 ",tableInfo[i].dataValues);
            }

            //按照时间给订单排序，最新的时间在最上面
            self.sortOrderByTime(tableInfoInfoArr);

            let orderData = {};
            if(tableInfoInfoArr.length <= 0){
                orderData.status = 0;
            }else {
                orderData.status = 1;
            }
            orderData.data = tableInfoInfoArr;
            response.end(JSON.stringify(orderData) );

        })();
    },

    //查询全部订单
    findAllData(num,response){
        let self = this;

        num = num || 100;
        let table = this._ordersTable;
        let tableInfoInfoArr = [];

        (async () => {
            let tableInfo = await table.findAll({ });

            for(let i = 0 ; i < tableInfo.length && i < num ; i++){
                tableInfoInfoArr.push(tableInfo[i].dataValues);
            }

            //按照时间给订单排序，最新的时间在最上面
            self.sortOrderByTime(tableInfoInfoArr);
            response.end(JSON.stringify(tableInfoInfoArr));

        })();
    },

    //订单排序
    sortOrderByTime(tableInfoInfoArr){
        for(let i = 0 ; i <  tableInfoInfoArr.length ; i++){
            for(let j = i ;  j < tableInfoInfoArr.length ; j++){
                let time_i = parseInt(tableInfoInfoArr[i].orderTime);
                let time_j = parseInt(tableInfoInfoArr[j].orderTime);
                if( time_i < time_j){

                    let temp = tableInfoInfoArr[i];
                    tableInfoInfoArr[i] = tableInfoInfoArr[j];
                    tableInfoInfoArr[j] = temp;
                }
            }
        }
    },

    //购买商品，增加订单
    addDataOrder(orderName,orderNum,orderGoods,orderPhone,orderDes,orderAddress,orderCode,response){

        if(!orderName || !orderNum || !orderGoods || !orderPhone || !orderAddress || !orderCode){
            let buyData = {};
            buyData.status = 0;
            buyData.data = "buy fail";
            response.end(JSON.stringify(buyData) );
            return;
        }

        let table = this._ordersTable;

        let orderTime = this.getTimeNow();
        let orderComplete = 0;

        table.create({
            orderName:orderName,
            orderNum:orderNum,
            orderGoods:orderGoods,
            orderTime:orderTime,
            orderPhone:orderPhone,
            orderDes:orderDes,
            orderComplete:orderComplete,
            orderAddress:orderAddress,
            orderCode:orderCode,
        }).then(function (p) {
            let buyData = {};
            buyData.status = 1;
            buyData.data = "buy sucess";
            response.end(JSON.stringify(buyData) );
        }).catch(function (err) {
            let buyData = {};
            buyData.status = 0;
            buyData.data = "buy fail";
            response.end(JSON.stringify(buyData) );
        });
    },

    //获取时间
    getTimeNow(){
        let date = new Date();

        let year    = date.getFullYear();
        let monty   = date.getMonth();
        let day     = date.getDate();
        let hour    = data.getHours();
        let min     = data.getMinutes();

        if(monty < 10){
            monty = `0${monty}`;
        }
        if(day < 10){
            day = `0${day}`;
        }
        if(hour < 10){
            hour = `0${hour}`;
        }
        if(min < 10){
            min = `0${min}`;
        }

        return `${year}${monty}${day}${hour}${min}`;        //201203121355
    },
};

module.exports = Orders;