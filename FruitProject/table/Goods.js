/*
商品表
 */
const Sequelize = require('sequelize');

var Goods = {

    _goodsTable:null,

    init(sequelize){

        this._goodsTable = sequelize.define("goods", {
            goodsName: Sequelize.STRING,                    //映射表
            goodsDes: Sequelize.STRING,
            goodsPic:Sequelize.STRING,
            goodsPrice: Sequelize.FLOAT,
            goodsType:Sequelize.STRING,
            goodsNum:Sequelize.FLOAT,
        });
    },

    /**
     * 查询表
     * @param table         目标表
     * @param colume        字段
     * @param limit         字段条件
     * @returns {[]}
     */
    findData(colume,limit,response){
        let table = this._goodsTable;
        let tableInfoInfoArr = [];
        let limitObj = {};

        if(!colume || colume == ""){                        //查询表全部数据

            (async () => {
                let tableInfo = await table.findAll();

                for(let i = 0 ; i < tableInfo.length ; i++){
                    tableInfoInfoArr.push(tableInfo[i].dataValues);
                    console.log("配置表数据 ",tableInfo[i].dataValues);
                }

                let goodsData = {};
                if(tableInfoInfoArr.length > 0){
                    goodsData.status = 1;
                }else {
                    goodsData.status = 0;
                }
                goodsData.data = tableInfoInfoArr;

                response.end(JSON.stringify(goodsData));

            })();

        }else {                                             //查询表指定数据
            limitObj[colume] = limit;
            (async () => {
                let tableInfo = await table.findAll({
                    where: limitObj,
                });


                for(let i = 0 ; i < tableInfo.length ; i++){
                    tableInfoInfoArr.push(tableInfo[i].dataValues);
                    console.log("配置表数据 ",tableInfo[i].dataValues);
                }
                let goodsData = {};
                if(tableInfoInfoArr.length > 0){
                    goodsData.status = 1;
                }else {
                    goodsData.status = 0;
                }
                goodsData.data = tableInfoInfoArr;

                response.end(JSON.stringify(goodsData));

            })();
        }
    },

}

module.exports = Goods;