/*
商品表
 */
const Sequelize = require('sequelize');

var Goods = {

    _goodsTable:null,

    init(sequelize){

        this._goodsTable = sequelize.define("DSGoods", {
            goodsName: Sequelize.STRING,                    //名字
            goodsPrice: Sequelize.FLOAT,                    //价格
            goodsDiscount:Sequelize.FLOAT,                  //打折价
            goodsIsSell:Sequelize.INTEGER,                  //是否上架
            goodsDes: Sequelize.STRING,                     //描述
            goodsSelect:Sequelize.STRING,                   //选择
            goodsNum:Sequelize.FLOAT,                       //数量0
            goodsType:Sequelize.STRING,                     //类型
            goodsUrl:Sequelize.STRING,                      //图片url
            goodsRecommend:Sequelize.INTEGER,               //商品推荐
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

    //通过code查询goods
    findDataByCode(code,response){

        let table = this._goodsTable;
        let tableInfoInfoArr = [];
        let limitObj = {};

        limitObj["id"] = code;
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

}

module.exports = Goods;