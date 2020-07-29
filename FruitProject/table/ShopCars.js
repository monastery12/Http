/*
商品表
 */
const Sequelize = require('sequelize');

var ShopCars = {

    _shopCarsTable:null,

    init(sequelize){

        this._shopCarsTable = sequelize.define("DSCars", {

            carGoodsName:Sequelize.STRING,
            carGoodsId:Sequelize.INTEGER,
            carUserName:Sequelize.STRING,
            carUserAccount:Sequelize.STRING,
            carGoodsUrl:Sequelize.STRING,
            carGoodsNum:Sequelize.FLOAT,
            carGoodsPrice:Sequelize.FLOAT,
        });
    },

    /**
     * 查询表
     * 使用账户查询自己的订单
     * @returns {[]}
     */
    findData(shopUserAccount,response){

        if(!shopUserAccount){
            let shopCarData = {};
            shopCarData.status = 0;
            shopCarData.data = [];
            response.end(JSON.stringify(shopCarData));
        }

        let table = this._shopCarsTable;
        let tableInfoInfoArr = [];
        let limitObj = {};

        limitObj["shopUserAccount"] = shopUserAccount;
        (async () => {
            let tableInfo = await table.findAll({
                where: limitObj,
            });

            for(let i = 0 ; i < tableInfo.length ; i++){
                tableInfoInfoArr.push(tableInfo[i].dataValues);
            }

            let shopCarData = {};
            if(tableInfoInfoArr.length > 0){
                shopCarData.status = 1;
            }else {
                shopCarData.status = 0;
            }
            shopCarData.data = tableInfoInfoArr
            response.end(JSON.stringify(shopCarData));
        })();
    },

    //添加
    addDataShopCars(shopGoodsName,shopGoodsCode,shopGoodsNum,shopUserName,shopUserAccount,shopGoodsUrl,shopGoodsPrice,response){

        let table = this._shopCarsTable;
        if(!shopGoodsName || !shopGoodsCode || !shopGoodsNum || !shopUserName || !shopUserAccount || !shopGoodsUrl || !shopGoodsPrice ){
            let addData = {};
            addData.status = 0;
            addData.data = "add fail";
            response.end( JSON.stringify(addData) );
        }

        table.create({
            shopGoodsName:shopGoodsName,
            shopGoodsCode:shopGoodsCode,
            shopGoodsNum:shopGoodsNum,
            shopUserName:shopUserName,
            shopUserAccount:shopUserAccount,
            shopGoodsUrl:shopGoodsUrl,
            shopGoodsPrice:shopGoodsPrice,
        }).then(function (p) {
            let addData = {};
            addData.status = 1;
            addData.data = "add sucess";
            response.end( JSON.stringify(addData) );
        }).catch(function (err) {
            let addData = {};
            addData.status = 0;
            addData.data = "add fail";
            response.end( JSON.stringify(addData) );
        });
    },

    /**
     *首先要查表看有没有这个
     * 如果没有，就新添加
     * 如果有，就修改
     * 如果数量为0，就删除
     */
    changeData(shopGoodsName,shopGoodsCode,shopGoodsNum,shopUserName,shopUserAccount,shopGoodsUrl,shopGoodsPrice,response){

        let table = this._shopCarsTable;
        let limitObj = {};
        let tableInfo = [];

        limitObj["shopUserAccount"] = shopUserAccount;
        limitObj["shopGoodsCode"] = shopGoodsCode;

        let changeFunc = function () {

            if(tableInfo.length == 0){
                if(shopGoodsNum <= 0){
                    let addData = {};
                    addData.status = 0;
                    addData.data = "add fail";
                    response.end(JSON.stringify(addData) );
                }else {
                    //插入新表
                    this.addDataShopCars(shopGoodsName,shopGoodsCode,shopGoodsNum,shopUserName,shopUserAccount,shopGoodsUrl,shopGoodsPrice,response);
                    return ;
                }
            }else{

                if(shopGoodsNum == 0){
                    //删除表
                    (async () => {
                        let p = tableInfo[0];
                        await p.destroy();
                    })();
                    let addData = {};
                    addData.status = 1;
                    addData.data = "deleate sucess";
                    response.end( JSON.stringify(addData) );
                    return;
                }else{
                    //修改表
                    (async () => {
                        let p = tableInfo[0];
                        p["shopGoodsNum"] = shopGoodsNum;
                        p["shopGoodsPrice"] = shopGoodsPrice;
                        await p.save();
                    })();
                    let addData = {};
                    addData.status = 1;
                    addData.data = "update sucess";
                    response.end( JSON.stringify(addData) );
                    return ;
                }
            }
        }.bind(this);

        //先查询表
        (async () => {
            tableInfo = await table.findAll({
                where: limitObj,
            });

            changeFunc();
        })();
    },
}

module.exports = ShopCars;